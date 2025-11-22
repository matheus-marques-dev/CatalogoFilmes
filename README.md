# 🎬 MovieStack

> Um catálogo interativo de filmes e séries que simula a interface de plataformas de streaming, com foco em performance e experiência do usuário.

##Sobre o Projeto

O **MovieStack** é uma aplicação Front-end desenvolvida para consolidar conhecimentos em manipulação do DOM, consumo de APIs e layouts responsivos modernos.

O sistema carrega dinamicamente uma lista de filmes e séries a partir de um arquivo JSON e oferece uma interface de busca reativa, permitindo que o usuário encontre títulos instantaneamente sem recarregar a página.

### Principais Funcionalidades

- **Busca Avançada em Tempo Real:**
  - O algoritmo de filtro verifica **Título**, **Gênero** e **Ano de Lançamento** simultaneamente.
  - Ex: Ao digitar "1994", o sistema retorna filmes lançados nesse ano.
- **Consumo de Dados Assíncrono:**
  - Utilização da `Fetch API` com `Async/Await` para leitura de dados JSON.
- **Layout Totalmente Responsivo:**
  - Construído com **CSS Grid** (`repeat(auto-fill, minmax...)`), garantindo que os cards se organizem perfeitamente em qualquer tamanho de tela (Mobile, Tablet e Desktop).
- **UI/UX Moderna:**
  - Identidade visual "Dark Mode" inspirada na Netflix.
  - Efeitos de transição (`hover`), badges de nota dourados e tratamento de erros (mensagem amigável quando a busca não retorna resultados).

---

##Tecnologias Utilizadas

- **HTML5:** Estrutura semântica e acessível.
- **CSS3:**
  - **CSS Grid & Flexbox:** Para estruturação do layout.
  - **CSS Variables:** Para gerenciamento eficiente de paleta de cores.
  - **Media Queries:** Para adaptação mobile.
- **JavaScript (ES6+):**
  - Manipulação do DOM.
  - Métodos de Array (`filter`, `map`, `includes`).
  - Programação Assíncrona (`fetch`).

---

##Estrutura do Projeto

```bash
MovieStack/
├── index.html      # Estrutura principal
├── style.css       # Estilização e responsividade
├── script.js       # Lógica de consumo de dados e busca
└── data.json       # Banco de dados local dos filmes
