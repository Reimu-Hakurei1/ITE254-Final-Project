// ---------- LEVEL DATA ----------
const categories = [
  { id: "story", name: "Story", levels: ["Story"], music: "../songs/Ending.mp3", basePath: "../Mario Forever/Story/Story/index.html", single: true },
  { id: "world1", name: "World 1", levels: ["1-1","1-2","1-3","1-4"], music: "../songs/riot-11.mp3", basePath: "../Mario Forever/World 1/World " },
  { id: "world2", name: "World 2", levels: ["2-1","2-2","2-3","2-4","2-5"], music: "../songs/The Holiday Anthem.mp3", basePath: "../Mario Forever/World 2/World " },
  { id: "world3", name: "World 3", levels: ["3-1","3-2","3-3","3-4"], music: "../songs/One Fine Day....mp3", basePath: "../Mario Forever/World 3/World " },
  { id: "world4", name: "World 4", levels: ["4-1","4-2","4-3","4-4"], music: "../songs/Trancoi (UnFinished).mp3", basePath: "../Mario Forever/World 4/World " },
  { id: "world5", name: "World 5", levels: ["5-1","5-2","5-3"], music: "../songs/in_the_kitchen.mp3", basePath: "../Mario Forever/World 5/World " },
  { id: "world6", name: "World 6", levels: ["6-1","6-2","6-3","6-4"], music: "../songs/Yet Another Bonus.mp3", basePath: "../Mario Forever/World 6/World " },
  { id: "world7", name: "World 7", levels: ["7-1","7-2","7-3","7-4"], music: "../songs/The Golden Ages.mp3", basePath: "../Mario Forever/World 7/World " },
  { id: "world8", name: "World 8", levels: ["8-1","8-2","8-3","8-4"], music: "../songs/Federation.mp3", basePath: "../Mario Forever/World 8/World " },
  { id: "ending", name: "Ending", levels: ["Ending"], music: "../songs/Mario World - Ending.mp3", basePath: "../Mario Forever/Ending/Ending/index.html", single: true },
  { id: "humanlab", name: "Human Laboratory", levels: ["Level 1","Level 2","Level 3","Level 4","Level 5"], music: "../songs/08 - Alien Power.mp3", basePath: "../Mario Forever/Human Lab/Level " },
  { id: "extra", name: "Extra", levels: ["Goomba Party","Funny Tank?"], music: "../songs/kaupunki.mp3", basePath: "../Mario Forever/Extra/", multi: true },
  { id: "original", name: "Original Level", levels: ["Icy Castle","Icy Snowy Night","Stormy Snowy Tank","Remilia Scarlet"], music: "../songs/05. 夢幻能 ～ Taboo Marionette.flac", basePath: "../Mario Forever/Original Level/" }
];

