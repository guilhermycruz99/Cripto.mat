// ======================================
// VARIÁVEIS
// ======================================

let modoAtual = "criptografar";
let mensagemAtual = "";
let numerosMensagem = [];
let matrizResultado = [];
let textoFinal = "";

// Charset fixo
const caracteres =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789áàâãäéèêëíìîïóòôõöúùûüçÇÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜ .,;:!?\"'()[]{}<>-_+=/*\\|@#$%&\n\t";

// Módulo
const MOD = 251;

// ======================================
// TELAS
// ======================================

function mostrarTela(idTela) {

    document
        .querySelectorAll(".screen")
        .forEach(tela =>
            tela.classList.remove(
                "active"
            )
        );

    document
        .getElementById(idTela)
        .classList.add("active");
}

function mostrarConteudo(tipo) {
    mostrarTela(tipo);
}

// ======================================
// ESCOLHER MODO
// ======================================

function selecionarModo(modo) {

    modoAtual = modo;

    document
        .querySelectorAll(
            'input[name="modo"]'
        )
        .forEach(radio => {

            radio.checked =
                radio.value === modo;
        });

    mostrarTela("tela2");
}

// ======================================
// MOD
// ======================================

function mod(n, m) {
    return ((n % m) + m) % m;
}

// ======================================
// INVERSO MODULAR
// ======================================

function inversoModular(a, m) {

    a = mod(a, m);

    for (let x = 1; x < m; x++) {

        if (
            mod(a * x, m)
            === 1
        ) {
            return x;
        }
    }

    return null;
}

// ======================================
// MATRIZ INVERSA
// ======================================

function matrizInversaModular(
    a, b, c, d
) {

    const det =
        mod(
            (a * d) -
            (b * c),
            MOD
        );

    const detInv =
        inversoModular(
            det,
            MOD
        );

    if (
        detInv === null
    ) {

        alert(`
Essa matriz não pode ser usada.

Use outra matriz.
        `);

        return null;
    }

    return {

        a: mod(
            d * detInv,
            MOD
        ),

        b: mod(
            -b * detInv,
            MOD
        ),

        c: mod(
            -c * detInv,
            MOD
        ),

        d: mod(
            a * detInv,
            MOD
        )
    };
}

// ======================================
// CONVERTER TEXTO
// ======================================

function converterMensagem() {

    modoAtual =
        document.querySelector(
            'input[name="modo"]:checked'
        ).value;

    mensagemAtual =
        document.getElementById(
            "mensagem"
        ).value;

    if (
        !mensagemAtual.trim()
    ) {

        alert(
            "Digite um texto!"
        );

        return;
    }

    numerosMensagem = [];

    // =====================
    // CRIPTOGRAFAR
    // =====================

    if (
        modoAtual ===
        "criptografar"
    ) {

        for (
            let char
            of mensagemAtual
        ) {

            const indice =
                caracteres.indexOf(
                    char
                );

            if (
                indice !== -1
            ) {
                numerosMensagem.push(
                    indice
                );
            }
        }
    }

    // =====================
    // DESCRIPTOGRAFAR
    // =====================

    else {

        numerosMensagem =
            mensagemAtual
            .split("-")
            .map(Number);
    }

    if (
        numerosMensagem.length
        % 2 !== 0
    ) {

        numerosMensagem.push(0);
    }

    mostrarTela("tela3");
}

// ======================================
// CONVERSÃO
// ======================================

function mostrarConversao() {

    document.getElementById(
        "textoOriginal"
    ).innerHTML =
        mensagemAtual;

    document.getElementById(
        "matrizTexto"
    ).innerHTML = `

        <strong>
        Valores numéricos:
        </strong>

        <br><br>

        ${numerosMensagem.join(", ")}
    `;

    mostrarTela("tela4");
}

// ======================================
// PROCESSO
// ======================================

