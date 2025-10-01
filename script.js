class Personagem {
    constructor(nome, descricao, imagem) {
        this.nome = nome
        this.descricao = descricao
        this.imagem = imagem
        this.pontos = 0
    }
}

const julius = new Personagem("Julius", "Você é uma pessoa calma, centrada e extremamente prática. Prefere economizar hoje para garantir o amanhã e faz de tudo para cuidar dos seus.", "image/jullius1.jpg")
const chris = new Personagem("Chris", "Você é resiliente, cheio de imaginação, e transforma até as situações mais caóticas em boas histórias para contar.", "image/chris1.jpg")
const rochelle = new Personagem("Rochelle", "Você é uma pessoa forte, decidida e que não aceita menos do que o melhor. Gosta das coisas do seu jeito e protege sua família com garra.", "image/rocholle1.jpg")

const personagens = [julius, chris, rochelle]

const formulario = document.getElementById("quizForm")

function calcularResultado(evento) {
    evento.preventDefault()

    personagens.forEach(personagem => personagem.pontos = 0)

    const respostas = new FormData(formulario)
    for (let [pergunta, resposta] of respostas.entries()) {
        const personagemEscolhido = personagens.find(personagem => personagem.nome.toLowerCase() === resposta)
        if (personagemEscolhido) {
            personagemEscolhido.pontos += 1
        }
    }

    let maiorPontuacao = 0
    let vencedor = null

    personagens.forEach(personagem => {
        if (personagem.pontos > maiorPontuacao) {
            maiorPontuacao = personagem.pontos
            vencedor = personagem
        }
    })

    localStorage.setItem("nomeVencedor", vencedor.nome)
    localStorage.setItem("descricaoVencedor", vencedor.descricao)
    localStorage.setItem("imagemVencedor", vencedor.imagem)
    localStorage.setItem("pontuacaoVencedor", vencedor.pontos)

    window.location.href = "resultado.html"
}

if (formulario) {
    formulario.addEventListener("submit", calcularResultado)
}

function mostrarResultado() {
    const nomeElemento = document.getElementById("characterName")
    if (!nomeElemento) return

    const nome = localStorage.getItem("nomeVencedor")
    const descricao = localStorage.getItem("descricaoVencedor")
    const imagem = localStorage.getItem("imagemVencedor")
    const pontuacao = localStorage.getItem("pontuacaoVencedor")

    nomeElemento.textContent = nome
    document.getElementById("characterDescription").textContent = descricao
    document.getElementById("characterImage").src = imagem

    console.log("Pontuação do vencedor:", pontuacao)
}

window.onload = mostrarResultado
