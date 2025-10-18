// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
const backToTopBtn = document.getElementById('backToTop');
const navbar = document.querySelector('.navbar');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const typingHeadline = document.getElementById('typing-headline');
const statNumbers = document.querySelectorAll('.stat-number');
const skillProgress = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const RESUME_FILE_ID = '1_YT8jlIaFDrcmak-Bc_QPM31ALbZe-JH';
const RESUME_VIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/view?usp=drivesdk`;
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;

// Mobile Navigation Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
}

// Close mobile menu when clicking nav links
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transform = 'none';
        span.style.opacity = '1';
    });
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations based on element type
            if (entry.target.classList.contains('stat-item')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    animateCounter(statNumber);
                }
            }
            
            if (entry.target.classList.contains('skills-section')) {
                setTimeout(() => animateSkillBars(), 500);
            }
        }
    });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.expertise-card, .work-card, .insight-card');
    const fadeElements = document.querySelectorAll('.section-header, .about-content, .connect-content');
    
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('fade-in');
        } else {
            section.classList.add('slide-in-left');
        }
        observer.observe(section);
    });
    
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Back to top button functionality
function handleBackToTop() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

// Update scroll progress bar
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgressBar) {
        scrollProgressBar.style.width = scrolled + '%';
    }
}

// Navbar background on scroll
function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(10, 11, 20, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
    } else {
        navbar.style.background = 'rgba(10, 11, 20, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
}

// Parallax effect for hero section
function handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
}

// Typing animation for hero headline
function typeWriter() {
    if (!typingHeadline) return;
    
    const text = typingHeadline.textContent;
    typingHeadline.textContent = '';
    typingHeadline.style.opacity = '1';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            typingHeadline.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            // Add blinking cursor effect
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            cursor.style.marginLeft = '2px';
            cursor.style.color = 'var(--accent-primary)';
            typingHeadline.appendChild(cursor);
        }
    }, 80);
}

// Animated Counter Function
function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    
    function updateCounter(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const current = target * easeOutQuart;
        
        if (target % 1 === 0) {
            element.textContent = Math.floor(current) + suffix;
        } else {
            element.textContent = current.toFixed(1) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Animate skill progress bars
function animateSkillBars() {
    skillProgress.forEach((bar, index) => {
        setTimeout(() => {
            const progress = bar.dataset.progress;
            bar.style.width = progress + '%';
        }, index * 200);
    });
}

// Project filtering
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Project Modal Functions
function openProjectModal(projectId) {
    const projectData = {
        project1: {
            title: 'Enterprise IoT Framework Architecture',
            category: 'Enterprise Architecture',
            description: 'Comprehensive quality validation across 15+ interconnected microservices for Dell\'s IoT platform. This project involved creating a unified testing framework that could handle complex data flows and integration points.',
            challenge: 'Dell\'s flagship IoT platform required comprehensive quality validation across 15+ interconnected microservices, each with different data formats and integration points.',
            solution: 'Designed and implemented a unified testing framework using Java, Selenium WebDriver, and custom API validation tools, creating automated test suites that validated data flow across the entire ecosystem.',
            impact: '70% reduction in integration testing time and caught 40+ critical defects before production deployment, saving an estimated $2M in potential downtime costs.',
            technologies: ['Java', 'Selenium WebDriver', 'Microservices', 'API Testing', 'Jenkins', 'Docker'],
            metrics: [
                { label: 'Testing Time Reduction', value: '70%' },
                { label: 'Critical Defects Caught', value: '40+' },
                { label: 'Cost Savings', value: '$2M' },
                { label: 'Services Covered', value: '15+' }
            ]
        },
        project2: {
            title: 'AI-Driven Test Optimization',
            category: 'AI Innovation',
            description: 'Machine learning algorithms for intelligent test selection and parallel execution strategies. This revolutionary approach transformed how we approach test suite optimization.',
            challenge: 'Our comprehensive test suite was taking 6+ hours to execute, creating bottlenecks in our CI/CD pipeline and delaying critical releases.',
            solution: 'Implemented intelligent test selection using machine learning algorithms to identify high-impact test cases, combined with parallel execution strategies and smart failure analysis.',
            impact: 'Reduced test execution time by 65% while maintaining 98% defect detection accuracy, enabling 3x faster release cycles.',
            technologies: ['Python', 'Machine Learning', 'CI/CD', 'Test Analytics', 'TensorFlow', 'Jenkins'],
            metrics: [
                { label: 'Execution Time Reduction', value: '65%' },
                { label: 'Defect Detection Rate', value: '98%' },
                { label: 'Faster Releases', value: '3x' },
                { label: 'ML Accuracy', value: '94%' }
            ]
        },
        project3: {
            title: 'Generative AI Test Data Innovation',
            category: 'AI Innovation',
            description: 'AI system generating realistic test data for complex financial algorithms with comprehensive edge case coverage. This groundbreaking solution revolutionized our approach to test data management.',
            challenge: 'Creating comprehensive test datasets for complex financial algorithms required massive manual effort and often missed edge cases that appeared in production.',
            solution: 'Built a Generative AI system that creates realistic, diverse test data based on production patterns, automatically generating thousands of test scenarios including rare edge cases.',
            impact: 'Increased test coverage by 300% and identified 25+ previously undetected edge case bugs, improving overall application reliability by 45%.',
            technologies: ['Generative AI', 'Python', 'Data Analytics', 'Financial Testing', 'GPT Models', 'Pandas'],
            metrics: [
                { label: 'Coverage Increase', value: '300%' },
                { label: 'Edge Cases Found', value: '25+' },
                { label: 'Reliability Boost', value: '45%' },
                { label: 'Data Generation Speed', value: '100x' }
            ]
        },
        project4: {
            title: 'Performance Testing Excellence',
            category: 'Performance Testing',
            description: 'Comprehensive performance testing across distributed microservices architecture with advanced monitoring and optimization strategies.',
            challenge: 'Load testing implementation across a distributed microservices architecture with complex user workflows and varying traffic patterns.',
            solution: 'Developed comprehensive performance testing strategies using advanced load testing tools, creating realistic user journey simulations and establishing automated performance regression detection.',
            impact: 'Identified and resolved performance bottlenecks before production launch, ensuring 99.9% uptime during peak traffic periods and supporting 10x user growth.',
            technologies: ['Load Testing', 'Microservices', 'Performance Analytics', 'Monitoring', 'JMeter', 'Grafana'],
            metrics: [
                { label: 'Uptime Achieved', value: '99.9%' },
                { label: 'User Growth Supported', value: '10x' },
                { label: 'Production Issues', value: '0' },
                { label: 'Response Time Improvement', value: '60%' }
            ]
        }
    };
    
    const project = projectData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="modal-project">
            <div class="modal-header">
                <span class="modal-category">${project.category}</span>
                <h2 class="modal-title">${project.title}</h2>
                <p class="modal-description">${project.description}</p>
            </div>
            
            <div class="modal-content-section">
                <h3>Challenge</h3>
                <p>${project.challenge}</p>
            </div>
            
            <div class="modal-content-section">
                <h3>Solution</h3>
                <p>${project.solution}</p>
            </div>
            
            <div class="modal-content-section">
                <h3>Impact</h3>
                <p class="impact-highlight">${project.impact}</p>
            </div>
            
            <div class="modal-tech">
                <h3>Technologies Used</h3>
                <div class="modal-tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-metrics">
                <h3>Key Metrics</h3>
                <div class="metrics-grid">
                    ${project.metrics.map(metric => `
                        <div class="metric-item">
                            <div class="metric-value">${metric.value}</div>
                            <div class="metric-label">${metric.label}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Resume Download Function
