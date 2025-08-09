document.addEventListener("DOMContentLoaded", function() {
  const changingText = document.querySelector(".changing-text");
  const phrases = ["Web App Development", "Graphic Design", "UI/UX Design", "Content Creation"];
  let phraseIndex = 0;
  let charIndex = 0;
  const typingSpeed = 90; // milliseconds per character
  const deletingSpeed = 50; // milliseconds per character
  const pauseTime = 1300; // pause before deleting

  function type() {
    if (charIndex < phrases[phraseIndex].length) {
      changingText.textContent += phrases[phraseIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, pauseTime);
    }
  }

  function erase() {
    if (charIndex > 0) {
      changingText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, deletingSpeed);
    } else {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, typingSpeed);
    }
  }

  // Start the typing animation
  setTimeout(type, 500);
});


document.addEventListener('DOMContentLoaded', (event) => {
  const loadingOverlay = document.getElementById('loading-overlay');
  const video = document.getElementById('bg-video');

  // Check if the video element exists before proceeding
  if (video) {
    // Show the loading overlay initially
    loadingOverlay.classList.remove('hidden');

    // Add an event listener to the video element
    video.addEventListener('canplaythrough', () => {
      // The video is ready to play. Add a short delay to allow the animation to play out.
      setTimeout(() => {
        loadingOverlay.classList.add('hidden'); // This adds the CSS class that hides the overlay
      }, 500); // Wait for 500ms before fading out
    });

    // This is a failsafe for videos that are already cached and load instantly.
    if (video.readyState >= 4) { // 4 is the value for have_enough_data
      loadingOverlay.classList.add('hidden');
    }
  }
});
