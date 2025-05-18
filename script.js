// ========== Modal Open Buttons ==========
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('modal').style.display = 'flex';
  });
});

// ========== Modal Close on Click Outside ==========
window.addEventListener('click', function (e) {
  const modal = document.getElementById('modal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// ========== DOM Ready ==========
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  const dashboardLink = document.getElementById("dashboardLink");
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackMessage = document.getElementById("feedbackMessage");
  const stars = document.querySelectorAll(".star-rating span");
  const ratingInput = document.getElementById("rating");
  const commentsSection = document.getElementById("commentsSection");

  // ========== Modal Open & Close ==========
  document.querySelectorAll(".open-modal, .btn.open-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // ========== Show Dashboard If Logged In ==========
  if (dashboardLink) {
    const isLoggedIn = localStorage.getItem("loggedIn");
    dashboardLink.style.display = isLoggedIn === "true" ? "inline-block" : "none";
  }

  // ========== Registration Form ==========
  const registerForm = document.querySelector('.register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const toast = document.getElementById('successToast');
      toast.classList.add('show');
      toast.style.display = 'block';

      setTimeout(() => {
        toast.classList.remove('show');
        toast.style.display = 'none';
      }, 3000);

      document.getElementById('login-tab').checked = true;
    });
  }

  // ========== Feedback Star Rating ==========
  if (stars.length && ratingInput) {
    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const rating = parseInt(star.getAttribute("data-rating"));
        ratingInput.value = rating;

        stars.forEach((s) => {
          s.classList.toggle("selected", parseInt(s.getAttribute("data-rating")) <= rating);
        });
      });
    });
  }

  // ========== Feedback Form ==========
  if (feedbackForm && commentsSection && feedbackMessage) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const comment = document.getElementById("comment").value.trim();
      const rating = parseInt(ratingInput.value);

      if (!name || !email || !comment || !rating) {
        alert("Please complete all fields and select a star rating.");
        return;
      }

      // Show toast
      feedbackMessage.classList.add("show");
      feedbackMessage.style.display = 'block';
      setTimeout(() => {
        feedbackMessage.classList.remove("show");
        feedbackMessage.style.display = 'none';
      }, 3000);

      // Add comment to display
      const feedback = document.createElement("div");
      feedback.classList.add("comment");
      feedback.innerHTML = `
        <strong>${name}</strong> (${email})
        <div style="color: gold;">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
        <p>${comment}</p>
      `;
      commentsSection.prepend(feedback);

      feedbackForm.reset();
      ratingInput.value = 0;
      stars.forEach((s) => s.classList.remove("selected"));
    });
  }
});

// ========== Login Handler ==========
function loginUser(event) {
  event.preventDefault();

  const loginToast = document.getElementById("loginToast");
  loginToast.classList.add("show");
  loginToast.style.display = "block";

  setTimeout(() => {
    loginToast.classList.remove("show");
    loginToast.style.display = "none";

    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  }, 2000);
}