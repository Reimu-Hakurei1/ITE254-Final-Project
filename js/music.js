// ================== MUSIC LIST ==================
const tracks = [
  {title:"Super Mario World - Wandering the Plains", artist:"Koji Kondo", file: "../songs/savegameroom.mp3", cover:"../covers/mario world.jpg"},
  {title:"Touhou Spell Bubble - Character Select", artist:"Masaki (ZUNTATA)", file: "../songs/levelselector.mp3", cover:"../covers/Touhou spell bubble.png"},
  {title:"Super Mario Yoshi Island - Ending", artist:"Koji Kondo", file: "../songs/Ending.mp3", cover:"../covers/Yoshi Island.png"},
  {title:"Super Mario Yoshi Island - Big Boss BGM", artist:"Koji Kondo", file: "../songs/Intro 2.mp3", cover:"../covers/Yoshi Island.png"},
  {title:"Riot-11", artist:"Corrosion", file: "../songs/riot-11.mp3", cover:"../covers/art-placeholder.jpg"},
  {title:"Super Mario World - Overworld", artist:"Koji Kondo", file: "../songs/Mario World - Overworld.mp3", cover:"../covers/mario world.jpg"},
  {title:"Super Mario World - Underground", artist:"Koji Kondo", file: "../songs/Mario World - Underground.mp3", cover:"../covers/mario world.jpg"},
  {title:"Super Mario World - Athletic", artist:"Koji Kondo", file: "../songs/Mario World - Athletic.mp3", cover:"../covers/mario world.jpg"},
  {title:"Super Mario Yoshi Island - Castle & Fortress", artist:"Koji Kondo", file: "../songs/Yoshi Island - Castle.mp3", cover:"../covers/Yoshi Island.png"},
  {title:"The Holiday Anthem", artist:"David Puentez", file: "../songs/The Holiday Anthem.mp3", cover:"../covers/art-placeholder.jpg"},
  {title:"Super Mario All-Stars - Swimming(Hurry Up)", artist:"Koji Kondo", file: "../songs/Super Mario Bros All-Star- Underwater Sped up.mp3", cover:"../covers/mario all-star.png"},
  {title:"Super Mario World - Haunted House", artist:"Koji Kondo", file: "../songs/Haunted House.mp3", cover:"../covers/mario world.jpg"},
  {title:"One Fine Day...", artist:"Jussi-Matti Salmela (Elwood)", file: "../songs/One Fine Day....mp3", cover:"../covers/art-placeholder.jpg"},
  {title:"Super Mario Yoshi Island - Underground BGM", artist:"Koji Kondo", file: "../songs/Yoshi Island - Underground.mp3", cover:"../covers/Yoshi Island.png"},
  {title:"Super Mario All-Stars - Underground", artist:"Koji Kondo", file: "../songs/Super Mario Bros All-Star - Underground.mp3", cover:"../covers/mario all-star.png"},
  {title:"Trancoi (UnFinished)", artist:"Martin Reiter (DIAC)", file: "../songs/Trancoi (UnFinished).mp3", cover:"../covers/art-placeholder.jpg"},
  {title:"Super Mario Yoshi Island - Aboveground", artist:"Koji Kondo", file: "../songs/Yoshi Island - Aboveground.mp3", cover:"../covers/Yoshi Island.png"},
  {title:"Super Mario World - Athletic(Yoshi)", artist:"Koji Kondo", file: "../songs/Mario World - Athletic (Yoshi).mp3", cover:"../covers/mario world.jpg"},
  {title:"In The Kitchen", artist:"Matthew Simmonds (4Mat)", file: "../songs/in_the_kitchen.mp3", cover:"../covers/art-placeholder.jpg"},
  {title:"Rigit Obstacles", artist:"Virgill", file: "../songs/Rigit Obstacles.mp3", cover:"../covers/00000401.png"},
  {title:"Sirens", artist:"Dave the Brave", file: "../songs/Fastrun 2.ogg", cover:"../covers/art-placeholder.jpg"},
  {title:"Yet Another Bonus", artist:"Matthew Simmonds (4Mat)", file: "../songs/Yet Another Bonus.mp3", cover:"../covers/art-placeholder.jpg"},
  {title:"Jaguar XJ220 - Speed-E-Boy", artist:"Martin Iveson", file: "../songs/Yky.mp3", cover:"../covers/jaguar_xj220_01.png"},
  {title:"The Golden Ages", artist:"Matthew Simmonds (4Mat)", file: "../songs/The Golden Ages.mp3", cover:"../covers/art-placeholder.jpg"},
  {title:"Super Mario Yoshi Island - Flower Garden", artist:"Koji Kondo", file: "../songs/Yoshi Island - Flower Garden.mp3", cover:"../covers/Yoshi Island.png"},
  {title:"Federation", artist:"Matthew Simmonds (4Mat)", file: "../songs/Federation.mp3", cover:"../covers/art-placeholder.jpg"},
  {title:"Apoplexy", artist:"Bee Hunter", file: "../songs/Apoplexytanks.ogg", cover:"../covers/600x600bf-60.jpg"},
  {title:"Super Mario Yoshi Island - Bowser", artist:"Koji Kondo", file: "../songs/Yoshi Island - Final Boss.ogg", cover:"../covers/Yoshi Island.png"},
  {title:"Super Mario World - Staff Roll", artist:"Koji Kondo", file: "../songs/Mario World - Ending.mp3", cover:"../covers/mario world.jpg"},
  {title:"Streets of Rage 2 - Alien Power", artist:"Yuzo Koshiro", file: "../songs/08 - Alien Power.mp3", cover:"../covers/Streets of Rage 2.jpg"},
  {title:"Suomalainen Kaupunki", artist:"Janne Kivilahti", file: "../songs/kaupunki.mp3", cover:"../covers/PEKKA32.png"},
  {title:"Dream Off", artist:"Hmc", file: "../songs/dreamoff.mp3", cover:"../covers/art-placeholder.jpg"},
  {title:"Taboo Japan Disentanglement - Mugen Noh ~ Taboo Marionette", artist:"ZUN", file: "../songs/05. 夢幻能 ～ Taboo Marionette.flac", cover:"../covers/Taboo Japan Disentanglement.png"},
  {title:"Atelier Iris ETERNAL MANA - Big Play Board", artist:"Ken Nakagawa", file: "../songs/Atelier Iris ETERNAL MANA - Big Play Board.mp3", cover:"../covers/Atelier Iris ETERNAL MANA.jpg"},
  {title:"MegaMari - Marisa no Yabou - Boss Battle", artist:"Uni Akiyama", file: "../songs/MegaMari - Marisa no Yabou - Boss Battle.mp3", cover:"../covers/Megamari.jpg"},
  {title:"Oriental Sacred Place 2 - A Midnight Fairy Dance", artist:"Zun", file: "../songs/Oriental Sacred Place 2 - A Midnight Fairy Dance.mp3", cover:"../covers/Oriental Sacred Place 2.jpg"},
  {title:"Magical Astronomy - Greenwich in the Sky", artist:"Zun", file: "../songs/Magical Astronomy - Greenwich in the Sky.mp3", cover:"../covers/Magical Astronomy.jpg"},
  {title:"Touhou 6 The Embodiment of Scarlet Devil - Septette for the Dead Princess", artist:"Zun", file: "../songs/Septette for the Dead Princess.mp3", cover:"../covers/Th06cover.png"}
];

