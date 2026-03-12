// Wait for the HTML to fully load before running the slideshow
document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
    let autoPlayTimer;

    // Attach functions to the 'window' so your HTML buttons can find them
    window.showSlide = function(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        if (index >= slides.length) slideIndex = 0;
        if (index < 0) slideIndex = slides.length - 1;

        if (slides[slideIndex]) slides[slideIndex].classList.add("active");
        if (dots[slideIndex]) dots[slideIndex].classList.add("active");
    }

    window.moveSlide = function(n) {
        clearInterval(autoPlayTimer); 
        slideIndex += n;
        window.showSlide(slideIndex);
        startAutoPlay(); 
    }

    window.currentSlide = function(n) {
        clearInterval(autoPlayTimer);
        slideIndex = n;
        window.showSlide(slideIndex);
        startAutoPlay();
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            slideIndex++;
            window.showSlide(slideIndex);
        }, 5000); 
    }

    // Start the slideshow
    if(slides.length > 0) {
        window.showSlide(slideIndex);
        startAutoPlay();
    }
});