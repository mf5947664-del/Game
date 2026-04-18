// تغيير خلفية الـ Navbar عند التمرير
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '1rem 10%';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.padding = '1.5rem 10%';
        navbar.style.boxShadow = 'none';
    }
});

// تأثير ظهور البطاقات عند التمرير (Simple Reveal)
const cards = document.querySelectorAll('.service-card');
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// قائمة الموبايل (تبسيط للأداء)
const mobileMenu = document.getElementById('mobile-menu');
mobileMenu.addEventListener('click', () => {
    alert('يمكنك هنا إضافة قائمة منسدلة جانبية للموبايل');
});
