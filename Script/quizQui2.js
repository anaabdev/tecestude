const questions = [
    {
        question: "Qual é a diferença entre número atômico e número de massa de um átomo?",
        options: [
            "O número atômico é a soma dos prótons e nêutrons, enquanto o número de massa é apenas o número de prótons",
            "O número atômico indica a quantidade de elétrons, enquanto o número de massa é a soma dos prótons e nêutrons",
            "O número atômico representa a quantidade de prótons, enquanto o número de massa é a soma dos prótons e nêutrons", 
            "Ambos são iguais e representam a mesma coisa"],
        correct: "O número atômico representa a quantidade de prótons, enquanto o número de massa é a soma dos prótons e nêutrons"
    },
    {
        question: "Como os prótons, nêutrons e elétrons se distribuem dentro de um átomo?",
        options: [
            "Prótons e nêutrons estão no núcleo, e elétrons orbitam ao redor do núcleo",
            "Prótons estão na camada de valência, e elétrons e nêutrons estão dentro do núcleo", 
            "Prótons, nêutrons e elétrons estão distribuídos uniformemente no átomo",
            "Apenas os elétrons estão no núcleo, enquanto prótons e nêutrons orbitam"],
        correct: "Prótons e nêutrons estão no núcleo, e elétrons orbitam ao redor do núcleo"
    },
    {
        question: "Indique o que são isótopos e como eles diferem entre si",
        options: [
            "Isótopos são átomos do mesmo elemento com o mesmo número de nêutrons",
            "Isótopos são átomos do mesmo elemento com diferentes números de nêutrons",
            "Isótopos são átomos de elementos diferentes que possuem a mesma massa", 
            "Isótopos são átomos com número atômico diferente, mas com a mesma massa"],
        correct: "Isótopos são átomos do mesmo elemento com diferentes números de nêutrons"
    },
    {
        question: "Quais foram as principais contribuições do modelo atômico de Bohr para o entendimento da estrutura de um átomo?",
        options: [
            "Introdução do conceito de órbitas circulares para elétrons",
            "A descoberta do núcleo atômico",
            "A afirmação de que os átomos são indivisíveis", 
            "A teoria da relatividade aplicada aos átomos"],
        correct: "Introdução do conceito de órbitas circulares para elétrons"
    },
    {
        question: "Como o conceito de orbital atômico ajuda a explicar o comportamento dos elétrons em um átomo?",
        options: [
            "Os orbitais descrevem a posição exata dos elétrons",
            "Os orbitais representam regiões onde há maior probabilidade de encontrar um elétron",
            "Os orbitais são iguais para todos os elementos", 
            "Os orbitais são irrelevantes para o comportamento dos elétrons"],
        correct: "Os orbitais representam regiões onde há maior probabilidade de encontrar um elétron"
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
    const message = "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre química!" + "Vem cá testar seus conhecimentos também! https://www.tecestude.com";
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
                title: "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre química!" + "Vem cá testar seus conhecimentos também!",
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

