function English() {
  var eng = document.getElementsByClassName("english");
  var es = document.getElementsByClassName("spanish");
  for (element of eng) {
      element.style.display = "block";
  }
  for (element of es) {
    element.style.display = "none";
  }
} 

function Spanish() {
  var eng = document.getElementsByClassName("english");
  var es = document.getElementsByClassName("spanish");
  for (element of eng) {
      element.style.display = "none";
  }
  for (element of es) {
    element.style.display = "block";
  }
} 

English();
