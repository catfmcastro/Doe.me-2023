const urlUser = `https://data-doeme-jsonserver.catfmcastro.repl.co/user`;
const urlInst = `https://data-doeme-jsonserver.catfmcastro.repl.co/instituicao`;
let url = '';
let novaUrl = '';
document.getElementById('login-form').addEventListener('submit', Login);

function Login(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let tipo = document.querySelector('input[name="tipos"]:checked').value;
    if (tipo === 'instituição') {
        url = urlInst;
        novaUrl = '../paginas/perfil-user.html'
    } else if (tipo === 'usuário') {
        url = urlUser;
        novaUrl = '../paginas/perfil-user.html'
    }
    // Fazer uma requisição para verificar as credenciais
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.email === email && user.senha === senha);
            if (user) {
                console.log('Login bem-sucedido');
                window.location.replace(novaUrl);
                sessionStorage.setItem('user', JSON.stringify(user))
            } else {
                console.log('Credenciais inválidas');
                document.getElementById('erro').innerHTML = '<p>Email ou senha inválidos.</p>';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}