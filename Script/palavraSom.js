let defaultVoice;
let isSpeaking = false; // Variável para verificar se está falando
let textSelectionEnabled = false; // Controla se a seleção de texto está habilitada
let currentUtterance = null; // Guarda a instância da fala atual

const getVoices = () => {
    const voices = speechSynthesis.getVoices();
    console.log('Vozes disponíveis:', voices);

    defaultVoice = voices[222];
};

const startSpeech = (text) => {
    if (text) {
        // Cancela a fala atual se existir
        if (isSpeaking && currentUtterance) {
            window.speechSynthesis.cancel(); // Interrompe a fala atual
        }

        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.voice = defaultVoice;
        currentUtterance.lang = 'pt-BR';

        // Inicia a fala
        window.speechSynthesis.speak(currentUtterance);
        isSpeaking = true; // Indica que está falando

        currentUtterance.onend = () => {
            isSpeaking = false; // Reseta quando a fala termina
            removeTextHighlight(); // Remove o destaque do texto após a fala
            currentUtterance = null; // Limpa a instância da fala
        };
    } else {
        alert('Nenhum texto encontrado.');
    }
};

// Função para obter o texto do elemento clicado
const getTextAtPoint = (x, y) => {
    const element = document.elementFromPoint(x, y);
    if (element) {
        return element.textContent.trim(); // Retorna o texto do elemento clicado
    }
    return null;
};

// Habilitar seleção de texto ao abrir o card
const enableTextSelection = () => {
    textSelectionEnabled = true;

    // Altera o cursor quando a seleção de texto está habilitada
    document.body.classList.add('word-select-enabled');

    // Adiciona a classe 'clickable' a todos os elementos que podem ser clicados
    const allElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, li, b'); 
    allElements.forEach(element => {
        element.classList.add('clickable');
    });

    // Adiciona evento de clique para capturar e falar o texto
    document.addEventListener('click', handleTextClick);
};

// Desabilitar seleção de texto ao fechar o card
const disableTextSelection = () => {
    textSelectionEnabled = false;

    // Remove o cursor personalizado
    document.body.classList.remove('word-select-enabled');

    // Remove a classe 'clickable' de todos os elementos
    const allElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, li, b');
    allElements.forEach(element => {
        element.classList.remove('clickable');
    });

    // Remove o evento de clique quando o card for fechado
    document.removeEventListener('click', handleTextClick);
};

// Função chamada ao clicar em um elemento
const handleTextClick = (event) => {
    if (textSelectionEnabled) {
        const text = getTextAtPoint(event.clientX, event.clientY);

        if (text) {
            highlightText(event.target); // Destaca o texto imediatamente após o clique
            startSpeech(text); // Inicia a fala do texto capturado
        }

        // Remove destaque se não houver interação após 500ms
        setTimeout(() => {
            removeTextHighlight(); // Remove destaque após o tempo expirar
        }, 500);
    }
};

// Destacar o texto selecionado
const highlightText = (element) => {
    removeTextHighlight(); // Remove o destaque de outros elementos antes de destacar o novo
    element.classList.add('selected-text'); // Adiciona a classe de destaque
};

// Remover o destaque do texto
const removeTextHighlight = () => {
    const highlightedText = document.querySelector('.selected-text');
    if (highlightedText) {
        highlightedText.classList.remove('selected-text'); // Remove a classe de destaque
    }
};

// Verificar se a síntese de fala é suportada no dispositivo
if ('speechSynthesis' in window) {
    if (speechSynthesis.getVoices().length) {
        getVoices(); // Se as vozes já estiverem disponíveis
    } else {
        // Garante o carregamento das vozes em dispositivos móveis
        speechSynthesis.onvoiceschanged = () => {
            getVoices();
        };
    }
} else {
    alert('A síntese de fala não é suportada neste dispositivo.');
}

const btnPalavraSom = document.getElementById('btnPalavraSom');
if (btnPalavraSom) {
    btnPalavraSom.addEventListener('click', function() {
        const card = document.getElementById('cardPalavraSom');
        if (card) {
            card.classList.toggle('PalavraSomhidden');

            if (!card.classList.contains('PalavraSomhidden')) {
                enableTextSelection(); // Habilita a seleção de texto quando o card é aberto
            } else {
                disableTextSelection(); // Desabilita quando o card é fechado
                setTimeout(() => {
                    window.speechSynthesis.cancel(); // Interrompe a fala ao fechar o card
                    removeTextHighlight(); // Remove o destaque do texto ao fechar o card
                }, 100); 
            }
        }
    });
}

// Controle de fechamento do card (Com checagem de segurança se o elemento existe)
const closeCard = document.getElementById('closeCardPalavraSom');
if (closeCard) {
    closeCard.addEventListener('click', function() {
        const card = document.getElementById('cardPalavraSom');
        if (card) card.classList.add('PalavraSomhidden');
        disableTextSelection(); 
        setTimeout(() => {
            window.speechSynthesis.cancel(); 
            removeTextHighlight(); 
        }, 100); 
    });
}

// Controle do botão "Parar de Falar" (Com checagem de segurança se o elemento existe)
const btnParar = document.getElementById('pararDeFalar');
if (btnParar) {
    btnParar.addEventListener('click', function() {
        window.speechSynthesis.cancel(); // Interrompe a fala
        isSpeaking = false; // Reseta o estado de fala
        removeTextHighlight(); // Remove o destaque do texto ao parar de falar
    });
}