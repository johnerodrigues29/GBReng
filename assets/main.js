'use strict';
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = navigation.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if(e.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); toggle.focus(); } });
document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();
const config = window.GBR_CONFIG || {};
const links = document.querySelector('#contact-links');
function addLink(text, href, primary) { const a = document.createElement('a'); a.textContent = text; a.href = href; a.className = primary ? 'button primary' : 'text-link'; links.append(a); }
const phone = String(config.whatsapp || '').replace(/\D/g, '');
if (/^55\d{10,11}$/.test(phone)) addLink('Conversar pelo WhatsApp ↗', 'https://wa.me/' + phone + '?text=' + encodeURIComponent(config.mensagem || ''), true);
const email = String(config.email || '').trim();
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) addLink(email + ' ↗', 'mailto:' + email, false);
if (links.children.length) document.querySelector('#contact-pending').hidden = true;
