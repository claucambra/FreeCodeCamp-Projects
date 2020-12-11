let openCount = false;

function oneButton() {
  if (openCount) {
    closeNav();
  }
  else {
    openNav()
  }
  openCount = !openCount;
}


/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("navbar").style.width = "300px";
  document.getElementById("navbar").style.borderRight = "solid 2px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("navbar").style.width = "0";
  document.getElementById("navbar").style.borderRight = "solid 0px";
} 