// ---------- SCREENSHOT PATHS (use normalized keys: lowercase, spaces→_ , remove special chars) ----------
const levelScreenshots = {
  // World 1
  "world1-1": "../screenshots/world1/1-1.png",
  "world1-2": "../screenshots/world1/1-2.png",
  "world1-3": "../screenshots/world1/1-3.png",
  "world1-4": "../screenshots/world1/1-4.png",
  
  // World 2
  "world2-1": "../screenshots/world2/2-1.png",
  "world2-2": "../screenshots/world2/2-2.png",
  "world2-3": "../screenshots/world2/2-3.png",
  "world2-4": "../screenshots/world2/2-4.png",
  "world2-5": "../screenshots/world2/2-5.png",
  
  // World 3
  "world3-1": "../screenshots/world3/3-1.png",
  "world3-2": "../screenshots/world3/3-2.png",
  "world3-3": "../screenshots/world3/3-3.png",
  "world3-4": "../screenshots/world3/3-4.png",
  
  // World 4
  "world4-1": "../screenshots/world4/4-1.png",
  "world4-2": "../screenshots/world4/4-2.png",
  "world4-3": "../screenshots/world4/4-3.png",
  "world4-4": "../screenshots/world4/4-4.png",
  
  // World 5
  "world5-1": "../screenshots/world5/5-1.png",
  "world5-2": "../screenshots/world5/5-2.png",
  "world5-3": "../screenshots/world5/5-3.png",
  
  // World 6
  "world6-1": "../screenshots/world6/6-1.png",
  "world6-2": "../screenshots/world6/6-2.png",
  "world6-3": "../screenshots/world6/6-3.png",
  "world6-4": "../screenshots/world6/6-4.png",
  
  // World 7
  "world7-1": "../screenshots/world7/7-1.png",
  "world7-2": "../screenshots/world7/7-2.png",
  "world7-3": "../screenshots/world7/7-3.png",
  "world7-4": "../screenshots/world7/7-4.png",
  
  // World 8
  "world8-1": "../screenshots/world8/8-1.png",
  "world8-2": "../screenshots/world8/8-2.png",
  "world8-3": "../screenshots/world8/8-3.png",
  "world8-4": "../screenshots/world8/8-4.png",
  
  // Story
  "story": "../screenshots/story/story.png",
  
  // Ending
  "ending": "../screenshots/ending/ending.png",
  
  // Human Laboratory
  "humanlab-level_1": "../screenshots/humanlab/Level_1.png",
  "humanlab-level_2": "../screenshots/humanlab/Level_2.png",
  "humanlab-level_3": "../screenshots/humanlab/Level_3.png",
  "humanlab-level_4": "../screenshots/humanlab/Level_4.png",
  "humanlab-level_5": "../screenshots/humanlab/Level_5.png",
  
  // Extra
  "extra-goomba_party": "../screenshots/extra/goomba_party.png",
  "extra-funny_tank": "../screenshots/extra/funny_tank.png",
  
  // Original Levels
  "original-icy_castle": "../screenshots/original/Icy_Castle.png",
  "original-icy_snowy_night": "../screenshots/original/Icy_Snowy_Night.png",
  "original-stormy_snowy_tank": "../screenshots/original/Stormy_Snowy_Tank.png",
  "original-remilia_scarlet": "../screenshots/original/Remilia_Scarlet.png"
};

// Helper: normalize a level name for the screenshot key
function normalizeName(name) {
  return name.toLowerCase()
    .replace(/[?]/g, '')       
    .replace(/\s+/g, '_')      
    .replace(/-/g, '_');       
}

// ---------- SCREENSHOT LOOKUP ----------
function getLevelImageUrl(categoryId, levelName) {
  let key = "";
  if (categoryId.startsWith("world")) {
    // levelName is like "1-1" → "world1-1"
    key = "world" + levelName;
  } else if (categoryId === "story") {
    key = "story";
  } else if (categoryId === "ending") {
    key = "ending";
  } else if (categoryId === "humanlab") {
    // levelName: "Level 1" → "humanlab-level_1"
    const num = levelName.split(' ')[1];
    key = `humanlab-level_${num}`;
  } else if (categoryId === "extra") {
    const normalized = normalizeName(levelName);
    key = `extra-${normalized}`;
  } else if (categoryId === "original") {
    const normalized = normalizeName(levelName);
    key = `original-${normalized}`;
  }
  return levelScreenshots[key] || "";
}

// ---------- HIDDEN IFRAME (Background Music) ----------
const iframe = document.getElementById('hidden-frame');
const IFRAME_SRC = "../levelselector/index.html";

function startGridMusic() {
  if (!iframe) return;
  iframe.src = IFRAME_SRC;
}

function stopGridMusic() {
  if (!iframe) return;
  iframe.src = "about:blank";
}

// ---------- WORLD MUSIC ----------
let worldAudio = null;

function playWorldMusic(category) {
  stopWorldMusic();
  if (category.music) {
    worldAudio = new Audio(category.music);
    worldAudio.loop = true;
    worldAudio.volume = 0.5;
    worldAudio.play().catch(e => console.log("World music error:", e));
  }
}

function stopWorldMusic() {
  if (worldAudio) {
    worldAudio.pause();
    worldAudio.currentTime = 0;
    worldAudio = null;
  }
}