function downloadResume() {
    const btn = document.querySelector('.download-btn');
    if (!btn) {
        window.open(RESUME_VIEW_URL, '_blank', 'noopener');
        return;
    }

    const btnContent = btn.querySelector('.btn-content');
    const loader = btn.querySelector('.btn-loader');
    const progressBar = btn.querySelector('.progress-bar');

    if (btnContent) {
        btnContent.style.opacity = '0.7';
    }
    if (loader) {
        loader.style.display = 'block';
    }
    btn.disabled = true;

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progressBar) {
            progressBar.style.width = Math.min(progress, 100) + '%';
        }

        if (progress >= 100) {
            clearInterval(progressInterval);

            const link = document.createElement('a');
            link.href = RESUME_DOWNLOAD_URL;
            link.download = 'Mallikarjun_SK_Resume.pdf';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            try {
                link.click();
            } catch (error) {
                window.open(RESUME_VIEW_URL, '_blank', 'noopener');
            }
            document.body.removeChild(link);

            if (btnContent) {
                btnContent.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span>Downloaded!</span>
                `;
            }
            if (loader) {
                loader.style.display = 'none';
            }

            setTimeout(() => {
                if (btnContent) {
                    btnContent.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Download PDF</span>
                    `;
                    btnContent.style.opacity = '1';
                }
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
                btn.disabled = false;
            }, 2000);
        }
    }, 100);
}
// // Resume Download Function
// function downloadResume(e) {
//     // Prevent the anchor's default navigation so we can open the direct download ourselves
//     if (e && e.preventDefault) e.preventDefault();

