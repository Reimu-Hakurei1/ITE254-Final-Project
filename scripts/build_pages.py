#!/usr/bin/env python3
"""Build the Pages site while sharing identical exported game resources."""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import sys
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
GAME_DIR = Path("Mario Forever")
RUNTIME_TAG = '<script src="src/Runtime.js"></script>'


def digest_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def build(output: Path) -> None:
    output = output.resolve()
    if output == ROOT or output in ROOT.parents:
        raise ValueError("Output cannot replace the source tree or one of its parents")
    if output.exists():
        shutil.rmtree(output)
    output.mkdir(parents=True)

    ignored = {".git", ".github", "Mario Forever", "node_modules", output.name}

    def ignore_at_root(directory: str, names: list[str]) -> set[str]:
        if Path(directory).resolve() == ROOT:
            return ignored.intersection(names)
        return set()

    for child in ROOT.iterdir():
        if child.name in ignored:
            continue
        destination = output / child.name
        if child.is_dir():
            shutil.copytree(child, destination, ignore=ignore_at_root)
        else:
            shutil.copy2(child, destination)

    source_game = ROOT / GAME_DIR
    output_game = output / GAME_DIR
    if not source_game.is_dir():
        raise FileNotFoundError(f"Missing game folder: {source_game}")

    resources = sorted(path for path in source_game.rglob("*") if path.is_file() and "resources" in path.parts)
    hashes: dict[Path, str] = {path: digest_file(path) for path in resources}
    groups: dict[tuple[str, str], list[Path]] = defaultdict(list)
    for path, digest in hashes.items():
        groups[(digest, path.suffix.lower())].append(path)

    shared_names: dict[tuple[str, str], str] = {}
    for (digest, suffix), paths in groups.items():
        if len(paths) > 1:
            shared_names[(digest, suffix)] = f"{digest}{suffix}"

    output_game.mkdir(parents=True)
    for current, dirs, filenames in os.walk(source_game):
        source_dir = Path(current)
        relative_dir = source_dir.relative_to(source_game)
        target_dir = output_game / relative_dir
        target_dir.mkdir(parents=True, exist_ok=True)

        is_resource_dir = source_dir.name == "resources"
        manifest: dict[str, str] = {}
        for filename in filenames:
            source_file = source_dir / filename
            target_file = target_dir / filename
            if is_resource_dir and source_file in hashes:
                digest = hashes[source_file]
                shared_name = shared_names.get((digest, source_file.suffix.lower()))
                if shared_name:
                    manifest[filename] = shared_name
                    shared_file = output_game / "shared-assets" / shared_name
                    shared_file.parent.mkdir(parents=True, exist_ok=True)
                    if not shared_file.exists():
                        shutil.copy2(source_file, shared_file)
                    continue
            shutil.copy2(source_file, target_file)

        if is_resource_dir:
            (target_dir / "shared-assets-map.json").write_text(
                json.dumps(manifest, separators=(",", ":")), encoding="utf-8"
            )

    loader_source = Path(__file__).with_name("shared-assets-loader.js").read_text(encoding="utf-8")
    (output_game / "shared-assets-loader.js").write_text(loader_source, encoding="utf-8")

    changed_pages = 0
    for page in output_game.rglob("index.html"):
        html = page.read_text(encoding="utf-8")
        if RUNTIME_TAG not in html:
            continue
        relative_loader = Path(os.path.relpath(output_game / "shared-assets-loader.js", page.parent)).as_posix()
        html = html.replace(RUNTIME_TAG, f'<script src="{relative_loader}"></script>\n  {RUNTIME_TAG}', 1)
        page.write_text(html, encoding="utf-8", newline="")
        changed_pages += 1

    if changed_pages != 49:
        raise RuntimeError(f"Expected to update 49 game pages, updated {changed_pages}")

    print(f"Built Pages site at {output}")
    print(f"Shared {sum(1 for paths in groups.values() if len(paths) > 1)} repeated asset groups across {len(resources)} resource files")


if __name__ == "__main__":
    destination = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "_site"
    build(destination)
