// Imagem de Perfil

const inputElement = document.getElementById("imagem-input");
const imageContainer = document.getElementById("imagem-container");

inputElement.addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageDataURL = e.target.result;
        imageContainer.style.backgroundImage = `url('${imageDataURL}')`;
    };

    reader.readAsDataURL(file);
});


// Chamar a função infosPerfil quando a página for carregada
document.addEventListener('DOMContentLoaded', function(){
const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');

  // Chamar a função getDetails() com o nome de usuário obtido
  getDetails(username);

  // Chamar a função infosPerfil() para preencher os dados do perfil
  infosPerfil();
});
// Adicionar eventos
document.getElementById('edit_btn').addEventListener('click', habilitarEdicao);
document.getElementById('save_btn').addEventListener('click', editarPerfil);

function LerDados() {
  let strDados = sessionStorage.getItem('user');
  let objDados = JSON.parse(strDados)
  return objDados;
}

function infosPerfil() {
  // Ler os dados do sessionStorage
  let user = LerDados();
    // username
    if(user.username){
      document.getElementById('username').value = user.username;
    }
    else{
      document.getElementById('username-label').classList.add('hide');
      document.getElementById('username').classList.add('hide');
    }

    // nome
    if(user.nome){
      document.getElementById('name').value = user.nome;
    }
    else{
      document.getElementById('name-label').classList.add('hide');
      document.getElementById('name').classList.add('hide');
    }

    // sobrenome
    if(user.sobrenome){
      document.getElementById('lastname').value = user.sobrenome;
    }
    else{
      document.getElementById('sobrenome-label').classList.add('hide');
      document.getElementById('lastname').classList.add('hide');
    }

    // email
    if(user.email){
      document.getElementById('email').value = user.email;
    }
    else{
      document.getElementById('email-label').classList.add('hide');
      document.getElementById('email').classList.add('hide');
    }

    // telefone
    if(user.telefone){
      document.getElementById('tel').value = user.telefone;
    }
    else{
      document.getElementById('tel-label').classList.add('hide');
      document.getElementById('tel').classList.add('hide');
    }

    // cnpj
    if(user.cnpj){
      document.getElementById('cnpj').value = user.cnpj;
    }
    else{
      document.getElementById('cnpj-label').classList.add('hide');
      document.getElementById('cnpj').classList.add('hide');
    }

    // cpf
    if(user.cpf){
      document.getElementById('cpf').value = user.cpf;
    }
    else{
      document.getElementById('cpf-label').classList.add('hide');
      document.getElementById('cpf').classList.add('hide');
    }

    // cep
    if(user.cep){
      document.getElementById('cep').value = user.cep;
    }
    else{
      document.getElementById('cep-label').classList.add('hide');
      document.getElementById('cep').classList.add('hide');
    }

    // endereço
    if(user.endereco){
      document.getElementById('endereco').value = user.endereco;
    }
    else{
      document.getElementById('endereco-label').classList.add('hide');
      document.getElementById('endereco').classList.add('hide');
    }

    // numero
    if(user.numero){
      document.getElementById('numero').value = user.numero;
    }
    else{
      document.getElementById('numero-label').classList.add('hide');
      document.getElementById('numero').classList.add('hide');
    }

    // cidade
    if(user.cidade){
      document.getElementById('cidade').value = user.cidade;
    }
    else{
      document.getElementById('cidade-label').classList.add('hide');
      document.getElementById('cidade').classList.add('hide');
    }

    // estado
    if(user.estado){
      document.getElementById('estado').value = user.estado;
    }
    else{
      document.getElementById('estado-label').classList.add('hide');
      document.getElementById('estado').classList.add('hide');
    }

    // descrição
    if(user.descricao){
      document.getElementById('descricao').value = user.descricao;
    }
    else{
      document.getElementById('descricao-label').classList.add('hide');
      document.getElementById('descricao').classList.add('hide');
    }

}

function habilitarEdicao() {
  // Tirar o atributo readonly dos inputs
  document.getElementById('username').removeAttribute('readonly');
  document.getElementById('name').removeAttribute('readonly');
  document.getElementById('lastname').removeAttribute('readonly');
  document.getElementById('email').removeAttribute('readonly');
  document.getElementById('tel').removeAttribute('readonly');
  document.getElementById('cpf').removeAttribute('readonly');
  document.getElementById('cep').removeAttribute('readonly');
  document.getElementById('descricao').removeAttribute('readonly');

  // Ocultar o edit_btn
  document.getElementById('edit_btn').style.display = 'none';

  // Exibir o save_btn
  document.getElementById('save_btn').style.display = 'block';
}



function desabilitarEdicao() {
  // Adicionar o atributo readonly nos inputs
  document.getElementById('username').setAttribute('readonly', 'readonly');
  document.getElementById('name').setAttribute('readonly', 'readonly');
  document.getElementById('lastname').setAttribute('readonly', 'readonly');
  document.getElementById('email').setAttribute('readonly', 'readonly');
  document.getElementById('tel').setAttribute('readonly', 'readonly');
  document.getElementById('cpf').setAttribute('readonly', 'readonly');
  document.getElementById('cep').setAttribute('readonly', 'readonly');
  document.getElementById('descricao').setAttribute('readonly', 'readonly');

  // Exibir o edit_btn
  document.getElementById('edit_btn').style.display = 'block';

  // Ocultar o save_btn
  document.getElementById('save_btn').style.display = 'none';
}



// Editar o perfil
function editarPerfil() {

  // Ler os dados do localStorage
  let user = LerDados();

  if (user) {
    // Obter os novos valores dos campos de input
    let username = document.getElementById('username').value;
    let name = document.getElementById('name').value;
    let lastname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let tel = document.getElementById('tel').value;
    let cpf = document.getElementById('cpf').value;
    let cep = document.getElementById('cep').value;
    let descricao = document.getElementById('descricao').value;

    // Atualizar os valores do perfil
    user.username = username;
    user.nome = name;
    user.sobrenome = lastname;
    user.email = email;
    user.telefone = tel;
    user.cpf = cpf;
    user.cep = cep;
    user.descricao = descricao;

    // Salvar os dados atualizados no sessionStorage
    SalvaDados(user);

    console.log('perfil atualizado');
  }

  desabilitarEdicao();
}

function SalvaDados(dados) {
  // Salvando o JSON no sessionStorage
  sessionStorage.setItem('user', JSON.stringify(dados))
  const userId = dados.id;

  fetch(`https://data-doeme-jsonserver.catfmcastro.repl.co/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
    .then(response => {
      if (response.ok) {
        console.log('Perfil atualizado com sucesso');
      } else {
        throw new Error('Erro ao atualizar o perfil');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

function getDetails(username) {
  fetch(`https://data-doeme-jsonserver.catfmcastro.repl.co/postagens?username=${username}`)
    .then(res => res.json())
    .then(json => {
      let html = '';
      json.forEach(postagem => {
        html += `
          <div id="mobile" class="row">
            <div class="col-6">
              <div class="row">
                <img src="data:image/jpeg;charset=utf-8;base64,${postagem.foto}" class="detailsImg">
              </div>
            </div>
            <div class="col-6">
              <h1>${postagem.titulo}</h1>
              <h6>${postagem.username?.toUpperCase()}</h6>
              <p>${postagem.descricao}</p>
              <p>${postagem.localizacao}</p>
              <div class="d-flex justify-content-center">
                <button class="btn btn-outline-success"><i class="bi bi-bag-plus"></i></button>
              </div>
            </div>
          </div>
        `;
      });

      document.getElementById('lista-imagem').innerHTML = html;
    })
};