// ================== GLOBAL STATE ==================
let currentIndex = 0;
let isPlaying = false;
let isShuffled = false;
let isLooping = false;
let isMuted = false;
let volume = 100;
let originalTracks = [];
let shuffledTracks = [];
let midiPlayer = null;        // for MIDI playback (midi-player-js instance)
let midiPlaying = false;      // whether MIDI is currently in use
let midiProgressInterval = null; // interval to update UI during MIDI playback

// ================== DOM ELEMENTS (assigned after DOMContentLoaded) ==================
let audio, albumCover, miniCover, songTitleInner, songArtist,
    playBtn, prevBtn, nextBtn, shuffleBtn, loopBtn,
    downloadBtn, muteBtn, volumeSlider, progress, progressBar, thumb, curTime, durTime,
    playerLeft, bigPlayer, closeBigPlayer, bigPlayerCover, bigPlayerTitle, bigPlayerArtist,
    bigPlay, bigPrev, bigNext, bigShuffle, bigLoop, bigDownloadBtn, bigMuteBtn, bigVolumeSlider,
    bigProgress, bigProgressBar, bigThumb, bigCurTime, bigDurTime,
    trackList, noResults, searchBar;

// ================== INITIALIZATION ==================
function cacheElements() {
  audio = document.getElementById('audioEl');
  albumCover = document.getElementById('albumCover');
  miniCover = document.getElementById('miniCover');
  songTitleInner = document.getElementById('songTitleInner');
  songArtist = document.getElementById('songArtist');
  playBtn = document.getElementById('play');
  prevBtn = document.getElementById('prev');
  nextBtn = document.getElementById('next');
  shuffleBtn = document.getElementById('shuffle');
  loopBtn = document.getElementById('loop');
  downloadBtn = document.getElementById('downloadBtn');
  muteBtn = document.getElementById('muteBtn');
  volumeSlider = document.getElementById('volumeSlider');
  progress = document.getElementById('progress');
  progressBar = document.getElementById('progressBar');
  thumb = document.getElementById('thumb');
  curTime = document.getElementById('curTime');
  durTime = document.getElementById('durTime');

  playerLeft = document.querySelector('.player-left');
  bigPlayer = document.getElementById('bigPlayer');
  closeBigPlayer = document.getElementById('closeBigPlayer');
  bigPlayerCover = document.getElementById('bigPlayerCover');
  bigPlayerTitle = document.getElementById('bigPlayerTitle');
  bigPlayerArtist = document.getElementById('bigPlayerArtist');
  bigPlay = document.getElementById('bigPlay');
  bigPrev = document.getElementById('bigPrev');
  bigNext = document.getElementById('bigNext');
  bigShuffle = document.getElementById('bigShuffle');
  bigLoop = document.getElementById('bigLoop');
  bigDownloadBtn = document.getElementById('bigDownloadBtn');
  bigMuteBtn = document.getElementById('bigMuteBtn');
  bigVolumeSlider = document.getElementById('bigVolumeSlider');
  bigProgress = document.getElementById('bigProgress');
  bigProgressBar = document.getElementById('bigProgressBar');
  bigThumb = document.getElementById('bigThumb');
  bigCurTime = document.getElementById('bigCurTime');
  bigDurTime = document.getElementById('bigDurTime');

  trackList = document.getElementById('trackList');
  noResults = document.getElementById('noResults');
  searchBar = document.getElementById('searchBar');
}

