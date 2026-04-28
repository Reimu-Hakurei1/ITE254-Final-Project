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
  {title:"Atelier Iris ETERNAL MANA - Big Play Board", artist:"Ken Nakagawa, Daisuke Achiwa, and Akira Tsuchiya", file: "../songs/Atelier Iris ETERNAL MANA - Big Play Board.mp3", cover:"../covers/Atelier Iris ETERNAL MANA.jpg"},
  {title:"MegaMari - Marisa no Yabou - Boss Battle", artist:"Uni Akiyama", file: "../songs/MegaMari - Marisa no Yabou - Boss Battle.mp3", cover:"../covers/Megamari.jpg"},
  {title:"Oriental Sacred Place 2 - A Midnight Fairy Dance", artist:"Zun", file: "../songs/Oriental Sacred Place 2 - A Midnight Fairy Dance.mp3", cover:"../covers/Oriental Sacred Place 2.jpg"},
  {title:"Magical Astronomy - Greenwich in the Sky", artist:"Zun", file: "../songs/Magical Astronomy - Greenwich in the Sky.mp3", cover:"../covers/Magical Astronomy.jpg"},
  {title:"Touhou 6 The Embodiment of Scarlet Devil - Septette for the Dead Princess", artist:"Zun", file: "../songs/Septette for the Dead Princess.mp3", cover:"../covers/Th06cover.png"}
];

// ================== ELEMENTS ==================
let currentIndex = 0;
let isPlaying = false;
let isShuffled = false;
let isLooping = false;
let isMuted = false;
let volume = 100;
let originalTracks = []; // Will be populated from your existing tracks data
let shuffledTracks = [];

const audio = document.getElementById('audioEl');

