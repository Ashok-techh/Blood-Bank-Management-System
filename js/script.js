/* ============================================
   ASHOK BLOOD CARE - JavaScript
   ============================================ */

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2500);
    }
});

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Update Active Nav Link
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

/* ============================================
   HERO SLIDER
   ============================================ */

class HeroSlider {
    constructor() {
        this.container = document.querySelector('.slider-container');
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isAutoPlay = true;
        
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.setupControls();
        this.startAutoPlay();
        this.setupHoverPause();
    }

    setupControls() {
        const prevBtn = document.querySelector('.slider-btn.prev');
        const nextBtn = document.querySelector('.slider-btn.next');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlider();
        this.resetAutoPlay();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
        this.resetAutoPlay();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
        this.resetAutoPlay();
    }

    updateSlider() {
        const offset = -this.currentIndex * 100;
        this.container.style.transform = `translateX(${offset}%)`;

        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });

        const counterElement = document.querySelector('.current-slide');
        if (counterElement) {
            counterElement.textContent = String(this.currentIndex + 1).padStart(2, '0');
        }
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (this.isAutoPlay) {
                this.next();
            }
        }, 5000);
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }

    setupHoverPause() {
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                this.isAutoPlay = false;
            });

            slider.addEventListener('mouseleave', () => {
                this.isAutoPlay = true;
            });
        }
    }
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});

/* ============================================
   BLOOD INVENTORY MODAL
   ============================================ */

const bloodCardData = {
    'A+': { available: 184, reserved: 33, status: 'AVAILABLE' },
    'A-': { available: 42, reserved: 8, status: 'LIMITED' },
    'B+': { available: 156, reserved: 28, status: 'AVAILABLE' },
    'B-': { available: 18, reserved: 4, status: 'CRITICAL' },
    'AB+': { available: 71, reserved: 15, status: 'AVAILABLE' },
    'AB-': { available: 14, reserved: 2, status: 'CRITICAL' },
    'O+': { available: 233, reserved: 42, status: 'AVAILABLE' },
    'O-': { available: 29, reserved: 6, status: 'LIMITED' }
};

class InventoryModal {
    constructor() {
        this.modal = document.getElementById('inventory-modal');
        this.init();
    }

    init() {
        const bloodCards = document.querySelectorAll('.blood-card');
        bloodCards.forEach(card => {
            card.addEventListener('click', () => {
                const group = card.getAttribute('data-group');
                this.openModal(group);
            });
        });

        const closeBtn = document.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        document.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    openModal(bloodGroup) {
        const data = bloodCardData[bloodGroup];
        if (!data) return;

        document.getElementById('modal-blood-group').textContent = bloodGroup;
        document.getElementById('modal-available').textContent = `${data.available} units`;
        document.getElementById('modal-reserved').textContent = `${data.reserved} units`;
        document.getElementById('modal-status').textContent = data.status;
        document.getElementById('modal-updated').textContent = new Date().toLocaleDateString();

        this.modal.classList.add('active');
    }

    closeModal() {
        this.modal.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InventoryModal();
});

/* ============================================
   COUNTER ANIMATION
   ============================================ */

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    statNumbers.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const isAnimated = element.classList.contains('animated');
        
