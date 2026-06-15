const questions = [
    {
        question: "O processo de migração é resultante de vários fenômenos políticos, econômicos e sociais, os quais modificam as sociedades. No Brasil, um intenso processo de movimentação da população ao longo da segunda metade do século XX provocou várias mudanças no país. A principal consequência desse movimento da população nacional foi o aumento da população urbana brasileira. Esse movimento é chamado de:",
        options: [
            "refugiados ambientais",
            "diáspora brasileira",
            "migrações externas", 
            "êxodo rural"],
        correct: "êxodo rural"
    },
    {
        question: "No Brasil, o processo de migração interna foi amplamente verificado ao longo do século XX. No país, predominam as migrações por motivações:",
        options: [
            "econômicas",
            "climáticas",
            "religiosas", 
            "militares"],
        correct: "econômicas"
    },
    {
        question: "É um país localizado na América do Norte conhecido internacionalmente pelas rígidas leis migratórias. É muito procurado, em especial por imigrantes latinoamericanos que buscam melhores condições de trabalho e renda. O período acima remete a qual país americano?",
        options: [
            "Canadá",
            "Brasil",
            "Estados Unidos", 
            "Reino Unido"],
        correct: "Estados Unidos"
    },
    {
        question: "Qual o termo que designa corretamente a pessoa que faz um movimento de saída, ou seja, sai do seu lugar de origem, em busca de um outro lugar para moradia?",
        options: [
            "Forasteiro",
            "Imigrante",
            "Emigrante", 
            "Nômade"],
        correct: "Emigrante"
    },
    {
        question: "(Enem 2015) Os nossos ancestrais dedicavam-se à caça, à pesca e à coleta de frutas e vegetais, garantindo sua subsistência, porque ainda não conheciam as práticas de agricultura e pecuária. Uma vez esgotados os alimentos, viam-se obrigados a transferir o acampamento para outro lugar. \nHALL, P. P. Gestão ambiental. São Paulo: Pearson, 2011 (adaptado). \nO texto refere-se ao movimento migratório denominado:",
        options: [
            "sedentarismo",
            "transumância",
            "êxodo rural", 
            "nomadismo"],
        correct: "nomadismo"
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
    const message = "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre migração!" + "Vem cá testar seus conhecimentos também! https://www.tecestude.com";
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
                title: "Acertei " + score + " de " + questions.length + " perguntas nesse quiz sobre migração!" + "Vem cá testar seus conhecimentos também!",
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



