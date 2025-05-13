// Function to toggle the FAQ answers
function toggleFaq(el) {
  const answer = el.querySelector(".faq-answer"); // Get the answer for the clicked FAQ
  const allAnswers = document.querySelectorAll(".faq-answer"); // Get all answers

  // Hide all answers except the clicked one
  allAnswers.forEach((a) => {
    if (a !== answer) a.style.display = "none";
  });

  // Toggle display of the clicked answer
  answer.style.display = answer.style.display === "block" ? "none" : "block";
}

// Slider logic
const slidesContainer = document.getElementById("slidesContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("sliderDots");
const slideItems = slidesContainer.children;
const totalSlides = slideItems.length;
const visibleSlides = 3; // number of items visible at once
let currentIndex = 0;

// Calculate how many “pages” of slides there are:
const pagesCount = totalSlides - visibleSlides + 1;

// Build pagination dots
for (let i = 0; i < pagesCount; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.addEventListener("click", () => goToPage(i));
  dotsWrap.append(dot);
}
updateDots();

// Attach arrow events
prevBtn.addEventListener("click", () => goToPage(currentIndex - 1));
nextBtn.addEventListener("click", () => goToPage(currentIndex + 1));

function goToPage(pageIdx) {
  // clamp between 0 and last page
  currentIndex = Math.max(0, Math.min(pageIdx, pagesCount - 1));
  // scroll by container width / visible
  const step = slidesContainer.clientWidth / visibleSlides;
  slidesContainer.scrollTo({ left: step * currentIndex, behavior: "smooth" });
  updateDots();
}

function updateDots() {
  Array.from(dotsWrap.children).forEach((d, i) =>
    d.classList.toggle("active", i === currentIndex)
  );
}

// Keep alignment on window resize
window.addEventListener("resize", () => {
  const step = slidesContainer.clientWidth / visibleSlides;
  slidesContainer.scrollTo({ left: step * currentIndex });
});


// animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target); // Optional: Animate only once
      }
    });
  },
  {
    threshold: 0.1, // Trigger when 10% visible
  }
);

// Watch all elements with animation class
document
  .querySelectorAll(".fade-in-up, .slide-in-right, .zoom-in")
  .forEach((el) => {
    el.classList.add("before-animate");
    observer.observe(el);
  });



  // Form Validation Logic
   document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;

    // Gather only the required fields: label spans mark them
    const requiredFields = Array.from(form.querySelectorAll('label > span'))
      .map(span => {
        const label = span.parentElement;
        const field = label.nextElementSibling;
        return { field, name: label.firstChild.textContent.trim() };
      });

    // Reset any previous error styles
    requiredFields.forEach(({ field }) => {
      field.style.borderColor = '';
    });

    // Find first empty required
    const empty = requiredFields.find(({ field }) => {
      const val = field.value.trim();
      return val === '' || (field.tagName === 'SELECT' && val === '');
    });

    if (empty) {
      // Highlight and scroll into view
      empty.field.style.borderColor = 'red';
      empty.field.scrollIntoView({ behavior: 'smooth', block: 'center' });
      alert(`Please fill in the required field: "${empty.name}"`);
      return;
    }

    // All required filled → submit the form (or do AJAX, etc.)
    form.submit();
  });