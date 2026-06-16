
const modal = document.getElementById('modalElemento');

modal.addEventListener('show.bs.modal', function(event){

    const botao = event.relatedTarget;

    document.getElementById('nomeElemento').textContent =
        botao.dataset.nome;

    document.getElementById('descricaoElemento').textContent =
        botao.dataset.descricao;

    document.getElementById('simboloElemento').textContent =
        botao.dataset.simbolo;

    document.getElementById('numeroElemento').textContent =
        botao.dataset.numero;

    document.getElementById('massaElemento').textContent =
        botao.dataset.massa;

    document.getElementById('grupoElemento').textContent =
        botao.dataset.grupo;

    document.getElementById('periodoElemento').textContent =
        botao.dataset.periodo;

    document.getElementById('familiaElemento').textContent =
        botao.dataset.familia;

    document.getElementById('classificacaoElemento').textContent =
        botao.dataset.classificacao;

    document.getElementById('descobertoElemento').textContent =
        botao.dataset.descoberto;

    document.getElementById('anoElemento').textContent =
        botao.dataset.ano;

        const atomo = document.querySelector(".atomos");        
        const nomeAtomo = botao.dataset.atomo;
        atomo.id = nomeAtomo;
        console.log(atomo);
        console.log(nomeAtomo);

});