function initializePlayer() {
  cacheElements();
  if (typeof tracks !== 'undefined' && Array.isArray(tracks)) {
    originalTracks = [...tracks];
    buildTrackList();
    loadTrack(0);
  } else {
    console.error('Tracks data not found.');
    if (trackList) trackList.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Error: Music tracks not found.</p></div>';
  }
}

// ================== UTILITY / NOTIFICATION ==================
function showNotification(message) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = message;
  notif.style.cssText = `
    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
    background: #1DB954; color: #000; padding: 12px 20px; border-radius: 8px;
    z-index: 10001; font-weight: 600; box-shadow: 0 14px 40px rgba(0,0,0,0.6);
    animation: fadeInOut 3s ease;
  `;
  document.body.appendChild(notif);
  setTimeout(() => { if (notif.parentNode) notif.remove(); }, 3000);
}

function formatTime(sec) {
  if (!isFinite(sec) || isNaN(sec)) return "--:--";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ================== MIDI PLAYBACK (using midi-player-js) ==================
function stopMidi() {
  if (midiPlayer) {
    try { midiPlayer.stop(); } catch(e) {}
    midiPlayer = null;
  }
  midiPlaying = false;
  if (midiProgressInterval) {
    clearInterval(midiProgressInterval);
    midiProgressInterval = null;
  }
}

async function playMidi(fileUrl) {
  stopMidi();

  // Ensure midi-player-js is available
  if (typeof MIDIPlayer === 'undefined') {
    showNotification('MIDI library not loaded. Please include midi-player-js.');
    console.error('MIDIPlayer class missing. Add <script src="https://cdn.jsdelivr.net/npm/midi-player-js@2.0.0/dist/midi-player.min.js"></script>');
    return false;
  }

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error('Network error');
    const arrayBuffer = await response.arrayBuffer();
    const midiData = new Uint8Array(arrayBuffer);

    midiPlayer = new MIDIPlayer(midiData);
    midiPlayer.setVolume(volume / 100);
    midiPlayer.addListener(data => {
      // data.tick, data.track, etc. – we can ignore for simple playback
    });

    midiPlayer.play();
    midiPlaying = true;

    // Update progress while MIDI plays
    if (midiProgressInterval) clearInterval(midiProgressInterval);
    midiProgressInterval = setInterval(() => {
      if (!midiPlayer || midiPlaying === false) return;
      const curSec = midiPlayer.getCurrentTime();
      const durSec = midiPlayer.getSongTime();
      updateProgressUI(curSec, durSec);
      // Stop interval when song ends
      if (curSec >= durSec && durSec > 0) {
        stopMidi();
        handleTrackEnd();
      }
    }, 200);

    return true;
  } catch (err) {
    console.error('MIDI playback error:', err);
    showNotification('Cannot play this MIDI file.');
    return false;
  }
}

