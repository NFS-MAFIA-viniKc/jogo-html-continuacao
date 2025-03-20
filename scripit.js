const canvas = document.getElementById ('jogocanvas')
const ctx = canvas.getContext('2d')
let gravidade = 0.5
gameOver =  false
reset = false
pontuacao = true

document.addEventListener('keypress',(evento)=>{

    if (evento.code == 'Space' && personagem.pulando == false){
        personagem.velocidade_y = 15
        personagem.pulando = true
    }
})

document.addEventListener ('click', (evento) => {
    if (gameOver == true){
        location.reload()
    }
})

const personagem = {
    x:100,
    y:canvas.height-50,
    largura:50,
    altura:50,
    velocidade_y:0,
    pulando: false
}

let obstaculo = {
    x: canvas.width -50,
    y: canvas.height-100,
    largura: 50,
    altura: 100,
    velocidade_x: 5

}

function desenharpersonagem (){
    ctx.fillStyle = 'black'
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura)
}

function atualizarpersonagem(){
   if (personagem.pulando){
    personagem.y -= personagem.velocidade_y
    personagem.velocidade_y -= gravidade
    if (personagem.y >= canvas.height -50){
        personagem.velocidade_y = 0
        personagem.y = canvas.height - 50
        personagem.pulando = false
        }
    }
}

function desenharobstaculo (){
    ctx.fillStyle = 'red'
    ctx.fillRect(
        obstaculo.x,
        obstaculo.y,
        obstaculo.largura,
        obstaculo.altura)
    }

    function atualizarobstaculo (){
        obstaculo.x -= obstaculo.velocidade_x
        if(obstaculo.x <= 0-obstaculo.largura){
            obstaculo.x = canvas.width
            obstaculo.velocidade_x += 0.5
        }
    }

    function placar(){
        pontuacao += 9
        

        ctx.fillStyle = 'black'
            ctx.font = '20px Arial'
            ctx.fillText ('score = ' + pontuacao, 20,50)
            pontuacao = true
            ctx.fillStyle = 'black'
            ctx.font = '20px Arial'
            ctx.fillText ('best score', 20,100)
            pontuacao = true
        
    }


    function verificacolisao(){
        if (obstaculo.x < personagem.x + personagem.largura &&
        obstaculo.largura + obstaculo.x > personagem.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ){
            obstaculo.velocidade_x = 0
            personagem.velocidade_y = 0
            ctx.fillStyle = 'black'
            ctx.font = '100px Arial'
            ctx.fillText ('GAME OVER', 100,200)
            gameOver = true
     }
    }

function loop (){
    if (gameOver == false){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    desenharpersonagem()
    atualizarpersonagem()
    desenharobstaculo()
    atualizarobstaculo()
    verificacolisao()
    placar()

}
    requestAnimationFrame(loop)
}

loop()