        if (!isAnimated && element.textContent === '0') {
            element.classList.add('animated');
            animateValue(element, 0, target, 2000);
        }
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Trigger counter animation when section comes into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('section-stats')) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.section-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function observeElements() {
    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `slideInUp 0.8s ease forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    observeElements();
});

/* ============================================
   DASHBOARD - ONLY ON DASHBOARD PAGE
   ============================================ */

if (document.querySelector('.dashboard-container')) {
    class Dashboard {
        constructor() {
            this.initCharts();
            this.initDonationFilter();
            this.initSearch();
        }

        initCharts() {
            this.drawDonationChart();
            this.drawInventoryChart();
        }

        drawDonationChart() {
            const canvas = document.getElementById('donation-chart');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            const padding = 40;
            const usableWidth = width - 2 * padding;
            const usableHeight = height - 2 * padding;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Sample data
            const data = [45, 38, 52, 48, 60, 55, 70, 65, 78, 72, 85, 90];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const max = 100;

            // Draw grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 5; i++) {
                const y = padding + (usableHeight / 5) * i;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
            }

            // Draw line
            ctx.strokeStyle = '#dc143c';
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';
            ctx.beginPath();

            data.forEach((value, index) => {
                const x = padding + (usableWidth / (data.length - 1)) * index;
                const y = padding + usableHeight - (value / max) * usableHeight;

                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();

            // Draw area
            ctx.fillStyle = 'rgba(220, 20, 60, 0.1)';
            ctx.lineTo(width - padding, height - padding);
            ctx.lineTo(padding, height - padding);
            ctx.closePath();
            ctx.fill();

            // Draw dots
            ctx.fillStyle = '#dc143c';
            data.forEach((value, index) => {
                const x = padding + (usableWidth / (data.length - 1)) * index;
                const y = padding + usableHeight - (value / max) * usableHeight;
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw axes labels
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            months.forEach((month, index) => {
                const x = padding + (usableWidth / (data.length - 1)) * index;
                ctx.fillText(month, x, height - 10);
            });
        }

        drawInventoryChart() {
            const canvas = document.getElementById('inventory-chart');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            const padding = 40;
            const usableWidth = width - 2 * padding;
            const usableHeight = height - 2 * padding;

            const bloodGroups = ['A+', 'B+', 'AB+', 'O+'];
            const units = [184, 156, 71, 233];
            const colors = ['#dc143c', '#ff6b6b', '#ff9999', '#ffb3b3'];

            const barWidth = usableWidth / bloodGroups.length - 10;
            const maxUnits = 250;

            bloodGroups.forEach((group, index) => {
                const x = padding + index * (barWidth + 10) + 5;
                const barHeight = (units[index] / maxUnits) * usableHeight;
                const y = padding + usableHeight - barHeight;

                ctx.fillStyle = colors[index];
                ctx.fillRect(x, y, barWidth, barHeight);

                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.font = 'bold 14px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(group, x + barWidth / 2, height - 15);

                ctx.fillStyle = '#dc143c';
                ctx.fillText(units[index], x + barWidth / 2, y - 10);
            });
        }

        initDonationFilter() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }

        initSearch() {
            const searchInput = document.querySelector('.search-input');
            const tableRows = document.querySelectorAll('tbody tr');

            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const query = e.target.value.toLowerCase();
                    tableRows.forEach(row => {
                        const text = row.textContent.toLowerCase();
                        row.style.display = text.includes(query) ? '' : 'none';
                    });
                });
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        new Dashboard();
    });
}

/* ============================================
   DONORS PAGE
   ============================================ */

if (document.querySelector('.donors-page')) {
    class DonorManagement {
        constructor() {
            this.modal = document.getElementById('add-donor-modal');
            this.form = document.getElementById('donor-form');
            this.init();
        }

        init() {
            const addBtn = document.querySelector('.add-donor-btn');
            const closeBtn = document.querySelector('.modal-close');
            const filterBtns = document.querySelectorAll('.filter-btn');

            if (addBtn) {
                addBtn.addEventListener('click', () => this.openModal());
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal());
            }

            if (this.form) {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            }

            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            this.setupSearch();
        }

        openModal() {
            this.modal.classList.add('active');
        }

        closeModal() {
            this.modal.classList.remove('active');
            if (this.form) this.form.reset();
        }

        handleSubmit(e) {
            e.preventDefault();
            const formData = new FormData(this.form);
            
            // Simulate donor addition
            const donor = {
                id: 'D-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                name: formData.get('name'),
                age: formData.get('age'),
                bloodGroup: formData.get('bloodGroup'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                location: formData.get('location'),
                lastDonation: 'Never',
                status: 'Active'
            };

            this.addDonorToTable(donor);
            this.closeModal();
            this.showNotification('Donor added successfully!');
        }

        addDonorToTable(donor) {
            const tbody = document.querySelector('tbody');
            if (!tbody) return;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${donor.id}</td>
                <td>${donor.name}</td>
                <td>${donor.bloodGroup}</td>
                <td>${donor.age}</td>
                <td>${donor.location}</td>
                <td>${donor.lastDonation}</td>
                <td><span class="status active">${donor.status}</span></td>
                <td>
                    <button class="action-btn view-btn">View</button>
                    <button class="action-btn edit-btn">Edit</button>
                </td>
            `;
            tbody.insertBefore(row, tbody.firstChild);
        }

        setupSearch() {
            const searchInput = document.querySelector('.search-input');
            const tableRows = document.querySelectorAll('tbody tr');

            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const query = e.target.value.toLowerCase();
                    tableRows.forEach(row => {
                        const text = row.textContent.toLowerCase();
                        row.style.display = text.includes(query) ? '' : 'none';
                    });
                });
            }
        }

        showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => notification.remove(), 3000);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        new DonorManagement();
    });
}

