document.addEventListener('DOMContentLoaded', () => {
    // Replace 'your-sound-file.mp3' with the path to your sound file.
    const audio = new Audio('your-sound-file.mp3');
    let hasScrolled = false;

    const playSound = () => {
        // Play the sound
        audio.play();
    };

    const handleScrollAnimation = () => {
        const elements = document.querySelectorAll('.fade-in-up');
        const scrollPosition = window.innerHeight;

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < scrollPosition) {
                element.classList.add('is-visible');
            }
        });
    };

    // Check for animation on page load for elements already in view
    handleScrollAnimation();

    window.addEventListener('scroll', () => {
        handleScrollAnimation();

        // Play sound only on the first scroll to avoid disruption
        if (!hasScrolled) {
            playSound();
            hasScrolled = true;
        }
    });
});