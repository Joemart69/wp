
// Include fragments: looks for data-include="file.html"
function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  elements.forEach((el) => {
    const file = el.getAttribute("data-include");
    if (!file) return;
    fetch(file)
      .then((r) => {
        if (r.ok) return r.text();
        throw new Error("Page not found.");
      })
      .then((html) => {
        el.innerHTML = html;
        el.removeAttribute("data-include");
        includeHTML(); // handle nested includes if present
      })
      .catch((err) => {
        el.innerHTML = err.message + " | Joemart Xuereb (s3843976)";
      });
  });
}
document.addEventListener("DOMContentLoaded", includeHTML);

// Gallery modal
function openModal(thumb) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modalImg.src = thumb.src;
  modalImg.alt = thumb.alt ? "Expanded " + thumb.alt.toLowerCase() : "Expanded gallery image";
  modal.style.display = "flex";
}
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}
