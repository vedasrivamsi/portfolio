// ===== Parallax Blobs =====
const blob1 = document.getElementById('blob1');
const blob2 = document.getElementById('blob2');
const blob3 = document.getElementById('blob3');

let mouseX = 0, mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Parallax effect for blobs
    if (blob1) blob1.style.transform = `translate(${mouseX * 0.05}px, ${mouseY * 0.05}px)`;
    if (blob2) blob2.style.transform = `translate(${mouseX * -0.04}px, ${mouseY * -0.04}px)`;
    if (blob3) blob3.style.transform = `translate(${mouseX * 0.03}px, ${mouseY * -0.03}px)`;
});

// ===== Typewriter Effect =====
const roles = [
    'Web Developer',
    'CS Student',
    'Problem Solver',
    'Tech Enthusiast',
    'Quick Learner'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typewrite() {
    const current = roles[roleIndex];
    typewriterEl.textContent = isDeleting
        ? current.substring(0, charIndex--)
        : current.substring(0, charIndex++);

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex > current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }
    setTimeout(typewrite, speed);
}
typewrite();

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Nav =====
const navToggle = document.getElementById('navToggle');
const mobileOverlay = document.getElementById('mobileNavOverlay');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === current);
    });
});

// ===== Scroll Animations (AOS replacement) =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.aosDelay || 0;
            setTimeout(() => entry.target.classList.add('visible'), delay);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// ===== Stat Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number, .stat-num');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const isDecimal = target % 1 !== 0;
            const duration = 1500;
            const start = performance.now();

            function animate(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = eased * target;
                el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
                if (progress < 1) requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));

// ===== Skill Bar Fill Animation =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(el => skillObserver.observe(el));


// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('contactSubmit');
        btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #2ed573, #00cec9)';
        setTimeout(() => {
            btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            btn.style.background = '';
            e.target.reset();
        }, 3000);
    });
}


// ===== Smooth Scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});



