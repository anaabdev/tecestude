const questions = [
    {
        question: "Assinale a alternativa que reúne os nomes dos países e territórios que formam o conjunto conhecido como Tigres Asiáticos:",
        options: [
            "Coreia do Norte, Taiwan, China, Cingapura",
            "Cingapura, Vietnã, Filipinas, Coreia do Sul",
            "Hong Kong, Coreia do Norte, Taiwan, Cingapura", 
            "Coreia do Sul, Taiwan, Cingapura, Hong Kong"],
        correct: "Coreia do Sul, Taiwan, Cingapura, Hong Kong"
    },
    {
        question: "A denominação Tigres Asiáticos, atribuída a alguns países e territórios da Ásia, faz referência:",
        options: [
            "ao processo político de substituição das ditaduras militares por governos democráticos a partir da década de 1970",
            "à questão cultural que envolve povos orientais, intimamente ligada ao calendário chinês",
            "ao processo de reconstrução política e econômica dos países asiáticos ao final da Segunda Guerra Mundial", 
            "ao rápido, competitivo e agressivo processo de crescimento econômico que quatro territórios e países asiáticos apresentaram a partir da segunda metade do século XX"],
        correct: "ao rápido, competitivo e agressivo processo de crescimento econômico que quatro territórios e países asiáticos apresentaram a partir da segunda metade do século XX"
    },
    {
        question: "A participação dos governos no processo de crescimento econômico dos Tigres Asiáticos foi fundamental e seguiu o mesmo padrão nos quatro países e territórios. Indique a alternativa que estabelece a principal atuação direta dos Estados Nacionais no desenvolvimento dos Tigres Asiáticos:",
        options: [
            "Criação de empresas estatais de base",
            "Financiamento de dívidas privadas e recuperação do crédito",
            "Investimentos em infraestrutura e em setores estratégicos", 
            "Estabelecimento do modelo industrial, substituindo importações"],
        correct: "Investimentos em infraestrutura e em setores estratégicos"
    },
    {
        question: "A industrialização é um dos pilares do processo de crescimento econômico que os Tigres Asiáticos desenvolveram a partir da década de 1970. O modelo industrial que sustentou a industrialização e o desenvolvimento dos Tigres Asiáticos e que influenciou outros países na Ásia é chamado de:",
        options: [
            "internacionalização da economia",
            "plataformas de exportação",
            "substituição de importações", 
            "industrialização coletiva"],
        correct: "plataformas de exportação"
    },
    {
        question: "A mão de obra é um diferencial que favoreceu imensamente o desenvolvimento dos Tigres Asiáticos. A característica marcante dessa mão de obra pode ser associada:",
        options: [
            "à elevada qualificação, advinda dos altos investimentos estatais em educação",
            "ao baixo custo, advindo da desqualificação, resultado de inexpressivos investimentos em educação",
            "ao alto custo, resultante das legislações trabalhistas altamente direitistas e protetoras", 
            "ao alto grau de qualificação, advindo da forte imigração de japoneses após a Segunda Guerra Mundial"],
        correct: "à elevada qualificação, advinda dos altos investimentos estatais em educação"
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
    const message = "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre os Tigres Asiáticos!" + "Vem cá testar seus conhecimentos também! https://www.tecestude.com";
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
                title: "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre os Tigres Asiáticos!" + "Vem cá testar seus conhecimentos também!",
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



