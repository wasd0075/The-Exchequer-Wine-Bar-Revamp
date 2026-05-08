import { LightningElement } from 'lwc';

export default class Banner extends LightningElement {
    currentIndex = 0;
    interval;

    renderedCallback() {
        const slides = this.template.querySelectorAll('.carousel-slide');
        const dots = this.template.querySelectorAll('.dot');
        const leftArrow = this.template.querySelector('.carousel-arrow.left');
        const rightArrow = this.template.querySelector('.carousel-arrow.right');

        if (!slides.length || !dots.length || !leftArrow || !rightArrow) {
            return;
        }

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === index);
            });
            this.currentIndex = index;
        };

        const nextSlide = () => {
            showSlide((this.currentIndex + 1) % slides.length);
        };

        const prevSlide = () => {
            showSlide((this.currentIndex - 1 + slides.length) % slides.length);
        };

        const startCarousel = () => {
            this.interval = setInterval(nextSlide, 4000);
        };

        const resetCarousel = () => {
            clearInterval(this.interval);
            startCarousel();
        };

        // Event Listeners
        rightArrow.addEventListener("click", () => {
            nextSlide();
            resetCarousel();
        });

        leftArrow.addEventListener("click", () => {
            prevSlide();
            resetCarousel();
        });

        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                const index = parseInt(dot.getAttribute("data-slide"));
                showSlide(index);
                resetCarousel();
            });
        });

        showSlide(this.currentIndex);
        startCarousel();
    }
}
