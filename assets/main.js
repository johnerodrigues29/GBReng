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
if (config.whatsapp || config.email) links.replaceChildren();
function addLink(text, href, primary) { const a = document.createElement('a'); a.textContent = text; a.href = href; a.className = primary ? 'button primary' : 'text-link'; links.append(a); }
const phone = String(config.whatsapp || '').replace(/\D/g, '');
if (/^55\d{10,11}$/.test(phone)) addLink('Conversar pelo WhatsApp ↗', 'https://wa.me/' + phone + '?text=' + encodeURIComponent(config.mensagem || ''), true);
const email = String(config.email || '').trim();
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) addLink(email + ' ↗', 'mailto:' + email, false);
if (links.children.length) document.querySelector('#contact-pending').hidden = true;

// Indica a seção visível na navegação de desktop.
if ('IntersectionObserver' in window) {
 const navLinks = [...document.querySelectorAll('#navigation a[href^="#"]')];
 const observer = new IntersectionObserver(entries => {
  const current = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
  if (!current) return;
  navLinks.forEach(a => { if(a.hash === '#' + current.target.id) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); });
 }, {rootMargin:'-15% 0px -55% 0px',threshold:0});
 document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

// Ampliação do QR na própria página, com foco e retorno ao acionador.
const qrDialog = document.querySelector('#qr-dialog');
let qrTrigger;
let qrScrollY = 0;
let qrPreviousStyle = null;
function closeQR() { if (qrDialog.open) qrDialog.close(); }
document.querySelectorAll('.vcard-block a[href="assets/qr-vcard-gbr.png"]').forEach(link => {
 link.removeAttribute('target');
 link.setAttribute('aria-haspopup', 'dialog');
 link.setAttribute('aria-controls', 'qr-dialog');
 link.addEventListener('click', event => {
  event.preventDefault(); qrTrigger = link; qrScrollY = window.scrollY;
  qrPreviousStyle = document.body.getAttribute('style');
  document.body.style.position = 'fixed';
  document.body.style.top = '-' + qrScrollY + 'px';
  document.body.style.width = '100%';
  qrDialog.showModal();
 });
});
qrDialog.querySelector('.qr-close').addEventListener('click', closeQR);
qrDialog.addEventListener('click', event => {
 const rect = qrDialog.getBoundingClientRect();
 if(event.target === qrDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeQR();
});
qrDialog.addEventListener('close', () => {
 if (qrPreviousStyle === null) document.body.removeAttribute('style'); else document.body.setAttribute('style', qrPreviousStyle);
 const previousBehavior = document.documentElement.style.scrollBehavior;
 document.documentElement.style.scrollBehavior = 'auto';
 window.scrollTo(0, qrScrollY);
 document.documentElement.style.scrollBehavior = previousBehavior;
 qrTrigger?.focus({preventScroll:true});
});
