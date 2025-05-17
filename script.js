document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Smooth scroll for internal links (browser native `scroll-behavior: smooth` is used via CSS)
    // However, if more complex scroll logic is needed (e.g., offset for fixed header), JS can handle it.
    // For now, CSS handles it with `scroll-padding-top`.

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Contact Form Handling (Placeholder)
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Basic form validation (HTML5 `required` is used)
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            // For a real submission, you'd use fetch() to send data to a backend.
            // As this is a static site, we'll simulate or use mailto.
            formMessage.textContent = 'Danke für deine Nachricht! Wir melden uns bald.';
            formMessage.className = 'mt-4 text-center text-green-500';
            contactForm.reset();
            
            // Alternative: create a mailto link
            // const subject = `Nachricht von ${name} (${email})`;
            // window.location.href = `mailto:info@steinrich.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        } else {
            formMessage.textContent = 'Bitte fülle alle Felder aus.';
            formMessage.className = 'mt-4 text-center text-red-500';
        }
    });
    
    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideoContainer = document.getElementById('lightbox-video-container');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    window.openLightbox = (src, caption, isVideo = false) => {
        lightbox.classList.remove('hidden');
        lightboxCaption.textContent = caption;
        if (isVideo) {
            lightboxImg.classList.add('hidden');
            lightboxVideoContainer.classList.remove('hidden');
            // For a real video, src would be the embed URL e.g. https://www.youtube.com/embed/VIDEO_ID
            // For this placeholder, we'll just show the image again or a placeholder video source.
            // Assuming src for video is a YouTube embed link like "https://www.youtube.com/embed/yourVideoID"
            // If src is just an image for a video thumbnail, we can't play it.
            // For demo, let's assume the video thumbnail click wants to show a placeholder youtube video
            if (src.includes('video-thumb')) { // A simple check for our placeholder
                 lightboxVideo.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Placeholder video
            } else {
                 lightboxVideo.src = src; // If a direct video URL is passed
            }
           
        } else {
            lightboxVideoContainer.classList.add('hidden');
            lightboxVideo.src = ''; // Stop video if one was playing
            lightboxImg.classList.remove('hidden');
            lightboxImg.src = src;
        }
    };

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
        lightboxVideo.src = ''; // Stop video
        lightboxCaption.textContent = '';
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            lightboxClose.click();
        }
    });
    
    // Close lightbox when clicking outside the content (on the backdrop)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightboxClose.click();
        }
    });

});

