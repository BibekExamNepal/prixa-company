function setLayout(type) {
    const container = document.getElementById('card-container');
    const btnList = document.getElementById('btn-list');
    const btnGrid = document.getElementById('btn-grid');

    if (type === 'grid') {
        container.classList.add('grid-mode');
        btnList.classList.remove('active');
        btnGrid.classList.add('active');

    } else {
        container.classList.remove('grid-mode');
        btnList.classList.add('active');
        btnGrid.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('card-container');
    const btnGrid = document.getElementById('btn-grid');
    const btnList = document.getElementById('btn-list');

    if (container && btnGrid && btnList) {
        container.classList.add('grid-mode');
        btnGrid.classList.add('active');
        btnList.classList.remove('active');
    }

    const cards = document.querySelectorAll('.card-root');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50);
    });

    const tabButtons = document.querySelectorAll('.tab-container .tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;
    const tabContainer = document.querySelector('.tab-container');

    if (tabContainer) {
        tabContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        tabContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            const activeButton = document.querySelector('.tab-container .tab-button.active');
            const allButtons = Array.from(tabButtons);
            const currentIndex = allButtons.indexOf(activeButton);

            if (diff > 0 && currentIndex < allButtons.length - 1) {
                allButtons[currentIndex + 1].click();
            } else if (diff < 0 && currentIndex > 0) {
                allButtons[currentIndex - 1].click();
            }
        }
    }

    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';

        setTimeout(() => {
            fill.style.width = width;
        }, 100);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.style.width;
                fill.style.width = width;
            }
        });
    }, {
        threshold: 0.1
    });

    progressFills.forEach(fill => {
        observer.observe(fill);
    });

    window.addEventListener('resize', () => {
        let resizeTimer;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const container = document.getElementById('card-container');
            if (container) {
                container.style.transition = 'all 0.3s ease-in-out';
            }
        }, 250);
    });

    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            console.log('Settings clicked');
        });
    }

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => {
            cardObserver.observe(card);
        });
    }

    const layoutSwitcher = document.querySelector('.layout-switcher');
    if (layoutSwitcher && window.innerWidth < 1024) {
        layoutSwitcher.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });

        layoutSwitcher.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    }
});