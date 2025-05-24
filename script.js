// Sample data for demonstration
const homeKitchenData = [
    { img: 'assets/pizza2.png', title: 'Home made pizza', price: '₹190', badge: '50%', rating: '4.7', time: '50-70 min' },
    { img: 'assets/slice.png', title: 'Home made pizza', price: '₹123', badge: '30%', rating: '4.7', time: '50-70 min' },
    { img: 'assets/cut.png', title: 'Home made pizza', price: '₹190', badge: '20%', rating: '4.7', time: '50-70 min' },
    { img: 'assets/pizza3.png', title: 'Home made pizza', price: '₹190', badge: '', rating: '4.7', time: '50-70 min' },
    { img: 'assets/pizza1.png', title: 'Home made pizza', price: '₹19', badge: '50%', rating: '4.7', time: '50-70 min' },
    { img: 'assets/pizza4.png', title: 'Home made pizza', price: '₹190', badge: '', rating: '4.7', time: '50-70 min' },
    { img: 'assets/pizza5.png', title: 'Home made pizza', price: '₹190', badge: '20%', rating: '4.7', time: '50-70 min' },
    { img: 'assets/pizza6.png', title: 'Home made pizza', price: '₹190', badge: '50%', rating: '4.7', time: '50-70 min' },
    { img: 'assets/pizza2.png', title: 'Home made pizza', price: '₹19', badge: '50%', rating: '4.7', time: '50-70 min' },
    { img: 'assets/slice.png', title: 'Home made pizza', price: '₹190', badge: '', rating: '4.7', time: '50-70 min' },
    { img: 'assets/cut.png', title: 'Home made pizza', price: '₹190', badge: '20%', rating: '4.7', time: '50-70 min' },
    { img: 'assets/pizza3.png', title: 'Home made pizza', price: '₹190', badge: '', rating: '4.7', time: '50-70 min' },
];

const popularItemsData = [
    { img: 'assets/pizza2.png', title: 'Home made pizza', price: '₹190', badge: '20%', rating: '4.7', time: '50-70 min' },
    { img: 'assets/tandoori.jpg', title: 'Tandoori Chicken', price: '₹184', badge: '50%', rating: '4.2', time: '18-23 min' },
    { img: 'assets/chilli-chicken.jpg', title: 'Chilli Chicken', price: '₹116', badge: '50%', rating: '4.1', time: '34-42 min' },
];

// Populate Home Kitchen Grid
const homeKitchenGrid = document.getElementById('homeKitchenGrid');
homeKitchenData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.innerHTML = `
        <div class="food-card-content">
            <img src="${item.img}" alt="${item.title}">
            ${item.badge ? `<span class="food-card-badge">${item.badge}</span>` : ''}
            <div style="padding: 10px;">
                <div class="food-card-title">${item.title}</div>
                <div class="food-card-price">${item.price}</div>
                <div class="food-card-meta">
                    <span>⭐ ${item.rating}</span>
                    <span>⏱️ ${item.time}</span>
                </div>
            </div>
        </div>
    `;
    homeKitchenGrid.appendChild(card);
});

// Populate Popular Items Carousel
const popularCarousel = document.getElementById('popularCarousel');
popularItemsData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'popular-card';
    card.innerHTML = `
        ${item.badge ? `<span class="popular-card-badge">${item.badge}</span>` : ''}
        <img src="${item.img}" alt="${item.title}">
        <div class="popular-card-content">
            <div>
                <div class="popular-card-title">${item.title}</div>
                <div class="popular-card-price">${item.price}</div>
            </div>
            <div class="popular-card-meta">
                <span>⭐ ${item.rating}</span>
                <span>⏱️ ${item.time}</span>
            </div>
        </div>
    `;
    popularCarousel.appendChild(card);
});

// Carousel Navigation
const prevBtn = document.getElementById('popularPrev');
const nextBtn = document.getElementById('popularNext');
prevBtn.addEventListener('click', () => {
    popularCarousel.scrollBy({ left: -220, behavior: 'smooth' });
});
nextBtn.addEventListener('click', () => {
    popularCarousel.scrollBy({ left: 220, behavior: 'smooth' });
});

// Contact Form Submission (prevent default for demo)
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for contacting us!');
});