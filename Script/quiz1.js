window.addEventListener("beforeunload", function (event) {
    event.preventDefault(); 
    event.returnValue = ''; 
});

const questions = [
    {
        question: "Qual é a capital da França?",
        options: ["Paris", "Londres", "Berlim", "Roma"],
        correct: "Paris"
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        options: ["Marte", "Vênus", "Júpiter", "Saturno"],
        correct: "Júpiter"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
        correct: "Leonardo da Vinci"
    },
    {
        question: "Em que ano o homem pisou na Lua pela primeira vez?",
        options: ["1965", "1969", "1971", "1975"],
        correct: "1969"
    },
    {
        question: "Qual é o elemento químico mais abundante na atmosfera da Terra?",
        options: ["Oxigênio", "Nitrogênio", "Carbono", "Hidrogênio"],
        correct: "Nitrogênio"
    }
];

let currentQuestionIndex = 0;
let score = 0; // Contagem de acertos
let selectedOption = null; // Alternativa selecionada pelo usuário

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const progressElement = document.querySelector('.progress');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
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
        if (selectedOption.textContent === questions[currentQuestionIndex].correct && currentQuestionIndex != (questions.length - 1) ) {
            score++; // Incrementa a pontuação se a resposta estiver correta
        }
        // Espera um tempo antes de passar para a próxima questão
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showResults(); // Mostra o resultado ao final
                botao1.innerHTML = "Voltar para a página inicial"; 
                divResp.style.visibility = "visible";
            }
        }, 1000); // Tempo de espera antes de avançar (1000 ms = 1 segundo)
    } else {
        alert('Por favor, selecione uma resposta antes de avançar.');
    }
    if (botao1.innerHTML == "Voltar para a página inicial") {
        window.location.replace("quizzes.html")

    }
}


function showResults() {
    questionElement.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
    optionsElement.innerHTML = ''; // Limpa as opções
    progressElement.style.width = '100%'; 
    // Preenche a barra de progresso
}

document.getElementById('next').addEventListener('click', nextQuestion);

// Carrega a primeira pergunta
loadQuestion();
