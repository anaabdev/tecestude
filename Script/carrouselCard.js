const prevButton = document.querySelector('.btn-prev');
        const nextButton = document.querySelector('.btn-next');
        const carousel = document.querySelector('.carousel-cards');

        const scrollAmount = 252;

        nextButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollAmount, 
                behavior: 'smooth'  
            });
        });

        prevButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'  
            });
        });
