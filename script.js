let cardContainer = document.querySelector(".card-container"); 
if (!cardContainer) cardContainer = document.querySelector("main"); 

let campoBusca = document.querySelector("input");
let botaoBusca = document.querySelector("#botao-busca");
let catalogoFilmes = [];


async function carregarDados() {
    try {
        let resposta = await fetch("data.json");
        catalogoFilmes = await resposta.json();
        renderizarCards(catalogoFilmes);
    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        cardContainer.innerHTML = "<p>Erro ao carregar o catálogo.</p>";
    }
}


function renderizarCards(dados) {
    cardContainer.innerHTML = ""; 

    // Se não encontrar nada, exibe mensagem estilizada
    if (dados.length === 0) {
        cardContainer.innerHTML = `
            <div class="sem-resultados">
                <p>😕 Nenhum filme ou série encontrado.</p>
                <p style="font-size: 0.9rem; color: #777;">Tente buscar por outro nome, gênero ou ano.</p>
            </div>
        `;
        return;
    }

    for (let filme of dados){
       let article = document.createElement("article");
       

       article.innerHTML = `
       <h2>${filme.titulo}</h2>
       <p>${filme.sinopse}</p>
       <p><strong>Gênero:</strong> ${filme.genero} | <strong>Ano:</strong> ${filme.ano}</p>
       
       <div class="nota-badge">⭐ ${filme.nota}</div>
       
       <a href="${filme.link}" target="_blank">Ver detalhes</a>
       `
       cardContainer.appendChild(article);
    }
}

function filtrarDados() {
    let termoBusca = campoBusca.value.trim().toLowerCase();

    if (termoBusca) {
       let dadosFiltrados = catalogoFilmes.filter(filme => 
          filme.titulo.toLowerCase().includes(termoBusca) || 
          filme.genero.toLowerCase().includes(termoBusca) ||
          filme.ano.toString().includes(termoBusca) 
       );
       renderizarCards(dadosFiltrados);
    } else {
       renderizarCards(catalogoFilmes);
    }
}


botaoBusca.addEventListener("click", filtrarDados);

campoBusca.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        filtrarDados();
    }
});

// Inicializa
carregarDados();