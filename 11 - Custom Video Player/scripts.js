// Get our elements
const player        = document.querySelector('.player');
const video         = player.querySelector('.viewer');
const progress      = player.querySelector('.progress');
const progressBar   = player.querySelector('.progress__filled');
const toggle        = player.querySelector('.toggle');
const skipButtons   = player.querySelectorAll('[data-skip]');
const ranges        = player.querySelectorAll('.player__slider');


// Build out functions

function togglePlay() {
  // 'Advanced' way of building this function
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();

  // Normal way :D 
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  // Needs to understand how much it needs to be skipped
  console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // This can be simplified, because the name of the ranges are equal to the corresponding video properties
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  console.log(percent);
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  console.log(scrubTime);
  video.currentTime = scrubTime;
}

// Hook up event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown',  () => mousedown = true);
progress.addEventListener('mouseup',    () => mousedown = false);