// ================== TRACK LOADING ==================
function isMidiFile(filePath) {
  return /\.midi?$/i.test(filePath);
}

async function loadTrack(i) {
  // Stop any existing MIDI playback
  stopMidi();

  // Stop HTML5 audio
  if (audio) {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
  }

  const currentTracks = isShuffled ? shuffledTracks : originalTracks;
  if (!currentTracks || currentTracks.length === 0) return;
  if (i < 0) i = 0;
  if (i >= currentTracks.length) i = currentTracks.length - 1;

  const t = currentTracks[i];
  if (!t || !t.file) return;

  const originalIndex = originalTracks.findIndex(track =>
    track.title === t.title && track.artist === t.artist
  );

  currentIndex = i;

  // Update UI for new track
  songTitleInner.textContent = t.title || 'Unknown Title';
  songArtist.textContent = t.artist || 'Unknown Artist';
  albumCover.src = t.cover || '../covers/default.jpg';
  miniCover.src = t.cover || '../covers/default.jpg';
  bigPlayerCover.src = t.cover || '../covers/default.jpg';
  bigPlayerTitle.textContent = t.title || 'Unknown Title';
  bigPlayerArtist.textContent = t.artist || 'Unknown Artist';

  downloadBtn?.setAttribute('data-index', originalIndex);
  bigDownloadBtn?.setAttribute('data-index', originalIndex);

  checkTitleScrolling();

  // Highlight active track
  document.querySelectorAll('.track').forEach(el => el.classList.remove('active'));
  const active = document.querySelector(`.track[data-index="${originalIndex}"]`);
  if (active) active.classList.add('active');

  // Reset progress UI
  updateProgressUI(0, 0);

  // Load based on file type
  if (isMidiFile(t.file)) {
    const success = await playMidi(t.file);
    if (success) {
      if (isPlaying) {
        // Already playing
      }
    } else {
      showNotification('MIDI playback failed');
    }
  } else {
    // Standard HTML5 audio
    audio.src = t.file;
    audio.volume = volume / 100;
    audio.load();

    // Wait for metadata before possibly playing
    audio.addEventListener('loadedmetadata', function onMeta() {
      audio.removeEventListener('loadedmetadata', onMeta);
      // Start playing if required
      if (isPlaying) {
        audio.play().catch(err => console.error('Play error:', err));
      }
    });

    // If already playing, start playback as soon as possible
    if (isPlaying) {
      audio.play().catch(err => console.error('Play error:', err));
    }
  }
}

