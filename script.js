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

function render(baralho){
  var container = document.getElementById('board')
  baralho.forEach(function(carta){

    const cartaDiv = document.createElement('div');
    cartaDiv.textContent = carta.text;
    cartaDiv.classList.add('card');

    cartaDiv.addEventListener("click", function(){
      handleClick(carta, cartaDiv);
    });

    container.appendChild(cartaDiv);
  });

}

let cartaSelecionada = {id: null, div: null};
let acertos = []


function handleClick(carta, cartaDiv){
  console.log(cartaDiv);
  console.log(acertos);

  if(cartaDiv.classList.contains('match')){
    return;
  }

  if(cartaSelecionada.id === null && cartaSelecionada.div === null){
    cartaSelecionada.id = carta.pairId;
    cartaSelecionada.div = cartaDiv;
    cartaDiv.classList.add('selecionada'); 
    console.log(carta.pairId);
  }else{
    if(cartaSelecionada.id === carta.pairId && cartaSelecionada.div !== cartaDiv){
      console.log(carta.pairId);
      console.log("ACHOU");
      cartaSelecionada.div.classList.add('match');
      cartaDiv.classList.add('match');
      acertos.push(cartaSelecionada.id);
    }else if(cartaSelecionada.div === cartaDiv){
      console.log("mesma carta");
      return;
    }else{
      console.log(carta.pairId);
      console.log("Não é par");
      cartaSelecionada.div.classList.replace('selecionada', 'card');
      cartaDiv.classList.replace('selecionada', 'card'); 
    };
    cartaSelecionada.id = null;
    cartaSelecionada.div = null;
  }
}

render(baralho)




// function render(deck) {
//   const board = document.getElementById('board'); // pega a div do HTML

//   board.innerHTML = ''; // limpa o board, caso já tenha algo renderizado antes

//   deck.forEach(function(card) {
//     const cardDiv = document.createElement('div'); // cria uma nova div na memória
//     cardDiv.textContent = card.text;                // coloca o texto da carta dentro dela
//     cardDiv.classList.add('card');                  // adiciona uma classe, útil depois pro CSS

//     board.appendChild(cardDiv); // insere essa div dentro da #board no HTML
//   });
// }

// function embaralha() {
//   let currentIndex = pares,length,
//       randomIndex,
//       temporaryValue;
//   while (currentIndex !== 0){
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     temporaryValue = pares[currentIndex];
//     card
//   }
// }

// render(pares);

// console.log(pares)


