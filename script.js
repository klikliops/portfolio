document.addEventListener("DOMContentLoaded", function() {

  // === Register the GSAP ScrollTrigger plugin ===
  gsap.registerPlugin(ScrollTrigger);

  // === Initial Setup ===
  const loadingOverlay = document.getElementById('loading-overlay');
  const loadingLogo = document.getElementById('loading-logo');
  const changingText = document.querySelector(".changing-text");
  
  const phrases = ["Web App Development", "Graphic Design", "UI/UX Design", "Content Creation"];
  let phraseIndex = 0;
  let charIndex = 0;
  const typingSpeed = 90;
  const deletingSpeed = 50;
  const pauseTime = 1300;

  // Set the initial state of elements to be hidden
  gsap.set("header, .hero h1, .hero h2, .hero-container h3, .hero button, .social-icons a, .about-card, #projects", {
    y: 50,
    opacity: 0
  });

  // === Initial Page Load Animations ===
  const mainPageTimeline = gsap.timeline({
    delay: 0.5
  });

  // 1. Animate the loading logo and overlay
  if (loadingLogo) {
    mainPageTimeline.to(loadingLogo, { duration: 1.2, scale: 0.5, opacity: 0, ease: "power2.inOut" });
  }

  if (loadingOverlay) {
    mainPageTimeline.to(loadingOverlay, {
      duration: 1,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => { loadingOverlay.style.display = 'none'; }
    }, "-=0.5");
  }

  // 2. Animate the header and hero content on page load
  mainPageTimeline.to("header", {
    duration: 1.2,
    y: 0,
    opacity: 1,
    ease: "power2.out"
  }, ">");

  mainPageTimeline.to(".hero h1, .hero h2", {
    duration: 0.8,
    y: 0,
    opacity: 1,
    stagger: 0.2,
    ease: "power2.out"
  }, "-=0.5");

  mainPageTimeline.to(".hero-container h3, .hero button", {
    duration: 0.8,
    y: 0,
    opacity: 1,
    stagger: 0.2,
    ease: "power2.out"
  }, "-=0.5");

  mainPageTimeline.to(".social-icons a", {
    duration: 0.6,
    scale: 1,
    y: 0,
    opacity: 1,
    stagger: 0.1,
    ease: "back.out(1.7)"
  }, "-=0.3");

  // 3. Start the typing animation after initial animations
  mainPageTimeline.call(type, null, "+=0.5");


  // === Horizontal Scroll Animation (Updated) ===
  const horizontalSection = document.querySelector(".horizontal-scroll-section");
  const scrollContainer = document.querySelector(".horizontal-scroll-container");
  
  if (horizontalSection && scrollContainer) {
    const cards = gsap.utils.toArray('.horizontal-scroll-section > *');
    const firstCard = cards[0];
    const lastCard = cards[cards.length - 1];

    // Calculate initial offset to center the first card
    const firstCardWidth = firstCard.offsetWidth;
    const startOffset = (scrollContainer.offsetWidth / 2) - (firstCardWidth / 2);

    // Calculate the final scroll position to center the last card
    const lastCardWidth = lastCard.offsetWidth;
    const totalWidth = horizontalSection.scrollWidth;
    const endOffset = (scrollContainer.offsetWidth / 2) - (lastCardWidth / 2);
    const scrollDistance = totalWidth - scrollContainer.offsetWidth;

    gsap.fromTo(horizontalSection, {
      x: startOffset
    }, {
      x: -(scrollDistance + endOffset),
      ease: "none",
      scrollTrigger: {
        trigger: ".about", // Trigger on the entire section
        start: "center center",
        pin: true, // Pin the entire section
        scrub: 1,
        end: () => "+=" + (scrollDistance + startOffset + endOffset),
        toggleActions: "play pause resume reset",
      }
    });
  }

  // === Typing Animation Functions (unchanged) ===
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
});
