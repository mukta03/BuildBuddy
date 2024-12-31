import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animation for the filter box (Slide in from the left)
gsap.from("#filter-section", {
    x: -300,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

// Hover effect for product cards
const cards = document.querySelectorAll(".component-card");

cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power1.out"
        });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power1.out"
        });
    });
});

// Scroll-triggered animation for product cards (Revealing effect as you scroll)
gsap.utils.toArray(".component-card").forEach((card) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 20%",
            scrub: true,
            toggleActions: "play none none reverse",
        }
    });
});

// Scroll-triggered animation for Featured and Top-rated sections
gsap.utils.toArray(".featured-section, .top-rated-section").forEach((section) => {
    gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "bottom 20%",
            scrub: true,
            toggleActions: "play none none reverse",
        }
    });
});
