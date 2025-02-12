//constroi nosso array de objetos
const lobinhoObjeto = JSON.parse(localStorage.getItem('selectedWolfObject'));

let wolfprofile = document.querySelector(".main-img");
wolfprofile.src = lobinhoObjeto.imagem;

const wolfName = document.querySelector(".item2");

wolfName.children[0].innerText = `Adote o(a) ${lobinhoObjeto.nome}`;
wolfName.children[1].innerText = `id: ${lobinhoObjeto.id}`;

//atualizalção do arquivo JSON
// locasStorage.setItem('lobos', JSON.stringify(lobos));

document.addEventListener("DOMContentLoaded", function () {
    const nomeinput = document.getElementById("nomeinput");
    const emailinput = document.getElementById("email");
    const agenumber = document.getElementById("agenumber");
    const adotebutton = document.getElementById("adotebutton");

    if (!adotebutton) {
        console.error("Erro: Botão 'adotebutton' não encontrado!");
        return;
    }

    //Retira todos os espaços vazios na extremidades
    adotebutton.addEventListener("click", () => {
        let nome = nomeinput.value.trim();
        let email = emailinput.value.trim();
        let ageValue = agenumber.value.trim();

        // Se todos os campos estiverem vazios
        if (nome === "" && email === "" && ageValue === "") {
            alert("Preencha todos os campos!");
            return;
        }

        // Validação do nome
        if (nome === "") {
            alert("O nome é obrigatório!");
            return;
        }

        // Validação do e-mail
        if (email === "") {
            alert("O e-mail é obrigatório!");
            return;
        }

        // Expressão regular para validar um email do Gmail corretamente
        let gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            alert("Insira um e-mail válido do Gmail! Exemplo: usuario@gmail.com");
            return;
        }

        // Validação da idade
        if (ageValue === "") {
            alert("A idade é obrigatória!");
            return;
        }

        let ageNumber = Number(ageValue);

        if (isNaN(ageNumber) || ageValue.includes('.') || ageValue.includes(',')) {
            alert("A idade digitada é inválida, por favor, insira um número inteiro válido.");
            return;
        }

        if (ageNumber < 1 || ageNumber > 120) {
            alert("A idade deve estar entre 1 e 120 anos.");
            return;
        }
        
        // 🔹 Limpar os campos após o envio bem-sucedido
        nomeinput.value = "";
        emailinput.value = "";
        agenumber.value = "";
        
        const lobos = JSON.parse(localStorage.getItem('lobos'));

        for(let elem of lobos) {
            if (elem.id === lobinhoObjeto.id) {
                if (elem.adotado === true) {
                    alert("Este Lobinho já foi Adotado!");
                    window.location.replace("../HomePage/home.html");
                    return;
                }
                elem.adotado = true;
                elem.emailDono = email;
                elem.nomeDono = nome;
                elem.idadeDono = ageValue;
                break;
            }
        }

        localStorage.setItem('lobos', JSON.stringify(lobos));

        alert("Lobinho adotado com sucesso!");
    });
});

