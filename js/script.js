document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle Nav
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            nav.classList.remove('nav-active'); // Close menu on click

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Glitch effect initialization or other interactive elements can go here

    // Floor Switching Logic
    const floorBtns = document.querySelectorAll('.floor-btn');
    const floorImage = document.getElementById('floor-image');
    const floorDesc = document.getElementById('floor-desc');

    const floors = {
        1: { img: 'img/123.jpg', desc: 'Въезд / Выезд + 36 мест' },
        2: { img: 'img/1234.jpg', desc: 'Рампа на 3 этаж + 36 мест' },
        3: { img: 'img/12345.jpg', desc: 'Верхний уровень + 36 мест' }
    };

    floorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active state
            floorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Switch content
            const floorNum = btn.getAttribute('data-floor');
            if (floors[floorNum]) {
                floorImage.style.opacity = 0;
                setTimeout(() => {
                    floorImage.src = floors[floorNum].img;
                    floorDesc.textContent = floors[floorNum].desc;
                    floorImage.style.opacity = 1;
                }, 300);
            }
        });
    });



    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section-header, .about-card, .step-item, .specs-layout, .stat-card, .growth-potential, .app-container, .contacts-wrapper');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    // Random Free Spots Logic
    const freeSpotsEl = document.getElementById('free-spots-count');
    if (freeSpotsEl) {
        // Set initial random value between 15 and 80
        let currentSpots = Math.floor(Math.random() * (80 - 15 + 1)) + 15;
        freeSpotsEl.textContent = currentSpots;

        setInterval(() => {
            // Randomly increase or decrease spots
            const change = Math.random() > 0.5 ? 1 : -1;
            const newValue = currentSpots + change;

            // Keep within logical bounds (0 to 108)
            if (newValue >= 0 && newValue <= 108) {
                currentSpots = newValue;
                freeSpotsEl.textContent = currentSpots;

                // Add visual pulse effect
                const statusDot = document.querySelector('.status-dot');
                statusDot.style.animation = 'none';
                statusDot.offsetHeight; /* trigger reflow */
                statusDot.style.animation = 'pulse 0.5s ease';
            }
        }, 5000); // Update every 5 seconds
    }

    // Number Counter Animation
    const statsSection = document.querySelector('.economics-grid');
    const statValues = document.querySelectorAll('.stat-value');
    let started = false;

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                statValues.forEach(stat => {
                    const currencySpan = stat.querySelector('.currency');
                    const currencyText = currencySpan ? currencySpan.outerHTML : '';
                    const targetText = stat.childNodes[0].nodeValue.trim();
                    const target = parseInt(targetText.replace(/\D/g, ''));

                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps

                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            // Format number with spaces
                            stat.innerHTML = Math.ceil(count).toLocaleString('ru-RU') + ' ' + currencyText;
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.innerHTML = target.toLocaleString('ru-RU') + ' ' + currencyText;
                        }
                    };
                    updateCount();
                });
                started = true;
            }
        });
        statsObserver.observe(statsSection);
    }

    // Contact Form Handler with Toast
    const contactForm = document.querySelector('.contact-form');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Show toast
            toast.classList.add('show');

            // Reset form
            contactForm.reset();

            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scroll with Offset for Fixed Header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            nav.classList.remove('nav-active'); // Close menu on click

            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 120; // Account for floating navbar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
});