// ================== PLAYBACK CONTROLS ==================
function playTrack() {
  if (midiPlaying) {
    if (midiPlayer) midiPlayer.play();
  } else if (audio.src) {
    audio.play().catch(err => console.error('Play error:', err));
  }
  isPlaying = true;
  updatePlayButtons();
}

function pauseTrack() {
  if (midiPlaying) {
    if (midiPlayer) midiPlayer.pause();
  } else {
    audio.pause();
  }
  isPlaying = false;
  updatePlayButtons();
}

function updatePlayButtons() {
  const icon = isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill';
  if (playBtn) playBtn.innerHTML = `<i class="${icon}"></i>`;
  if (bigPlay) bigPlay.innerHTML = `<i class="${icon}"></i>`;
}

function handleTrackEnd() {
  if (!isLooping) {
    nextBtn?.click();
  } else {
    // Replay current track (HTML5 audio loops automatically if set loop, but we handle manually to be safe)
    if (midiPlaying) {
      stopMidi();
      loadTrack(currentIndex);
      playTrack();
    } else {
      audio.currentTime = 0;
      audio.play();
    }
  }
}

// ================== SHUFFLE / LOOP / MUTE ==================
function toggleShuffle() {
  isShuffled = !isShuffled;
  if (isShuffled) {
    shuffledTracks = [...originalTracks].sort(() => Math.random() - 0.5);
    shuffleBtn?.classList.add('active');
    shuffleBtn.title = 'Shuffle: ON';
    bigShuffle?.classList.add('active');
    bigShuffle.title = 'Shuffle: ON';
    // Update current index mapping
    const currentTrack = midiPlaying ? tracks[currentIndex] : originalTracks[currentIndex];
    const newIndex = shuffledTracks.findIndex(t => t.title === currentTrack.title && t.artist === currentTrack.artist);
    if (newIndex !== -1) currentIndex = newIndex;
  } else {
    shuffleBtn?.classList.remove('active');
    shuffleBtn.title = 'Shuffle';
    bigShuffle?.classList.remove('active');
    bigShuffle.title = 'Shuffle';
  }
}

function toggleLoop() {
  isLooping = !isLooping;
  if (isLooping) {
    loopBtn?.classList.add('active');
    loopBtn.title = 'Loop: ON';
    bigLoop?.classList.add('active');
    bigLoop.title = 'Loop: ON';
  } else {
    loopBtn?.classList.remove('active');
    loopBtn.title = 'Loop';
    bigLoop?.classList.remove('active');
    bigLoop.title = 'Loop';
  }
}

function toggleMute() {
  isMuted = !isMuted;
  if (isMuted) {
    if (midiPlaying && midiPlayer) midiPlayer.setVolume(0);
    else audio.volume = 0;
    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    bigMuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeSlider.value = 0;
    bigVolumeSlider.value = 0;
  } else {
    const newVol = volume / 100;
    if (midiPlaying && midiPlayer) midiPlayer.setVolume(newVol);
    else audio.volume = newVol;
    const icon = volume > 0 ? 'fa-volume-up' : 'fa-volume-off';
    muteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    bigMuteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    volumeSlider.value = volume;
    bigVolumeSlider.value = volume;
  }
}

