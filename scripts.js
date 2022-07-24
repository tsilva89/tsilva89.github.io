// Função de Sorteio - Versão 1.0

// Contador de visitas
function cb(response) {
    document.getElementById('count').innerText = response.value + " visitas";
}

// Imprime o texto de acordo com o campo preenchido
function nums() {
    const maxLength = parseInt(numberLength.value);
    if (maxLength >= 2) {
        numbers.innerHTML = " números";
    } else {
        numbers.innerHTML = " número";
    }
}

// Sortear Z números dentro de uma faixa (de X a Y), onde X >= 1 && Y >=2, não repetindo os números sorteados.
function draw() {

    // Limpa os dados do sorteio anterior antes de iniciar um novo sorteio.
    resultText.innerHTML = "";
    list.innerHTML = "";
    date.innerHTML = "";

    // Variáveis
    const min = parseInt(numberMin.value);
    const max = parseInt(numberMax.value);
    const maxLength = parseInt(numberLength.value);
    const result = [];

    // Exibe as bordas do resultado após o sorteio
    let el = document.getElementById('resultBox');
    el.style.display = 'inline-block';

    // Validação de preenchimento dos campos pelo usuário.
    if (maxLength < 1) {
        alert("Você precisa sortear ao menos 1 número.")
    } else if (min === 0) {
        alert("O número mínimo do sorteio deve ser maior ou igual a 1.")
    } else if (min > max) {
        alert("O número mínimo não pode ser maior que o número máximo do sorteio.")
    } else if (min === max) {
        alert("O número mínimo não pode ser igual ao número máximo do sorteio.")
    } else if ((max - min) < maxLength) {
        alert("A quantidade de números a serem sorteados não pode ser igual ou maior que o intervalo de números do sorteio.")
    } else {

        // Gera números aleatórios, armazenando na variável "result[]" e imprimindo individualmente na tela.
        for (let i = 1; i <= maxLength; i++) {
            let sortNumber = Math.floor(Math.random() * max + 1);
            while (sortNumber < min || result.indexOf(sortNumber) >= 0) {
                sortNumber = Math.floor(Math.random() * max + 1);
            }
            result.push(sortNumber);
            let item = document.createElement('li');
            item.appendChild(document.createTextNode(sortNumber));
            list.appendChild(item);
        }

        // Imprime o texto de acordo com o preenchimento da quantidade de números a serem sorteados.
        if (maxLength === 1) {
            resultText.innerHTML = "O número sorteado foi:";
        } else {
            resultText.innerHTML = "Os números sorteados foram:";
        }

        // Imprime a data e horário do sorteio.
        let d = new Date();
        let dateString = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear() + " às " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + "h";
        date.innerHTML = "Sorteio realizado em " + dateString;
    }
    return;
}

// Ocultar teclado ao sortear
const hideMobileKeyboard = (element) => {
    element.addEventListener('keyup', (keyboardEvent) => {
        const key = keyboardEvent.code || keyboardEvent.keyCode;
        if (key === 'Enter' || key === 13) {
            element.blur();
        }
    });
};

document.querySelectorAll('[type=submit]').forEach((element) => {
    hideMobileKeyboard(element);
});