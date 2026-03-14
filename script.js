document.addEventListener("DOMContentLoaded", () => {
    
    // --- SLIDE-OUT MENU LOGIC ---
    const menuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    function toggleMenu() {
        sideMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        // Prevent background scrolling when menu is open
        document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    
    // Close menu if a link inside it is clicked
    const menuLinks = document.querySelectorAll('.side-menu-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    // 1. Transparent to White Header Scroll Effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. The Darpan Experience Interactive Image Swap
    const experienceItems = document.querySelectorAll('.experience-item');
    const displayImg = document.getElementById('experience-image');

    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Remove active class from all items
            experienceItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to hovered item
            item.classList.add('active');

            // Swap the image with a smooth crossfade
            const newSrc = item.getAttribute('data-img');
            displayImg.style.opacity = '0';
            
            setTimeout(() => {
                displayImg.src = newSrc;
                displayImg.style.opacity = '1';
            }, 250); // Matches the CSS transition timing
        });
    });
    // --- WISHLIST LOGIC (Saves to Browser Memory) ---
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');

    // 1. Load any previously saved designs from the browser's memory
    let savedDesigns = JSON.parse(localStorage.getItem('darpanWishlist')) || [];

    wishlistBtns.forEach(btn => {
        const designId = btn.getAttribute('data-design-id');

        // 2. If the user previously saved this design, make the heart solid on page load
        if (savedDesigns.includes(designId)) {
            btn.classList.add('active');
        }

        // 3. Listen for clicks to add/remove from the wishlist
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            
            if (btn.classList.contains('active')) {
                // Add to memory
                savedDesigns.push(designId);
            } else {
                // Remove from memory
                savedDesigns = savedDesigns.filter(id => id !== designId);
            }
            
            // 4. Save the updated list back to the browser
            localStorage.setItem('darpanWishlist', JSON.stringify(savedDesigns));
        });
    });
});