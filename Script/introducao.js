// Exibe o pop-up ao carregar a página, se ainda não foi exibido
document.addEventListener('DOMContentLoaded', function() {
    // Referência ao pop-up
    const popup = document.getElementById('popup');

    // Verifica se o pop-up foi exibido antes e se o elemento existe
    if (!sessionStorage.getItem('popupDisplayed') && popup) {
        popup.style.display = 'flex'; // Exibe o pop-up

        // Marca que o pop-up foi exibido
        sessionStorage.setItem('popupDisplayed', 'true');
    }

    // Referências às etapas
    const step1 = document.getElementById('step1');

    // Verifica se todos os elementos existem antes de configurar os eventos
    if (step1) {
        // Fecha o pop-up e remove o destaque do botão
        document.getElementById('closePopup').onclick = function() {
            if (popup) {
                popup.style.display = 'none';
            }
        };
    }
});