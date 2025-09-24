    const tracks = [
      {title:"Super Mario World - Wandering the Plains", artist:"Koji Kondo", file:"songs/savegameroom.mp3", cover:"covers/mario world.jpg"},
      {title:"Touhou Spell Bubble - Character Select", artist:"Masaki (ZUNTATA)", file:"songs/levelselector.mp3", cover:"covers/Touhou spell bubble.png"},
      {title:"Super Mario Yoshi Island - Ending", artist:"Koji Kondo", file:"songs/Ending.mp3", cover:"covers/Yoshi Island.png"},
      {title:"Super Mario Yoshi Island - Big Boss BGM", artist:"Koji Kondo", file:"songs/Intro 2.mp3", cover:"covers/Yoshi Island.png"},
	  {title:"Riot-11", artist:"Corrosion", file:"songs/riot-11.mp3", cover:"covers/art-placeholder.jpg"},
      {title:"Super Mario World - Overworld", artist:"Koji Kondo", file:"songs/Mario World - Overworld.mp3", cover:"covers/mario world.jpg"},
      {title:"Super Mario World - Underground", artist:"Koji Kondo", file:"songs/Mario World - Underground.mp3", cover:"covers/mario world.jpg"},
      {title:"Super Mario World - Athletic", artist:"Koji Kondo", file:"songs/Mario World - Athletic.mp3", cover:"covers/mario world.jpg"},
      {title:"Super Mario Yoshi Island - Castle & Fortress", artist:"Koji Kondo", file:"songs/Yoshi Island - Castle.mp3", cover:"covers/Yoshi Island.png"},
	  {title:"The Holiday Anthem", artist:"David Puentez", file:"songs/The Holiday Anthem.mp3", cover:"covers/art-placeholder.jpg"},
      {title:"Super Mario All-Stars - Swimming(Hurry Up)", artist:"Koji Kondo", file:"songs/Super Mario Bros All-Star- Underwater Sped up.mp3", cover:"covers/mario all-star.png"},
      {title:"Super Mario World - Haunted House", artist:"Koji Kondo", file:"songs/Haunted House.mp3", cover:"covers/mario world.jpg"},
	  {title:"One Fine Day...", artist:"Jussi-Matti Salmela (Elwood)", file:"songs/One Fine Day....mp3", cover:"covers/art-placeholder.jpg"},
      {title:"Super Mario Yoshi Island - Underground BGM", artist:"Koji Kondo", file:"songs/Yoshi Island - Underground.mp3", cover:"covers/Yoshi Island.png"},
      {title:"Super Mario All-Stars - Underground", artist:"Koji Kondo", file:"songs/Super Mario Bros All-Star - Underground.mp3", cover:"covers/mario all-star.png"},
	  {title:"Trancoi (UnFinished)", artist:"Martin Reiter (DIAC)", file:"songs/Trancoi (UnFinished).mp3", cover:"covers/art-placeholder.jpg"},
      {title:"Super Mario Yoshi Island - Aboveground", artist:"Koji Kondo", file:"songs/Yoshi Island - Aboveground.mp3", cover:"covers/Yoshi Island.png"},
      {title:"Super Mario World - Athletic(Yoshi)", artist:"Koji Kondo", file:"songs/Mario World - Athletic (Yoshi).mp3", cover:"covers/mario world.jpg"},
	  {title:"In The Kitchen", artist:"Matthew Simmonds (4Mat)", file:"songs/in_the_kitchen.mp3", cover:"covers/art-placeholder.jpg"},
      {title:"Rigit Obstacles", artist:"Virgill", file:"songs/Rigit Obstacles.mp3", cover:"covers/00000401.png"},
      {title:"Sirens", artist:"Dave the Brave", file:"songs/Fastrun 2.ogg", cover:"covers/art-placeholder.jpg"},
	  {title:"Yet Another Bonus", artist:"Matthew Simmonds (4Mat)", file:"songs/Yet Another Bonus.mp3", cover:"covers/art-placeholder.jpg"},
      {title:"Jaguar XJ220 - Speed-E-Boy", artist:"Martin Iveson", file:"songs/Yky.mp3", cover:"covers/jaguar_xj220_01.png"},
	  {title:"The Golden Ages", artist:"Matthew Simmonds (4Mat)", file:"songs/The Golden Ages.mp3", cover:"covers/art-placeholder.jpg"},
      {title:"Super Mario Yoshi Island - Flower Garden", artist:"Koji Kondo", file:"songs/Yoshi Island - Flower Garden.mp3", cover:"covers/Yoshi Island.png"},
	  {title:"Federation", artist:"Matthew Simmonds (4Mat)", file:"songs/Federation.mp3", cover:"covers/art-placeholder.jpg"},
      {title:"Apoplexy", artist:"Bee Hunter", file:"songs/Apoplexytanks.ogg", cover:"covers/600x600bf-60.jpg"},
      {title:"Super Mario Yoshi Island - Bowser", artist:"Koji Kondo", file:"songs/Yoshi Island - Final Boss.ogg", cover:"covers/Yoshi Island.png"},
      {title:"Super Mario World - Staff Roll", artist:"Koji Kondo", file:"songs/Mario World - Ending.mp3", cover:"covers/mario world.jpg"},
    ];

    let currentIndex = 0, isPlaying = false;
    const audio = document.getElementById('audioEl');
    const albumCover = document.getElementById('albumCover');
    const miniCover = document.getElementById('miniCover');
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progressBar');
    const thumb = document.getElementById('thumb');
    const curTime = document.getElementById('curTime');
    const durTime = document.getElementById('durTime');
    const trackList = document.getElementById('trackList');

    function loadTrack(i) {
      const t = tracks[i];
      currentIndex = i;
      audio.src = t.file;
      songTitle.textContent = t.title;
      songArtist.textContent = t.artist;
      albumCover.src = t.cover;
      miniCover.src = t.cover;
      document.querySelectorAll('.track').forEach(el=>el.classList.remove('active'));
      const active = document.querySelector(`.track[data-index="${i}"]`);
      if (active) active.classList.add('active');
    }
    function playTrack() { audio.play(); isPlaying=true; playBtn.textContent='❚❚'; }
    function pauseTrack() { audio.pause(); isPlaying=false; playBtn.textContent='▶'; }
    playBtn.addEventListener('click',()=>{isPlaying?pauseTrack():playTrack();});
    prevBtn.addEventListener('click',()=>{loadTrack((currentIndex-1+tracks.length)%tracks.length);playTrack();});
    nextBtn.addEventListener('click',()=>{loadTrack((currentIndex+1)%tracks.length);playTrack();});
    audio.addEventListener('timeupdate',()=>{
      if(audio.duration){
        const pct=(audio.currentTime/audio.duration)*100;
        progressBar.style.width=pct+"%"; thumb.style.left=pct+"%";
        curTime.textContent=formatTime(audio.currentTime);
        durTime.textContent=formatTime(audio.duration);
      }
    });
    progress.addEventListener('click',(e)=>{
      const rect=progress.getBoundingClientRect();
      const pct=(e.clientX-rect.left)/rect.width;
      audio.currentTime=pct*audio.duration;
    });
    function formatTime(sec){const m=Math.floor(sec/60);const s=Math.floor(sec%60).toString().padStart(2,"0");return `${m}:${s}`;}
    audio.addEventListener('ended',()=>{nextBtn.click();});
    tracks.forEach((t,i)=>{
      const div=document.createElement('div');
      div.className='track';
      div.dataset.index=i;
      div.innerHTML=`<img src="${t.cover}" alt="${t.title}"><div class="track-info"><div class="track-title">${t.title}</div><div class="track-artist">${t.artist}</div></div>`;
      div.addEventListener('click',()=>{loadTrack(i);playTrack();});
      trackList.appendChild(div);
    });
    loadTrack(currentIndex);

    // Firebase auth
    (function() {
      const signOutBtn = document.getElementById('signOutBtn');
      const userEmailSpan = document.getElementById('userEmail');
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          userEmailSpan.textContent = user.email || user.displayName || '';
          userEmailSpan.classList.remove('d-none');
          signOutBtn.classList.remove('d-none');
        } else {
          window.location.href = "Login.html";
        }
      });
      signOutBtn.addEventListener('click', function() {
        firebase.auth().signOut().then(() => {
          window.location.href = "Login.html";
        }).catch((err) => { alert("Sign out error: " + err.message); });
      });
    })();