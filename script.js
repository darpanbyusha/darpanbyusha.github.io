// This creates the smooth "flicker-free" fade-in for your boutique
gsap.from(".animate-up", {
    duration: 1.2,
    y: 60,
    opacity: 0,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.5
});
// --- DARPAN BOUTIQUE SLIDESHOW ---
let slideIndex = 0;
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let autoPlayTimer;

// Function to show a specific slide
function showSlide(index) {
    // Reset all slides and dots
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    // Handle looping
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    // Show current
    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");
}

// Click arrows
function moveSlide(n) {
    clearInterval(autoPlayTimer); // Stop autoplay when user clicks
    slideIndex += n;
    showSlide(slideIndex);
    startAutoPlay(); // Restart autoplay
}

// Click dots
function currentSlide(n) {
    clearInterval(autoPlayTimer);
    slideIndex = n;
    showSlide(slideIndex);
    startAutoPlay();
}

// Auto Play every 5 seconds
function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 5000); // 5000 milliseconds = 5 seconds
}

// Start the slideshow when the page loads
if(slides.length > 0) {
    showSlide(slideIndex);
    startAutoPlay();
}