// Function to play selected voice line
function playVoice(selectId, audioId) {
    const select = document.getElementById(selectId);
    const audio = document.getElementById(audioId);
    const selectedFile = select.value;

    // Set the audio source
    audio.src = selectedFile;

    // Show the audio player (optional)
    audio.style.display = 'block';

    // Play the audio
    audio.play().catch(error => {
        console.log('Playback failed:', error);
        // Auto-play might be blocked, but user interaction (click) should allow it
    });
}