'use strict';
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('#mobile-menu');
const closeButton = panel.querySelector('.menu-close');
function closeMenu(restoreFocus = true) {
  if (!panel.open) return;
  panel.close();
  document.body.classList.remove('nav-open');
  toggle.setAttribute('aria-expanded', 'false');
  if (restoreFocus) toggle.focus({preventScroll: true});
}
toggle.addEventListener('click', () => {
  panel.showModal();
  document.body.classList.add('nav-open');
  toggle.setAttribute('aria-expanded', 'true');
});
closeButton.addEventListener('click', () => closeMenu());
panel.addEventListener('cancel', e => { e.preventDefault(); closeMenu(); });
panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  closeMenu(false);
  const href = a.getAttribute('href');
  if (href.startsWith('#')) {
    const target = document.querySelector(href);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), {once:true});
    }
  }
}));
window.matchMedia('(min-width: 761px)').addEventListener('change', e => { if(e.matches) closeMenu(false); });
document.querySelector('#year').textContent = new Date().getFullYear();
const config = window.GBR_CONFIG || {};
const links = document.querySelector('#contact-links');
function addLink(text, href, primary) { const a = document.createElement('a'); a.textContent = text; a.href = href; a.className = primary ? 'button primary' : 'text-link'; links.append(a); }
const phone = String(config.whatsapp || '').replace(/\D/g, '');
if (/^55\d{10,11}$/.test(phone)) addLink('Conversar pelo WhatsApp ↗', 'https://wa.me/' + phone + '?text=' + encodeURIComponent(config.mensagem || ''), true);
const email = String(config.email || '').trim();
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) addLink(email + ' ↗', 'mailto:' + email, false);
if (links.children.length) document.querySelector('#contact-pending').hidden = true;
