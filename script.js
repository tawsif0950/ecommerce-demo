// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navItems = document.querySelector('.nav-items');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navItems.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navItems.contains(e.target)) {
        hamburger.classList.remove('active');
        navItems.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
navItems.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navItems.classList.remove('active');
    });
});

// Resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navItems.classList.remove('active');
        }
    }, 250);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Product Card Animations
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Shopping Cart
let cartItems = [];
const cartCount = document.createElement('span');
cartCount.className = 'cart-count';
document.querySelector('.fa-shopping-cart').parentElement.appendChild(cartCount);

function updateCartCount() {
    cartCount.textContent = cartItems.length;
    cartCount.style.display = cartItems.length ? 'block' : 'none';
}

// Add to Cart Animation
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const productInfo = {
            name: card.querySelector('h3').textContent,
            price: card.querySelector('.price').textContent,
            image: card.querySelector('img').src
        };
        
        cartItems.push(productInfo);
        updateCartCount();
        
        // Create floating animation
        const img = card.querySelector('img');
        const clone = img.cloneNode(true);
        const rect = img.getBoundingClientRect();
        const cart = document.querySelector('.fa-shopping-cart');
        const cartRect = cart.getBoundingClientRect();
        
        clone.style.position = 'fixed';
        clone.style.top = rect.top + 'px';
        clone.style.left = rect.left + 'px';
        clone.style.width = rect.width + 'px';
        clone.style.height = rect.height + 'px';
        clone.style.transition = 'all 0.8s ease-in-out';
        clone.style.zIndex = '1000';
        clone.style.borderRadius = '50%';
        
        document.body.appendChild(clone);
        
        setTimeout(() => {
            clone.style.transform = 'scale(0.2)';
            clone.style.top = cartRect.top + 'px';
            clone.style.left = cartRect.left + 'px';
        }, 50);
        
        setTimeout(() => {
            clone.remove();
            showNotification('Item added to cart!');
        }, 800);
    });
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    if (validateEmail(email)) {
        showNotification('Thanks for subscribing! 🎉');
        newsletterForm.reset();
    } else {
        showNotification('Please enter a valid email address');
    }
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-box, .product-card, .category-card').forEach(el => {
    observer.observe(el);
});

// Add dynamic style for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification i {
        color: var(--success-color);
    }
    
    .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--danger-color);
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
    
    .animate {
        animation: fadeInUp 0.6s ease forwards;
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
`;

document.head.appendChild(style);

// Welcome Popup
// Welcome Popup functionality
let popupShown = false;

function showPopup() {
    if (!popupShown && !localStorage.getItem('popupDismissed')) {
        const popup = document.getElementById('welcomePopup');
        if (popup) {
            setTimeout(() => {
                popup.classList.add('show');
                document.body.style.overflow = 'hidden';
                popupShown = true;
            }, 100);
        }
    }
}

function closePopup() {
    const popup = document.getElementById('welcomePopup');
    if (popup) {
        popup.classList.add('closing');
        document.body.style.overflow = '';
        localStorage.setItem('popupDismissed', 'true');
        
        setTimeout(() => {
            popup.classList.remove('show', 'closing');
        }, 300);
    }
}

// Initialize popup functionality
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('welcomePopup');
    
    if (popup) {
        // Show popup with delay
        setTimeout(showPopup, 1500);
        
        // Close popup when clicking outside
        popup.addEventListener('click', (e) => {
            if (e.target.id === 'welcomePopup') {
                closePopup();
            }
        });
        
        // Close with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('show')) {
                closePopup();
            }
        });
        
        // Close button functionality
        const closeButton = popup.querySelector('.close-popup');
        if (closeButton) {
            closeButton.addEventListener('click', closePopup);
        }
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Show popup when page loads with a delay
window.addEventListener('load', () => {
    setTimeout(showPopup, 1500);
});

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('.year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