function updateVolume(value) {
  volume = parseInt(value);
  isMuted = (volume === 0);
  const volNorm = volume / 100;

  if (!isMuted) {
    if (midiPlaying && midiPlayer) midiPlayer.setVolume(volNorm);
    else audio.volume = volNorm;
    const icon = volume > 0 ? 'fa-volume-up' : 'fa-volume-off';
    muteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    bigMuteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
  } else {
    if (midiPlaying && midiPlayer) midiPlayer.setVolume(0);
    else audio.volume = 0;
    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    bigMuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }

  volumeSlider.value = volume;
  bigVolumeSlider.value = volume;
  volumeSlider.style.setProperty('--volume-percent', `${volume}%`);
  bigVolumeSlider.style.setProperty('--volume-percent', `${volume}%`);
}

// ================== PROGRESS UI ==================
function updateProgressUI(cur, dur) {
  const pct = (dur > 0) ? (cur / dur) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
  if (thumb) thumb.style.left = pct + '%';
  if (bigProgressBar) bigProgressBar.style.width = pct + '%';
  if (bigThumb) bigThumb.style.left = pct + '%';
  if (curTime) curTime.textContent = formatTime(cur);
  if (bigCurTime) bigCurTime.textContent = formatTime(cur);
  if (durTime) durTime.textContent = formatTime(dur);
  if (bigDurTime) bigDurTime.textContent = formatTime(dur);
}

// ================== SEEK ==================
function seekTo(ratio) {
  if (midiPlaying && midiPlayer) {
    const dur = midiPlayer.getSongTime();
    if (dur > 0) {
      midiPlayer.seekTo(ratio * dur);
    }
  } else if (audio && isFinite(audio.duration)) {
    audio.currentTime = ratio * audio.duration;
  }
}

// ================== TRACK LIST & SEARCH ==================
function buildTrackList() {
  if (!trackList || !originalTracks.length) return;
  trackList.innerHTML = '';
  originalTracks.forEach((t, i) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 mb-3';
    col.innerHTML = `
      <div class="track card h-100 d-flex flex-row align-items-center p-2" data-index="${i}">
        <img src="${t.cover || '../covers/default.jpg'}" alt="${t.title}" class="track-cover me-3">
        <div class="track-info flex-grow-1">
          <div class="track-title fw-bold">${t.title || 'Unknown Title'}</div>
          <div class="track-artist">${t.artist || 'Unknown Artist'}</div>
        </div>
        <div class="track-actions">
          <button class="track-download-btn" title="Download ${t.title}" data-index="${i}">
            <i class="bi bi-download"></i>
          </button>
        </div>
      </div>
    `;
    const trackEl = col.querySelector('.track');
    const dnBtn = col.querySelector('.track-download-btn');
    trackEl.addEventListener('click', () => {
      loadTrack(i);
      playTrack();
    });
    dnBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      downloadTrack(i);
    });
    trackList.appendChild(col);
  });
}

function performSearch() {
  if (!searchBar) return;
  const query = searchBar.value.toLowerCase().trim();
  let anyVisible = false;
  document.querySelectorAll('#trackList .track').forEach(track => {
    const title = track.querySelector('.track-title')?.textContent?.toLowerCase() || '';
    const artist = track.querySelector('.track-artist')?.textContent?.toLowerCase() || '';
    const match = (query === '' || title.includes(query) || artist.includes(query));
    track.parentElement.style.display = match ? 'block' : 'none';
    if (match) anyVisible = true;
  });
  if (noResults) noResults.style.display = anyVisible ? 'none' : 'block';
}

function checkTitleScrolling() {
  const title = songTitleInner;
  const container = title?.parentElement;
  if (!container) return;
  title.classList.remove('scrolling');
  setTimeout(() => {
    if (title.scrollWidth > container.offsetWidth) {
      title.classList.add('scrolling');
      const duration = Math.max(10, title.textContent.length * 0.5);
      title.style.animationDuration = `${duration}s`;
    }
  }, 100);
}

function downloadTrack(index) {
  const track = originalTracks[index];
  if (!track) return;
  const link = document.createElement('a');
  link.href = track.file;
  link.download = `${track.title} - ${track.artist}.${track.file.split('.').pop()}`;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showNotification(`Downloading "${track.title}"...`);
}

