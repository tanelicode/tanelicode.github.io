const nav = document.querySelector('nav');
const fills = document.querySelectorAll('.bar-fill');

let prev = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.style.transform = y > prev && y > 80 ? 'translateY(-100%)' : 'translateY(0)';
  prev = y;
});

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.style.width = e.target.dataset.w;
    io.unobserve(e.target);
  });
}, { threshold: 0.5 });

fills.forEach(b => {
  b.dataset.w = b.style.width || '70%';
  b.style.width = '0';
  io.observe(b);
});

const secs = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav-links a')];

const secObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { threshold: 0.4 });

secs.forEach(s => secObserver.observe(s));