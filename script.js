document.addEventListener("DOMContentLoaded", () => {
    // Check if we are on the new projects page layout
    const track = document.getElementById('sliderTrack');
    const slides = Array.from(document.querySelectorAll('.slide'));

    // Sidebar elements
    const activeNum = document.getElementById('activeNum');
    const activeTitle = document.getElementById('activeTitle');
    const activeDesc = document.getElementById('activeDesc');
    const navNumbers = document.getElementById('navNumbers');

    // Buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // Scroll Section Elements
    const detailsContainer = document.getElementById('detailsContainer');

    if (!track || slides.length === 0) return;

    let currentIndex = 2; // Default to the 3rd slide (index 2) like in the mockup

    // Extract side data from HTML
    const slideData = slides.map(slide => {
        return {
            indexStr: slide.querySelector('.slide-index-bg').innerText,
            titleHtml: slide.querySelector('h2').innerHTML,
            excerpt: slide.querySelector('.slide-excerpt').innerText
        };
    });

    function updateSlider() {
        // Calculate offset (rough calculation based on flex gap and widths)
        // Let's rely more on standard transforms or just CSS classes if we built it that way
        // We can center the active slide by translating the track
        // One slide is around 25vw, plus gap 3vw.
        const slideWidth = window.innerWidth * 0.25;
        const gap = window.innerWidth * 0.03;

        // Active slide width is 45vw
        const activeSlideWidth = window.innerWidth * 0.45;

        // We want the active slide to be at the right edge of the viewport before the sidebar
        // Actually, CSS flex is taking care of layout within slider-viewport (which has padding-left: 5vw).
        // Let's just translate based on finding the right position to keep the active slide fully visible.
        // It's easier: just translate by -(currentIndex * (slideWidth + gap)) plus some offset
        // In the mockup, the active slide is the last visible one on the right before the sidebar.
        // Let's shift so that the active slide covers the remaining space.

        // Simpler approach: 
        const offset = currentIndex * (slideWidth + gap);
        // Track moves left by offset. The active slide becomes wider (CSS does this).
        track.style.transform = `translateX(-${offset}px)`;

        slides.forEach((slide, idx) => {
            if (idx === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update Sidebar
        const currentData = slideData[currentIndex];
        activeNum.innerText = currentData.indexStr;

        // Simplify the title for the sidebar
        const simplifiedTitle = currentData.titleHtml.replace('<br>', ' ').toLowerCase();
        // Capitalize first letter
        const formattedTitle = simplifiedTitle.charAt(0).toUpperCase() + simplifiedTitle.slice(1) + '.';
        activeTitle.innerHTML = currentData.titleHtml; // or formattedTitle if we want to change it
        activeDesc.innerText = currentData.excerpt;

        // Render Nav Numbers (List of other slide numbers)
        navNumbers.innerHTML = '';
        slides.forEach((slide, idx) => {
            if (idx !== currentIndex) {
                const span = document.createElement('span');
                span.className = 'nav-num';
                span.innerText = slideData[idx].indexStr;
                span.addEventListener('click', () => {
                    currentIndex = idx;
                    updateSlider();
                });
                // To keep numbers in reverse order like the mockup "02", "01" under "03"
                navNumbers.prepend(span);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }

    // Clicking a slide centers it and updates the content below
    slides.forEach((slide, index) => {
        slide.addEventListener('click', (e) => {
            // Prevent default link action if they click "more about it"
            if (e.target.closest('.more-link')) e.preventDefault();

            if (index !== currentIndex) {
                currentIndex = index;
                updateSlider();
            } else {
                // If they click the active slide, trigger the animation on the first block below
                // to give a visual cue that more content has loaded and is ready for scrolling.
                const firstBlock = document.querySelector('.detail-block');
                if (firstBlock && !firstBlock.classList.contains('in-view')) {
                    firstBlock.classList.add('in-view');
                }
            }
        });
    });

    // Populate the scrollable details section based on active slide
    function updateDetailsSection() {
        if (!detailsContainer) return;

        const data = slideData[currentIndex];

        // We'll generate 3 blocks of content for the scrolling experience
        // Block 1: Intro
        // Block 2: Process (Reverse layout)
        // Block 3: Conclusion

        detailsContainer.innerHTML = `
            <div class="detail-block">
                <div class="detail-text">
                    <h3 class="detail-title">The Foundation</h3>
                    <p class="detail-paragraph">${data.excerpt}</p>
                    <p class="detail-paragraph" style="margin-top:20px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div class="detail-image">
                    <img src="assets/main_bg.webp" alt="Foundation Phase">
                </div>
            </div>

            <div class="detail-block">
                <div class="detail-text">
                    <h3 class="detail-title">Process & Iteration</h3>
                    <p class="detail-paragraph">Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.</p>
                    <p class="detail-paragraph" style="margin-top:20px;">Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.</p>
                </div>
                <div class="detail-image">
                    <img src="assets/workshop_bg.webp" alt="Process Phase">
                </div>
            </div>

            <div class="detail-block">
                <div class="detail-text">
                    <h3 class="detail-title">Final Delivery</h3>
                    <p class="detail-paragraph">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.</p>
                </div>
                <div class="detail-image">
                    <img src="assets/subject_fg.webp" style="background: #e0e0e0;" alt="Final Delivery">
                </div>
            </div>
        `;

        setupScrollAnimations();
    }

    // Connect updateSlider to updateDetailsSection
    const originalUpdateSlider = updateSlider;
    updateSlider = function () {
        originalUpdateSlider();
        updateDetailsSection();
    };

    // Initialize Intersection Observer for the scrolling blocks
    function setupScrollAnimations() {
        const blocks = document.querySelectorAll('.detail-block');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of block is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        blocks.forEach(block => {
            observer.observe(block);
        });
    }

    // Handle resize
    window.addEventListener('resize', updateSlider);

    // Initial call
    updateSlider(); // This will also call updateDetailsSection now
});