// ================== EVENT LISTENERS ==================
function setupEventListeners() {
  // Mini controls
  playBtn?.addEventListener('click', () => isPlaying ? pauseTrack() : playTrack());
  prevBtn?.addEventListener('click', () => {
    const currentTracks = isShuffled ? shuffledTracks : originalTracks;
    loadTrack((currentIndex - 1 + currentTracks.length) % currentTracks.length);
    playTrack();
  });
  nextBtn?.addEventListener('click', () => {
    const currentTracks = isShuffled ? shuffledTracks : originalTracks;
    loadTrack((currentIndex + 1) % currentTracks.length);
    playTrack();
  });
  shuffleBtn?.addEventListener('click', toggleShuffle);
  loopBtn?.addEventListener('click', toggleLoop);
  muteBtn?.addEventListener('click', toggleMute);
  downloadBtn?.addEventListener('click', () => downloadTrack(parseInt(downloadBtn.getAttribute('data-index') || '0')));
  volumeSlider?.addEventListener('input', (e) => updateVolume(e.target.value));

  // Big controls
  bigPlay?.addEventListener('click', () => isPlaying ? pauseTrack() : playTrack());
  bigPrev?.addEventListener('click', () => prevBtn?.click());
  bigNext?.addEventListener('click', () => nextBtn?.click());
  bigShuffle?.addEventListener('click', toggleShuffle);
  bigLoop?.addEventListener('click', toggleLoop);
  bigMuteBtn?.addEventListener('click', toggleMute);
  bigDownloadBtn?.addEventListener('click', () => downloadTrack(parseInt(bigDownloadBtn.getAttribute('data-index') || '0')));
  bigVolumeSlider?.addEventListener('input', (e) => updateVolume(e.target.value));

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      isPlaying ? pauseTrack() : playTrack();
    }
    if (e.code === 'ArrowUp') {
      e.preventDefault();
      volume = Math.min(100, volume + 10);
      updateVolume(volume);
    }
    if (e.code === 'ArrowDown') {
      e.preventDefault();
      volume = Math.max(0, volume - 10);
      updateVolume(volume);
    }
    if (e.code === 'KeyM' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      toggleMute();
    }
  });

  // HTML5 audio events
  audio.addEventListener('timeupdate', () => {
    if (!midiPlaying) {
      const cur = audio.currentTime;
      const dur = audio.duration;
      updateProgressUI(cur, dur);
    }
  });
  audio.addEventListener('loadedmetadata', () => {
    // Provide initial duration
    if (!isFinite(audio.duration)) return;
    updateProgressUI(audio.currentTime, audio.duration);
  });
  audio.addEventListener('ended', () => {
    if (!midiPlaying) {
      handleTrackEnd();
    }
  });

  // Seek bars
  const seekHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seekTo(ratio);
  };
  progress?.addEventListener('click', seekHandler);
  bigProgress?.addEventListener('click', seekHandler);

  // Big player open/close
  playerLeft?.addEventListener('click', () => bigPlayer?.classList.add('active'));
  closeBigPlayer?.addEventListener('click', () => bigPlayer?.classList.remove('active'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && bigPlayer?.classList.contains('active')) {
      bigPlayer.classList.remove('active');
    }
  });

  // Title scrolling
  window.addEventListener('resize', checkTitleScrolling);
  songTitleInner?.addEventListener('mouseenter', () => {
    if (songTitleInner.classList.contains('scrolling')) {
      songTitleInner.style.animationPlayState = 'paused';
    }
  });
  songTitleInner?.addEventListener('mouseleave', () => {
    if (songTitleInner.classList.contains('scrolling')) {
      songTitleInner.style.animationPlayState = 'running';
    }
  });

  // Search
  searchBar?.addEventListener('input', performSearch);
  performSearch();
}

// ================== STARTUP ==================
document.addEventListener('DOMContentLoaded', () => {
  initializePlayer();
  setupEventListeners();
  console.log('Music player initialized (with MIDI support).');
});