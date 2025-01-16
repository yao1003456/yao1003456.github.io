function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
  modal.classList.remove('fade-out');
  modal.querySelector('.modal-content').classList.remove('slide-out');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('fade-out');
  modal.querySelector('.modal-content').classList.add('slide-out');
  setTimeout(() => {
    modal.style.display = "none";
  }, 500); // Match the duration of the fadeOut animation
}

// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target == modal) {
      closeModal(modal.id);
    }
  });
}

function nextSlide(carouselId) {
  const carousel = document.querySelector(`#${carouselId} .carousel-images`);
  const slides = carousel.children;
  const slideWidth = slides[0].clientWidth;
  carousel.style.transition = 'transform 0.5s ease-in-out';
  carousel.style.transform = `translateX(-${slideWidth}px)`;
  setTimeout(() => {
    carousel.appendChild(slides[0]);
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(0)';
  }, 500); // Match the duration of the transform transition
}

function prevSlide(carouselId) {
  const carousel = document.querySelector(`#${carouselId} .carousel-images`);
  const slides = carousel.children;
  const slideWidth = slides[0].clientWidth;
  carousel.style.transition = 'none';
  carousel.style.transform = `translateX(-${slideWidth}px)`;
  carousel.insertBefore(slides[slides.length - 1], slides[0]);
  setTimeout(() => {
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = 'translateX(0)';
  }, 50);
}