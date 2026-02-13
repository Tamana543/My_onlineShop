// for navBar
const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');
const hamburger = document.querySelector('.hamburger')

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

function hamburgerEng(){
  hamburger.classList.toggle("is-active")
}
backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);
hamburger.addEventListener('click',hamburgerEng)

// $(document).ready(function(){
//   $(".hamburger").click(function(){
//     $(this).toggleClass("is-active");
//   });
// });
