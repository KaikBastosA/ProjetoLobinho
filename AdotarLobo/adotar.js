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

        alert("Dados enviados com sucesso!");
    });
});
