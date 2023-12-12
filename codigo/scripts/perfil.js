//const queryString = window.location.search;
//const params = new URLSearchParams(queryString);
//const id = params.get("id");
//const tipo = params.get("tipo");

//const urlUser = `https://data-doeme-jsonserver.catfmcastro.repl.co/user/${id}`;
//const urlInst = `https://data-doeme-jsonserver.catfmcastro.repl.co/instituicao/${id}`;
function getDetails(id) {
  fetch(`https://data-doeme-jsonserver.catfmcastro.repl.co/instituicao/${id}`)
      .then(res => res.json())
      .then(json => {
          
          let html = `
             
              <div class="info">
                  <h1>${json.nome}</h1>
                  <p>${json.telefone}</p>
                  <p>${json.email}</p>
                  <p class="end">${json.cidade}-${json.estado}-${json.endereco} ${json.numero}</p>
                  <p>${json.descricao}</p>
              </div>
              
          `;

          document.getElementById('dadosperfil').innerHTML = html;
      });
}


      window.onload = function () {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
    
        if (id != null) {
            getDetails(id);
        }
    }

    

  