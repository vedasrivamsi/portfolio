// ===== Page Intro / Splash Loader =====
const pageLoaderEl = document.getElementById('pageLoader');
function hideLoader() {
    if (pageLoaderEl && !pageLoaderEl.classList.contains('loaded')) {
        pageLoaderEl.classList.add('loaded');
    }
}
window.addEventListener('load', () => setTimeout(hideLoader, 300));
setTimeout(hideLoader, 1200);

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

// ===== Scroll Progress Indicator =====
const scrollProgressEl = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgressEl) scrollProgressEl.style.width = `${scrollPercent}%`;
});

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTop');
const backToTopLabel = document.getElementById('backToTopLabel');
let hasShownHint = false;

window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            if (!backToTopBtn.classList.contains('visible')) {
                backToTopBtn.classList.add('visible');
                if (!hasShownHint && backToTopLabel) {
                    hasShownHint = true;
                    backToTopLabel.classList.add('hint-visible');
                    setTimeout(() => {
                        backToTopLabel.classList.remove('hint-visible');
                    }, 3500);
                }
            }
        } else {
            backToTopBtn.classList.remove('visible');
            if (backToTopLabel) backToTopLabel.classList.remove('hint-visible');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Typewriter Effect =====
const roles = [
    'Full Stack Developer',
    'AI Enthusiast',
    'Web Developer',
    'CS Student',
    'Problem Solver',
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

// ===== Smooth Scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== Resume PDF Preview Modal Controller =====
const viewResumeBtn = document.getElementById('viewResumeBtn');
const resumeModal = document.getElementById('resumeModal');
const resumeModalClose = document.getElementById('resumeModalClose');
const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');

function openResumeModal() {
    if (resumeModal) {
        resumeModal.classList.add('active');
        resumeModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeResumeModal() {
    if (resumeModal) {
        resumeModal.classList.remove('active');
        resumeModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            window.open('resume.pdf', '_blank');
        } else {
            openResumeModal();
        }
    });
}

if (resumeModalClose) {
    resumeModalClose.addEventListener('click', closeResumeModal);
}

if (resumeModalBackdrop) {
    resumeModalBackdrop.addEventListener('click', closeResumeModal);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
        closeResumeModal();
    }
});

// ===== Toast Notification Helper =====
const toastEl = document.getElementById('toastNotification');
const toastMessageEl = document.getElementById('toastMessage');
let toastTimer = null;

function showToast(message) {
    if (!toastEl || !toastMessageEl) return;
    toastMessageEl.textContent = message;
    toastEl.classList.add('active');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toastEl.classList.remove('active');
    }, 3200);
}

// ===== Certificate PDF & Image Preview Modal Controller =====
const certModal = document.getElementById('certModal');
const certModalClose = document.getElementById('certModalClose');
const certModalBackdrop = document.getElementById('certModalBackdrop');
const certModalTitle = document.getElementById('certModalTitle');
const certModalBody = document.getElementById('certModalBody');
const certModalDownloadBtn = document.getElementById('certModalDownloadBtn');

function openCertModal(url, title) {
    if (!certModal || !certModalBody) return;

    if (certModalTitle) certModalTitle.textContent = title || 'Certificate Preview';
    if (certModalDownloadBtn) {
        certModalDownloadBtn.setAttribute('href', url);
        const filename = url.split('/').pop();
        certModalDownloadBtn.setAttribute('download', filename);
    }

    const isImage = url.toLowerCase().endsWith('.png') || url.toLowerCase().endsWith('.jpg') || url.toLowerCase().endsWith('.jpeg');
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isImage) {
        // Images work fine in modal on all devices
        certModalBody.innerHTML = `<img src="${url}" alt="${title}" class="cert-img-preview">`;
    } else if (isMobile) {
        // PDFs can't be embedded on mobile — open in new tab instead
        window.open(url, '_blank');
        return;
    } else {
        // Desktop — embed PDF in iframe modal
        certModalBody.innerHTML = `<iframe src="${url}#toolbar=0" title="${title}" class="cert-iframe"></iframe>`;
    }

    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    if (certModal) {
        certModal.classList.remove('active');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (certModalBody) certModalBody.innerHTML = '';
    }
}

document.querySelectorAll('.cert-preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const url = btn.dataset.certUrl || btn.getAttribute('href');
        const title = btn.dataset.certTitle || 'Certificate Preview';
        if (url && url !== '#') {
            e.preventDefault();
            openCertModal(url, title);
        }
    });
});

if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
        closeCertModal();
    }
});

// ===== Copy Email to Clipboard =====
const copyEmailBtn = document.getElementById('copyEmailBtn');
const emailAddress = 'vedasrivamsi127@gmail.com';

if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);
            copyEmailBtn.classList.add('copied');
            copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
            showToast('📋 Email copied to clipboard!');

            setTimeout(() => {
                copyEmailBtn.classList.remove('copied');
                copyEmailBtn.innerHTML = '<i class="far fa-copy"></i> <span>Copy Email</span>';
            }, 2500);
        } catch (err) {
            console.error('Failed to copy email:', err);
            showToast('📧 vedasrivamsi127@gmail.com');
        }
    });
}

// ===== Project Category Filter Tabs Controller =====
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.projects-grid .project-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;

        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        projectCards.forEach(card => {
            const category = card.dataset.category;
            if (filter === 'all' || category === filter) {
                card.classList.remove('is-hidden');
            } else {
                card.classList.add('is-hidden');
            }
        });
    });
});



