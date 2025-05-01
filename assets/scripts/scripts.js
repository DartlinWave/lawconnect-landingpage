document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const comments = document.querySelectorAll('.comment-box');
    const totalComments = comments.length;
    const displayCount = 3;
    const dots = document.querySelectorAll('.dot');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    function updateCarousel() {
        comments.forEach((comment, index) => {
            if (index >= currentIndex && index < currentIndex + displayCount) {
                comment.style.display = 'block';
            } else {
                comment.style.display = 'none';
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex / (displayCount - 2)));
        });

        leftArrow.classList.toggle('disabled', currentIndex <= 0);
        rightArrow.classList.toggle('disabled', currentIndex + displayCount >= totalComments);
    }

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updateCarousel();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex + displayCount < totalComments) {
            currentIndex += 1;
            updateCarousel();
        }
    });

    updateCarousel();
});
