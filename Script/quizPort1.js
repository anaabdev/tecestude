const questions = [
    {
        question: "Assinalar a alternativa que preenche corretamente as lacunas das seguintes orações: \nI. Precisa falar ___ cerca de três mil operários \nII. Daqui ___ alguns anos tudo estará mudado \nIII. ___ dias está desaparecido \nIV. Vindos de locais distantes, todos chegaram ___ tempo ___ reunião",
        options: [
            "a - a - há - a - à",
            "à - a - a - há - a",
            "a - à - a - a - há", 
            "há - a - à - a - a"],
        correct: "a - a - há - a - à"
    },
    {
        question: "A alternativa em que o sinal de crase não procede é:",
        options: [
            "À exceção da Bandeirantes, as outras emissoras de televisão detêm a ampla liderança com percentuais fabulosos.",
            "Está presente a cineasta das cidades brasileiras à quem a porcentagem de 7% surpreendeu.",
            "Os dados da pesquisa referem-se às cenas, certamente sem paralelo, em qualquer outro lugar no mundo.", 
            "Cresce, às escondidas, o número de cidades recebendo imagens de televisão, ameaçadoras dos valores ético-culturais."],
        correct: "Está presente a cineasta das cidades brasileiras à quem a porcentagem de 7% surpreendeu."
    },
    {
        question: "Refiro-me ___ atitudes de adultos que, na verdade, levam as moças ___ rebeldia insensata e ___ uma fuga insensata.",
        options: [
            "às - à - à",
            "as - à - à",
            "às - à - a", 
            "à - a - a"],
        correct: "às - à - a"
    },
    {
        question: "(IFSP) Assinale a alternativa que preenche, correta e respectivamente, a frase a seguir.\nOs interessados em adotar crianças têm de recorrer ___ orientações do Juizado de Menores e se sujeitar ___ uma espera muitas vezes longa, o que, apesar de tudo, não desanima ___ maioria.",
        options: [
            "às - a - a",
            "às - à - a",
            "às - à - à", 
            "as - a - à"],
        correct: "às - a - a"
    },
    {
        question: "Analisando as sentenças: \nI. A vista disso, devemos tomar sérias medidas.\nII. Não fale tal coisa as outras.\nIII. Dia a dia a empresa foi crescendo.\nIV. Não ligo aquilo que me disse. \nPodemos deduzir que:",
        options: [
            "Apenas a sentença III não tem crase.",
            "As sentenças III e IV não têm crase.",
            "Todas as sentenças têm crase.", 
            "Nenhuma sentença tem crase."],
        correct: "Apenas a sentença III não tem crase."
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
    const message = "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre o uso da crase!" + "Vem cá testar seus conhecimentos também! https://www.tecestude.com";
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
                title: "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre o uso da crase!" + "Vem cá testar seus conhecimentos também!",
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


