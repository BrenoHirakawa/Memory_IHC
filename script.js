const pares = [
  ["Affordance", "Pista visual que sugere como um objeto deve ser usado"],
  ["Feedback", "Resposta do sistema que informa o resultado de uma ação"],
  ["Gestalt", "Princípios de percepção que agrupam elementos visuais"],
  ["Usabilidade", "Facilidade com que um usuário realiza uma tarefa"],
  ["Heurística", "Regra prática usada para avaliar a interface"],
  ["Consistência", "Manter padrões semelhantes em toda a interface"],
  ["Acessibilidade", "Garantir uso por pessoas com diferentes capacidades"],
  ["Carga Cognitiva", "Esforço mental exigido para usar o sistema"],
];


function criaBaralho(pares){
    let deck = []
    for(var i = 0; i < pares.length; i++){
        deck.push({pairId: i, text: pares[i][0]});
        deck.push({pairId: i, text: pares[i][1]});        
    }
    return deck;
}

var baralho = criaBaralho(pares); //Junta as cartas pelo id delas. Ou seja, podemos saber que duas cartas são pares de acordo com o ID delas; 

function render(baralho){ //Renderiza as cartas no "tabuleiro". 

  baralho = embaralhar(baralho)

  var container = document.getElementById('board')
  baralho.forEach(function(carta){

    const cartaDiv = document.createElement('div');
    cartaDiv.classList.add('card');   
    
    const interiorCarta = document.createElement('div');
    interiorCarta.classList.add('interior-carta');

    const frenteCarta = document.createElement('div');
    frenteCarta.classList.add('frente-carta');
    frenteCarta.textContent = '?';

    const versoCarta = document.createElement('div');
    versoCarta.classList.add('verso-carta');
    versoCarta.textContent = carta.text;

    interiorCarta.appendChild(frenteCarta);
    interiorCarta.appendChild(versoCarta);
    cartaDiv.appendChild(interiorCarta);

    cartaDiv.addEventListener("click", function(){
      handleClick(carta, cartaDiv, interiorCarta);
    });

    container.appendChild(cartaDiv);
  });

}

var mov = 0;
var paresEncontrados = 0;
let acertos = [];
let travado = false; 

function movimento(add){
  var movs = document.getElementById('movimentos')
  mov += add;
  movs.textContent = mov;
}

function pares_counter(add){
  var paresCount = document.getElementById('pares_encontrados')
  paresEncontrados += add;
  paresCount.textContent = paresEncontrados;
}

function reiniciar(){
  mov = 0
  paresEncontrados = 0
  acertos = []; 
  
  var movs = document.getElementById('movimentos')
  var paresCount = document.getElementById('pares_encontrados')

  var container = document.getElementById('board');
  container.innerHTML = '';

  movs.textContent = mov
  paresCount.textContent = paresEncontrados;

  render(baralho)
}

function embaralhar(deck){
  console.log(deck)
  let temp = 0;
  let j = 0;
  for(let i = deck.length - 1; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
    temp = 0
  }
  console.log(deck)
  return deck;
}

let cartaSelecionada = {id: null, div: null};
let interiorCartaTemp = {}

function handleClick(carta, cartaDiv, interiorCarta){

  if(travado) return;

  console.log(interiorCarta)
  if(cartaDiv.classList.contains('match')){
    return;
  }

  if(cartaSelecionada.id === null && cartaSelecionada.div === null){
    cartaSelecionada.id = carta.pairId;
    cartaSelecionada.div = cartaDiv;
    interiorCartaTemp = interiorCarta;
    interiorCarta.classList.add('flipped');
    // cartaDiv.classList.add('selecionada'); 
  }else{
    if(cartaSelecionada.id === carta.pairId && cartaSelecionada.div !== cartaDiv){
      interiorCarta.classList.add('flipped');
      acertos.push(cartaSelecionada.id);
      movimento(1);
      pares_counter(1);
    }else if(cartaSelecionada.div === cartaDiv){
      console.log("mesma carta");
      return;
    }else{
      travado = true; //garante que nenhuma carta possa ser virada enquanto duas ainda não foram desviradas. 

      interiorCarta.classList.add('flipped')
      setTimeout(function(){
        interiorCartaTemp.classList.replace('flipped', 'interior-carta');
        interiorCarta.classList.replace('flipped', 'interior-carta');
        travado = false;
      }, 1000);      

      movimento(1);
    };
    cartaSelecionada.id = null;
    cartaSelecionada.div = null;
  }

  if(paresEncontrados === pares.length){
    alert("Venceu o jogo!");
    reiniciar();
  }

}

render(baralho)