// for navBar

const hamburger = document.querySelector('#hamburger-6');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-active'); // animation
  navbar.classList.toggle('open');         // show / hide
});


