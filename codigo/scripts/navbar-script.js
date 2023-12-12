const menuBtn = document.querySelector('.menu-icon');
const menuBtnIcon = document.querySelector('.menu-icon i');
const dropDownMenu = document.querySelector('.dropdown-menu');

if(sessionStorage.getItem('user')){
  document.querySelectorAll('.login-container').forEach(element => {
    element.classList.add("hide");
  })
  
  document.querySelectorAll('.perfil-hide').forEach(element => {
    element.classList.remove("hide");
  })
}else{
  document.querySelectorAll('.login-container').forEach(element => {
    element.classList.remove("hide");
  })
  
  document.querySelectorAll('.perfil-hide').forEach(element => {
    element.classList.add("hide");
  })
}

// Função de clique do botão de menu
menuBtn.onclick = function () {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');

  menuBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}
