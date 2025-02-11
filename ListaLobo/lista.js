import { inicializarLocalStorage } from '../Arquivos e Imagens/script.js'

const pageOffset = 2;
const numberOfWolvesPerPage = 4;

// Define o Primeiro Acesso sendo na Primeira Página
if (!localStorage.getItem('currentUserPage')) localStorage.setItem('currentUserPage', 1);

// Define o Valor Padrão para a Barra de Busca:
if (!localStorage.getItem('currentUserSearch')) localStorage.setItem('currentUserSearch', JSON.stringify({
                                                                        searchFlag: false,
                                                                        searchContent: null,
                                                                        searchResult: null
                                                                    }));


async function initLocalStorageWolfList() {
    // Chamada Assíncrona para Certificar a Existência do Local Storage dos Lobos:
    await inicializarLocalStorage();

    // Máximo de Páginas já Estabelecido => Early Return:
    if (localStorage.getItem('maxNumberPages')) return;
    
    // Máximo de Páginas Indefinido:
    let wolfsArray = JSON.parse(localStorage.getItem('lobos'));
    let currentUserSearch = JSON.parse(localStorage.getItem('currentUserSearch'));
    
    let newMaxUserPages;
    if (currentUserSearch.searchFlag) {
        // Erro!
        if (currentUserSearch.searchContent === null) return;

        if (currentUserSearch.searchResult === null) {
            wolfsArray = wolfsArray.filter((wolf) => wolf.nome === currentUserSearch.searchContent);
            newMaxUserPages = Math.ceil(wolfsArray.length / numberOfWolvesPerPage);

            // Armazena o Resultado da Pesquisa:
            currentUserSearch.searchResult = wolfsArray;
            localStorage.setItem('currentUserSearch', JSON.stringify(currentUserSearch));
        } else {
            wolfsArray = currentUserSearch.searchResult;
        }
    } else {
        newMaxUserPages = Math.ceil(wolfsArray.length / numberOfWolvesPerPage);        
    }
    
    newMaxUserPages = Math.ceil(wolfsArray.length / numberOfWolvesPerPage);
    localStorage.setItem('maxNumberPages', newMaxUserPages);
}


async function loadWolfPosts() {
    const wolfsPostContainer = document.querySelector(".wolf-posts-container");
    let wolfsArray;

    const currentUserSearch = JSON.parse(localStorage.getItem('currentUserSearch'));

    if (currentUserSearch.searchFlag === true) {
        wolfsArray = currentUserSearch.searchResult;
    } else {
        wolfsArray = JSON.parse(localStorage.getItem('lobos'));
    }

    let pageOffset = Number(localStorage.getItem('currentUserPage')) - 1;

    for (let index = 0; index < numberOfWolvesPerPage; index++) {
        let currentWolf = wolfsArray[pageOffset * numberOfWolvesPerPage + index];
        wolfsPostContainer.append(createWolfArticle(currentWolf));
    }

    return;
}


async function wolfListMain() {
    // Inicia o Local Storage para Certificar a Existência
    // da Limitação de Páginas e do Conteúdo dos Lobinhos:
    await initLocalStorageWolfList();

    // Carrega Todos os Posts de Lobo da Respectiva Página:
    await loadWolfPosts();

    // console.log(JSON.parse(localStorage.getItem('lobos')));

    // Adiciona a Barra de Paginação da Página Atual:
    document.querySelector("main").append(createPaginationBar());
}
    

function createWolfArticle({nome, idade, descricao, imagem, adotado, nomeDono}) {
    // Criando o Elemento Article:
    const wolfArticle = document.createElement("article");
    wolfArticle.classList.add("wolf-post");

    const wolfLink = adotado === false ? "..\\ShowLobo\\show.html" : "#";

    // ---------- Criando o Container da Imagem ---------- //
    const wolfImageContainer = document.createElement("div");
    wolfImageContainer.classList.add("wolf-image-container");

    const backgroundWolfImage = document.createElement("div");
    backgroundWolfImage.classList.add("background-wolf-image");

    // Colocando o Background da Imagem de Lobo dentro do Container:
    wolfImageContainer.append(backgroundWolfImage);

    const wolfPageLink = document.createElement("a");
    wolfPageLink.href = wolfLink;
    
    // Evita que a página recarregue:
    if (adotado === true) {
        wolfPageLink.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }

    const wolfImage = document.createElement("img");
    wolfImage.src = imagem;
    wolfImage.alt = "Imagem de perfil do lobinho";

    // Colocando a Imagem de Lobo dentro da Tag Âncora:
    wolfPageLink.append(wolfImage);

    // Colocando a Tag de Página do Lobo dentro do Contêiner:
    wolfImageContainer.append(wolfPageLink);

    // Coloca o Contêiner de Imagem dentro do Article:
    wolfArticle.append(wolfImageContainer);

    // ---------- Fim do Container da Imagem ---------- //

    // ---------- Criando a Caixa de Informações do Lobo ---------- //
    const wolfInformationBox = document.createElement("div");
    wolfInformationBox.classList.add("wolf-information-box");

    const wolfTitleBox = document.createElement("div");
    wolfTitleBox.classList.add("wolf-title-box");

    const wolfNameBox = document.createElement("div");
    wolfNameBox.classList.add("wolf-name-box");

    const wolfPageLink_2 = document.createElement("a");
    wolfPageLink_2.href = wolfLink;

    // Evita que a Página Recarregue:
    if (adotado === true) {
        wolfPageLink_2.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }

    const wolfName = document.createElement("h2");
    wolfName.classList.add("wolf-name");
    wolfName.innerText = nome;

    // Insere o Nome do Lobo na Tag Âncora:
    wolfPageLink_2.append(wolfName);

    // Insere a Âncora no Wolf Name Box:
    wolfNameBox.append(wolfPageLink_2);

    const wolfAge = document.createElement("p");
    wolfAge.innerText = `Idade: ${idade} anos`;

    // Insere a Idade do Lobo no Wolf Name Box:
    wolfNameBox.append(wolfAge);

    // Insere o Wolf Name Box no Wolf Title Box:
    wolfTitleBox.append(wolfNameBox);

    const adoptButtonLink = document.createElement("a");
    adoptButtonLink.href = wolfLink;
    adoptButtonLink.classList.add("adopt-link");

    // Evita que a Página Recarregue:
    if (adotado === true) {
        adoptButtonLink.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }

    const adoptButton = document.createElement("button");
    adoptButton.classList.add("adopt-button");
    adoptButton.classList.add(adotado ? "adopted" : "adopt");
    adoptButton.innerText = adotado ? "Adotado" : "Adotar";

    // Insere o Botão de Adoção Dentro da Tag Âncora:
    adoptButtonLink.append(adoptButton);

    // Insere o Link de Adoção no Wolf Title Box:
    wolfTitleBox.append(adoptButtonLink);

    // Insere o Wolf Title Box no Wolf Information Box:
    wolfInformationBox.append(wolfTitleBox);


    const wolfInfo = document.createElement("div");
    wolfInfo.classList.add("wolf-info");

    const wolfDescription = document.createElement("p");
    wolfDescription.classList.add("wolf-description");
    wolfDescription.innerText = descricao;

    // Adiciona o Wolf Description ao Wold Info:
    wolfInfo.append(wolfDescription);

    if (nomeDono !== null) {
        const adopterName = document.createElement("p");
        adopterName.classList.add("adopter-name");
        adopterName.innerText = `Adotado por: ${nomeDono}`;

        // Adiciona o Nome do Adotador ao Wolf Info:
        wolfInfo.append(adopterName);
    }

    wolfInformationBox.append(wolfInfo);

    wolfArticle.append(wolfInformationBox);

    return wolfArticle;
}


