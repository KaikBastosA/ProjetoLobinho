const numberOfWolvesPerPage = 4;
const numberOfPages = Math.ceil(localStorage.getItem('lobos').length / numberOfWolvesPerPage);

let currentUserPage = 1;

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
        adopterName.innerText = nomeDono;

        // Adiciona o Nome do Adotador ao Wolf Info:
        wolfInfo.append(adopterName);
    }

    wolfInformationBox.append(wolfInfo);

    wolfArticle.append(wolfInformationBox);

    return wolfArticle;
}


console.log();
document.querySelector(".wolf-posts-container").append(createWolfArticle(JSON.parse(localStorage.getItem('lobos'))[0]));