//     const btn = document.querySelector('.download-btn');
//     const btnContent = btn ? btn.querySelector('.btn-content') : null;
//     const loader = btn ? btn.querySelector('.btn-loader') : null; // may be null
//     const progressBar = btn ? btn.querySelector('.progress-bar') : null;

//     // The direct-download URL for Google Drive (use this to instantly open download in a new tab)
//     const directUrl = 'https://drive.google.com/uc?export=download&id=1_YT8jlIaFDrcmak-Bc_QPM31ALbZe-JH';

//     // Immediate open using the user gesture so browsers won't block it
//     try {
//         window.open(directUrl, '_blank', 'noopener');
//     } catch (err) {
//         // fallback: set location (may navigate current tab)
//         window.location.href = directUrl;
//     }

//     if (!btn) return;

//     // Show loading state safely (only if elements exist)
//     if (btnContent) btnContent.style.opacity = '0.7';
//     if (loader) loader.style.display = 'block';
//     btn.setAttribute('aria-disabled', 'true');
//     btn.classList.add('downloading');

//     // Simulate download progress
//     let progress = 0;
//     const progressInterval = setInterval(() => {
//         progress += Math.random() * 20;
//         if (progressBar) progressBar.style.width = Math.min(progress, 100) + '%';

//         if (progress >= 100) {
//             clearInterval(progressInterval);

//             // Optional: still try to trigger a programmatic download as a fallback (may be blocked)
//             const fallbackLink = document.createElement('a');
//             fallbackLink.href = directUrl;
//             fallbackLink.download = 'Mallikarjun_SK_Resume.pdf';
//             // Only try to click if it's likely allowed — this is just a fallback
//             try {
//                 fallbackLink.click();
//             } catch (err) {
//                 // ignore if blocked
//             }

//             // Show success state
//             if (btnContent) {
//                 btnContent.innerHTML = `
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                     <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                     <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
//                 </svg>
//                 <span>Downloaded!</span>
//                 `;
//             }

//             // Reset after delay
//             setTimeout(() => {
//                 if (btnContent) {
//                     btnContent.innerHTML = `
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                         <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                         <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                         <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                     </svg>
//                     <span>Download PDF</span>
//                     `;
//                     btnContent.style.opacity = '1';
//                 }
//                 if (loader) loader.style.display = 'none';
//                 if (progressBar) progressBar.style.width = '0%';
//                 btn.removeAttribute('aria-disabled');
//                 btn.classList.remove('downloading');
//             }, 2000);
//         }
//     }, 100);
// }

