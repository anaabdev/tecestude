document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('modonoturno');
    const logoImage = document.getElementById('logo'); // Seleciona a imagem
    const logoImage2 = document.getElementById('logo2');

    // Função para aplicar o tema e trocar a imagem
    const applyTheme = (theme) => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
        themeToggle.checked = theme === 'dark-theme';

        if (theme === 'dark-theme') {
            if (logoImage) logoImage.src = 'Imagens/Logo Tec Estude Branco.svg';
            if (logoImage2) logoImage2.src = 'Imagens/Logo Tec Estude Branco.svg'; 
        } else {
            if (logoImage) logoImage.src = 'Imagens/Logo Tec Estude.svg';
            if (logoImage2) logoImage2.src = 'Imagens/Logo Tec Estude.svg';  
        }
    };

    // Verifica a preferência do usuário no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Verifica a preferência do usuário no sistema (modo escuro automático)
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDarkScheme ? 'dark-theme' : 'light-theme';
        applyTheme(defaultTheme);
    }

    // Alterna o tema ao clicar na checkbox
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark-theme' : 'light-theme';
        applyTheme(newTheme);
    });

    // Monitorar mudanças no esquema de cores preferido
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = event.matches ? 'dark-theme' : 'light-theme';
            applyTheme(newTheme);
        }
    });
});