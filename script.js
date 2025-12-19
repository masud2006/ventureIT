// ===== Premium IT Agency Website - Enhanced Interactive Script =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Global Variables =====
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // ===== Background Particles =====
    function createParticles() {
        const particleContainer = document.getElementById('heroParticles');
        if (!particleContainer || isMobile) return;
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 4 + 1;
            
            // Random animation delay
            const delay = Math.random() * 5;
            
            // Random color
            const colors = ['#00f3ff', '#9d4edd', '#4361ee', '#4cc9f0'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Apply styles
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                opacity: ${Math.random() * 0.5 + 0.1};
                filter: blur(1px);
                animation: particle-float ${Math.random() * 10 + 10}s infinite ease-in-out ${delay}s;
            `;
            
            particleContainer.appendChild(particle);
        }
        
        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particle-float {
                0%, 100% { transform: translate(0, 0) scale(1); }
                25% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.2); }
                50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0.8); }
                75% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== Cursor Follower =====
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor follower position with smooth easing
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        if (cursorFollower) {
            cursorFollower.style.left = `${cursorX}px`;
            cursorFollower.style.top = `${cursorY}px`;
        }
        
        // Interactive elements response to cursor
        updateInteractiveElements(e);
    });
    
    // Cursor follower interaction with elements
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        
        // Increase cursor size when hovering interactive elements
        if (target.classList.contains('cta-btn') || 
            target.classList.contains('service-card') ||
            target.classList.contains('portfolio-card') ||
            target.classList.contains('pricing-card') ||
            target.closest('.nav-link')) {
            if (cursorFollower) {
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.opacity = '0.5';
            }
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        const target = e.target;
        
        // Reset cursor size when leaving interactive elements
        if (target.classList.contains('cta-btn') || 
            target.classList.contains('service-card') ||
            target.classList.contains('portfolio-card') ||
            target.classList.contains('pricing-card') ||
            target.closest('.nav-link')) {
            if (cursorFollower) {
                cursorFollower.style.width = '20px';
                cursorFollower.style.height = '20px';
                cursorFollower.style.opacity = '0.3';
            }
        }
    });
    
    // Hide cursor on mobile
    if (isMobile && cursorFollower) {
        cursorFollower.style.display = 'none';
    }
    
    // ===== Interactive Elements Update =====
    function updateInteractiveElements(e) {
        // Get all interactive elements
        const interactiveElements = document.querySelectorAll('.service-card, .portfolio-card, .pricing-card, .cta-btn');
        
        interactiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenterX = rect.left + rect.width / 2;
            const elementCenterY = rect.top + rect.height / 2;
            
            // Calculate distance from cursor to element center
            const distanceX = mouseX - elementCenterX;
            const distanceY = mouseY - elementCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Calculate max distance for effect (based on element size)
            const maxDistance = Math.max(rect.width, rect.height) * 1.5;
            
            // Normalize distance (0 to 1, where 0 is at center, 1 is at maxDistance)
            const normalizedDistance = Math.min(distance / maxDistance, 1);
            
            // Calculate tilt effect based on cursor position
            if (distance < maxDistance && !isMobile) {
                // Calculate tilt angles (max 5 degrees)
                const tiltX = (distanceY / rect.height) * 5;
                const tiltY = -(distanceX / rect.width) * 5;
                
                // Calculate glow intensity (stronger when closer)
                const glowIntensity = 1 - normalizedDistance;
                
                // Apply effects
                if (element.classList.contains('service-card') || 
                    element.classList.contains('portfolio-card') ||
                    element.classList.contains('pricing-card')) {
                    
                    // Apply 3D tilt
                    element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
                    
                    // Apply glow effect
                    const glowElement = element.querySelector('.service-card-glow') || 
                                       element.querySelector('.portfolio-glow') ||
                                       element.querySelector('.stat-glow');
                    if (glowElement) {
                        glowElement.style.opacity = glowIntensity * 0.3;
                    }
                }
                
                // Apply magnet effect to CTA buttons
                if (element.classList.contains('cta-btn') && distance < 100) {
                    const magnetStrength = 0.2;
                    const offsetX = -distanceX * magnetStrength;
                    const offsetY = -distanceY * magnetStrength;
                    
                    element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                }
            } else {
                // Reset transformations when cursor is far away
                if (element.classList.contains('service-card') || 
                    element.classList.contains('portfolio-card') ||
                    element.classList.contains('pricing-card')) {
                    element.style.transform = '';
                    
                    const glowElement = element.querySelector('.service-card-glow') || 
                                       element.querySelector('.portfolio-glow') ||
                                       element.querySelector('.stat-glow');
                    if (glowElement) {
                        glowElement.style.opacity = '0';
                    }
                }
                
                if (element.classList.contains('cta-btn')) {
                    element.style.transform = '';
                }
            }
        });
    }
    
    // ===== Mobile Navigation =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Update active nav link
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // ===== Announcement Logic =====
    const announcement = document.getElementById('announcement');
    const closeAnnouncement = document.getElementById('closeAnnouncement');
    const pricingSection = document.getElementById('pricing');
    
    if (closeAnnouncement) {
        closeAnnouncement.addEventListener('click', function() {
            announcement.style.transform = 'translateY(-100%)';
            announcement.style.opacity = '0';
            setTimeout(() => {
                announcement.style.display = 'none';
            }, 500);
        });
    }
    
    // Stop announcement pulse when user scrolls past pricing section
    let announcementPulseStopped = false;
    
    function handleAnnouncementPulse() {
        if (announcementPulseStopped) return;
        
        const pricingRect = pricingSection.getBoundingClientRect();
        const announcementRect = announcement.getBoundingClientRect();
        
        // If pricing section is in view or announcement is scrolled out of view
        if (pricingRect.top < window.innerHeight || announcementRect.bottom < 0) {
            // Stop the pulse animation
            const pulseDot = document.querySelector('.pulse-dot');
            if (pulseDot) {
                pulseDot.style.animation = 'none';
                announcementPulseStopped = true;
            }
        }
    }
    
    // ===== Pricing Tabs =====
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingGrids = {
        'web': document.getElementById('web-pricing'),
        'app': document.getElementById('app-pricing'),
        'software': document.getElementById('software-pricing')
    };
    
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            pricingTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding pricing grid
            Object.keys(pricingGrids).forEach(key => {
                if (pricingGrids[key]) {
                    if (key === tabId) {
                        pricingGrids[key].classList.add('active');
                    } else {
                        pricingGrids[key].classList.remove('active');
                    }
                }
            });
        });
    });
    
    // ===== Animated Counters (Starting from 0) =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        const statsSection = document.getElementById('stats');
        const statsRect = statsSection.getBoundingClientRect();
        
        // Check if stats section is in viewport
        if (statsRect.top < window.innerHeight - 100) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                // Set initial value to 0
                stat.textContent = '0';
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                        
                        // Add completion effect
                        const parentCard = stat.closest('.stat-card');
                        const glowElement = parentCard.querySelector('.stat-glow');
                        if (glowElement) {
                            glowElement.style.opacity = '0.3';
                            setTimeout(() => {
                                glowElement.style.opacity = '0';
                            }, 500);
                        }
                    }
                    
                    // Format number with commas
                    if (stat.getAttribute('data-target') === '98') {
                        // For percentage, show decimal
                        stat.textContent = current.toFixed(1);
                    } else {
                        stat.textContent = Math.floor(current).toLocaleString();
                    }
                }, 16);
            });
            
            countersAnimated = true;
        }
    }
    
    // ===== Scroll-Based Animations =====
    function handleScrollAnimations() {
        // Check for animated counters
        animateCounters();
        
        // Check for announcement pulse
        handleAnnouncementPulse();
        
        // Update navbar opacity based on scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.85)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        // Animate elements on scroll
        animateOnScroll();
    }
    
    // ===== Update Active Nav Link =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===== Animate Elements on Scroll =====
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .pricing-card, .stat-card');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition.top < screenPosition) {
                element.classList.add('animate-in');
            }
        });
    }
    
    // ===== Floating Cube Interaction =====
    const floatingCube = document.getElementById('floatingCube');
    
    if (floatingCube && !isMobile) {
        document.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to center of viewport
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            // Calculate rotation based on mouse position
            const rotateY = (e.clientX - centerX) / 50;
            const rotateX = -(e.clientY - centerY) / 50;
            
            // Apply rotation to cube
            floatingCube.style.transform = `rotateX(${-15 + rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
    
    // ===== WhatsApp Button Logic =====
    const whatsappBtn = document.getElementById('whatsappBtn');
    let whatsappPulseStopped = false;
    
    if (whatsappBtn) {
        // Stop pulse after first interaction
        whatsappBtn.addEventListener('click', function() {
            if (!whatsappPulseStopped) {
                this.style.animation = 'none';
                whatsappPulseStopped = true;
            }
        });
    }
    
    // ===== Call Button Logic =====
    const callBtn = document.getElementById('callBtn');
    let callPulseStopped = false;
    
    if (callBtn) {
        // Stop pulse after first interaction
        callBtn.addEventListener('click', function() {
            if (!callPulseStopped) {
                this.style.animation = 'none';
                callPulseStopped = true;
            }
        });
    }
    
    // ===== View All Projects Button =====
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Show a modal or navigate to portfolio page
            alert('In a real implementation, this would navigate to a full portfolio page with all projects.');
        });
    }
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Initialize =====
    function init() {
        // Create background particles
        createParticles();
        
        // Add CSS classes for scroll animation
        const style = document.createElement('style');
        style.textContent = `
            .service-card, .portfolio-card, .pricing-card, .stat-card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .service-card.animate-in, 
            .portfolio-card.animate-in, 
            .pricing-card.animate-in, 
            .stat-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Staggered animation delays */
            .service-card:nth-child(1) { transition-delay: 0.1s; }
            .service-card:nth-child(2) { transition-delay: 0.2s; }
            .service-card:nth-child(3) { transition-delay: 0.3s; }
            .service-card:nth-child(4) { transition-delay: 0.4s; }
            .service-card:nth-child(5) { transition-delay: 0.5s; }
            
            .portfolio-card:nth-child(1) { transition-delay: 0.1s; }
            .portfolio-card:nth-child(2) { transition-delay: 0.2s; }
            .portfolio-card:nth-child(3) { transition-delay: 0.3s; }
            
            .pricing-card:nth-child(1) { transition-delay: 0.1s; }
            .pricing-card:nth-child(2) { transition-delay: 0.2s; }
            .pricing-card:nth-child(3) { transition-delay: 0.3s; }
            
            .stat-card:nth-child(1) { transition-delay: 0.1s; }
            .stat-card:nth-child(2) { transition-delay: 0.2s; }
            .stat-card:nth-child(3) { transition-delay: 0.3s; }
            .stat-card:nth-child(4) { transition-delay: 0.4s; }
        `;
        document.head.appendChild(style);
        
        // Trigger initial animations
        setTimeout(() => {
            animateOnScroll();
        }, 500);
    }
    
    // ===== Event Listeners =====
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('resize', handleScrollAnimations);
    
    // Initialize
    init();
    handleScrollAnimations(); // Run once on load
});