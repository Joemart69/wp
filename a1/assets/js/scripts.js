document.addEventListener('DOMContentLoaded', async () => {
  const includeEls = document.querySelectorAll('[data-include]');
  for (const el of includeEls) {
    const file = el.getAttribute('data-include');
    if (!file) continue;
    const res = await fetch(file);
    const html = await res.text();
    el.outerHTML = html;
  }
});

document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-bs-target="#imgModal"]');
  if (!a) return;
  const src = a.getAttribute('data-img');
  const img = document.getElementById('imgModalTarget');
  if (img) img.src = src;
});

document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  const key = path.replace('.html','');
  const link = document.querySelector(`[data-nav="${key}"]`);
  if (link) link.classList.add('active');

  const form = document.getElementById('add-skill-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const f = document.getElementById('img');
      const ok = /\.(jpe?g|png|gif|webp)$/i.test(f?.value || '');
      if (!ok) {
        e.preventDefault();
        const alert = document.getElementById('file-alert');
        if (alert) alert.classList.remove('d-none');
        f?.focus();
      }
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
      }
    });
  }
});