function createPaginationBar() {
    const currentUserPage = Number(localStorage.getItem('currentUserPage'));
    const maxNumberPages = Number(localStorage.getItem('maxNumberPages'));

    const minPageNumber = Math.max(1, currentUserPage - pageOffset);
    const maxPageNumber = Math.min(maxNumberPages, currentUserPage + pageOffset);

    const paginationSection = document.createElement("section");
    paginationSection.classList.add("pagination-section");

    // Cria o Slider para a Esquerda Somente Quando Necessário:
    if (currentUserPage > 1) {
        const leftPageShift = document.createElement("a");
        leftPageShift.href = "./lista.html";
        leftPageShift.classList.add("page-number-link");
        leftPageShift.innerText = "<<";
        leftPageShift.addEventListener("click", () => {
            localStorage.setItem('currentUserPage', Math.max(1, currentUserPage - 1));
        });
    
        // Adiciona o Ícone de "<<" à Barra de Paginação:
        paginationSection.append(leftPageShift);
    }


    // Se a página atual está distante pelo menos pageOffset da primeira página:
    if (minPageNumber > 1) {
        const leftEllipsis = document.createElement("a");
        leftEllipsis.href = "./lista.html";
        leftEllipsis.classList.add("page-number-link");
        leftEllipsis.addEventListener("click", () => {
            // Retorna para a Primeira Página quando o Usuário Clicar nas Reticências da Esquerda:
            localStorage.setItem('currentUserPage', 1);
        });
        leftEllipsis.innerText = "...";

        // Adiciona o Ícone de "..." esquerdo à Barra de Paginação:
        paginationSection.append(leftEllipsis);
    }
    
    for (let pag = minPageNumber; pag <= maxPageNumber; pag++) {
        let currentPageNumber = document.createElement("a");
        currentPageNumber.href = "./lista.html";
        currentPageNumber.classList.add("page-number-link");

        // Adiciona o Marcador de Página Atual
        if (currentUserPage === pag) {
            currentPageNumber.classList.add("current-page");
        }

        currentPageNumber.innerText = pag;
        currentPageNumber.addEventListener("click", (event) => {
            // Marca a Nova Página a ser Carregada:
            localStorage.setItem('currentUserPage', event.target.innerText);
        });

        paginationSection.append(currentPageNumber);
    }
    
    if (maxPageNumber < maxNumberPages) {
        const rightEllipsis = document.createElement("a");
        rightEllipsis.href = "./lista.html";
        rightEllipsis.classList.add("page-number-link");
        rightEllipsis.addEventListener("click", () => {
            // Retorna para a Última Página quando o Usuário Clicar nas Reticências da Direita:
            localStorage.setItem('currentUserPage', maxNumberPages);
        });
        rightEllipsis.innerText = "...";

        // Adiciona o Ícone de "..." esquerdo à Barra de Paginação:
        paginationSection.append(rightEllipsis);
    }
    
    // Cria o Slider para a Direita Somente Quando Necessário:
    if (currentUserPage < maxNumberPages) {
        const rightPageShift = document.createElement("a");
        rightPageShift.href = "./lista.html";
        rightPageShift.classList.add("page-number-link");
        rightPageShift.innerText = ">>";
        rightPageShift.addEventListener("click", () => {
            localStorage.setItem('currentUserPage', Math.min(maxNumberPages, currentUserPage + 1));
        });
    
        // Adiciona o Ícone de "<<" à Barra de Paginação:
        paginationSection.append(rightPageShift);
    }

    return paginationSection;
}

wolfListMain();

