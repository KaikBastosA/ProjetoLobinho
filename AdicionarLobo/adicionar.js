const form = document.querySelector(".form-container");
const wolfName = document.querySelector("#wolf-name");
const wolfAge = document.querySelector("#wolf-age");
const wolfImage = document.querySelector("#wolf-profile-picture");
const wolfDesc = document.querySelector("#wolf-desc");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const wolves = JSON.parse(localStorage.getItem('lobos'));

    const newWolfID = wolves.length + 1;    
    const newWolfObject = {};

    newWolfObject.id = newWolfID;
    newWolfObject.adotado = false;
    newWolfObject.descricao = wolfDesc.value;
    newWolfObject.emailDono = null;
    newWolfObject.idade = Number(wolfAge.value);
    newWolfObject.idadeDono = null;
    newWolfObject.imagem = wolfImage.value;
    newWolfObject.nome = wolfName.value;
    newWolfObject.nomeDono = null;

    wolves.push(newWolfObject);

    localStorage.setItem('lobos', JSON.stringify(wolves));

    alert("Lobinho Criado!");
});
