// Muv Construction - Main JavaScript File

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeCounters();
    initializeCarousel();
    initializeScrollReveal();
    initializeTypewriter();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Sticky navigation with blur effect
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.classList.add('backdrop-blur-md');
        } else {
            nav.classList.remove('backdrop-blur-md');
        }
        
        lastScrollY = currentScrollY;
    });
}

// Typewriter effect for hero section
function initializeTypewriter() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
    const text = 'Muv Construction';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            typedTextElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            // Add cursor blink effect
            typedTextElement.innerHTML += '<span class="animate-pulse">|</span>';
        }
    }
    
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Animated counters
function initializeCounters() {
    const counters = [
        { id: 'counter-projects', target: 150, suffix: '+' },
        { id: 'counter-years', target: 4, suffix: '+' },
        { id: 'counter-clients', target: 200, suffix: '+' }
    ];
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterId = entry.target.id;
                const counter = counters.find(c => c.id === counterId);
                if (counter) {
                    animateCounter(counter);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            observer.observe(element);
        }
    });
    
    function animateCounter(counter) {
        const element = document.getElementById(counter.id);
        if (!element) return;
        
        anime({
            targets: { count: 0 },
            count: counter.target,
            duration: 2000,
            easing: 'easeOutQuart',
            update: function(anim) {
                element.textContent = Math.floor(anim.animatables[0].target.count);
            }
        });
    }
}

// Project carousel
function initializeCarousel() {
    const carousel = document.getElementById('project-carousel');
    if (!carousel) return;
    
    new Splide('#project-carousel', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        pauseOnHover: true,
        breakpoints: {
            1024: {
                perPage: 2,
            },
            640: {
                perPage: 1,
            }
        }
    }).mount();
}

// Scroll reveal animations
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Timeline specific observer
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Hero section animations
function initializeAnimations() {
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        anime({
            targets: element,
            translateY: [-20, 20],
            duration: 3000 + (index * 500),
            easing: 'easeInOutSine',
            direction: 'alternate',
            loop: true
        });
    });
    
    // Hero section entrance animation
    const heroElements = document.querySelectorAll('#home .reveal > *');
    
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: heroElements[0],
        opacity: [0, 1],
        translateY: [50, 0],
        delay: 500
    })
    .add({
        targets: heroElements[1],
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 200
    }, '-=800')
    .add({
        targets: heroElements[2],
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 300
    }, '-=600')
    .add({
        targets: heroElements[3],
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 400
    }, '-=400');
}

// Service calculator functionality (for services page)
function initializeServiceCalculator() {
    const calculatorForm = document.getElementById('service-calculator');
    if (!calculatorForm) return;
    
    const steps = calculatorForm.querySelectorAll('.calc-step');
    const nextBtns = calculatorForm.querySelectorAll('.next-step');
    const prevBtns = calculatorForm.querySelectorAll('.prev-step');
    const progressBar = calculatorForm.querySelector('.progress-bar');
    const resultSection = document.getElementById('calculation-result');
    
    let currentStep = 0;
    const totalSteps = steps.length;
    
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('hidden', index !== stepIndex);
        });
        
        if (progressBar) {
            const progress = ((stepIndex + 1) / totalSteps) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < totalSteps - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });
    
    // Calculate and show results
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateEstimate);
    }
    
    function calculateEstimate() {
        const formData = new FormData(calculatorForm);
        const serviceType = formData.get('service-type');
        const projectSize = parseFloat(formData.get('project-size')) || 0;
        const location = formData.get('location');
        
        // Mock calculation logic
        const basePrices = {
            'general-contracting': 150,
            'design-build': 200,
            'project-management': 100,
            'pre-construction': 75
        };
        
        const locationMultipliers = {
            'lusaka': 1.0,
            'kitwe': 0.9,
            'ndola': 0.9,
            'livingstone': 0.85,
            'other': 1.1
        };
        
        const basePrice = basePrices[serviceType] || 100;
        const locationMultiplier = locationMultipliers[location] || 1.0;
        const estimatedCost = Math.round(projectSize * basePrice * locationMultiplier);
        const estimatedTimeline = Math.round(projectSize / 50) + 2; // weeks
        
        // Display results
        if (resultSection) {
            document.getElementById('estimated-cost').textContent = `ZMW ${estimatedCost.toLocaleString()}`;
            document.getElementById('estimated-timeline').textContent = `${estimatedTimeline} weeks`;
            document.getElementById('service-name').textContent = getServiceName(serviceType);
            
            resultSection.classList.remove('hidden');
            
            // Animate result display
            anime({
                targets: resultSection,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                easing: 'easeOutQuart'
            });
        }
    }
    
    function getServiceName(serviceType) {
        const names = {
            'general-contracting': 'General Contracting',
            'design-build': 'Design-Build',
            'project-management': 'Project Management',
            'pre-construction': 'Pre-Construction'
        };
        return names[serviceType] || 'Construction Service';
    }
    
    // Initialize first step
    showStep(0);
}

// Project filter functionality (for services page)
function initializeProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 400,
                        easing: 'easeOutQuart'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        scale: [1, 0.8],
                        duration: 300,
                        easing: 'easeInQuart',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const formSteps = contactForm.querySelectorAll('.form-step');
    const nextBtns = contactForm.querySelectorAll('.next-step');
    const prevBtns = contactForm.querySelectorAll('.prev-step');
    const submitBtn = document.getElementById('submit-form');
    
    let currentStep = 0;
    const totalSteps = formSteps.length;
    
    function showStep(stepIndex) {
        formSteps.forEach((step, index) => {
            step.classList.toggle('hidden', index !== stepIndex);
        });
        
        // Update progress
        const progress = ((stepIndex + 1) / totalSteps) * 100;
        const progressBar = contactForm.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateCurrentStep() && currentStep < totalSteps - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });
    
    function validateCurrentStep() {
        const currentStepElement = formSteps[currentStep];
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('border-red-500');
                isValid = false;
            } else {
                field.classList.remove('border-red-500');
            }
        });
        
        return isValid;
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', handleFormSubmit);
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        if (!validateCurrentStep()) {
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showSuccessMessage();
            contactForm.reset();
            currentStep = 0;
            showStep(currentStep);
        }, 2000);
    }
    
    function showSuccessMessage() {
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.classList.remove('hidden');
            
            anime({
                targets: successMessage,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                easing: 'easeOutQuart'
            });
            
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }
        
        // Reset submit button
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    }
    
    // Initialize first step
    showStep(0);
}

// Map initialization (for contact page)
function initializeMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Lusaka, Zambia coordinates
    const lat = -15.3875;
    const lng = 28.3228;
    
    const map = L.map('map').setView([lat, lng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup('<b>Muv Construction</b><br>10445N, Golf Course<br>Lusaka, Zambia')
        .openPopup();
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize page-specific functionality based on current page
function initializePageSpecific() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'services.html':
            initializeServiceCalculator();
            initializeProjectFilter();
            break;
        case 'contact.html':
            initializeContactForm();
            initializeMap();
            break;
        default:
            // Index page - already initialized
            break;
    }
}

// Call page-specific initialization
document.addEventListener('DOMContentLoaded', initializePageSpecific);