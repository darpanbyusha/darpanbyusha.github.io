// This creates the smooth "flicker-free" fade-in for your boutique
gsap.from(".animate-up", {
    duration: 1.2,
    y: 60,
    opacity: 0,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.5
});