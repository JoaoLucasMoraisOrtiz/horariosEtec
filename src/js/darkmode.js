const changeThemeBtn = document.querySelector("#change-theme");

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  //deixa a tabela com o darkmode
  table = document.getElementsByClassName('table-striped');
  if(table[0]){
    if(table[0].classList.contains("table-dark")){
      table[0].classList.remove('table-dark');
    }else{
      table[0].classList.add('table-dark');
    }
  }  
}

// Load light or dark mode
function loadTheme() {
  const darkMode = localStorage.getItem("dark");

  if (darkMode) {
    toggleDarkMode();
  }
}

loadTheme();

changeThemeBtn.addEventListener("change", function () {
  toggleDarkMode();

  // Save or remove dark mode from localStorage
  localStorage.removeItem("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark", 1);
  }
});