// Contact Form Handler
function setupContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        // Show loading state
        btnText.textContent = 'Sending...';
        btnLoader.style.display = 'block';
        btnIcon.style.display = 'none';
        submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success state
        btnText.textContent = 'Message Sent!';
        btnLoader.style.display = 'none';
        submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        
        // Reset form
        contactForm.reset();
        
        // Show notification
        showNotification('Message sent successfully! I\'ll get back to you soon.');
        
        // Reset button after delay
        setTimeout(() => {
            btnText.textContent = 'Send Message';
            btnIcon.style.display = 'block';
            submitBtn.style.background = 'var(--accent-gradient)';
            submitBtn.disabled = false;
        }, 3000);
    });
}

// Email copy functionality
function copyEmail() {
    const email = 'kmallikarjuns01@gmail.com';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Email copied to clipboard!');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accent-primary);
        color: var(--bg-primary);
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add CSS for notification animations
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add notification styles
    addNotificationStyles();
    
    // Setup project filters
    setupProjectFilters();
    
    // Setup contact form
    setupContactForm();
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1500);
    
    // Add CSS for additional animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modal-project {
            padding: var(--spacing-xl);
        }
        
        .modal-category {
            background: var(--accent-gradient);
            color: white;
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--radius-sm);
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .modal-title {
            color: var(--text-primary);
            margin: var(--spacing-lg) 0 var(--spacing-md);
            font-size: 2rem;
        }
        
        .modal-description {
            color: var(--text-secondary);
            font-size: 1.125rem;
            line-height: 1.6;
            margin-bottom: var(--spacing-xl);
        }
        
        .modal-content-section {
            margin-bottom: var(--spacing-xl);
        }
        
        .modal-content-section h3 {
            color: var(--accent-primary);
            font-size: 1.25rem;
            margin-bottom: var(--spacing-sm);
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.05em;
        }
        
        .modal-content-section p {
            color: var(--text-secondary);
            line-height: 1.7;
        }
        
        .modal-tech {
            margin-bottom: var(--spacing-xl);
        }
        
        .modal-tech h3 {
            color: var(--accent-primary);
            font-size: 1.25rem;
            margin-bottom: var(--spacing-md);
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.05em;
        }
        
        .modal-tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-xs);
        }
        
        .modal-metrics {
            margin-bottom: var(--spacing-xl);
        }
        
        .modal-metrics h3 {
            color: var(--accent-primary);
            font-size: 1.25rem;
            margin-bottom: var(--spacing-md);
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.05em;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: var(--spacing-md);
        }
        
        .metric-item {
            text-align: center;
            padding: var(--spacing-md);
            background: rgba(59, 130, 246, 0.05);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: var(--radius-md);
            backdrop-filter: blur(10px);
        }
        
        .metric-value {
            font-size: 1.75rem;
            font-weight: 800;
            color: var(--accent-primary);
            margin-bottom: var(--spacing-xs);
        }
        
        .metric-label {
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
    `;
    document.head.appendChild(additionalStyles);
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                smoothScroll(href);
                closeMobileMenu();
            } else if (href.startsWith('mailto:')) {
                window.location.href = href;
            }
        });
    });
    
    // Back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Email button click handler
    const emailButtons = document.querySelectorAll('a[href^="mailto:"]');
    emailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            copyEmail();
            // Also open email client
            setTimeout(() => {
                window.location.href = e.target.closest('a').href;
            }, 500);
        });
    });
});

// Throttled scroll event listeners
window.addEventListener('scroll', throttle(() => {
    updateScrollProgress();
    handleBackToTop();
    handleNavbarScroll();
    handleParallax();
}, 16)); // ~60fps

// Add CSS for particles animation
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Preload critical resources
function preloadResources() {
    const criticalImages = [];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Add loading class removal
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Close modal when clicking overlay
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeProjectModal();
        }
    });
}

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeProjectModal();
    }
});

// Global function to make it accessible from HTML
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.downloadResume = downloadResume;

// Smooth scroll for hero scroll indicator
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Add particle effect to hero background
function createParticles() {
    const particles = document.querySelector('.particles');
    if (!particles) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'var(--accent-primary)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particles.appendChild(particle);
    }
}

// Initialize particles after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createParticles, 1000);
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Add cursor followers for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .expertise-card, .work-card, .insight-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        el.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });
});
