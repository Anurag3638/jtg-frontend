// Sample data for demonstration
const homeKitchenData = foodData;
const popularItemsData = foodData;

// Render Home Kitchen Grid
function renderHomeKitchenGrid(data) {
    const grid = document.getElementById('homeKitchenGrid');
    grid.innerHTML = '';
    if (!data.length) {
        grid.innerHTML = '<div style="padding:2rem;font-size:1.2rem;">No food found.</div>';
        return;
    }
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            ${item.badge ? `<span class="food-card-badge">${item.badge}</span>` : ''}
            <img src="${item.img}" alt="${item.title}">
            <div class="food-card-content">
                <div>
                    <div class="food-card-title">${item.title}</div>
                    <div class="food-card-price">${item.price}</div>
                </div>
                <div class="food-card-meta">
                    <span>⭐ ${item.rating}</span>
                    <span>⏱️ ${item.time}</span>
                </div>
            </div>
        `;
        card.style.cursor = "pointer";
        card.addEventListener('click', () => {
            window.location.href = `food-detail.html?id=${item._originalIndex}`;
        });
        grid.appendChild(card);
    });
}

// Initial render
renderHomeKitchenGrid(foodData);

// Populate Popular Items Carousel
const popularCarousel = document.getElementById('popularCarousel');
popularItemsData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'popular-card';
    card.innerHTML = `
         ${item.badge ? `<span class="food-card-badge">${item.badge}</span>` : ''}
            <img src="${item.img}" alt="${item.title}">
            <div class="food-card-content">
                <div>
                    <div class="food-card-title">${item.title}</div>
                    <div class="food-card-price">${item.price}</div>
                </div>
                <div class="food-card-meta">
                    <span>⭐ ${item.rating}</span>
                    <span>⏱️ ${item.time}</span>
                </div>
            </div>
    `;
    popularCarousel.appendChild(card);
});

// Carousel Navigation + Auto Slide
const prevBtn = document.getElementById('popularPrev');
const nextBtn = document.getElementById('popularNext');
const cardWidth = 295; // 210px card + 18px gap

function slideCarousel(direction = 1) {
    popularCarousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

// One slide per click
prevBtn.addEventListener('click', () => slideCarousel(-1));
nextBtn.addEventListener('click', () => slideCarousel(1));

// Auto-slide every 5 seconds
let autoSlide = setInterval(() => slideCarousel(1), 5000);

// Pause auto-slide on hover/focus, resume on leave/blur
[popularCarousel, prevBtn, nextBtn].forEach(el => {
    el.addEventListener('mouseenter', () => clearInterval(autoSlide));
    el.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => slideCarousel(1), 5000);
    });
});

// Optional: Reset auto-slide on manual navigation
prevBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => slideCarousel(1), 5000);
});
nextBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => slideCarousel(1), 5000);
});

// Contact Form Submission (prevent default for demo)
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for contacting us!');
});

// --- Modal Logic ---
const requestModal = document.getElementById('requestModal');
const openRequestModal = document.getElementById('openRequestModal');
const cancelRequest = document.getElementById('cancelRequest');
const modalForm = requestModal.querySelector('form');

openRequestModal.addEventListener('click', () => {
    requestModal.classList.add('active');
    document.body.classList.add('modal-open');
});
cancelRequest.addEventListener('click', closeModal);
modalForm.addEventListener('submit', e => {
    e.preventDefault();
    closeModal();
});
function closeModal() {
    requestModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}
requestModal.addEventListener('click', e => {
    if (e.target === requestModal) closeModal();
});

// --- Carousel Hover States ---
const carousel = document.getElementById('popularCarousel');
const cards = [];
function updateCarouselActive() {
    const cardEls = carousel.querySelectorAll('.popular-card');
    cardEls.forEach(card => card.classList.remove('active'));
    // Middle card (visible) gets active
    let scrollLeft = carousel.scrollLeft;
    let cardWidth = cardEls[0]?.offsetWidth || 210;
    let middleIdx = Math.round(scrollLeft / cardWidth) + 1;
    if (cardEls[middleIdx]) cardEls[middleIdx].classList.add('active');
}
document.getElementById('popularPrev').addEventListener('mouseenter', e => e.target.classList.add('active'));
document.getElementById('popularPrev').addEventListener('mouseleave', e => e.target.classList.remove('active'));
document.getElementById('popularNext').addEventListener('mouseenter', e => e.target.classList.add('active'));
document.getElementById('popularNext').addEventListener('mouseleave', e => e.target.classList.remove('active'));
carousel.addEventListener('scroll', updateCarouselActive);
window.addEventListener('load', updateCarouselActive);

// --- Video Play/Pause ---
const video = document.getElementById('promoVideo');
const playBtn = document.getElementById('playPauseBtn');
function updatePlayBtn() {
    if (video.paused) {
        playBtn.classList.remove('playing');
        playBtn.classList.add('paused');
    } else {
        playBtn.classList.remove('paused');
        playBtn.classList.add('playing');
    }
}
playBtn.addEventListener('click', () => {
    if (video.paused) video.play();
    else video.pause();
});
video.addEventListener('click', () => {
    if (video.paused) video.play();
    else video.pause();
});
video.addEventListener('play', updatePlayBtn);
video.addEventListener('pause', updatePlayBtn);
updatePlayBtn();

// --- Prevent body scroll when modal is open ---
const observer = new MutationObserver(() => {
    if (document.body.classList.contains('modal-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

// Search Functionality
document.querySelector('.search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = this.querySelector('input').value.trim().toLowerCase();
    if (!query) {
        // Add _originalIndex to each item
        renderHomeKitchenGrid(foodData.map((item, idx) => ({ ...item, _originalIndex: idx })));
        return;
    }
    const filtered = foodData
        .map((item, idx) => ({ ...item, _originalIndex: idx }))
        .filter(item =>
            item.title.toLowerCase().includes(query) ||
            (item.desc && item.desc.toLowerCase().includes(query))
        );
    renderHomeKitchenGrid(filtered);
});

// Initial render (add _originalIndex)
renderHomeKitchenGrid(foodData.map((item, idx) => ({ ...item, _originalIndex: idx })));

// Hamburger menu toggle for mobile nav
document.getElementById('navToggle').addEventListener('click', function () {
    document.getElementById('navLinks').classList.toggle('active');
});