document.addEventListener('DOMContentLoaded', function() {
    let voices = [];

    // Função para obter as vozes disponíveis
    const getVoices = () => {
        voices = speechSynthesis.getVoices();
        console.log('Vozes disponíveis:', voices);

        // Exibir as vozes disponíveis no console
        voices.forEach((voice, index) => {
            console.log(`${index + 1}: ${voice.name} (${voice.lang})`);
        });

        // Adicionar eventos aos botões após carregar as vozes
        addSpeechEvents();
    };

    // Carregar as vozes
    speechSynthesis.onvoiceschanged = getVoices;
    if (speechSynthesis.getVoices().length !== 0) {
        getVoices();
    }

    // Função para iniciar a fala
    function startSpeech(event) {
        const card = document.getElementById('cardPalavraSom');
        if (card && card.classList.contains('PalavraSomhidden')) return;

        // Encontra o elemento com a classe .element mais próximo (caso o mouse entre em uma tag interna como h3 ou h5)
        const button = event.target.closest('.element');
        if (!button) return;

        const message = button.getAttribute('data-message');
        const vozelemento = new SpeechSynthesisUtterance(message);

        // Nome da voz padrão
        const defaultVoiceName = 'Google português do Brasil'; // Nome da voz no Chrome e Edge

        // Encontrar a voz padrão
        const defaultVoice = voices.find(voice => voice.name === defaultVoiceName);
        if (defaultVoice) {
            vozelemento.voice = defaultVoice;
            console.log(`Usando voz: ${defaultVoice.name}`);
        } else {
            console.warn('Voz padrão não encontrada. Usando a primeira voz disponível.');
            // Usar a primeira voz disponível se a voz personalizada não for encontrada
            vozelemento.voice = voices[222];
        }

        vozelemento.lang = 'pt-BR'; // Definir o idioma para português do Brasil
        
        // Falar o texto
        window.speechSynthesis.speak(vozelemento);
    }

    // Função para parar a fala
    function stopSpeech() {
        // Cancela a fala em progresso
        window.speechSynthesis.cancel();
    }

    // Função para adicionar eventos de fala aos botões
    function addSpeechEvents() {
        // Seleciona todos os botões com a classe 'elemento'
        const buttons = document.querySelectorAll('.element');

        // Adiciona os eventos para cada botão
        buttons.forEach(button => {
            button.addEventListener('mouseover', startSpeech);
            button.addEventListener('mouseout', stopSpeech);
            button.addEventListener('click', stopSpeech);
        });
    }
});