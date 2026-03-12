document.addEventListener("DOMContentLoaded", () => {
            const track = document.querySelector(".slideshow-track");
            const originalSlides = document.querySelectorAll(".slide");
            const dots = document.querySelectorAll(".dot");
            let autoPlayTimer;

            if (originalSlides.length === 0) return;

            // 1. Create clones for the infinite loop illusion
            const firstClone = originalSlides[0].cloneNode(true);
            const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
            
            firstClone.id = "first-clone";
            lastClone.id = "last-clone";

            track.append(firstClone);
            track.prepend(lastClone);

            // 2. Set up the track
            const allSlides = document.querySelectorAll(".slide");
            let currentIndex = 1; // Start at the first real slide (index 1)
            
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            function showSlide(index) {
                // Add the smooth sliding transition
                track.style.transition = "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
                currentIndex = index;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;

                // Update dots correctly
                dots.forEach(dot => dot.classList.remove("active"));
                let dotIndex = currentIndex - 1;
                if (currentIndex === allSlides.length - 1) dotIndex = 0; // If on first clone, highlight first dot
                if (currentIndex === 0) dotIndex = dots.length - 1; // If on last clone, highlight last dot
                if (dots[dotIndex]) dots[dotIndex].classList.add("active");
            }

            // 3. The "Teleport" Trick
            track.addEventListener('transitionend', () => {
                if (allSlides[currentIndex].id === "first-clone") {
                    track.style.transition = "none"; // Turn off animation
                    currentIndex = 1; // Teleport to real first slide
                    track.style.transform = `translateX(-${currentIndex * 100}%)`;
                }
                if (allSlides[currentIndex].id === "last-clone") {
                    track.style.transition = "none";
                    currentIndex = allSlides.length - 2;
                    track.style.transform = `translateX(-${currentIndex * 100}%)`;
                }
            });

            function moveSlide(n) {
                clearInterval(autoPlayTimer);
                // Prevent clicking too fast during teleport
                if (currentIndex >= allSlides.length - 1 && n === 1) return;
                if (currentIndex <= 0 && n === -1) return;
                
                showSlide(currentIndex + n);
                startAutoPlay();
            }

            function startAutoPlay() {
                clearInterval(autoPlayTimer);
                autoPlayTimer = setInterval(() => {
                    moveSlide(1);
                }, 5000);
            }

            // 4. Attach Click Events
            document.querySelector(".prev-btn").addEventListener("click", () => moveSlide(-1));
            document.querySelector(".next-btn").addEventListener("click", () => moveSlide(1));

            dots.forEach((dot, index) => {
                dot.addEventListener("click", () => {
                    clearInterval(autoPlayTimer);
                    showSlide(index + 1); // +1 because index 0 is now the clone
                    startAutoPlay();
                });
            });

            // Start the show
            startAutoPlay();
        });