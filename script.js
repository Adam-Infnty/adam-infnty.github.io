// scripts.js

let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelectorAll('.slide');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 10000); // Change image every 10 seconds
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const contentId = this.getAttribute('onclick').split("'")[1];
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(contentId).classList.add('active');
    });
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Email sending logic here
});
