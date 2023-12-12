const url = `https://data-doeme-jsonserver.catfmcastro.repl.co/postagens`;

document.getElementById("arquivo").addEventListener("change", function (event) {
  var arquivo = event.target.files[0];

  var leitor = new FileReader();

  leitor.onload = function (e) {
    document.getElementById("imagemPreview").src = e.target.result;
    document.getElementById("imagemPreview").style.display = "block";
  };

  leitor.readAsDataURL(arquivo);
});

document.getElementById("postagemForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var titulo = document.getElementById("titulo").value;
  var conteudo = document.getElementById("conteudo").value;
  var localizacao = document.getElementById("localizacao").value;
  var categoria = document.getElementById("categoria").value;
  var telefone = document.getElementById("telefone").value;
  var username = document.getElementById("username").value;

  // Salva as informações da postagem 
  // Ler os dados
  LerDados()
    .then((dados) => {
      // Encontrar o maior ID atual
      let maxId = 0;
      for (let i = 0; i < dados.length; i++) {
        if (dados[i].id > maxId) {
          maxId = dados[i].id;
        }
      }

      // Gerando um novo ID para o usuário
      let novoId = Number(maxId) + 1;

      // Criando um JSON com informações
      let newpost = {
        "id": novoId,
        "tipo-de-user": '',
        "titulo": titulo,
        "username": username,
        "descricao": conteudo,
        "foto": "",
        "localizacao": localizacao,
        "tag": categoria,
        "contato": {
          "telefone": telefone,
          "email": "null"
        },
        "avaliacao": ""
      }

      // Salvar os dados no localStorage
      SalvaDados(newpost);
    })
  console.log("Postagem salva ");

  document.getElementById("titulo").value = "";
  document.getElementById("conteudo").value = "";
  document.getElementById("arquivo").value = "";
  document.getElementById("localizacao").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("username").value = "";
  document.getElementById("imagemPreview").src = "#";
  document.getElementById("imagemPreview").style.display = "none";
});

function LerDados() {
  let strDados = fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Erro:', error);
    });
  return strDados;
}

function SalvaDados(dados) {
  // Salvando o JSON no Storage
  sessionStorage.setItem('user', JSON.stringify(dados))
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
  })
      .then(response => {
          if (response.ok) {
              console.log('Dados salvos com sucesso!');
          } else {
              console.error('Erro ao salvar os dados:', response.status);
          }
      })
      .catch(error => {
          console.error('Erro na solicitação:', error);
      });
}