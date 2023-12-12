function getDetails(id) {
    fetch(`https://data-doeme-jsonserver.catfmcastro.repl.co/postagens/${id}`)
        .then(res => res.json())
        .then(json => {
            // let stars = [];
            // for (let i = 0; i < 5; i++) {
            //     if (i < json.rating.rate) {
            //         stars.push(`<i class="bi bi-star-fill text-success"></i>`);
            //     } else {
            //         stars.push(`<i class="bi bi-star text-success"></i>`);
            //     }
            // }
            // ${stars.join('')}
            let html = `
                <div id="mobile" class="row">
                
                <div class="col-6">
                    <h1>${json.titulo}</h1>
                    <h6>${json.username?.toUpperCase()}</h6>
                    <p>${json.descricao}</p>
                    <p>${json.localizacao}</p>
                    <p>${json.contato.telefone}</p>
                    <p>${json.contato.email}</p>
                    <div class="d-flex justify-content-center">
                        
                    </div>
                </div>
                </div>
            `;

            document.getElementById('details').innerHTML = html;
        });
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id != null) {
        getDetails(id);
    }
}