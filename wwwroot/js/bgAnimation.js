// textAnimation.js

document.addEventListener("DOMContentLoaded", () => {
    // Select all elements with the class 'animate-text'
    const elements = document.querySelectorAll('.animate-text');

    // GSAP animation
    elements.forEach((element, index) => {
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 30, // Start position (30 pixels below)
            },
            {
                opacity: 1,
                y: 0, // End position (normal position)
                duration: 0.5, // Duration of animation
                delay: index * 0.2, // Staggered start
                ease: "power2.out" // Animation easing
            }
        );
    });
});


