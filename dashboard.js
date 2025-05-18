// =====================
// PROTECT DASHBOARD ACCESS
// =====================
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "index.html";
}

// =====================
// WAIT FOR DOM TO LOAD
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add-btn");
  const selectedList = document.getElementById("selectedList");
  const proceedBtn = document.getElementById("proceedBtn");
  const scheduleSection = document.getElementById("scheduleSection");
  const confirmBtn = document.getElementById("confirmBtn");
  const toast = document.getElementById("toast");

  let selected = [];

  // =====================
  // ADD PROGRAMS TO SELECTION WITH SECTION LABEL
  // =====================
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".program__card");
      const program = card.dataset.program;
      const section = card.dataset.section;
      const fullLabel = `${program} (${section})`;

      // Prevent exact duplicates
      const existingItems = [...selectedList.querySelectorAll("li")].map(li => li.textContent);
      if (!existingItems.includes(fullLabel)) {
        selected.push(fullLabel);
        const li = document.createElement("li");
        li.textContent = fullLabel;
        selectedList.appendChild(li);

        // Show toast notification for added program
        if (toast) {
          toast.textContent = `"${program}" added to selection`;
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 2500);
        }
      }
    });
  });

  // =====================
  // PROCEED TO SCHEDULE
  // =====================
  if (proceedBtn && scheduleSection) {
    proceedBtn.addEventListener("click", () => {
      if (selected.length > 0) {
        scheduleSection.style.display = "block";
        proceedBtn.disabled = true;
      }
    });
  }

  // =====================
  // CONFIRM BOOKING
  // =====================
  if (confirmBtn && toast) {
    confirmBtn.addEventListener("click", () => {
      toast.textContent = "Workout successfully booked!";
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    });
  }
});

// =====================
// LOGOUT FUNCTION
// =====================
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

confirmBtn.addEventListener("click", () => {
  toast.textContent = "Workout successfully booked!";
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    window.location.href = "index.html";
  }, 3000);
});