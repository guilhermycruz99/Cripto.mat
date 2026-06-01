// ======================================
// CRIPTO.MAT
// PARTE 1
// VARIÁVEIS E FUNÇÕES BÁSICAS
// ======================================


// ======================================
// VARIÁVEIS GLOBAIS
// ======================================

let modoAtual = "criptografar";

let mensagemAtual = "";

let numerosMensagem = [];

let matrizResultado = [];

let textoFinal = "";

let usarSistemaLinear = false;


// ======================================
// TABELA DE CARACTERES
// ======================================

const caracteres =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789áàâãäéèêëíìîïóòôõöúùûüçÇÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜ .,;:!?\"'()[]{}<>-_+=/*\\|@#$%&\n\t";


// ======================================
// MÓDULO
// ======================================

const MOD = 251;


// ======================================
// CONTROLE DE TELAS
// ======================================

function mostrarTela(idTela) {

    document
        .querySelectorAll(".screen")
        .forEach(tela => {

            tela.classList.remove("active");

        });

    const tela =
        document.getElementById(idTela);

    if (tela) {

        tela.classList.add("active");

    } else {

        console.error(
            "Tela não encontrada:",
            idTela
        );

    }
}

// ======================================
// MENU LATERAL
// ======================================

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
// MOD POSITIVO
// ======================================

function mod(n, m) {

    return (
        (
            n % m
        ) + m
    ) % m;

}


// ======================================
// INVERSO MODULAR
// ======================================

function inversoModular(a, m) {

    a = mod(a, m);

    for (

        let x = 1;

        x < m;

        x++

    ) {

        if (

            mod(
                a * x,
                m
            ) === 1

        ) {

            return x;

        }

    }

    return null;

}


// ======================================
// MATRIZ INVERSA MODULAR
// ======================================