/* ============================================
   BLOOD STOCK PAGE
   ============================================ */

if (document.querySelector('.blood-stock-page')) {
    class BloodStockManager {
        constructor() {
            this.init();
        }

        init() {
            this.setupFilters();
            this.setupSearch();
        }

        setupFilters() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const cards = document.querySelectorAll('.stock-card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    const filter = this.getAttribute('data-filter');
                    cards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-status') === filter) {
                            card.style.display = '';
                            card.style.animation = 'slideInUp 0.5s ease';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }

        setupSearch() {
            const searchInput = document.querySelector('.search-input');
            const cards = document.querySelectorAll('.stock-card');

            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const query = e.target.value.toLowerCase();
                    cards.forEach(card => {
                        const text = card.textContent.toLowerCase();
                        card.style.display = text.includes(query) ? '' : 'none';
                    });
                });
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        new BloodStockManager();
    });
}

/* ============================================
   BLOOD REQUESTS PAGE
   ============================================ */

if (document.querySelector('.requests-page')) {
    class RequestManagement {
        constructor() {
            this.modal = document.getElementById('new-request-modal');
            this.form = document.getElementById('request-form');
            this.init();
        }

        init() {
            const newBtn = document.querySelector('.new-request-btn');
            const closeBtn = document.querySelector('.modal-close');
            const filterBtns = document.querySelectorAll('.filter-btn');

            if (newBtn) {
                newBtn.addEventListener('click', () => this.openModal());
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal());
            }

            if (this.form) {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            }

            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }

        openModal() {
            this.modal.classList.add('active');
        }

        closeModal() {
            this.modal.classList.remove('active');
            if (this.form) this.form.reset();
        }

        handleSubmit(e) {
            e.preventDefault();
            const formData = new FormData(this.form);

            const request = {
                id: 'REQ-' + Math.floor(Math.random() * 9000) + 1000,
                patient: formData.get('patientName'),
                bloodGroup: formData.get('bloodGroup'),
                units: formData.get('units'),
                hospital: formData.get('hospital'),
                priority: formData.get('priority'),
                status: 'Pending'
            };

            this.addRequestToTable(request);
            this.closeModal();
            this.showNotification('Request created successfully!');
        }

        addRequestToTable(request) {
            const tbody = document.querySelector('tbody');
            if (!tbody) return;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.patient}</td>
                <td>${request.bloodGroup}</td>
                <td>${request.units}</td>
                <td>${request.hospital}</td>
                <td><span class="priority ${request.priority.toLowerCase()}">${request.priority}</span></td>
                <td>${new Date().toLocaleDateString()}</td>
                <td><span class="status ${request.status.toLowerCase()}">${request.status}</span></td>
                <td>
                    <button class="action-btn">View</button>
                </td>
            `;
            tbody.insertBefore(row, tbody.firstChild);
        }

        showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => notification.remove(), 3000);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        new RequestManagement();
    });
}

/* ============================================
   GALLERY PAGE
   ============================================ */

if (document.querySelector('.gallery-page')) {
    class GalleryManager {
        constructor() {
            this.init();
        }

        init() {
            this.setupFilters();
            this.setupLightbox();
        }

        setupFilters() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const items = document.querySelectorAll('.gallery-item');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    const filter = this.getAttribute('data-filter');
                    items.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = '';
                            item.style.animation = 'slideInUp 0.5s ease';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
        }

        setupLightbox() {
            const galleryItems = document.querySelectorAll('.gallery-item');
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightbox-image');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const closeBtn = document.querySelector('.lightbox-close');
            const prevBtn = document.querySelector('.lightbox-prev');
            const nextBtn = document.querySelector('.lightbox-next');

            if (!lightbox) return;

            let currentIndex = 0;

            const openLightbox = (index) => {
                currentIndex = index;
                const item = galleryItems[index];
                if (item.style.display === 'none') return;

                lightboxImage.src = item.querySelector('img').src;
                lightboxCaption.textContent = item.querySelector('.gallery-caption')?.textContent || '';
                lightbox.classList.add('active');
            };

            const closeLightbox = () => {
                lightbox.classList.remove('active');
            };

            const nextImage = () => {
                let next = currentIndex + 1;
                while (next < galleryItems.length && galleryItems[next].style.display === 'none') {
                    next++;
                }
                if (next < galleryItems.length) {
                    openLightbox(next);
                }
            };

            const prevImage = () => {
                let prev = currentIndex - 1;
                while (prev >= 0 && galleryItems[prev].style.display === 'none') {
                    prev--;
                }
                if (prev >= 0) {
                    openLightbox(prev);
                }
            };

            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => openLightbox(index));
            });

            if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
            if (prevBtn) prevBtn.addEventListener('click', prevImage);
            if (nextBtn) nextBtn.addEventListener('click', nextImage);

            lightbox?.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            document.addEventListener('keydown', (e) => {
                if (!lightbox.classList.contains('active')) return;
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        new GalleryManager();
    });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mobile touch support for slider
if (document.querySelector('.slider-container')) {
    let touchStartX = 0;
    let touchEndX = 0;

    const slider = document.querySelector('.hero-slider');
    
    slider?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    slider?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const sliderInstance = window.heroSlider;
        if (!sliderInstance) return;

        if (touchEndX < touchStartX - 50) {
            sliderInstance.next();
        }
        if (touchEndX > touchStartX + 50) {
            sliderInstance.prev();
        }
    }

    // Make slider instance available globally
    window.heroSlider = new HeroSlider();
}

// Button click handlers for CTAs
document.querySelectorAll('.btn-primary, .cta-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.includes('DONATE')) {
            e.preventDefault();
            window.location.href = 'donors.html';
        } else if (btn.textContent.includes('DASHBOARD')) {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        } else if (btn.textContent.includes('STOCK')) {
            e.preventDefault();
            window.location.href = 'blood-stock.html';
        }
    });
});

/* ============================================
   DONOR TESTIMONIALS SLIDER
   ============================================ */

if (document.querySelector('.donor-testimonials-section')) {
    class TestimonialsSlider {
        constructor() {
            this.slider = document.getElementById('testimonials-slider');
            this.slides = document.querySelectorAll('.testimonials-slide');
            this.indicators = document.querySelectorAll('.testimonials-indicator');
            this.prevBtn = document.getElementById('testimonials-prev');
            this.nextBtn = document.getElementById('testimonials-next');
            this.currentIndex = 0;
            this.autoPlayInterval = null;
            this.isAutoPlay = true;
            
            this.init();
        }

        init() {
            if (!this.slider) return;
            
            this.setupControls();
            this.startAutoPlay();
            this.setupHoverPause();
        }

        setupControls() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prev());
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
            }

            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });
        }

        next() {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.updateSlider();
            this.resetAutoPlay();
        }

        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.updateSlider();
            this.resetAutoPlay();
        }

        goToSlide(index) {
            this.currentIndex = index;
            this.updateSlider();
            this.resetAutoPlay();
        }

        updateSlider() {
            const offset = -this.currentIndex * 100;
            this.slider.style.transform = `translateX(${offset}%)`;

            this.indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                if (this.isAutoPlay) {
                    this.next();
                }
            }, 6000);
        }

        resetAutoPlay() {
            clearInterval(this.autoPlayInterval);
            this.startAutoPlay();
        }

        setupHoverPause() {
            const container = document.querySelector('.testimonials-slider-container');
            if (container) {
                container.addEventListener('mouseenter', () => {
                    this.isAutoPlay = false;
                });

                container.addEventListener('mouseleave', () => {
                    this.isAutoPlay = true;
                });
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        new TestimonialsSlider();
    });
}

console.log('ASHOK Blood Care - Premium Frontend Loaded');
