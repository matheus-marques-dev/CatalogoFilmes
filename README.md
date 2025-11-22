# MovieStack

## Sobre o Projeto

O **MovieStack** é o resultado prático de uma semana intensiva de aprendizado. O objetivo foi criar uma aplicação Front-end do zero, utilizando inteligência artificial (Google Gemini) como ferramenta de apoio para acelerar o desenvolvimento e otimizar o código.

O projeto simula uma interface de streaming (VOD), focando em **lógica de programação com JavaScript** e **design responsivo**.

### Funcionalidades Implementadas

- ** Favoritos Persistentes:** Uso de `localStorage` para salvar filmes preferidos mesmo após fechar o navegador.
- ** Busca Dinâmica:** Filtragem em tempo real por título, gênero ou ano.
- ** UX/UI Aprimorada:**
  - **Skeleton Loading:** Feedback visual de carregamento.
  - **Modal:** Exibição de detalhes em janela sobreposta.
  - **Ordenação:** Classificação por nota, lançamentos ou ordem alfabética.
- ** Responsividade:** Layout fluido com CSS Grid e Flexbox.

---

## Tecnologias Utilizadas

- **HTML5 & CSS3:** Estrutura e Estilização (Dark Mode).
- **JavaScript (ES6+):** Lógica de manipulação do DOM e consumo de dados.
- **Google Gemini:** Utilizado para auxílio na lógica de busca, geração de massa de dados (JSON) e refatoração de código.

---

## Estrutura do Projeto

bash
MovieStack/
├── index.html      # Estrutura e Modal
├── style.css       # Estilos e Responsividade
├── script.js       # Lógica JS (Busca, Favoritos, Renderização)
├── data.json       # Dados dos filmes
└── README.md       # Documentação
