document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
    let prevBtn = document.getElementById("prevBtn");
    let nextBtn = document.getElementById("nextBtn");
    let autoPlayTimer;

    // Safety check: only run if the slideshow exists on the page
    if (slides.length === 0) return;

    function showSlide(index) {
        let track = document.querySelector(".slideshow-track");
        
        // Loop around if at the end or beginning
        if (index >= slides.length) slideIndex = 0;
        if (index < 0) slideIndex = slides.length - 1;

        // Slide the entire track to the left (e.g., -100%, -200%)
        track.style.transform = `translateX(-${slideIndex * 100}%)`;

        // Update active dot
        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[slideIndex]) dots[slideIndex].classList.add("active");
    }

    function moveSlide(n) {
        clearInterval(autoPlayTimer); 
        slideIndex += n;
        showSlide(slideIndex);
        startAutoPlay(); 
    }

    function startAutoPlay() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(() => {
            slideIndex++;
            showSlide(slideIndex);
        }, 5000); 
    }

    // Attach Event Listeners to Buttons
    if (prevBtn) prevBtn.addEventListener("click", () => moveSlide(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => moveSlide(1));

    // Attach Event Listeners to Dots
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            clearInterval(autoPlayTimer);
            slideIndex = parseInt(e.target.getAttribute("data-index"));
            showSlide(slideIndex);
            startAutoPlay();
        });
    });

    // Start everything up
    showSlide(slideIndex);
    startAutoPlay();
});