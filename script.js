// Seletores
let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector(".busca-container input");
let botaoBusca = document.querySelector("#botao-busca");
let filtrosBotoes = document.querySelectorAll(".filtro-btn");
let selectOrdenacao = document.querySelector("#ordenacao");
let modalOverlay = document.querySelector("#modal-overlay");
let fecharModalBtn = document.querySelector(".fechar-modal");
let modalBody = document.querySelector(".modal-body");

// Estado da Aplicação
let todosOsFilmes = [];
let filmesAtuais = [];
let categoriaAtual = "todos";
let favoritos = JSON.parse(localStorage.getItem("meusFavoritos")) || []; // Carrega do LocalStorage

// 1. Inicialização
async function carregarDados() {
    renderizarSkeleton(); // Mostra o efeito de carregamento
    
    try {
        // Simula um delay de rede para ver o skeleton (pode remover o setTimeout em produção)
        setTimeout(async () => {
            let resposta = await fetch("data.json");
            todosOsFilmes = await resposta.json();
            filmesAtuais = [...todosOsFilmes]; // Cria uma cópia
            renderizarCards(filmesAtuais);
        }, 800);
        
    } catch (erro) {
        console.error(erro);
        cardContainer.innerHTML = "<p>Erro ao carregar catálogo.</p>";
    }
}

// 2. Renderização (Cards ou Skeleton)
function renderizarSkeleton() {
    cardContainer.innerHTML = "";
    // Cria 8 cards vazios com animação
    for (let i = 0; i < 8; i++) {
        cardContainer.innerHTML += `<div class="skeleton"></div>`;
    }
}

function renderizarCards(dados) {
    cardContainer.innerHTML = "";

    if (dados.length === 0) {
        cardContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; margin-top: 2rem;">
                <p>😕 Nenhum título encontrado para essa busca.</p>
            </div>
        `;
        return;
    }

    dados.forEach(filme => {
        let isFavorito = favoritos.includes(filme.titulo);
        let classeCoracao = isFavorito ? "favoritado" : "";
        let imagemSrc = filme.imagem ? filme.imagem : "https://via.placeholder.com/300x450?text=Sem+Capa";

        let article = document.createElement("article");
        article.innerHTML = `
            <button class="btn-favorito ${classeCoracao}" onclick="toggleFavorito('${filme.titulo}')">
                ♥
            </button>
            <img src="${imagemSrc}" alt="${filme.titulo}" class="card-imagem">
            <div class="card-info">
                <h2>${filme.titulo}</h2>
                <div class="info-rapida">
                    ${filme.ano} • ${filme.genero}
                </div>
                <div class="nota-badge">⭐ ${filme.nota}</div>
            </div>
            <button class="btn-detalhes">Ver detalhes</button>
        `;

        // Evento para abrir o modal ao clicar em "Ver Detalhes"
        article.querySelector(".btn-detalhes").addEventListener("click", () => abrirModal(filme));

        cardContainer.appendChild(article);
    });
}

// 3. Sistema de Favoritos (LocalStorage)
window.toggleFavorito = function(titulo) {
    if (favoritos.includes(titulo)) {
        // Remove dos favoritos
        favoritos = favoritos.filter(item => item !== titulo);
    } else {
        // Adiciona aos favoritos
        favoritos.push(titulo);
    }
    
    // Salva no navegador
    localStorage.setItem("meusFavoritos", JSON.stringify(favoritos));
    
    // Se estiver na aba "Favoritos", renderiza de novo para sumir o removido
    if (categoriaAtual === "favoritos") {
        aplicarFiltros();
    } else {
        // Senão, apenas atualiza visualmente sem recarregar tudo (performance)
        aplicarFiltros(); 
    }
};

// 4. Lógica de Filtros e Busca Centralizada
function aplicarFiltros() {
    let termo = campoBusca.value.trim().toLowerCase();
    
    // Filtra primeiro pela categoria (botões)
    let filtrados = todosOsFilmes.filter(filme => {
        let matchCategoria = false;
        
        if (categoriaAtual === "todos") matchCategoria = true;
        else if (categoriaAtual === "favoritos") matchCategoria = favoritos.includes(filme.titulo);
        else matchCategoria = filme.genero.toLowerCase().includes(categoriaAtual); // "filme" ou "série"

        return matchCategoria;
    });

    // Depois filtra pelo texto da busca
    if (termo) {
        filtrados = filtrados.filter(filme => 
            filme.titulo.toLowerCase().includes(termo) ||
            filme.genero.toLowerCase().includes(termo) ||
            filme.ano.toString().includes(termo)
        );
    }

    // Por fim, aplica a ordenação
    ordenarFilmes(filtrados);
}

// 5. Configuração dos Botões de Filtro
filtrosBotoes.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove classe 'ativo' de todos e adiciona no clicado
        filtrosBotoes.forEach(b => b.classList.remove("ativo"));
        btn.classList.add("ativo");

        categoriaAtual = btn.getAttribute("data-filtro");
        aplicarFiltros();
    });
});

// 6. Configuração da Ordenação
selectOrdenacao.addEventListener("change", () => aplicarFiltros());

function ordenarFilmes(lista) {
    let tipoOrdem = selectOrdenacao.value;

    if (tipoOrdem === "nota") {
        lista.sort((a, b) => b.nota - a.nota);
    } else if (tipoOrdem === "ano-novo") {
        lista.sort((a, b) => b.ano - a.ano);
    } else if (tipoOrdem === "ano-velho") {
        lista.sort((a, b) => a.ano - b.ano);
    } else if (tipoOrdem === "a-z") {
        lista.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }

    renderizarCards(lista);
}

// 7. Modal (Janela de Detalhes)
function abrirModal(filme) {
    let imagemSrc = filme.imagem ? filme.imagem : "https://via.placeholder.com/300x450";
    
    modalBody.innerHTML = `
        <img src="${imagemSrc}" class="modal-img">
        <div class="modal-info">
            <h2>${filme.titulo}</h2>
            <p><strong>Ano:</strong> ${filme.ano}</p>
            <p><strong>Gênero:</strong> ${filme.genero}</p>
            <p><strong>Nota:</strong> ⭐ ${filme.nota}</p>
            <p style="margin-top: 1rem;">${filme.sinopse}</p>
            <a href="${filme.link}" target="_blank" class="btn-imdb">Ver no IMDb</a>
        </div>
    `;
    modalOverlay.classList.add("aberto");
}

fecharModalBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("aberto");
});

// Fecha se clicar fora do modal
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove("aberto");
    }
});

// Eventos de Busca
botaoBusca.addEventListener("click", aplicarFiltros);
campoBusca.addEventListener("keyup", (e) => {
    if (e.key === "Enter") aplicarFiltros();
});

// Start
carregarDados();
