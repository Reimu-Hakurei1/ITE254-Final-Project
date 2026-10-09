/* Route duplicate exported resources to their single shared copy on the Pages build. */
(function () {
  if (window.location.protocol === "file:") return;

  const resourceDirectory = "/resources/";
  const pagePath = decodeURIComponent(window.location.pathname);
  const gameMarker = "/Mario Forever/";
  const gameStart = pagePath.indexOf(gameMarker);
  if (gameStart < 0) return;

  const gameRoot = pagePath.slice(0, gameStart + gameMarker.length);
  const mapRequest = new XMLHttpRequest();
  try {
    mapRequest.open("GET", new URL("resources/shared-assets-map.json", document.baseURI), false);
    mapRequest.send();
  } catch (_) {
    return;
  }
  if (mapRequest.status < 200 || mapRequest.status >= 300) return;

  let sharedMap;
  try {
    sharedMap = JSON.parse(mapRequest.responseText);
  } catch (_) {
    return;
  }

  function rewriteResourceUrl(value) {
    if (typeof value !== "string") return value;
    try {
      const url = new URL(value, document.baseURI);
      if (url.origin !== window.location.origin || !url.pathname.includes(resourceDirectory)) return value;
      const filename = decodeURIComponent(url.pathname.slice(url.pathname.lastIndexOf("/") + 1));
      const sharedName = sharedMap[filename];
      if (!sharedName) return value;
      return new URL(gameRoot + "shared-assets/" + sharedName.split("/").map(encodeURIComponent).join("/"), window.location.origin).href;
    } catch (_) {
      return value;
    }
  }

  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, ...args) {
    return originalOpen.call(this, method, rewriteResourceUrl(url), ...args);
  };

  function patchSourceProperty(prototype) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, "src");
    if (!descriptor || !descriptor.set || !descriptor.get) return;
    Object.defineProperty(prototype, "src", {
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
      get: descriptor.get,
      set(value) {
        descriptor.set.call(this, rewriteResourceUrl(value));
      }
    });
  }

  patchSourceProperty(HTMLImageElement.prototype);
  patchSourceProperty(HTMLMediaElement.prototype);

  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (name.toLowerCase() === "src" && (this instanceof HTMLImageElement || this instanceof HTMLMediaElement)) {
      value = rewriteResourceUrl(value);
    }
    return originalSetAttribute.call(this, name, value);
  };
})();
