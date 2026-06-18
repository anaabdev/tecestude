let grupoAtivo = null;

const grupos = {
    naoMetais: [
        'hidrogenio',
        'carbono',
        'nitrogenio',
        'oxigenio',
        'fosforo',
        'enxofre',
        'selenio'
    ],

    metaisAlcalinos: [
        'litio',
        'sodio',
        'potassio',
        'rubidio',
        'cesio',
        'francio'
    ],

    metaisAlcalinoTerrosos: [
        'berilio',
        'magnesio',
        'calcio',
        'estroncio',
        'bario',
        'radio'
    ],

    metaisTransicao: [
        'escandio',
        'titanio',
        'vanadio',
        'cromo',
        'manganes',
        'ferro',
        'cobalto',
        'niquel',
        'cobre',
        'zinco',
        'itrio',
        'zirconio',
        'niobio',
        'molibdenio',
        'tecnecio',
        'rutenio',
        'rodio',
        'paladio',
        'prata',
        'cadmio',
        'hafnio',
        'tantalo',
        'tungstenio',
        'renio',
        'osmio',
        'iridio',
        'platina',
        'ouro',
        'mercurio',
        'rutherfordio',
        'dubnio',
        'seaborgio',
        'bohrio',
        'hassio',
        'meitnerio',
        'darmstadtio',
        'roentgenio',
        'copernicio'
    ],

    outrosMetais: [
         'aluminio',
        'galio',
        'indio',
        'estanho',
        'talio',
        'chumbo',
        'bismuto',
        'nihonio',
        'flerovio',
        'moscovio',
        'livermorio'
    ],

    semiMetais: [
        'boro',
        'silicio',
        'germanio',
        'arsenio',
        'antimonio',
        'telurio',
        'polonio'
    ],

    gasesNobres: [
        'helio',
        'neonio',
        'argonio',
        'criptonio',
        'xenonio',
        'radonio',
        'oganessonio'
    ],

    halogenios: [
        'fluor',
        'cloro',
        'bromo',
        'iodo',
        'astato',
        'tenesso'
    ],

    lantanideos: [
         'lantanio',
        'cerio',
        'praseodimio',
        'neodimio',
        'promecio',
        'samario',
        'europio',
        'gadolinio',
        'terbio',
        'disprosio',
        'holmio',
        'erbio',
        'tulio',
        'iterbio',
        'lutecio'
    ],

    actinidios: [
         'actinio',
        'torio',
        'protactinio',
        'uranio',
        'netunio',
        'plutonio',
        'americio',
        'curio',
        'berquelio',
        'californio',
        'einstenio',
        'fermio',
        'mendelevio',
        'nobelio',
        'laurencio'
    ]
};

function destacarGrupo(nomeGrupo) {

    document.querySelectorAll('.classificacoes button').forEach(botao => {
    botao.classList.remove('ativo');
});

    document.querySelectorAll('.element').forEach(e => {
        e.classList.remove('destacado', 'opaco');
    });

    if (grupoAtivo === nomeGrupo) {
        grupoAtivo = null;
        return;
    }

    document.querySelectorAll('.element').forEach(e => {
        e.classList.add('opaco');
    });

    grupos[nomeGrupo].forEach(id => {
        const elemento = document.getElementById(id);

        if (elemento) {
            elemento.classList.remove('opaco');
            elemento.classList.add('destacado');
        }
    });

    document.getElementById(nomeGrupo).classList.add('ativo');

    grupoAtivo = nomeGrupo;
}

Object.keys(grupos).forEach(grupo => {
    document
        .getElementById(grupo)
        .addEventListener('click', () => destacarGrupo(grupo));
});