// mini player elements
const albumCover = document.getElementById('albumCover');
const miniCover = document.getElementById('miniCover');
const songTitleInner = document.getElementById('songTitleInner');
const songArtist = document.getElementById('songArtist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const loopBtn = document.getElementById('loop');
const downloadBtn = document.getElementById('downloadBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const thumb = document.getElementById('thumb');
const curTime = document.getElementById('curTime');
const durTime = document.getElementById('durTime');

// big player elements
const playerLeft = document.querySelector('.player-left');
const bigPlayer = document.getElementById('bigPlayer');
const closeBigPlayer = document.getElementById('closeBigPlayer');
const bigPlayerCover = document.getElementById('bigPlayerCover');
const bigPlayerTitle = document.getElementById('bigPlayerTitle');
const bigPlayerArtist = document.getElementById('bigPlayerArtist');
const bigPlay = document.getElementById('bigPlay');
const bigPrev = document.getElementById('bigPrev');
const bigNext = document.getElementById('bigNext');
const bigShuffle = document.getElementById('bigShuffle');
const bigLoop = document.getElementById('bigLoop');
const bigDownloadBtn = document.getElementById('bigDownloadBtn');
const bigMuteBtn = document.getElementById('bigMuteBtn');
const bigVolumeSlider = document.getElementById('bigVolumeSlider');
const bigProgress = document.getElementById('bigProgress');
const bigProgressBar = document.getElementById('bigProgressBar');
const bigThumb = document.getElementById('bigThumb');
const bigCurTime = document.getElementById('bigCurTime');
const bigDurTime = document.getElementById('bigDurTime');

// misc elements
const trackList = document.getElementById('trackList');
const noResults = document.getElementById('noResults');
const searchBar = document.getElementById('searchBar');

// ================== INITIALIZATION ==================
function initializePlayer() {
    // Get tracks from your existing tracks data
    // Make sure you have a global 'tracks' array defined somewhere
    if (typeof tracks !== 'undefined' && Array.isArray(tracks)) {
        originalTracks = [...tracks];
        buildTrackList();
        loadTrack(0);
    } else {
        console.error('Tracks data not found. Make sure you have a global "tracks" array.');
        // Fallback: show error message
        trackList.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Error: Music tracks not found.</p></div>';
    }
}

// ================== FUNCTIONS ==================
function loadTrack(i) {
    const currentTracks = isShuffled ? shuffledTracks : originalTracks;
    
    if (!currentTracks || currentTracks.length === 0) {
        console.error('No tracks available');
        return;
    }
    
    // Ensure index is within bounds
    if (i < 0) i = 0;
    if (i >= currentTracks.length) i = currentTracks.length - 1;
    
    const t = currentTracks[i];
    
    if (!t || !t.file) {
        console.error('Invalid track data at index', i);
        return;
    }
    
    // Find the original index for download
    const originalIndex = originalTracks.findIndex(track => 
        track.title === t.title && track.artist === t.artist
    );
    
    currentIndex = i;
    audio.src = t.file;
    audio.volume = volume / 100;

    // mini player
    songTitleInner.textContent = t.title || 'Unknown Title';
    songArtist.textContent = t.artist || 'Unknown Artist';
    albumCover.src = t.cover || '../covers/default.jpg';
    miniCover.src = t.cover || '../covers/default.jpg';

    // big player
    bigPlayerCover.src = t.cover || '../covers/default.jpg';
    bigPlayerTitle.textContent = t.title || 'Unknown Title';
    bigPlayerArtist.textContent = t.artist || 'Unknown Artist';

    // Set download button data
    if (downloadBtn) downloadBtn.setAttribute('data-index', originalIndex);
    if (bigDownloadBtn) bigDownloadBtn.setAttribute('data-index', originalIndex);

    // Check if song title needs horizontal scrolling
    checkTitleScrolling();

    // highlight active track
    document.querySelectorAll('.track').forEach(el => el.classList.remove('active'));
    const active = document.querySelector(`.track[data-index="${originalIndex}"]`);
    if (active) active.classList.add('active');
    
    // Auto-play if was playing before
    if (isPlaying) {
        playTrack();
    }
}

function downloadTrack(index) {
    if (!originalTracks || !originalTracks[index]) {
        console.error('Invalid track index for download:', index);
        return;
    }
    
    const track = originalTracks[index];
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = track.file;
    link.download = `${track.title} - ${track.artist}.mp3`.replace(/[^\w\s.-]/gi, '');
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show notification
    showNotification(`Downloading "${track.title}"...`);
}

function showNotification(message) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #1DB954;
        color: #000;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10001;
        font-weight: 600;
        box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6);
        animation: fadeInOut 3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

function checkTitleScrolling() {
    const titleElement = songTitleInner;
    const container = titleElement.parentElement;
    
    if (!container) return;
    
    // Reset animation
    titleElement.classList.remove('scrolling');
    
    // Check if text is wider than container
    setTimeout(() => {
        const titleWidth = titleElement.scrollWidth;
        const containerWidth = container.offsetWidth;
        
        if (titleWidth > containerWidth) {
            // Text is too long, add scrolling animation
            titleElement.classList.add('scrolling');
            
            // Calculate animation duration based on text length
            const textLength = titleElement.textContent.length;
            const duration = Math.max(10, textLength * 0.5);
            titleElement.style.animationDuration = `${duration}s`;
        }
    }, 100);
}

function playTrack() {
    if (!audio.src) return;
    
    audio.play().then(() => {
        isPlaying = true;
        if (playBtn) playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        if (bigPlay) bigPlay.innerHTML = '<i class="bi bi-pause-fill"></i>';
    }).catch(error => {
        console.error('Play error:', error);
        isPlaying = false;
    });
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    if (playBtn) playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    if (bigPlay) bigPlay.innerHTML = '<i class="bi bi-play-fill"></i>';
}

function toggleShuffle() {
    isShuffled = !isShuffled;
    
    if (isShuffled) {
        // Create shuffled array
        shuffledTracks = [...originalTracks].sort(() => Math.random() - 0.5);
        if (shuffleBtn) {
            shuffleBtn.classList.add('active');
            shuffleBtn.title = 'Shuffle: ON';
        }
        if (bigShuffle) {
            bigShuffle.classList.add('active');
            bigShuffle.title = 'Shuffle: ON';
        }
    } else {
        if (shuffleBtn) {
            shuffleBtn.classList.remove('active');
            shuffleBtn.title = 'Shuffle';
        }
        if (bigShuffle) {
            bigShuffle.classList.remove('active');
            bigShuffle.title = 'Shuffle';
        }
    }
    
    // Update current index in shuffled array
    if (isShuffled) {
        const currentTrack = originalTracks[currentIndex];
        const newIndex = shuffledTracks.findIndex(t => 
            t.title === currentTrack.title && t.artist === currentTrack.artist
        );
        if (newIndex !== -1) {
            currentIndex = newIndex;
        }
    }
}

function toggleLoop() {
    isLooping = !isLooping;
    
    if (isLooping) {
        if (loopBtn) {
            loopBtn.classList.add('active');
            loopBtn.title = 'Loop: ON';
        }
        if (bigLoop) {
            bigLoop.classList.add('active');
            bigLoop.title = 'Loop: ON';
        }
        audio.loop = true;
    } else {
        if (loopBtn) {
            loopBtn.classList.remove('active');
            loopBtn.title = 'Loop';
        }
        if (bigLoop) {
            bigLoop.classList.remove('active');
            bigLoop.title = 'Loop';
        }
        audio.loop = false;
    }
}

function toggleMute() {
    isMuted = !isMuted;
    
    if (isMuted) {
        audio.volume = 0;
        if (muteBtn) muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        if (bigMuteBtn) bigMuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        if (volumeSlider) volumeSlider.value = 0;
        if (bigVolumeSlider) bigVolumeSlider.value = 0;
    } else {
        audio.volume = volume / 100;
        const icon = volume > 0 ? 'fa-volume-up' : 'fa-volume-off';
        if (muteBtn) muteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        if (bigMuteBtn) bigMuteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        if (volumeSlider) volumeSlider.value = volume;
        if (bigVolumeSlider) bigVolumeSlider.value = volume;
    }
}

function updateVolume(value) {
    volume = parseInt(value);
    isMuted = volume === 0;
    
    if (!isMuted) {
        audio.volume = volume / 100;
        const icon = volume > 0 ? 'fa-volume-up' : 'fa-volume-off';
        if (muteBtn) muteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        if (bigMuteBtn) bigMuteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        if (volumeSlider) {
            volumeSlider.value = volume;
            // Update CSS variable for filled track
            volumeSlider.style.setProperty('--volume-percent', `${volume}%`);
        }
        if (bigVolumeSlider) {
            bigVolumeSlider.value = volume;
            // Update CSS variable for filled track
            bigVolumeSlider.style.setProperty('--volume-percent', `${volume}%`);
        }
    } else {
        if (muteBtn) muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        if (bigMuteBtn) bigMuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        if (volumeSlider) {
            volumeSlider.value = 0;
            volumeSlider.style.setProperty('--volume-percent', '0%');
        }
        if (bigVolumeSlider) {
            bigVolumeSlider.value = 0;
            bigVolumeSlider.style.setProperty('--volume-percent', '0%');
        }
    }
    
    if (!isMuted) {
        audio.volume = volume / 100;
        const icon = volume > 0 ? 'fa-volume-up' : 'fa-volume-off';
        if (muteBtn) muteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        if (bigMuteBtn) bigMuteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    } else {
        if (muteBtn) muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        if (bigMuteBtn) bigMuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function formatTime(sec) {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

function buildTrackList() {
    if (!trackList || !originalTracks || originalTracks.length === 0) {
        console.error('Cannot build track list: missing tracks or trackList element');
        return;
    }
    
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
        
        const trackElement = col.querySelector('.track');
        const downloadBtn = col.querySelector('.track-download-btn');
        
        trackElement.addEventListener('click', () => {
            loadTrack(i);
            playTrack();
        });
        
        // Add download functionality
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                downloadTrack(i);
            });
        }
        
        trackList.appendChild(col);
    });
}

