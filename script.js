lucide.createIcons();

const menuItems = [
    {
        id: 1,
        name: 'Signature Kopi Susu',
        desc: 'Varian Es Kopi Susu dari Juu Kyuu Coffe.',
        price: 'Rp 28.000',
        image: 'Assets/Fav Menu.jpg',
        tag: 'Popular'
    },
    {
        id: 2,
        name: 'Chocolate Latte',
        desc: 'Perpaduan espresso, susu creamy, dan cokelat premium yang lembut dalam setiap tegukan.',
        price: 'Rp 33.000',
        image: 'Assets/Chocolate.jpg',
        tag: null
    },
    {
        id: 3,
        name: 'Red Velvet',
        desc: 'Lembut, creamy, dan kaya rasa red velvet yang khas.',
        price: 'Rp 33.000',
        image: 'Assets/Red Velvet.jpg',
        tag: null
    },
    {
        id: 4,
        name: 'Hot Latte',
        desc: 'Perpaduan espresso dan susu hangat dengan tekstur lembut dan creamy.',
        price: 'Rp 28.000',
        image: 'Assets/Hot Latte.jpg',
        tag: 'Popular'
    },
    {
        id: 5,
        name: 'Lemonila Smoothies',
        desc: 'Perpaduan lemon segar yang menyegarkan dengan tekstur smoothie yang lembut.',
        price: 'Rp 32.000',
        image: 'Assets/Susu.jpg',
        tag: 'Must Try'
    },
    {
        id: 6,
        name: 'Creamy Cookie',
        desc: 'Minuman creamy dengan cita rasa cookies yang manis dan memanjakan.',
        price: 'Rp 30.000',
        image: 'Assets/xx.jpg',
        tag: null    },];

function renderMenu(filter = 'all') {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';
    
    let filteredItems;
    if (filter === 'all') {
        filteredItems = menuItems;
    } else if (filter === 'main') {
        filteredItems = menuItems.filter(item => item.tag !== null);
    } else {
        filteredItems = menuItems.filter(item => item.category === filter);
    }
    
    filteredItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 fade-in-up`;
        card.style.animationDelay = `${index * 100}ms`;

        card.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                ${item.tag ? `<span class="absolute top-4 right-4 bg-yuu-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">${item.tag}</span>` : ''}
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button class="bg-white text-yuu-brown px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Details</button>
                </div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-serif font-bold text-yuu-brown group-hover:text-yuu-red transition-colors">${item.name}</h3>
                    <span class="text-yuu-gold font-bold whitespace-nowrap">${item.price}</span>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed">${item.desc}</p>
            </div>
        `;
        grid.appendChild(card);
    });

    observeElements();
}

function filterMenu(category) {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-yuu-brown', 'text-white');
        btn.classList.add('text-yuu-brown');
        if (btn.getAttribute('onclick').includes(category)) {
            btn.classList.add('bg-yuu-brown', 'text-white');            btn.classList.remove('text-yuu-brown');
        }    });

    renderMenu(category);
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
});

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-md', 'bg-white/90');
        nav.classList.remove('py-4');
        nav.classList.add('py-2');
    } else {
        nav.classList.remove('shadow-md', 'bg-white/90');
        nav.classList.remove('py-2');
        nav.classList.add('py-4');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderMenu('all');
    observeElements();
});
