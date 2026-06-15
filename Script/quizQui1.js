const questions = [
    {
        question: "(Enem 2020) Os objetos de prata tendem a escurecer com o tempo, em contato com compostos de enxofre, por causa da formação de uma película superficial de sulfeto de prata (Ag2S), que é escuro. Um método muito simples para restaurar a superfície original desses objetos é mergulhá-los em uma solução diluída aquecida de hidróxido de sódio (NaOH), contida em uma panela comum de alumínio. A equação química que ilustra esse processo é: \n3 Ag2S (s) + 2 Al (s) + 8 NaOH (aq) → 6 Ag (s) + 3 Na2S (aq) + 2 NaAlO2 (aq) + 4 H2O (l) \nA restauração do objeto de prata ocorre por causa do(a):",
        options: [
            "prata, que reduz o enxofre",
            "íon sulfeto, que sofre oxidação",
            "íon hidróxido, que atua como agente oxidante", 
            "alumínio, que atua como agente redutor no processo"],
        correct: "alumínio, que atua como agente redutor no processo"
    },
    {
        question: "Atualmente, soldados em campo, seja em treinamento ou em combate, podem aquecer suas refeições, prontas e embaladas em bolsas plásticas, utilizando aquecedores químicos, sem precisar fazer fogo. Dentro dessas bolsas existe magnésio metálico em pó e, quando o soldado quer aquecer a comida, ele coloca água dentro da bolsa, promovendo a reação descrita pela equação química: \nMg(s) + 2 H2O(ℓ) →→ Mg(OH)2(s) + H2(g) + 350 kJ \nO aquecimento dentro da bolsa ocorre por causa da:",
        options: [
            "redução sofrida pelo oxigênio, que é uma reação exotérmica",
            "oxidação sofrida pelo magnésio, que é uma reação exotérmica",
            "redução sofrida pelo magnésio, que é uma reação endotérmica", 
            "oxidação sofrida pelo hidrogênio, que é uma reação exotérmica"],
        correct: "oxidação sofrida pelo magnésio, que é uma reação exotérmica"
    },
    {
        question: "(FUVEST 2009) A pólvora é o explosivo mais antigo conhecido pela humanidade. Consiste na mistura de nitrato de potássio, enxofre e carvão. Na explosão, ocorre uma reação de oxirredução, formando-se sulfato de potássio, dióxido de carbono e nitrogênio molecular. Nessa transformação, o elemento que sofre maior variação de número de oxidação é o:",
        options: [
            "carbono",
            "enxofre",
            "nitrogênio", 
            "oxigênio"],
        correct: "enxofre"
    },
    {
        question: "(PUC-MG) Em um laboratório, um grupo de estudantes colocou um pedaço de palha de aço em um prato cobrindo-o com água sanitária. Após 10 minutos, eles observaram, no fundo do prato, a formação de uma nova substância de cor avermelhada, cuja fórmula é Fe2O3. \nA reação que originou esse composto ocorreu entre o ferro (Fe) e o hipoclorito de sódio (NaCℓO), presentes na água sanitária, e pode ser representada pela seguinte equação não balanceada: \nFe(s) + NaCℓO(aq) → Fe2O3(s) + NaCℓ(aq) \nConsiderando-se essas informações, é incorreto afirmar:",
        options: [
            "O hipoclorito de sódio atua como o redutor",
            "O ferro sofre uma oxidação",
            "A soma dos coeficientes das substâncias que participam da reação é igual a 9", 
            "O átomo de cloro do hipoclorito de sódio ganhou 2 elétrons"],
        correct: "O hipoclorito de sódio atua como o redutor"
    },
    {
        question: "(UERJ – 2013) Substâncias que contêm um metal de transição podem ser oxidantes. Quanto maior o número de oxidação desse metal, maior o caráter oxidante da substância. Em um processo industrial no qual é necessário o uso de um agente oxidante, estão disponíveis apenas quatro substâncias: FeO, Cu22O, Cr22O33 e KMnO44. \nA substância que deve ser utilizada nesse processo, por apresentar maior caráter oxidante, é:",
        options: [
            "FeO",
            "Cu22O",
            "Cr22O33", 
            "KMnO44"],
        correct: "KMnO44"
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


