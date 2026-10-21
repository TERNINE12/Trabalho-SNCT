
let tabuleiro = Array(9).fill(" ");
let jogoAtivo = true;

function mostrarTabuleiro() {
    return `
     ${tabuleiro[0]} | ${tabuleiro[1]} | ${tabuleiro[2]}
    ---+---+---
     ${tabuleiro[3]} | ${tabuleiro[4]} | ${tabuleiro[5]}
    ---+---+---
     ${tabuleiro[6]} | ${tabuleiro[7]} | ${tabuleiro[8]}

    Posições:
     1 | 2 | 3
    ---+---+---
     4 | 5 | 6
    ---+---+---
     7 | 8 | 9
    `;
}

function verificarVitoria(simbolo) {
    const linhas = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return linhas.some(([a, b, c]) =>
        tabuleiro[a] === simbolo &&
        tabuleiro[b] === simbolo &&
        tabuleiro[c] === simbolo
    );
}

function escolherJogada() {
    const linhas = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Tenta vencer
    for (const linha of linhas) {
        const [a, b, c] = linha;
        const casas = [a, b, c];

        if (
            casas.filter(i => tabuleiro[i] === "O").length === 2 &&
            casas.some(i => tabuleiro[i] === " ")
        ) {
            return casas.find(i => tabuleiro[i] === " ");
        }
    }

    // Tenta bloquear o jogador
    for (const linha of linhas) {
        const [a, b, c] = linha;
        const casas = [a, b, c];

        if (
            casas.filter(i => tabuleiro[i] === "X").length === 2 &&
            casas.some(i => tabuleiro[i] === " ")
        ) {
            return casas.find(i => tabuleiro[i] === " ");
        }
    }

    // Prefere o centro
    if (tabuleiro[4] === " ") return 4;

    // Prefere os cantos
    const cantos = [0, 2, 6, 8].filter(
        i => tabuleiro[i] === " "
    );

    if (cantos.length > 0) {
        return cantos[Math.floor(Math.random() * cantos.length)];
    }

    // Escolhe outra casa livre
    const livres = tabuleiro
        .map((casa, i) => casa === " " ? i : -1)
        .filter(i => i !== -1);

    if (livres.length > 0) {
        return livres[Math.floor(Math.random() * livres.length)];
    }

    return -1;
}

function jogar() {
    while (jogoAtivo) {
        // Jogada do humano
        let resposta = prompt(
            "JOGO DA VELHA\nVocê é X; computador é O.\n\n" +
            mostrarTabuleiro() +
            "\nEscolha uma posição de 1 a 9:"
        );

        // Permite cancelar a partida
        if (resposta === null) {
            alert("Partida encerrada.");
            break;
        }

        let posicao = Number(resposta) - 1;

        if (
            resposta.trim() === "" ||
            !Number.isInteger(Number(resposta)) ||
            posicao < 0 ||
            posicao > 8 ||
            tabuleiro[posicao] !== " "
        ) {
            alert("Posição inválida ou ocupada. Tente novamente.");
            continue;
        }

        tabuleiro[posicao] = "X";

        if (verificarVitoria("X")) {
            alert("Você venceu!\n\n" + mostrarTabuleiro());
            break;
        }

        if (tabuleiro.every(casa => casa !== " ")) {
            alert("Empate!\n\n" + mostrarTabuleiro());
            break;
        }

        // Jogada do computador
        const computador = escolherJogada();
        tabuleiro[computador] = "O";

        if (verificarVitoria("O")) {
            alert("O computador venceu!\n\n" + mostrarTabuleiro());
            break;
        }

        if (tabuleiro.every(casa => casa !== " ")) {
            alert("Empate!\n\n" + mostrarTabuleiro());
            break;
        }
    }

    jogoAtivo = false;
}

jogar();
