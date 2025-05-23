// Constants
const API_URL = '/api/listings';
const STORAGE_KEY = 'shortlistedDesigners';

// State management
let designers = [];
let shortlistedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
let currentFilter = 'all';

// DOM Elements
const cardGrid = document.getElementById('cardGrid');
const cardTemplate = document.getElementById('cardTemplate');
const cardCount = document.getElementById('cardCount');
const filterChips = document.querySelectorAll('.filter-chip');

// Utility functions
const createStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push('<span class="star">★</span>');
        } else if (i === fullStars && hasHalfStar) {
            stars.push('<span class="star">★</span>');
        } else {
            stars.push('<span class="star">☆</span>');
        }
    }

    return stars.join('');
};

const updateCardCount = () => {
    const count = currentFilter === 'all' 
        ? designers.length 
        : designers.filter(d => shortlistedIds.has(d.id)).length;
    cardCount.textContent = count;
};

const toggleShortlist = (designerId) => {
    if (shortlistedIds.has(designerId)) {
        shortlistedIds.delete(designerId);
    } else {
        shortlistedIds.add(designerId);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...shortlistedIds]));
    renderCards();
};

const renderCards = () => {
    cardGrid.innerHTML = '';
    
    const filteredDesigners = currentFilter === 'all'
        ? designers
        : designers.filter(d => shortlistedIds.has(d.id));

    filteredDesigners.forEach(designer => {
        const card = cardTemplate.content.cloneNode(true);
        
        // Set card content
        card.querySelector('.card__profile-img').src = designer.profile_img;
        card.querySelector('.card__name').textContent = designer.name;
        card.querySelector('.card__specialty').textContent = designer.specialty;
        card.querySelector('.card__rating').innerHTML = createStarRating(designer.rating);
        card.querySelector('.card__projects').textContent = `${designer.projects} projects`;
        card.querySelector('.card__rate').textContent = designer.rate;
        card.querySelector('.card__availability').textContent = `Available in ${designer.availability}`;
        
        // Set shortlist button state
        const shortlistBtn = card.querySelector('.card__shortlist-btn');
        if (shortlistedIds.has(designer.id)) {
            shortlistBtn.classList.add('active');
        }
        
        // Add event listener
        shortlistBtn.addEventListener('click', () => toggleShortlist(designer.id));
        
        cardGrid.appendChild(card);
    });
    
    updateCardCount();
};

// Event Listeners
filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('filter-chip--active'));
        chip.classList.add('filter-chip--active');
        currentFilter = chip.dataset.filter;
        renderCards();
    });
});

// Fetch data and initialize
const fetchDesigners = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        designers = await response.json();
        renderCards();
    } catch (error) {
        console.error('Error fetching designers:', error);
        // Fallback to sample data for development
        designers = [
            {
                id: '1',
                name: 'Sarah Johnson',
                specialty: 'Modern Interiors',
                rating: 4.5,
                projects: 42,
                rate: '$120/hr',
                profile_img: 'https://randomuser.me/api/portraits/women/1.jpg',
                availability: '2 weeks'
            },
            {
                id: '2',
                name: 'Michael Chen',
                specialty: 'Minimalist Design',
                rating: 4.8,
                projects: 35,
                rate: '$150/hr',
                profile_img: 'https://randomuser.me/api/portraits/men/1.jpg',
                availability: '1 week'
            }
        ];
        renderCards();
    }
};

// Initialize
fetchDesigners(); 