// ---------- TAB VISIBILITY HANDLER ----------
let wasPlayingBeforeHidden = false;

function handleVisibilityChange() {
  if (document.hidden) {
    if (worldAudio && !worldAudio.paused) {
      wasPlayingBeforeHidden = true;
      worldAudio.pause();
    } else {
      wasPlayingBeforeHidden = false;
    }
  } else {
    if (wasPlayingBeforeHidden && worldAudio) {
      worldAudio.play().catch(e => console.log("Resume error:", e));
      wasPlayingBeforeHidden = false;
    }
  }
}

document.addEventListener('visibilitychange', handleVisibilityChange);

// ---------- LEVEL URL BUILDER (fixed for Extra) ----------
function getLevelUrl(category, levelIndex) {
  const cat = category;
  const levelName = cat.levels[levelIndex];
  if (cat.id === "story") return cat.basePath;
  if (cat.id === "ending") return cat.basePath;
  if (cat.id === "original") {
    const folderMap = {
      "Icy Castle": "Icy Castle",
      "Icy Snowy Night": "Icy Snowy Night",
      "Stormy Snowy Tank": "Stormy Snowy Tank",
      "Remilia Scarlet": "Remilia"
    };
    const folder = folderMap[levelName] || levelName.replace(/ /g, '');
    return `../Mario Forever/Original Level/${folder}/index.html`;
  }
  if (cat.id === "humanlab") {
    const num = levelIndex + 1;
    return `../Mario Forever/Human Lab/Level ${num}/index.html`;
  }
  if (cat.id === "extra") {
    let folder = levelName.replace(/[?]/g, '').replace(/\s+/g, '');
    const cleanName = levelName.replace(/[?]/g, '').trim();
    return `../Mario Forever/Extra/${cleanName}/index.html`;
  }
  // worlds
  const levelCode = cat.levels[levelIndex];
  return `${cat.basePath}${levelCode}/index.html`;
}

// ---------- DOM ELEMENTS ----------
const worldGridDiv = document.getElementById('worldGrid');
const slideshowDiv = document.getElementById('slideshowView');
const categoriesContainer = document.getElementById('categoriesContainer');
const slideshowTitle = document.getElementById('slideshowTitle');
const levelImage = document.getElementById('levelImage');
const levelNameDisplay = document.getElementById('levelNameDisplay');
const playLevelLink = document.getElementById('playLevelLink');
const slideIndicators = document.getElementById('slideIndicators');

let currentCategory = null;
let currentIndex = 0;

// ---------- UPDATE SLIDESHOW ----------
function updateSlideshow() {
  if (!currentCategory) return;
  const levelName = currentCategory.levels[currentIndex];

  if (currentCategory.id.startsWith("world")) {
    slideshowTitle.innerText = `World ${levelName}`;
  } else {
    slideshowTitle.innerText = currentCategory.name;
  }

  levelNameDisplay.innerText = levelName;

  const imageUrl = getLevelImageUrl(currentCategory.id, levelName);
  levelImage.src = imageUrl;
  levelImage.alt = `${currentCategory.name} - ${levelName}`;

  const levelUrl = getLevelUrl(currentCategory, currentIndex);
  playLevelLink.href = levelUrl;

  let indicatorsHtml = '';
  for (let i = 0; i < currentCategory.levels.length; i++) {
    indicatorsHtml += `<span class="${i === currentIndex ? 'active' : ''}"></span>`;
  }
  slideIndicators.innerHTML = indicatorsHtml;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < currentCategory.levels.length - 1;
  const prevBtns = [document.getElementById('prevLevelBtn'), document.getElementById('prevLevelBtnMobile')];
  const nextBtns = [document.getElementById('nextLevelBtn'), document.getElementById('nextLevelBtnMobile')];
  prevBtns.forEach(btn => { if (btn) { btn.style.opacity = hasPrev ? '1' : '0.3'; btn.style.pointerEvents = hasPrev ? 'auto' : 'none'; } });
  nextBtns.forEach(btn => { if (btn) { btn.style.opacity = hasNext ? '1' : '0.3'; btn.style.pointerEvents = hasNext ? 'auto' : 'none'; } });
}

