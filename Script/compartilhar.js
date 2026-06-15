function copyText() {
    const message = "Ei, você já conhece a TecEstude? Vem cá testar seus conhecimentos também! https://www.tecestude.com";
    navigator.clipboard.writeText(message).then(() => {
        alert("Link copiado com sucesso para a área de transferência. Agora é só enviar para seus amigos!");
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

document.getElementById('shareBtn').addEventListener('click', async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Ei, você já conhece a TecEstude? Vem cá testar seus conhecimentos também!',
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