const questions = [
    {
        question: "(UEMG) As propriedades exibidas por um certo material podem ser explicadas pelo tipo de ligação química presente entre suas unidades formadoras. Em uma análise laboratorial, um químico identificou para um certo material as seguintes propriedades: \n*Alta temperatura de fusão e ebulição \nBoa condutividade elétrica em solução aquosa \nMau condutor de eletricidade no estado sólido \nA partir das propriedades exibidas por esse material, assinale a alternativa que indica o tipo de ligação predominante no mesmo:",
        options: [
            "metálica",
            "covalente",
            "dipolo induzido", 
            "iônica"],
        correct: "iônica"
    },
    {
        question: "Uma das principais características dos metais é a alta capacidade de conduzir calor e eletricidade, que pode ser explicada pela:",
        options: [
            "existência de mais elétrons que prótons",
            "existência de elétrons livres",
            "existência de mais de um tipo de ligação química", 
            "existência de prótons livres"],
        correct: "existência de elétrons livres"
    },
    {
        question: "O que diferencia uma ligação iônica de uma ligação covalente?",
        options: [
            "A ligação iônica envolve compartilhamento de elétrons, enquanto a covalente envolve transferência",
            "A ligação iônica ocorre entre não-metais, enquanto a covalente ocorre entre metais",
            "A ligação iônica envolve transferência de elétrons, enquanto a covalente envolve compartilhamento de elétrons", 
            "Elas não se diferenciam"],
        correct: "A ligação iônica envolve transferência de elétrons, enquanto a covalente envolve compartilhamento de elétrons"
    },
    {
        question: "O que são ligações metálicas e quais são as principais características dos metais que resultam desse tipo de ligação?",
        options: [
            "Ligações entre não-metais que resultam em alta volatilidade",
            "Ligações que envolvem a transferência de elétrons entre átomos de metal, resultando em brilho e maleabilidade",
            "Ligações que envolvem compartilhamento igualitário de elétrons entre átomos de metal", 
            "Ligações que ocorrem apenas em compostos iônicos"],
        correct: "Ligações que envolvem a transferência de elétrons entre átomos de metal, resultando em brilho e maleabilidade"
    },
    {
        question: "O que é uma ligação química e por que os átomos a formam?",
        options: [
            "Uma força que mantém os átomos juntos em uma molécula; os átomos a formam para atingir maior estabilidade",
            "Uma interação que separa os átomos; os átomos a formam para se distanciarem",
            "Um processo que altera o estado físico dos átomos; os átomos a formam para mudarem de fase", 
            "Uma atração que ocorre apenas entre não-metais; os átomos a formam para se tornarem gases"],
        correct: "Uma força que mantém os átomos juntos em uma molécula; os átomos a formam para atingir maior estabilidade"
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