function matrizInversaModular(

    a,
    b,
    c,
    d

) {

    const det = mod(

        (
            a * d
        )
        -
        (
            b * c
        ),

        MOD

    );

    const detInv = inversoModular(

        det,

        MOD

    );

    if (

        detInv === null

    ) {

        alert(

`Essa matriz não possui inversa modular.

Utilize outra matriz-chave.`

        );

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
// CONVERSÃO DA MENSAGEM
// ======================================

function converterMensagem() {

    modoAtual =
        document.querySelector(
            'input[name="modo"]:checked'
        ).value;

    usarSistemaLinear =
        document.getElementById(
            "modoAvancado"
        )?.checked || false;


    mensagemAtual =
        document.getElementById(
            "mensagem"
        ).value;


    if (

        !mensagemAtual.trim()

    ) {

        alert(
            "Digite uma mensagem."
        );

        return;

    }


    numerosMensagem = [];


    // ==========================
    // CRIPTOGRAFAR
    // ==========================

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

    // ==========================
    // DESCRIPTOGRAFAR
    // ==========================

    else {

        numerosMensagem =
            mensagemAtual
            .split("-")
            .map(Number)
            .filter(
                n => !isNaN(n)
            );

    }


    // ==========================
    // COMPLETAR PAR
    // ==========================

    if (

        numerosMensagem.length % 2 !== 0

    ) {

        numerosMensagem.push(0);

    }


    mostrarTela("tela3");

}

// ======================================
// TELA 4
// CONVERSÃO DO TEXTO
// ======================================

function mostrarConversao() {

    const textoDiv =
        document.getElementById(
            "textoOriginal"
        );

    const matrizDiv =
        document.getElementById(
            "matrizTexto"
        );


    // ==================================
    // TEXTO ORIGINAL
    // ==================================

    textoDiv.innerHTML = `

        <div style="
            text-align:center;
            font-size:28px;
            font-weight:bold;
            color:#4b2aad;
            padding:20px;
        ">

            ${mensagemAtual}

        </div>

    `;


    // ==================================
    // CRIPTOGRAFAR
    // ==================================

    if (

        modoAtual ===
        "criptografar"

    ) {

        let html = `

            <h3 style="
                text-align:center;
                margin-bottom:20px;
            ">

                Conversão para Valores Numéricos

            </h3>

            <div class="
                cards-letras
            ">
        `;

        for (

            let i = 0;

            i <
            numerosMensagem.length;

            i++

        ) {

            html += `

                <div class="
                    letra-card
                ">

                    ${numerosMensagem[i]}

                </div>

            `;

        }

        html += `
            </div>
        `;


        // ==============================
        // VETORES
        // ==============================

        html += `

            <h3 style="
                text-align:center;
                margin-top:30px;
            ">

                Formação dos Vetores

            </h3>

            <div class="
                vetores-container
            ">
        `;


        for (

            let i = 0;

            i <
            numerosMensagem.length;

            i += 2

        ) {

            html += `

                <div class="
                    vetor-card
                ">

                    <div class="
                        vetor-numero
                    ">
                        ${
                            numerosMensagem[i]
                        }
                    </div>

                    <div class="
                        vetor-numero
                    ">
                        ${
                            numerosMensagem[
                                i + 1
                            ]
                        }
                    </div>

                </div>

            `;

        }

        html += `
            </div>
        `;

        matrizDiv.innerHTML =
            html;
    }

    // ==================================
    // DESCRIPTOGRAFAR
    // ==================================

    else {

        let html = `

            <h3 style="
                text-align:center;
                margin-bottom:20px;
            ">

                Código Recebido

            </h3>

            <div class="
                cards-letras
            ">
        `;

        for (

            let i = 0;

            i <
            numerosMensagem.length;

            i++

        ) {

            html += `

                <div class="
                    letra-card
                ">

                    ${
                        numerosMensagem[i]
                    }

                </div>

            `;

        }

        html += `
            </div>
        `;


        html += `

            <div class="
                resultado-etapa
            ">

                O código será dividido
                em pares para aplicação
                da matriz inversa.

            </div>

        `;


        html += `

            <div class="
                vetores-container
            ">
        `;


        for (

            let i = 0;

            i <
            numerosMensagem.length;

            i += 2

        ) {

            html += `

                <div class="
                    vetor-card
                ">

                    <div class="
                        vetor-numero
                    ">
                        ${
                            numerosMensagem[i]
                        }
                    </div>

                    <div class="
                        vetor-numero
                    ">
                        ${
                            numerosMensagem[
                                i + 1
                            ]
                        }
                    </div>

                </div>

            `;

        }

        html += `
            </div>
        `;

        matrizDiv.innerHTML =
            html;
    }


    mostrarTela(
        "tela4"
    );
}

// ======================================
// PROCESSO MATEMÁTICO
// ======================================

function mostrarProcesso() {

    const k11 = parseInt(
        document.getElementById("k11").value
    );

    const k12 = parseInt(
        document.getElementById("k12").value
    );

    const k21 = parseInt(
        document.getElementById("k21").value
    );

    const k22 = parseInt(
        document.getElementById("k22").value
    );

    matrizResultado = [];

    let html = `

        <div class="resultado-etapa">

            🔑 Matriz-Chave Utilizada

        </div>

        ${criarMatrizHTML(
            k11,
            k12,
            k21,
            k22
        )}

    `;

    // =====================================
    // CRIPTOGRAFIA
    // =====================================

    if (

        modoAtual ===
        "criptografar"

    ) {

        html += `

            <div class="etapa-destaque">

                🔒 Processo de Criptografia

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
                numerosMensagem[i + 1];

            const r1 =
                mod(

                    (
                        k11 * x
                    )
                    +
                    (
                        k12 * y
                    ),

                    MOD

                );

            const r2 =
                mod(

                    (
                        k21 * x
                    )
                    +
                    (
                        k22 * y
                    ),

                    MOD

                );

            html += `

                <h3>

                    Vetor ${
                        (i / 2) + 1
                    }

                </h3>

            `;

            html += criarOperacaoHTML(

                criarMatrizHTML(
                    k11,
                    k12,
                    k21,
                    k22
                ),

                criarVetorHTML(
                    x,
                    y
                ),

                criarVetorHTML(
                    r1,
                    r2
                )

            );

            html += `

                <div class="formula">

                    (${k11} × ${x})
                    +
                    (${k12} × ${y})

                    =
                    ${r1}

                    <br><br>

                    (${k21} × ${x})
                    +
                    (${k22} × ${y})

                    =
                    ${r2}

                </div>

            `;

            // ============================
            // SEGUNDA CAMADA
            // ============================

            if (

                usarSistemaLinear

            ) {

                const linear =
                    aplicarSistemaLinear(
                        r1,
                        r2
                    );

                matrizResultado.push(
                    linear.x
                );

                matrizResultado.push(
                    linear.y
                );

                html += `

                    <div style="
                        background:#fff8d6;
                        padding:20px;
                        border-radius:20px;
                        margin-top:20px;
                        border-left:6px solid #f4b400;
                    ">

                        <h3>
                            🔐 Segunda Camada
                        </h3>

                        <p>

                            Valores após a matriz:

                            <strong>

                                ${r1}
                                ,
                                ${r2}

                            </strong>

                        </p>

                        <p>

                            Aplicando:

                            <br>

                            x' = 2x + y

                            <br>

                            y' = x + 3y

                        </p>

                        ${criarOperacaoHTML(

                            criarMatrizHTML(
                                2,
                                1,
                                1,
                                3
                            ),

                            criarVetorHTML(
                                r1,
                                r2
                            ),

                            criarVetorHTML(
                                linear.x,
                                linear.y
                            )

                        )}

                        <div class="codigo-final-box">

                            ${linear.x}
                            -
                            ${linear.y}

                        </div>

                    </div>

                `;

            }

            else {

                matrizResultado.push(r1);
                matrizResultado.push(r2);

            }

        }

    }

    // =====================================
    // DESCRIPTOGRAFIA
    // =====================================

    else {

        const inv =
            matrizInversaModular(

                k11,
                k12,
                k21,
                k22

            );

        if (!inv) {

            return;

        }

        html += `

            <div class="etapa-destaque">

                🔓 Processo de Descriptografia

            </div>

            <div class="resultado-etapa">

                Matriz Inversa

            </div>

            ${criarMatrizHTML(

                inv.a,
                inv.b,
                inv.c,
                inv.d

            )}

        `;

        for (

            let i = 0;

            i <
            numerosMensagem.length;

            i += 2

        ) {

            let x =
                numerosMensagem[i];

            let y =
                numerosMensagem[i + 1];

            // ==========================
            // REMOVER SISTEMA LINEAR
            // ==========================

            if (

                usarSistemaLinear

            ) {

                const original =
                    desfazerSistemaLinear(
                        x,
                        y
                    );

                html += `

                    <div style="
                        background:#fff8d6;
                        padding:20px;
                        border-radius:20px;
                        margin-top:20px;
                        border-left:6px solid #f4b400;
                    ">

                        <h3>

                            🔓 Removendo
                            Segunda Camada

                        </h3>

                        ${criarOperacaoHTML(

                            criarMatrizHTML(
                                3,
                                -1,
                                -1,
                                2
                            ),

                            criarVetorHTML(
                                x,
                                y
                            ),

                            criarVetorHTML(
                                original.x,
                                original.y
                            )

                        )}

                    </div>

                `;

                x = original.x;
                y = original.y;
            }

            const r1 =
                mod(

                    (
                        inv.a * x
                    )
                    +
                    (
                        inv.b * y
                    ),

                    MOD

                );

            const r2 =
                mod(

                    (
                        inv.c * x
                    )
                    +
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

                <h3>

                    Vetor ${
                        (i / 2) + 1
                    }

                </h3>

            `;

            html += criarOperacaoHTML(

                criarMatrizHTML(

                    inv.a,
                    inv.b,
                    inv.c,
                    inv.d

                ),

                criarVetorHTML(
                    x,
                    y
                ),

                criarVetorHTML(
                    r1,
                    r2
                )

            );

        }

    }

    document.getElementById(
        "processo"
    ).innerHTML = html;

    mostrarTela(
        "tela5"
    );
}

// ======================================
// SISTEMA LINEAR
// CRIPTOGRAFIA AVANÇADA
// ======================================

function aplicarSistemaLinear(x, y){

    const novoX =

        (2 * x)
        +
        y;

    const novoY =

        x
        +
        (3 * y);

    return {

        x: novoX,

        y: novoY

    };
}


// ======================================
// SISTEMA LINEAR INVERSO
// DESCRIPTOGRAFIA
// ======================================

function desfazerSistemaLinear(x, y){

    /*
        Sistema original:

        x' = 2x + y
        y' = x + 3y

        Matriz:

        [2 1]
        [1 3]

        Determinante = 5

        Inversa:

        1/5

        [ 3 -1 ]
        [ -1 2 ]
    */

    const det = 5;

    const originalX =

        (
            (3 * x)
            -
            y
        )

        / det;

    const originalY =

        (
            (-1 * x)
            +
            (2 * y)
        )

        / det;

    return {

        x: Math.round(
            originalX
        ),

        y: Math.round(
            originalY
        )

    };
}


// ======================================
// MATRIZ VISUAL
// ======================================

function criarMatrizHTML(

    a,
    b,
    c,
    d

){

    return `

        <div class="matriz-card">

            <div class="matriz-numero">
                ${a}
            </div>

            <div class="matriz-numero">
                ${b}
            </div>

            <div class="matriz-numero">
                ${c}
            </div>

            <div class="matriz-numero">
                ${d}
            </div>

        </div>

    `;
}


// ======================================
// VETOR VISUAL
// ======================================

function criarVetorHTML(

    x,
    y

){

    return `

        <div class="vetor-card">

            <div class="vetor-numero">
                ${x}
            </div>

            <div class="vetor-numero">
                ${y}
            </div>

        </div>

    `;
}


// ======================================
// OPERAÇÃO VISUAL
// ======================================

function criarOperacaoHTML(

    matrizHTML,

    vetorHTML,

    resultadoHTML

){

    return `

        <div class="operacao-matriz">

            ${matrizHTML}

            <span class="operador">
                ×
            </span>

            ${vetorHTML}

            <span class="operador">
                =
            </span>

            ${resultadoHTML}

        </div>

    `;
}

// ======================================
// RESULTADO FINAL
// ======================================

function mostrarResultado() {

    textoFinal = "";

    // ==========================
    // CRIPTOGRAFAR
    // ==========================

    if (

        modoAtual ===
        "criptografar"

    ) {

        textoFinal =
            matrizResultado.join(
                "-"
            );

    }

    // ==========================
    // DESCRIPTOGRAFAR
    // ==========================

    else {

        for (

            let numero
            of matrizResultado

        ) {

            if (

                caracteres[
                    numero
                ]

            ) {

                textoFinal +=

                    caracteres[
                        numero
                    ];

            }

        }

    }

    let titulo = "";

    // ==========================
    // DEFINIR TÍTULO
    // ==========================

    if (

        modoAtual ===
        "criptografar"

    ) {

        titulo = usarSistemaLinear

            ?

            "🔐🔐 Texto Criptografado (Matrizes + Sistemas Lineares)"

            :

            "🔒 Texto Criptografado";

    }

    else {

        titulo = usarSistemaLinear

            ?

            "🔐🔓 Texto Recuperado (Matrizes + Sistemas Lineares)"

            :

            "🔓 Texto Original Recuperado";

    }

    document.getElementById(
        "resultadoFinal"
    ).innerHTML = `

        <div class="resultado-final-card">

            <h2>

                ${titulo}

            </h2>

            <div class="codigo-final-box">

                ${textoFinal}

            </div>

            <div class="resultado-info">

                ${
                    modoAtual ===
                    "criptografar"

                    ?

                    `
                    <p>

                        📋 Copie este código
                        para realizar a
                        descriptografia.

                    </p>
                    `

                    :

                    `
                    <p>

                        ✅ A mensagem foi
                        recuperada com sucesso.

                    </p>
                    `
                }

            </div>

        </div>

    `;

    mostrarTela(
        "tela6"
    );
}


// ======================================
// REINICIAR SISTEMA
// ======================================

function reiniciar() {

    // limpar textarea

    const mensagem =
        document.getElementById(
            "mensagem"
        );

    if (mensagem) {

        mensagem.value = "";

    }

    // reset variáveis

    mensagemAtual = "";

    numerosMensagem = [];

    matrizResultado = [];

    textoFinal = "";

    usarSistemaLinear = false;

    modoAtual =
        "criptografar";

    // reset checkbox

    const check =
        document.getElementById(
            "modoAvancado"
        );

    if (check) {

        check.checked = false;

    }

    // reset radio

    const radio =
        document.querySelector(
            'input[value="criptografar"]'
        );

    if (radio) {

        radio.checked = true;

    }

    // limpar telas

    const resultado =
        document.getElementById(
            "resultadoFinal"
        );

    if (resultado) {

        resultado.innerHTML = "";

    }

    const processo =
        document.getElementById(
            "processo"
        );

    if (processo) {

        processo.innerHTML = "";

    }

    // voltar para início

    mostrarTela(
        "tela1"
    );
}