function mostrarProcesso() {

    const k11 = parseInt(
        document.getElementById(
            "k11"
        ).value
    );

    const k12 = parseInt(
        document.getElementById(
            "k12"
        ).value
    );

    const k21 = parseInt(
        document.getElementById(
            "k21"
        ).value
    );

    const k22 = parseInt(
        document.getElementById(
            "k22"
        ).value
    );

    matrizResultado = [];

    let html = `

    <div style="
        background:#eef1ff;
        padding:20px;
        border-radius:20px;
        margin-bottom:25px;
        text-align:center;
    ">

        <h3>
        Matriz-Chave
        </h3>

        <h2>
        [ ${k11} ${k12} ]
        <br>
        [ ${k21} ${k22} ]
        </h2>

    </div>
    `;

    // =================================
    // CRIPTOGRAFAR
    // =================================

    if (
        modoAtual ===
        "criptografar"
    ) {

        html += `
        <h3>
        🔒 Processo de
        Criptografia
        </h3>
        `;

        for (
            let i = 0;
            i <
            numerosMensagem.length;
            i += 2
        ) {

            const x =
                numerosMensagem[i];

            const y =
                numerosMensagem[
                    i + 1
                ];

            const r1Bruto =
                (
                    k11 * x
                ) +
                (
                    k12 * y
                );

            const r2Bruto =
                (
                    k21 * x
                ) +
                (
                    k22 * y
                );

            const r1 =
                mod(
                    r1Bruto,
                    MOD
                );

            const r2 =
                mod(
                    r2Bruto,
                    MOD
                );

            matrizResultado.push(
                r1
            );

            matrizResultado.push(
                r2
            );

            html += `

            <div style="
                background:white;
                padding:20px;
                border-radius:20px;
                margin-bottom:20px;
                border-left:6px solid #6d3df7;
            ">

                <h3>
                Par ${i/2 + 1}
                </h3>

                <h2 style="
                    text-align:center;
                    line-height:2;
                ">
                    [${k11} ${k12}]
                    ×
                    [${x}]
                    =
                    [${r1}]
                    <br>

                    [${k21} ${k22}]
                    &nbsp;&nbsp;
                    [${y}]
                    &nbsp;&nbsp;
                    [${r2}]
                </h2>

                <p>
                (${k11}×${x}
                +
                ${k12}×${y})
                mod ${MOD}
                =
                <strong>${r1}</strong>
                </p>

                <p>
                (${k21}×${x}
                +
                ${k22}×${y})
                mod ${MOD}
                =
                <strong>${r2}</strong>
                </p>

            </div>
            `;
        }
    }

    // =================================
    // DESCRIPTOGRAFAR
    // =================================

    else {

        const inv =
            matrizInversaModular(
                k11,
                k12,
                k21,
                k22
            );

        if (!inv) return;

        html += `

        <div style="
            background:#fff6db;
            padding:20px;
            border-radius:20px;
            margin-bottom:20px;
        ">

            <h3>
            🔓 Matriz Inversa
            </h3>

            <h2>
            [ ${inv.a} ${inv.b} ]
            <br>
            [ ${inv.c} ${inv.d} ]
            </h2>

        </div>
        `;

        for (
            let i = 0;
            i <
            numerosMensagem.length;
            i += 2
        ) {

            const x =
                numerosMensagem[i];

            const y =
                numerosMensagem[
                    i + 1
                ];

            const r1 =
                mod(
                    (
                        inv.a * x
                    ) +
                    (
                        inv.b * y
                    ),
                    MOD
                );

            const r2 =
                mod(
                    (
                        inv.c * x
                    ) +
                    (
                        inv.d * y
                    ),
                    MOD
                );

            matrizResultado.push(
                r1
            );

            matrizResultado.push(
                r2
            );

            html += `

            <div style="
                background:white;
                padding:20px;
                border-radius:20px;
                margin-bottom:20px;
                border-left:6px solid #16b364;
            ">

                <h3>
                Par ${i/2 + 1}
                </h3>

                <h2 style="
                    text-align:center;
                ">
                    [${inv.a} ${inv.b}]
                    ×
                    [${x}]
                    =
                    [${r1}]
                    <br>

                    [${inv.c} ${inv.d}]
                    &nbsp;&nbsp;
                    [${y}]
                    &nbsp;&nbsp;
                    [${r2}]
                </h2>

            </div>
            `;
        }
    }

    document.getElementById(
        "processo"
    ).innerHTML = html;

    mostrarTela("tela5");
}
// ======================================
// RESULTADO
// ======================================

function mostrarResultado() {

    textoFinal = "";

    // =====================
    // CRIPTOGRAFAR
    // =====================

    if (
        modoAtual ===
        "criptografar"
    ) {

        textoFinal =
            matrizResultado.join(
                "-"
            );
    }

    // =====================
    // DESCRIPTOGRAFAR
    // =====================

    else {

        for (
            let n
            of matrizResultado
        ) {

            if (
                caracteres[n]
            ) {

                textoFinal +=
                    caracteres[n];
            }
        }
    }

    document.getElementById(
        "resultadoFinal"
    ).innerHTML = `

    <h2>
    ${
        modoAtual ===
        "criptografar"

        ? "🔒 Texto Criptografado"

        : "🔓 Texto Original Recuperado"
    }
    </h2>

    <div style="
        background:#eef1ff;
        padding:20px;
        border-radius:20px;
        margin-top:20px;
    ">
        <h2 style="
            color:#4b2aad;
            word-break:break-word;
        ">
            ${textoFinal}
        </h2>
    </div>
    `;

    mostrarTela("tela6");
}

// ======================================
// REINICIAR
// ======================================

function reiniciar() {

    document.getElementById(
        "mensagem"
    ).value = "";

    numerosMensagem = [];
    matrizResultado = [];
    textoFinal = "";

    mostrarTela("tela1");
}