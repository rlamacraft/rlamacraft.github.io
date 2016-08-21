/***
** If the local time is after 19:00 or before 7:00 then display the dark-theme by appending the class 'dark-theme' to the root HTML tag
***/
var htmlRoot = document.getElementsByTagName("html")[0];
var currentHour = new Date().getHours();
if(currentHour >= 19 || currentHour <= 6) {
  htmlRoot.classList.add("dark-theme");
}
