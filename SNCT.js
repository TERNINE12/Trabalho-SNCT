//Programa da disciplína de algoritmos, para a Semana Nacional de Ciência e Tecnologia
//jogo da velha básicão, ta certo

const prompt = require("node:readline/promises");

const rl = prompt.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tabuleiro = [
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " "
];

let jogador = "X";

function mostrarTabuleiro() {
    console.log("\n");

    for (let i = 0; i < 9; i += 3) {
        console.log(
            ` ${tabuleiro[i]} | ${tabuleiro[i + 1]} | ${tabuleiro[i + 2]} `
        );

        if (i < 6) {
            console.log("---+---+---");
        }
    }

    console.log("\n");
}

function verificarVitoria() {
    const combinacoes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return combinacoes.some(([a, b, c]) =>
        tabuleiro[a] === jogador &&
        tabuleiro[b] === jogador &&
        tabuleiro[c] === jogador
    );
}


async function jogar() {
    while (true) {
        mostrarTabuleiro();

        if (jogador === "X") {
            // Vez do jogador humano
            const resposta = await rl.question(
                "Sua vez (X). Escolha uma posição (1-9): "
            );

            const posicao = Number(resposta) - 1;

            if (
                !Number.isInteger(posicao) ||
                posicao < 0 ||
                posicao > 8 ||
                tabuleiro[posicao] !== " "
            ) {
                console.log("Posição inválida! Tente novamente.");
                continue;
            }

            tabuleiro[posicao] = "X";

        } else {
            // Vez da inteligência artificial
            console.log("O computador está pensando...");

            const posicao = escolherJogada(tabuleiro);

            if (posicao === -1) {
                break;
            }

            tabuleiro[posicao] = "O";

            console.log(
                `O computador escolheu a posição ${posicao + 1}.`
            );
        }

        // Verifica se o jogador atual venceu
        if (
            verificarVitoria()
        ) {
            mostrarTabuleiro();

            if (jogador === "X") {
                console.log("Parabéns! Você venceu!");
            } else {
                console.log("O computador venceu!");
            }

            break;
        }

        // Verifica empate
        if (tabuleiro.every(casa => casa !== " ")) {
            mostrarTabuleiro();
            console.log("Empate!");
            break;
        }

        // Alterna entre humano e computador
        jogador = jogador === "X" ? "O" : "X";
    }

    rl.close();
}



function escolherJogada(tabuleiro) {
    const combinacoes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // 1. Tenta encontrar uma jogada vencedora para o computador
    for (const [a, b, c] of combinacoes) {
        const linha = [tabuleiro[a], tabuleiro[b], tabuleiro[c]];

        if (
            linha.filter(casa => casa === "O").length === 2 &&
            linha.includes(" ")
        ) {
            return [a, b, c].find(i => tabuleiro[i] === " ");
        }
    }

    // 2. Tenta bloquear uma vitória imediata do jogador
    for (const [a, b, c] of combinacoes) {
        const linha = [tabuleiro[a], tabuleiro[b], tabuleiro[c]];

        if (
            linha.filter(casa => casa === "X").length === 2 &&
            linha.includes(" ")
        ) {
            return [a, b, c].find(i => tabuleiro[i] === " ");
        }
    }

    // 3. Se não houver ameaça, prefere o centro
    if (tabuleiro[4] === " ") {
        return 4;
    }

    // 4. Depois, prefere os cantos
    const cantos = [0, 2, 6, 8].filter(
        i => tabuleiro[i] === " "
    );

    if (cantos.length > 0) {
        return cantos[Math.floor(Math.random() * cantos.length)];
    }

    // 5. Por último, escolhe qualquer posição livre
    const livres = tabuleiro
        .map((casa, i) => casa === " " ? i : -1)
        .filter(i => i !== -1);

    if (livres.length > 0) {
        return livres[Math.floor(Math.random() * livres.length)];
    }

    return -1;
}


jogar();

