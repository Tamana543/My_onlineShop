// for navBar
// const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const hamburger = document.querySelector('#hamburger-6');

// function backdropClickHandler() {
//   backdrop.style.display = 'none';
//   sideDrawer.classList.remove('open');
// }

// function menuToggleClickHandler() {
//   backdrop.style.display = 'block';
//   sideDrawer.classList.add('open');
// }

function hamburgerEng(){
  hamburger.classList.toggle("is-active")
}
// backdrop.addEventListener('click', backdropClickHandler);

hamburger.addEventListener('click',hamburgerEng)


