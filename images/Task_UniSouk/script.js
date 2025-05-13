// Toggle search input visibility
function toggleSearch() {
  const input = document.getElementById("searchBox");
  input.style.display =
    input.style.display === "inline-block" ? "none" : "inline-block";
}

// Basic content filtering based on search
function searchContent() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const elements = document.querySelectorAll(
    "section, .blog-card, .feature-box, .team-member"
  );

  elements.forEach((el) => {
    if (el.textContent.toLowerCase().includes(query)) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
}

// Toggle navigation links on hamburger click
const hamburger = document.getElementById("hamburger");
const navOverlay = document.getElementById("navOverlay");
const closeBtn = document.getElementById("closeBtn");

hamburger.addEventListener("click", () => {
  navOverlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  navOverlay.classList.remove("active");
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