function performSearch() {
    if (!searchBar) return;
    
    const query = searchBar.value.toLowerCase();
    let anyVisible = false;
    
    document.querySelectorAll('#trackList .track').forEach(track => {
        const title = track.querySelector('.track-title')?.textContent?.toLowerCase() || '';
        const artist = track.querySelector('.track-artist')?.textContent?.toLowerCase() || '';
        
        if (title.includes(query) || artist.includes(query)) {
            track.parentElement.style.display = 'block';
            anyVisible = true;
        } else {
            track.parentElement.style.display = 'none';
        }
    });
    
    if (noResults) {
        noResults.style.display = anyVisible ? 'none' : 'block';
    }
}

// ================== EVENT LISTENERS ==================
function setupEventListeners() {
    // mini controls
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            isPlaying ? pauseTrack() : playTrack();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const currentTracks = isShuffled ? shuffledTracks : originalTracks;
            loadTrack((currentIndex - 1 + currentTracks.length) % currentTracks.length); 
            playTrack();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentTracks = isShuffled ? shuffledTracks : originalTracks;
            loadTrack((currentIndex + 1) % currentTracks.length); 
            playTrack();
        });
    }
    
    if (shuffleBtn) shuffleBtn.addEventListener('click', toggleShuffle);
    if (loopBtn) loopBtn.addEventListener('click', toggleLoop);
    if (muteBtn) muteBtn.addEventListener('click', toggleMute);
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const index = parseInt(downloadBtn.getAttribute('data-index') || '0');
            downloadTrack(index);
        });
    }
    
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            updateVolume(e.target.value);
        });
    }
    
    // big controls
    if (bigPlay) {
        bigPlay.addEventListener('click', () => {
            isPlaying ? pauseTrack() : playTrack();
        });
    }
    
    if (bigPrev) bigPrev.addEventListener('click', () => prevBtn?.click());
    if (bigNext) bigNext.addEventListener('click', () => nextBtn?.click());
    if (bigShuffle) bigShuffle.addEventListener('click', toggleShuffle);
    if (bigLoop) bigLoop.addEventListener('click', toggleLoop);
    if (bigMuteBtn) bigMuteBtn.addEventListener('click', toggleMute);
    
    if (bigDownloadBtn) {
        bigDownloadBtn.addEventListener('click', () => {
            const index = parseInt(bigDownloadBtn.getAttribute('data-index') || '0');
            downloadTrack(index);
        });
    }
    
    if (bigVolumeSlider) {
        bigVolumeSlider.addEventListener('input', (e) => {
            updateVolume(e.target.value);
        });
    }
    
    // keyboard controls
    document.addEventListener('keydown', e => {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            isPlaying ? pauseTrack() : playTrack();
        }
        
        // Arrow keys for volume
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            volume = Math.min(100, volume + 10);
            updateVolume(volume);
            if (volumeSlider) volumeSlider.value = volume;
            if (bigVolumeSlider) bigVolumeSlider.value = volume;
        }
        
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            volume = Math.max(0, volume - 10);
            updateVolume(volume);
            if (volumeSlider) volumeSlider.value = volume;
            if (bigVolumeSlider) bigVolumeSlider.value = volume;
        }
        
        // M for mute
        if (e.code === 'KeyM' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            toggleMute();
        }
    });
    
    // time update sync
    audio.addEventListener('timeupdate', () => {
        if (audio.duration && !isNaN(audio.duration)) {
            const pct = (audio.currentTime / audio.duration) * 100;
            if (progressBar) progressBar.style.width = pct + "%";
            if (thumb) thumb.style.left = pct + "%";
            if (bigProgressBar) bigProgressBar.style.width = pct + "%";
            if (bigThumb) bigThumb.style.left = pct + "%";
            if (curTime) curTime.textContent = formatTime(audio.currentTime);
            if (durTime) durTime.textContent = formatTime(audio.duration);
            if (bigCurTime) bigCurTime.textContent = formatTime(audio.currentTime);
            if (bigDurTime) bigDurTime.textContent = formatTime(audio.duration);
        }
    });
    
    // seek
    if (progress) {
        progress.addEventListener('click', e => {
            const rect = progress.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pct * audio.duration;
        });
    }
    
    if (bigProgress) {
        bigProgress.addEventListener('click', e => {
            const rect = bigProgress.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pct * audio.duration;
        });
    }
    
    // autoplay next (if not looping)
    audio.addEventListener('ended', () => {
        if (!isLooping) {
            nextBtn?.click();
        }
    });
    
    // search
    if (searchBar) {
        searchBar.addEventListener('input', performSearch);
    }
    
    // big player open/close
    if (playerLeft) {
        playerLeft.addEventListener('click', () => {
            if (bigPlayer) bigPlayer.classList.add('active');
        });
    }
    
    if (closeBigPlayer) {
        closeBigPlayer.addEventListener('click', () => {
            if (bigPlayer) bigPlayer.classList.remove('active');
        });
    }
    
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && bigPlayer && bigPlayer.classList.contains('active')) {
            bigPlayer.classList.remove('active');
        }
    });
    
    // Check scrolling on window resize
    window.addEventListener('resize', checkTitleScrolling);
    
    // Pause scrolling when hovering over title for better UX
    if (songTitleInner) {
        songTitleInner.addEventListener('mouseenter', () => {
            if (songTitleInner.classList.contains('scrolling')) {
                songTitleInner.style.animationPlayState = 'paused';
            }
        });
        
        songTitleInner.addEventListener('mouseleave', () => {
            if (songTitleInner.classList.contains('scrolling')) {
                songTitleInner.style.animationPlayState = 'running';
            }
        });
    }
    
    // Initial search to hide "No results found" when there are tracks
    performSearch();
}


// ================== INITIALIZE EVERYTHING ==================
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all elements are loaded
    setTimeout(() => {
        initializePlayer();
        setupEventListeners();
        
        // Initialize volume
        audio.volume = volume / 100;
        
        console.log('Music player initialized successfully');
    }, 100);
});

// Make sure the audio element exists and is accessible
if (audio) {
    audio.addEventListener('error', function(e) {
        console.error('Audio loading error:', e);
        showNotification('Error loading audio file');
    });
    
    audio.addEventListener('canplay', function() {
        console.log('Audio can play');
    });
}