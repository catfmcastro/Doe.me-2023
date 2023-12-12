const url = `https://data-doeme-jsonserver.catfmcastro.repl.co/instituicao`;

// Criando um evento
document.getElementById('formulario').addEventListener('submit', registrar);

function LerDados() {
    let strDados = fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error('Erro:', error);
        });
    return strDados;
}

function registrar(event) {
    event.preventDefault()

    // Pegando os valores dos inputs
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let tel = document.getElementById('tel').value
    let cnpj = document.getElementById('cnpj').value
    let cep = document.getElementById('cep').value
    let endereco = document.getElementById('endereco').value
    let cidade = document.getElementById('cidade').value
    let estado = document.getElementById('estado').value
    let complemento = document.getElementById('complemento').value
    let password = document.getElementById('password').value
    let passconfirmation = document.getElementById('passconfirmation').value

    if (password == passconfirmation) {
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

                // Criando um JSON com informações do usuário
                let newinst = {
                    "id": novoId,
                    "tipo-de-user": "instituicao",
                    "foto": "",
                    "nome": name,
                    "senha": password,
                    "telefone": tel,
                    "email": email,
                    "cnpj": cnpj,
                    "cep": cep,
                    "endereco": endereco,
                    "numero": complemento,
                    "cidade": cidade,
                    "estado": estado,
                    "descricao": "",
                    "site": "",
                    "tipo-de-instituicao": "",
                    "avaliacao": ""
                }

                //Salvar os dados no Storage
                SalvaDados(newinst)

                 console.log('Inst Adicionada')

                // Limpando os valores dos inputs
                document.getElementById('name').value = ''
                document.getElementById('email').value = ''
                document.getElementById('tel').value = ''
                document.getElementById('cnpj').value = ''
                document.getElementById('cep').value = ''
                document.getElementById('endereco').value = ''
                document.getElementById('cidade').value = ''
                document.getElementById('estado').value = ''
                document.getElementById('complemento').value = ''
                document.getElementById('password').value = ''
                document.getElementById('passconfirmation').value = ''
                window.location.replace('../paginas/perfil-instituicao.html');
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    }
    else {
        alert("ERRO - Senhas Diferentes")
    }

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