const url = `https://data-doeme-jsonserver.catfmcastro.repl.co/user`;

// Criando um evento
document.getElementById('formulario').addEventListener('submit', registrar)

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
    let username = document.getElementById('username').value
    let name = document.getElementById('name').value
    let lastname = document.getElementById('lastname').value
    let email = document.getElementById('email').value
    let tel = document.getElementById('tel').value
    let cpf = document.getElementById('cpf').value
    let cep = document.getElementById('cep').value
    let cidade = document.getElementById('cidade').value
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
                let newuser = {
                    "id": novoId,
                    "username": username,
                    "foto": "",
                    "tipo-de-user": "usuario",
                    "senha": password,
                    "nome": name,
                    "sobrenome": lastname,
                    "telefone": tel,
                    "email": email,
                    "cpf": cpf,
                    "cep": cep,
                    "cidade-estado": cidade,
                    "complemento": complemento,
                    "descricao": "",
                    "avaliacao": ""
                };

                // Salvar os dados no localStorage
                SalvaDados(newuser);

                console.log('User Adicionado');

                // Limpando os valores dos inputs
                document.getElementById('username').value = '';
                document.getElementById('name').value = '';
                document.getElementById('lastname').value = '';
                document.getElementById('email').value = '';
                document.getElementById('tel').value = '';
                document.getElementById('cpf').value = '';
                document.getElementById('cep').value = '';
                document.getElementById('cidade').value = '';
                document.getElementById('complemento').value = '';
                document.getElementById('password').value = '';
                document.getElementById('passconfirmation').value = '';
                window.location.replace('../paginas/perfil-user.html');
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