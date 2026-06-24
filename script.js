document.addEventListener("DOMContentLoaded", () => {
    // Hero Showcase Elements
    const heroShowcase = document.getElementById('heroShowcase');
    if (!heroShowcase) return;

    const heroTitle = document.getElementById('heroTitle');
    const heroIndex = document.getElementById('heroIndex');
    const heroExcerpt = document.getElementById('heroExcerpt');
    const heroMainImg = document.getElementById('heroMainImg');
    const heroDots = document.getElementById('heroDots');
    const prevShowcaseBtn = document.getElementById('prevShowcaseBtn');
    const nextShowcaseBtn = document.getElementById('nextShowcaseBtn');
    const detailsContainer = document.getElementById('detailsContainer');
    const projectDetails = document.getElementById('projectDetails');
    const readMoreHero = document.getElementById('readMoreHero');
    const mainImageWrapper = document.querySelector('.main-image-wrapper');

    // Project Data Extraction
    const projectItems = Array.from(document.querySelectorAll('.project-item'));
    const projects = projectItems.map(item => ({
        id: item.dataset.id,
        index: item.dataset.index,
        title: item.dataset.title,
        img: item.dataset.img,
        excerpt: item.dataset.excerpt
    }));

    let currentIndex = 0;

    // Initialize Dots
    projects.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `dot ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            if (idx !== currentIndex) {
                currentIndex = idx;
                updateShowcase();
            }
        });
        heroDots.appendChild(dot);
    });

    function updateShowcase() {
        const project = projects[currentIndex];

        // Animate text elements out (with vertical movement)
        const textElements = [heroTitle, heroIndex, heroExcerpt];
        textElements.forEach(el => el.classList.add('fade-out'));

        // Animate background image out (opacity only, no translation)
        const mediaElements = [heroMainImg];
        mediaElements.forEach(el => el.classList.add('fade-out-opacity'));

        setTimeout(() => {
            // Update content
            heroTitle.innerHTML = project.title;
            heroIndex.innerText = project.index;
            heroExcerpt.innerText = project.excerpt;
            heroMainImg.src = project.img;

            // Update dots
            document.querySelectorAll('.dot').forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });

            // Animate text elements in
            textElements.forEach(el => {
                el.classList.remove('fade-out');
                el.classList.add('fade-in');
            });

            // Animate media elements in
            mediaElements.forEach(el => {
                el.classList.remove('fade-out-opacity');
                el.classList.add('fade-in-opacity');
            });

            // Update details below
            updateDetailsSection();

            // Cleanup classes after animation
            setTimeout(() => {
                textElements.forEach(el => el.classList.remove('fade-in'));
                mediaElements.forEach(el => el.classList.remove('fade-in-opacity'));
            }, 600);
        }, 400);
    }

    function scrollToDetails() {
        if (projectDetails) {
            projectDetails.scrollIntoView({ behavior: 'smooth' });
        }
    }

    if (nextShowcaseBtn) {
        nextShowcaseBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % projects.length;
            updateShowcase();
        });
    }

    if (prevShowcaseBtn) {
        prevShowcaseBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + projects.length) % projects.length;
            updateShowcase();
        });
    }

    if (readMoreHero) {
        readMoreHero.addEventListener('click', scrollToDetails);
    }

    if (mainImageWrapper) {
        mainImageWrapper.style.cursor = 'pointer';
        mainImageWrapper.style.pointerEvents = 'auto';
        mainImageWrapper.addEventListener('click', scrollToDetails);
    }

    // Helper to parse Frontmatter and Markdown Body
    function parseMarkdown(text) {
        const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
        const match = text.match(frontmatterRegex);
        let metadata = {};
        let body = text;

        if (match) {
            body = text.replace(frontmatterRegex, '').trim();
            const yamlStr = match[1];
            yamlStr.split('\n').forEach(line => {
                const [key, ...value] = line.split(':');
                if (key && value) {
                    metadata[key.trim()] = value.join(':').trim();
                }
            });
        }
        return { metadata, body };
    }

    async function updateDetailsSection() {
        if (!detailsContainer || !projectDetails) return;

        const currentProject = projects[currentIndex];
        
        // Force White Background for all project details
        projectDetails.style.backgroundColor = "#fff";
        projectDetails.style.color = "#111";

        // Inject loader to prevent layout shifts and indicate network fetching activity
        detailsContainer.innerHTML = `
            <div class="details-loader" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; width: 100%;">
                <div style="width: 28px; height: 28px; border: 2px solid rgba(17,17,17,0.1); border-top-color: #111; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
                <p style="margin-top: 15px; font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase; color: #777; font-family: 'Space Grotesk', sans-serif;">Chargement du projet...</p>
            </div>
        `;

        let projectId = currentProject.id;

        try {
            const response = await fetch(`projects/${projectId}.md?t=${new Date().getTime()}`);
            if (!response.ok) throw new Error("File not found");
            const text = await response.text();
            
            const { metadata, body } = parseMarkdown(text);
            
            // Helper to render media or carousel if multiple
            const renderMedia = (mediaMatches) => {
                if (mediaMatches.length > 1) {
                    const slidesHtml = mediaMatches.map((m, idx) => {
                        const activeClass = idx === 0 ? "active" : "";
                        const parsed = m.startsWith('<') ? m : marked.parse(m);
                        return `<div class="carousel-slide ${activeClass}">${parsed}</div>`;
                    }).join("");

                    const dotsHtml = mediaMatches.map((_, idx) => {
                        const activeClass = idx === 0 ? "active" : "";
                        return `<span class="carousel-dot ${activeClass}" data-index="${idx}"></span>`;
                    }).join("");

                    return `
                        <div class="media-carousel">
                            <div class="carousel-track-wrapper">
                                <div class="carousel-track">
                                    ${slidesHtml}
                                </div>
                            </div>
                            <button class="carousel-btn prev-btn" onclick="event.stopPropagation()">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                            <button class="carousel-btn next-btn" onclick="event.stopPropagation()">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                            <div class="carousel-dots-container">
                                <div class="carousel-dots">
                                    ${dotsHtml}
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    return mediaMatches.map(m => m.startsWith('<') ? m : marked.parse(m)).join('\n');
                }
            };

            // Smart Layout Engine: Transform Pure Markdown into Museum Layout
            // 1. Split by H2/H3 sections
            const sections = body.split(/(?=###?\s)/g);
            let alternated = false;
            
            let structuredHtml = sections.map(section => {
                if (!section.trim()) return "";
                
                // Extract images or videos
                const mediaRegex = /(!\[.*?\]\(.*?\)|<video[\s\S]*?<\/video>)/g;
                const mediaMatches = section.match(mediaRegex) || [];
                const textContent = section.replace(mediaRegex, "").trim();
                
                if (mediaMatches.length > 0 && textContent.length > 50) {
                    // Side-by-side block
                    const sideClass = alternated ? "row-reverse" : "";
                    alternated = !alternated;
                    
                    return `
                        <div class="detail-block ${sideClass}" style="display: flex; align-items: center; justify-content: space-between; gap: 80px; margin: 120px 0; flex-direction: ${sideClass ? 'row-reverse' : 'row'};">
                            <div class="detail-text" style="flex: 1.2;">
                                ${marked.parse(textContent)}
                            </div>
                            <div class="detail-image" style="flex: 1;">
                                ${renderMedia(mediaMatches)}
                            </div>
                        </div>
                    `;
                } else if (mediaMatches.length > 0) {
                    // Media focus block
                    return `<div class="full-width-media" style="margin: 80px 0; text-align: center;">${renderMedia(mediaMatches)}</div>${marked.parse(textContent)}`;
                } else {
                    // Text focused block
                    return `<div class="detail-text-focused" style="max-width: 800px; margin: 80px auto;">${marked.parse(section)}</div>`;
                }
            }).join("");

            const nextProject = projects[(currentIndex + 1) % projects.length];
            const isWip = metadata.status && metadata.status.toUpperCase() === "WORK IN PROGRESS";

            if (isWip) {
                detailsContainer.innerHTML = `
                    <div style="background-color: #f5f5f5; width: 100%; min-height: 550px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 20px; box-sizing: border-box;">
                        <div class="caution-tape" style="max-width: 450px; margin: 0; background: #fffbeb; border: 1px solid #fde68a;">
                            <div class="caution-tape-content" style="color: #b45309; font-weight: 700; font-size: 0.9rem; letter-spacing: 0.15em;">
                                PAGE EN COURS DE CRÉATION
                            </div>
                        </div>
                    </div>
                    
                    <!-- Next Project Footer Transition -->
                    <div class="next-project-footer" id="nextProjectFooter" style="background-color: #fff; width: 100%;">
                        <span class="next-project-label">Projet suivant</span>
                        <h2 class="next-project-title">${nextProject.title}</h2>
                        <div class="next-project-footer-arrow">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                    </div>
                `;

                const nextProjectFooter = document.getElementById('nextProjectFooter');
                if (nextProjectFooter) {
                    nextProjectFooter.addEventListener('click', () => {
                        currentIndex = (currentIndex + 1) % projects.length;
                        updateShowcase();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                }
                
                setupScrollAnimations();
                return;
            }

            const htmlContent = `
                <div class="project-details-content markdown-body" style="max-width: 1200px; margin: 0 auto; padding: 100px 20px;">
                    <div class="detail-header" style="margin-bottom: 80px; text-align: left;">
                        <h1 style="font-size: clamp(3rem, 8vw, 6rem); font-weight: 800; line-height: 0.9; margin-bottom: 30px; letter-spacing: -0.04em;">${metadata.title || currentProject.title}</h1>
                        <p style="font-size: 1.1rem; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(0,0,0,0.4); margin-bottom: 40px;">${metadata.category || ""}</p>
                    </div>
                    <div class="museum-layout">
                        ${structuredHtml}
                    </div>
                    
                    <!-- Next Project Footer Transition -->
                    <div class="next-project-footer" id="nextProjectFooter">
                        <span class="next-project-label">Projet suivant</span>
                        <h2 class="next-project-title">${nextProject.title}</h2>
                        <div class="next-project-footer-arrow">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                    </div>
                </div>
            `;
            
            detailsContainer.innerHTML = htmlContent;
            initCarousels();

            // Bind click listener for Next Project Footer
            const nextProjectFooter = document.getElementById('nextProjectFooter');
            if (nextProjectFooter) {
                nextProjectFooter.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % projects.length;
                    updateShowcase();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        } catch (error) {
            console.error("Error loading project markdown:", error);
            // Fallback to minimal static content if fetch fails
            detailsContainer.innerHTML = `<div style="padding: 100px; text-align: center;">Content for ${currentProject.title} is being updated...</div>`;
        }
        
        setupScrollAnimations();
    }

    function initCarousels() {
        const carousels = document.querySelectorAll('.media-carousel');
        carousels.forEach(carousel => {
            const track = carousel.querySelector('.carousel-track');
            const slides = carousel.querySelectorAll('.carousel-slide');
            const dots = carousel.querySelectorAll('.carousel-dot');
            const prevBtn = carousel.querySelector('.prev-btn');
            const nextBtn = carousel.querySelector('.next-btn');
            let carouselIndex = 0;

            function updateCarousel(index) {
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;
                carouselIndex = index;
                
                track.style.transform = `translateX(-${carouselIndex * 100}%)`;
                
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === carouselIndex);
                });
                slides.forEach((slide, idx) => {
                    slide.classList.toggle('active', idx === carouselIndex);
                });
            }

            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateCarousel(carouselIndex - 1);
            });

            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateCarousel(carouselIndex + 1);
            });

            dots.forEach((dot, idx) => {
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateCarousel(idx);
                });
            });
        });
    }

    function setupScrollAnimations() {
        const blocks = document.querySelectorAll('.detail-block');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        blocks.forEach(block => observer.observe(block));
    }

    // Scroll listener for background blur & header scrolled state
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const scrollThreshold = window.innerHeight * 0.1;

        if (currentScrollY > scrollThreshold) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }

        // Hide/show header on scroll down/up
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            if (header) header.classList.add('header-hidden');
        } else {
            if (header) header.classList.remove('header-hidden');
        }

        lastScrollY = currentScrollY;

        if (mainImageWrapper) {
            const blurThreshold = window.innerHeight * 0.3;
            if (window.scrollY > blurThreshold) {
                mainImageWrapper.classList.add('blurred');
            } else {
                mainImageWrapper.classList.remove('blurred');
            }
        }
    });

    // Initial load
    updateShowcase();
});
