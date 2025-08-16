function includeHTML() {
  const elements = document.querySelectorAll("[w3-include-html]");
  elements.forEach(el => {
    const file = el.getAttribute("w3-include-html");
    if (file) {
      fetch(file)
        .then(response => {
          if (response.ok) return response.text();
          throw new Error("Page not found.");
        })
        .then(data => {
          el.innerHTML = data;
          el.removeAttribute("w3-include-html");
          includeHTML();
        })
        .catch(error => {
          el.innerHTML = error.message + " | Joemart Xuereb (s3843976)";
        });
    }
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
