// Select the images
const image1 = document.querySelector(".image-1");
const image2 = document.querySelector(".image-2");
const image5 = document.querySelector(".image-5");
const image6 = document.querySelector(".image-6");
const image7 = document.querySelector(".image-7");
const image8 = document.querySelector(".image-8");

// Add a mousemove event listener to the document
document.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event; // Mouse position
  const innerWidth = window.innerWidth; // Window width
  const innerHeight = window.innerHeight; // Window height

  // Calculate the offset based on mouse position
  const xOffset = (clientX / innerWidth - 0.5) * 50; // Fixed 50px movement horizontally
  const yOffset = (clientY / innerHeight - 0.5) * 50; // Fixed 50px movement vertically

  // Apply transform to Image 1
  image1.style.transform = `translate(${xOffset}px, ${yOffset}px)`;

  // Apply transform to Image 2 (in opposite direction for variation)
  image2.style.transform = `translate(${-xOffset}px, ${-yOffset}px)`;

  // Apply transform to Image 5
  image5.style.transform = `translate(${xOffset}px, ${yOffset}px)`;

  // Apply transform to Image 6 (in opposite direction for variation)
  image6.style.transform = `translate(${-xOffset}px, ${-yOffset}px)`;

  // Apply transform to Image 7 (in opposite direction for variation)
  image7.style.transform = `translate(${-xOffset}px, ${-yOffset}px)`;

  // Apply transform to Image 8 (in opposite direction for variation)
  image8.style.transform = `translate(${-xOffset}px, ${-yOffset}px)`;

});

document.addEventListener('scroll', () => {
// Adaptive Smooth Scrolling (Mouse Wheel & Trackpad)
let isScrolling = false;
const animationDuration = 900; // Adjust animation speed (ms)
const easeOut = (t) => 1 - Math.pow(1 - t, 3); // Smooth easing function

function smoothScroll(targetPosition, startTime, startScroll) {
  const currentTime = performance.now();
  const elapsedTime = currentTime - startTime;
  const progress = Math.min(elapsedTime / animationDuration, 1);

  window.scrollTo(0, startScroll + (targetPosition - startScroll) * easeOut(progress));

  if (progress < 1) {
    requestAnimationFrame(() => smoothScroll(targetPosition, startTime, startScroll));
  } else {
    isScrolling = false; // Allow new scrolls
  }
}

document.addEventListener("wheel", (event) => {
  event.preventDefault();
  if (isScrolling) return; // Prevent stacking scrolls

  isScrolling = true;
  
  // **Detect if the user is using a trackpad or mouse**
  let isTrackpad = Math.abs(event.deltaY) < 20; // Trackpads have smaller delta values

  // **Set scroll step dynamically based on input method**
  let stepSize = isTrackpad ? 150 : 400; // Smaller for trackpad, larger for mouse
  
  let direction = event.deltaY > 0 ? 1 : -1;
  let targetScroll = window.scrollY + direction * stepSize;

  requestAnimationFrame(() => smoothScroll(targetScroll, performance.now(), window.scrollY));
}, { passive: false });

});



document.addEventListener("DOMContentLoaded", () => {
  const navbarHeight = document.querySelector(".navbar").offsetHeight; // Get fixed navbar height
  const navLinks = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section");

  // Fix for click-based navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - navbarHeight + 5; // Adjust for navbar height

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

});

let currentOption = 1; // Keep track of the current option

function showDetails(option) {
  const rows = document.querySelectorAll(".table-row");
  const details = document.querySelectorAll(".table-details");
  const visuals = document.querySelectorAll(".visual-content");

  // Reset all rows and hide all details
  rows.forEach((row) => row.classList.remove("expanded"));
  details.forEach((detail) => (detail.style.display = "none"));

  // Expand the selected row and show its details
  const selectedDetails = document.querySelector(`#details${option}`);
  const parentRow = selectedDetails.parentNode;
  parentRow.classList.add("expanded");
  selectedDetails.style.display = "block";

  // Determine the direction of the transition
  const isForward = option > currentOption;

  visuals.forEach((visual) => {
    if (visual.classList.contains("active")) {
      visual.classList.remove("active");

      if (isForward) {
        visual.classList.add("exiting-left");
      } else {
        visual.classList.add("exiting-right");
      }

      setTimeout(() => {
        visual.classList.remove("exiting-left", "exiting-right");
        visual.style.display = "none";
      }, 500); // Match CSS transition duration
    }
  });

  // Show the selected visual with the correct transition
  const selectedVisual = document.querySelector(`#visual-${option}`);

  if (selectedVisual) {
    selectedVisual.style.display = "block"; // Ensure element is visible for animation

    if (isForward) {
      selectedVisual.classList.add("entering-left");
    } else {
      selectedVisual.classList.add("entering-right");
    }

    setTimeout(() => {
      selectedVisual.classList.remove("entering-left", "entering-right");
      selectedVisual.classList.add("active");
    }, 10); // Allow time for animation to apply
  }

  // Update the current option
  currentOption = option;
} 
