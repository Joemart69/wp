// Include header/footer
document.addEventListener('DOMContentLoaded', async () => {
  const includeEls = document.querySelectorAll('[data-include]');
  for (const el of includeEls) {
    const file = el.getAttribute('data-include');
    if (!file) continue;
    try {
      const res = await fetch(file, { cache: 'no-cache' });
      const html = await res.text();
      el.outerHTML = html;
    } catch (e) {
      console.error('Include failed for', file, e);
    }
  }
});

// Gallery modal image swap
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-bs-target="#imgModal"]');
  if (!a) return;
  const src = a.getAttribute('data-img');
  const img = document.getElementById('imgModalTarget');
  if (img) img.src = src;
});

// Highlight current nav
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  const key = path.replace('.html', '');
  const link = document.querySelector(`a[data-nav="${key}"]`);
  link?.classList.add('active');
});

// Add form validation (image extension + HTML5 validity)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#add-form');
  if (!form) return;

  const fileInput = form.querySelector('input[type="file"][name="image"]');
  form.addEventListener('submit', (e) => {
    // extension check
    const ok = /\.(jpe?g|png|gif|webp)$/i.test(fileInput?.value || '');
    if (!ok) {
      e.preventDefault();
      document.getElementById('file-alert')?.classList.remove('d-none');
      fileInput?.focus();
    }
    // built-in required/number/select validity
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
    }
  });
});
