const questions = [
    {
        question: "São categorias da Geografia, exceto:",
        options: [
            "território",
            "paisagem",
            "lugar", 
            "espaço celeste"],
        correct: "espaço celeste"
    },
    {
        question: "O espaço do indivíduo.” Essa é uma definição comumente utilizada para essa categoria da Geografia. Embora não exista um conceito unânime, essa categoria se destaca por ser a mais particular entre todas. \nA qual categoria da Geografia o enunciado faz referência?",
        options: [
            "Espaço geográfico",
            "Território",
            "Lugar", 
            "Paisagem"],
        correct: "Lugar"
    },
    {
        question: "Segundo o geógrafo brasileiro Milton Santos, essa categoria geográfica é definida como tudo aquilo que podemos ver no espaço terrestre, tudo que nossa visão alcança. É caracterizada por elementos que despertam os sentidos, como cores, volumes, sons, cheiros. \nQual categoria geográfica é descrita no enunciado?",
        options: [
            "Paisagem",
            "Território",
            "Lugar", 
            "Região"],
        correct: "Paisagem"
    },
    {
        question: "Uma importante categoria geográfica pode ser definida como: “uma área contínua que é identificada ou delimitada segundo critérios preestabelecidos que são selecionados de acordo com a necessidade ou de acordo com o pesquisador que está conduzindo um estudo sobre aquela área. Esses critérios podem compreender aspectos sociais, econômicos, culturais, etnolinguísticos ou mesmo naturais” (GUITARRARA, Paloma). \nTrata-se:",
        options: [
            "do território",
            "do lugar",
            "do espaço geográfico", 
            "da região"],
        correct: "da região"
    },
    {
        question: "O objeto de estudo da ciência geográfica é o espaço geográfico. Ele é caracterizado pela união entre dois elementos, que são:",
        options: [
            "paisagem e sociedade",
            "território e lugar",
            "região e paisagem", 
            "território e paisagem"],
        correct: "paisagem e sociedade"
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
    const message = "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre territórios!" + "Vem cá testar seus conhecimentos também! https://www.tecestude.com";
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
                title: "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre territórios!" + "Vem cá testar seus conhecimentos também!",
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



