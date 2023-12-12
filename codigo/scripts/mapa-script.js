// ? CONFIGURAÇÕES DA LOCALIZAÇÃO DO USUÁRIO
// Verifica se a API de Geolocation está disponível no navegador
if ('geolocation' in navigator) {

    // Caso o usuário conceda a sua localização, armazena as coordenadas em duas variáveis
    const CallbackSucesso = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Chama uma função para configurar o mapa com as coordenadas obtidas
        configurarMapa([latitude, longitude]);
    };

    // Caso o usuário não conceda a sua localização / Ocorra um erro
    const CallbackErro = (error) => {
        // Exibe o erro no console
        console.error(error);

        // O mapa será configurado com as coordenadas padrão
        configurarMapa([-19.93336, -43.93742]);
    };

    // Pega a localização do usuário
    navigator.geolocation.getCurrentPosition(CallbackSucesso, CallbackErro, {
        enableHighAccuracy: true, // Habilita uma maior precisão
        maximumAge: 5000, // Tempo máximo para receber essa informação -> 5 segundos
        timeout: 5000, // Tempo que será esperado para o retorno dessa informação  -> 5 segundos
    });

    // Caso a API de Geolocation não estiver disponível, utiliza uma coordenada padrão para ser utilizada no mapa.
} else {
    configurarMapa([-19.93336, -43.93742]);
}

// Função para buscar as coordenadas com base no endereço da instituição
function encontraCoordenada(endereco, numero, cidade) {
    // Concatena o número e a cidade-estado ao endereço
    const enderecoCompleto = `${endereco}, ${numero}, ${cidade}`;

    return axios
        .get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: endereco,
                format: 'json',
            },
        })
        .then(function (response) {
            if (response.data.length > 0) {
                var lat = response.data[0].lat;
                var lon = response.data[0].lon;

                var coordenadas = [parseFloat(lat), parseFloat(lon)];
                return coordenadas;
            } else {
                throw new Error('Localização não encontrada');
            }
        })
        .catch(function (error) {
            throw error;
        });
}

// Variável global
var map;

// Função para configurar o mapa com as coordenadas fornecidas
function configurarMapa(coordenadas) {
    // ! CONFIGURAÇÕES DO MAPA
    // Cria uma variável para o mapa
    map = L.map('map');

    // Configura a área do mapa e o seu zoom
    map.setView(coordenadas, 14);

    // Date Source do OpenStreetMap que será usada pelo Leaflet
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        atrribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    // Muda o ícone do marcador, criando uma variável
    const IconeONG = L.icon({
        iconUrl: './imgs/ícone-instituicao-2.png',
        iconSize: [40, 50],
    })
    const IconeEscola = L.icon({
        iconUrl: './imgs/ícone estudo.png',
        iconSize: [30, 55],
    })
    const IconeCoracao = L.icon({
        iconUrl: './imgs/ícone coração.png',
        iconSize: [50, 55],
    })

    // Adiciona os marcadores através de um loop que transcorre um objeto JSON
    // Faz a solicitação assíncrona para obter o JSON
    fetch('https://data-doeme-jsonserver.catfmcastro.repl.co/instituicao')
        .then(response => response.json())
        .then(data => {
            const instituicoes = data; // Array com as informações das instituições

            // Loop através das instituições
            for (let i = 0; i < instituicoes.length; i++) {
                const instituicao = instituicoes[i];
                let icon;

                // Condicional para saber qual ícone será usado
                if (instituicao['tipo-de-instituicao'] === "ONG") {
                    icon = IconeONG;
                } else if (instituicao['tipo-de-instituicao'] === "Escola") {
                    icon = IconeEscola;
                } else if (instituicao['tipo-de-instituicao'] === "Igreja") {
                    icon = IconeCoracao;
                }

                // Descobre as coordenadas com base no endereço da instituição
                encontraCoordenada(instituicao.endereco, instituicao.numero, instituicao.cidade)
                    .then(coordenadas => {
                        // Cria o marcador com as coordenadas encontradsa
                        L.marker(coordenadas, {
                            // Título do marcador
                            title: instituicao.nome,
                            // Ícone utilizado
                            icon: icon,
                        })
                            // Adiciona a descrição quando clicado
                            .bindPopup(`
    <span class="popup">
        <h3>${instituicao.nome}</h3>
        <img src="${instituicao.foto}" alt="Imagem da instituição" width="100">
        ${instituicao.endereco}, ${instituicao.numero}<br>
        <a href="${instituicao.site}" target="_blank">Website</a><br>
        Telefone: <a href="tel:${instituicao.telefone}">${instituicao.telefone}</a>
    </span>
    `)
                            .addTo(map);
                    })
                    .catch(error => {
                        console.error('Erro ao buscar coordenadas:', error);
                    });
            }
        })
        // Tratar erros caso ocorram
        .catch(error => {
            console.error('Erro ao carregar o JSON:', error);
        });
}

// Função para buscar as coordenadas com base no nome do lugar digitado pelo usuário
function buscarCoordenadas() {
    event.preventDefault();
    var lugar = document.getElementById('lugar-input').value;

    axios
        .get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: lugar,
                format: 'json',
            },
        })
        .then(function (response) {
            if (response.data.length > 0) {
                var lat = response.data[0].lat;
                var lon = response.data[0].lon;

                var coordenadas = [parseFloat(lat), parseFloat(lon)];
                map.setView(coordenadas);
            } else {
                console.log('Localização não encontrada');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}