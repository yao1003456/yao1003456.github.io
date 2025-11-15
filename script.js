function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

let currentOpenModal = null;
const MODAL_VISIBLE_CLASS = "modal--visible";
const MODAL_PARENT_ACTIVE_CLASS = "color-container--modal-open";

function setModalParentState(modal, isActive) {
  const parentCard = modal?.closest(".color-container");
  if (parentCard) {
    parentCard.classList.toggle(MODAL_PARENT_ACTIVE_CLASS, Boolean(isActive));
  }
}

function isAnyModalVisible() {
  return Boolean(document.querySelector(`.modal.${MODAL_VISIBLE_CLASS}`));
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  if (currentOpenModal && currentOpenModal !== modal) {
    closeModal(currentOpenModal);
  }

  modal.classList.add(MODAL_VISIBLE_CLASS);
  setModalParentState(modal, true);
  currentOpenModal = modal;
  lockBodyScroll();
  resetCarousel(modal);
}

function closeModal(modalOrId) {
  const modal =
    typeof modalOrId === "string"
      ? document.getElementById(modalOrId)
      : modalOrId;
  if (!modal) return;

  setModalParentState(modal, false);
  modal.classList.remove(MODAL_VISIBLE_CLASS);

  if (currentOpenModal === modal) {
    currentOpenModal = null;
  }

  setTimeout(() => {
    if (!isAnyModalVisible()) {
      unlockBodyScroll();
    }
  }, 300);
}

function lockBodyScroll() {
  document.body.classList.add("modal-open");
}

function unlockBodyScroll() {
  document.body.classList.remove("modal-open");
}

function resetCarousel(modal) {
  const carousels = modal.querySelectorAll(".carousel");
  carousels.forEach((carousel) => {
    carousel.dataset.currentIndex = "0";
    const images = carousel.querySelector(".carousel-images");
    if (images) {
      images.style.transform = "translateX(0%)";
    }
  });
}

function changeSlide(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const images = carousel.querySelector(".carousel-images");
  if (!images) return;

  const imageCount = images.children.length;
  if (!imageCount) return;

  let currentIndex = parseInt(carousel.dataset.currentIndex || "0", 10);
  currentIndex = (currentIndex + direction + imageCount) % imageCount;

  carousel.dataset.currentIndex = currentIndex.toString();
  images.style.transform = `translateX(${-currentIndex * 100}%)`;
}

function prevSlide(carouselId, event) {
  if (event) event.stopPropagation();
  changeSlide(carouselId, -1);
}

function nextSlide(carouselId, event) {
  if (event) event.stopPropagation();
  changeSlide(carouselId, 1);
}

function initializeModals() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && currentOpenModal) {
      closeModal(currentOpenModal);
    }
  });

  const carouselButtons = document.querySelectorAll(
    "[data-carousel-target][data-carousel-direction]"
  );

  carouselButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const { carouselTarget, carouselDirection } = button.dataset;
      const direction = Number(carouselDirection);

      if (!carouselTarget || Number.isNaN(direction)) return;

      changeSlide(carouselTarget, direction);
    });
  });
}

document.addEventListener("DOMContentLoaded", initializeModals);
