const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');

// Play the audio as soon as the page loads (optional)
audio.play();

// Update progress bar and current time
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    // Update the progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + '%';

    // Update the current time display
    currentTimeElement.textContent = formatTime(currentTime);
});

// Update the duration when the metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    durationElement.textContent = formatTime(audio.duration);
});

// Format time in minutes and seconds
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Optional: Click on progress bar to change audio current time
progressBar.addEventListener('click', (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    // Set the new current time based on the clicked position
    audio.currentTime = (clickX / width) * duration;
});