function nextLevel() {
  if (currentCategory && currentIndex < currentCategory.levels.length - 1) {
    currentIndex++;
    updateSlideshow();
  }
}

function prevLevel() {
  if (currentCategory && currentIndex > 0) {
    currentIndex--;
    updateSlideshow();
  }
}

function showSlideshow(category) {
  currentCategory = category;
  currentIndex = 0;
  worldGridDiv.classList.add('hide-grid');
  slideshowDiv.classList.remove('hide-slideshow');
  updateSlideshow();
  stopGridMusic();
  playWorldMusic(category);
}

function backToGrid() {
  worldGridDiv.classList.remove('hide-grid');
  slideshowDiv.classList.add('hide-slideshow');
  stopWorldMusic();
  startGridMusic();
  currentCategory = null;
}

// ---------- CARD COLORS ----------
function getCardBackgroundColor(id) {
  const colors = {
    world1: "#2e7d32", world2: "#4fc3f7", world3: "#9c27b0", world4: "#e0e0e0",
    world5: "#ff8c42", world6: "#43a047", world7: "#1e88e5", world8: "#757575",
    story: "#1976d2", ending: "#f5f5f5", humanlab: "#388e3c", extra: "#9e9e9e", original: "#81d4fa"
  };
  return colors[id] || "#2c3e50";
}

function getTextColor(bgColor) {
  const hex = bgColor.substring(1);
  const r = parseInt(hex.substr(0,2), 16);
  const g = parseInt(hex.substr(2,2), 16);
  const b = parseInt(hex.substr(4,2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
  return luminance > 180 ? "#1a1a2e" : "#ffffff";
}

function renderGrid() {
  categoriesContainer.innerHTML = '';
  categories.forEach(cat => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    const card = document.createElement('div');
    card.className = 'category-card card h-100 text-center p-4';
    const bgColor = getCardBackgroundColor(cat.id);
    const textColor = getTextColor(bgColor);
    card.style.background = bgColor;
    card.style.color = textColor;
    card.style.border = 'none';
    card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';

    let icon = '';
    if (cat.id.includes('world')) icon = '🌍';
    else if (cat.id === 'story') icon = '📖';
    else if (cat.id === 'ending') icon = '🏆';
    else if (cat.id === 'humanlab') icon = '🧪';
    else if (cat.id === 'extra') icon = '🎁';
    else if (cat.id === 'original') icon = '✨';
    else icon = '🎮';

    card.innerHTML = `
      <div class="category-icon" style="color:${textColor}">${icon}</div>
      <h3 class="fw-bold" style="color:${textColor}">${cat.name}</h3>
      <p style="color:${textColor}; opacity:0.9">${cat.levels.length} level${cat.levels.length !== 1 ? 's' : ''}</p>
      <span class="badge bg-dark text-white mt-2" style="background:rgba(0,0,0,0.5) !important">Click to explore →</span>
    `;
    card.addEventListener('click', () => showSlideshow(cat));
    col.appendChild(card);
    categoriesContainer.appendChild(col);
  });
}

// ---------- INITIALIZE (Music starts automatically) ----------
document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  slideshowDiv.classList.add('hide-slideshow');
  worldGridDiv.classList.remove('hide-grid');
  startGridMusic();

  const backBtn = document.getElementById('backToGridBtn');
  if (backBtn) backBtn.addEventListener('click', backToGrid);

  const prevBtn = document.getElementById('prevLevelBtn');
  const nextBtn = document.getElementById('nextLevelBtn');
  const prevBtnMobile = document.getElementById('prevLevelBtnMobile');
  const nextBtnMobile = document.getElementById('nextLevelBtnMobile');

  if (prevBtn) prevBtn.addEventListener('click', prevLevel);
  if (nextBtn) nextBtn.addEventListener('click', nextLevel);
  if (prevBtnMobile) prevBtnMobile.addEventListener('click', prevLevel);
  if (nextBtnMobile) nextBtnMobile.addEventListener('click', nextLevel);
});