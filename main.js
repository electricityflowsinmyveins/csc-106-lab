// main.js — shared across all pages

function toggleNav() {
  var links = document.getElementById('nav-links');
  if (links) {
    links.classList.toggle('open');
  }
}

// close nav if user clicks outside
document.addEventListener('click', function(e) {
  var nav = document.getElementById('nav-links');
  var btn = document.querySelector('.hamburger');
  if (nav && nav.classList.contains('open')) {
    if (!nav.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      nav.classList.remove('open');
    }
  }
});

// simple scroll-triggered fade-in for sections
window.addEventListener('scroll', function () {
  var elements = document.querySelectorAll('.project-card, .card, .task-item');
  elements.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
});
