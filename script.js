// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', function() {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
    });
    
    // Links and buttons hover effect
    const links = document.querySelectorAll('a, button, .filter-btn, .social-link, .tag');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.width = '0';
            cursor.style.height = '0';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderWidth = '3px';
            cursorFollower.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.borderWidth = '2px';
            cursorFollower.style.backgroundColor = 'transparent';
        });
    });
    
    // Sticky header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Dark/Light theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.querySelector('body');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category').includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') + '%';
            bar.style.width = progress;
        });
    }
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStatNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 20); // Update every 20ms
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        });
    }
    
    // Intersection Observer for animations
    const skillSection = document.querySelector('.skills');
    const aboutSection = document.querySelector('.about');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === skillSection) {
                    animateSkillBars();
                } else if (entry.target === aboutSection) {
                    animateStatNumbers();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillSection);
    observer.observe(aboutSection);
    
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // Form is valid, you would normally send the data to a server here
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        // Check if particlesJS is defined
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#2563eb'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        },
                        polygon: {
                            nb_sides: 5
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#2563eb',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 3,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        } else {
            console.error('particlesJS is not defined. Make sure the particles.js library is included.');
        }
    }
});