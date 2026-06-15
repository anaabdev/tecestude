const questions = [
    {
        question: "É a segunda região menos populosa do país, com cerca de 18,2 milhões de habitantes. Apresenta a menor densidade demográfica: 4,2 habitantes/km2. O predomínio do clima equatorial é um destaque de seu quadro natural. As informações fazem referência a qual região brasileira?",
        options: [
            "Centro-Oeste",
            "Sul",
            "Nordeste", 
            "Norte"],
        correct: "Norte"
    },
    {
        question: "Considerando os aspectos naturais da região Centro-Oeste do Brasil, assinale a alternativa correta:",
        options: [
            "Percebe-se um quadro natural homogêneo: vegetação de Caatinga e clima tropical semiárido",
            "A vegetação predominante é o Cerrado e o clima típico é o tropical semiúmido, com verão chuvoso e inverno seco",
            "Os solos profundos e ricos em nutrientes garantem a elevada produtividade da agricultura, a atividade econômica mais importante da região", 
            "O clima equatorial, predominante na região, é o fator natural mais importante para a economia, pois garante a elevada produção agropecuária"],
        correct: "A vegetação predominante é o Cerrado e o clima típico é o tropical semiúmido, com verão chuvoso e inverno seco"
    },
    {
        question: "É a região brasileira que apresenta uma subdivisão. São quatro sub-regiões fortemente marcadas por aspectos naturais particulares. Qual região do Brasil é descrita pelo enunciado?",
        options: [
            "Norte",
            "Centro-Oeste",
            "Nordeste", 
            "Sudeste"],
        correct: "Nordeste"
    },
    {
        question: "O Pantanal é uma formação vegetacional complexa, considerado uma das maiores riquezas naturais do planeta Terra. Esse importante bioma está localizado em qual região brasileira?",
        options: [
            "Sul",
            "Sudeste",
            "Nordeste", 
            "Centro-Oeste"],
        correct: "Centro-Oeste"
    },
    {
        question: "O clima subtropical é caracterizado pela presença das quatro estações bem definidas e chuvas regulares e bem distribuídas ao longo do ano. No Brasil, a ocorrência desse tipo climático é verificada em apenas uma das regiões. Marque a alternativa que indica corretamente a região do clima subtropical.",
        options: [
            "Sudeste",
            "Centro-Oeste",
            "Nordeste", 
            "Sul"],
        correct: "Sul"
    }
];

let currentQuestionIndex = 0;
let score = 0; // Contagem de acertos
let selectedOption = null; // Alternativa selecionada pelo usuário

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const progressElement = document.querySelector('.progress');
const contador= document.querySelector('.contador');

function loadQuestion() {
    
    const currentQuestion = questions[currentQuestionIndex];
    contador.innerHTML = "Questão " + (currentQuestionIndex+1) + " de " + questions.length;
    questionElement.textContent = currentQuestion.question;
    
    optionsElement.innerHTML = ''; // Limpa as opções anteriores
    selectedOption = null; // Reseta a opção selecionada

    currentQuestion.options.forEach(optionText => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = optionText;
        button.addEventListener('click', () => {
            if (selectedOption) return; // Se já foi selecionada, não permite trocar

            selectedOption = button;

            if (optionText === currentQuestion.correct) {
                button.classList.add('correct'); // Muda a cor para verde
            } else {
                button.classList.add('incorrect'); // Muda a cor para vermelho
                // Destacar a alternativa correta
                const correctButton = Array.from(optionsElement.children).find(
                    btn => btn.textContent === currentQuestion.correct
                );
                correctButton.classList.add('correct');
            }

            disableOptions();
        });
        optionsElement.appendChild(button);
    });

    // Atualiza a barra de progresso
    progressElement.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

function disableOptions() {
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(option => {
        option.disabled = true; // Desabilita os botões
    });
}

function nextQuestion() {
    if (selectedOption) {
        var botao1 = document.getElementById("next");
        var divResp = document.getElementById("divResp");
        var divBtn1 = document.getElementById("divBtnCompartilhar");
        var divBtn2 = document.getElementById("shareBtn");
        if (selectedOption.textContent === questions[currentQuestionIndex].correct && currentQuestionIndex != (questions.length) ) {
            //alert("acertou");
            score++; // Incrementa a pontuação se a resposta estiver correta
        }
        // Espera um tempo antes de passar para a próxima questão
        setTimeout(() => {
            if (currentQuestionIndex < questions.length -1 ) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showResults(); // Mostra o resultado ao final
                botao1.innerHTML = "Voltar para a página inicial";
                divResp.style.visibility = "visible";
                divBtn1.style.visibility = "visible";
                divBtn2.style.visibility = "visible";
            }
        }, 1000); // Tempo de espera antes de avançar (1000 ms = 1 segundo)
    } else {
        alert('Por favor, selecione uma resposta antes de avançar.');
    }
    if (botao1.innerHTML == "Voltar para a página inicial") {
        window.location.replace("quizzes.html");
    }
}


function showResults() {
   
    selectedOption.textContent = "Cabou o quiz";
    questionElement.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
    optionsElement.innerHTML = ''; // Limpa as opções
    contador.innerHTML = '';
    progressElement.style.width = '100%';
    // Preenche a barra de progresso
}

function copyText() {
    const message = "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre regiões!" + "Vem cá testar seus conhecimentos também! https://www.tecestude.com";
    navigator.clipboard.writeText(message).then(() => {
        alert("Mensagem copiada para a área de transferência!");
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

document.getElementById('shareBtn').addEventListener('click', async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre regiões!" + "Vem cá testar seus conhecimentos também!",
                url: 'https://www.tecestude.com',
            });
            console.log('Compartilhamento bem-sucedido');
        } catch (error) {
            console.error('Erro ao compartilhar:', error);
        }
    } else {
        alert('A API de compartilhamento não é suportada neste navegador.');
    }
});

document.getElementById('next').addEventListener('click', nextQuestion);

// Carrega a primeira pergunta
loadQuestion();



