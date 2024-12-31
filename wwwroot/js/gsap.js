// Create a GSAP timeline
const tl = gsap.timeline();

// GSAP Text Typing Animation with Fade-In for Title
tl.fromTo("#title",
    { text: "", opacity: 0 },
    {
        text: "Compare Components",
        duration: 2,
        ease: "power2.out",
        opacity: 1 // Fade in the title
    }
);

// GSAP Text Typing Animation with Fade-In for Description
tl.fromTo("#description",
    { text: "", opacity: 0 },
    {
        text: "Confused which to choose?!<br>Compare the products by selecting the component.",
        duration: 1,
        ease: "power2.out",
        delay: 2,
        opacity: 1 // Ensure description fades in as well
    }
)
    // Reverse the animation after it completes
    .to("#description", {
        text: "",
        duration: 2,
        ease: "power2.in",
        delay: 6, // Delay before starting the reverse animation
        opacity: 0, // Fade out the description
        onComplete: () => {
            // Animate new lines one by one
            const newLines = [
                "Stuck in decision mode?<br> Compare and conquer by selecting your components!",
                "Can't decide?<br> Compare components and make the right choice!",
                "Not sure which one suits you?<br> Select a component to compare and decide!",
                "Need a hand choosing?<br> Compare products side by side and make an informed decision!",
                "Unsure of the best fit?<br> Select components to compare and find your perfect match!",
                "Having trouble picking the right one?<br> Compare components and choose confidently!"
            ];

            // Create a timeline for new lines
            const lineTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 }); // Infinite loop

            newLines.forEach((line, index) => {
                lineTimeline
                    .fromTo("#description",
                        { text: "", opacity: 0 },
                        {
                            text: line,
                            duration: 3,
                            ease: "power2.out",
                            opacity: 1, // Fade in the new line
                            delay: index * 4 // Delay for each new line
                        }
                    )
                    .to("#description",
                        {
                            text: "",
                            duration: 2,
                            ease: "power2.in",
                            opacity: 0, // Fade out the new line
                            delay: 0.5 // Reduced delay before starting the reverse animation
                        }
                    );
            });
        }
    });
