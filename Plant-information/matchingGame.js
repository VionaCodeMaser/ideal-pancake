/*function onCardClicked(){
	const target = e.currentTarget;
	console.log('clicked', e.currentTarget);
	target.className = target.className
	.replace('hidden', '')
	.trim();
}*/

let clickedCard = null;
let preventClick = false;
let combosFound = 0;
let moves = 0;

function restartEvent(){

	console.log("reset");
	location.reload();
}


const plants = [
	'plant1',
	'plant2',
	'plant3',
	'plant4',
	'plant5',
	'plant6',
	'plant7',
	'plant8',
]

const cards = [...document.querySelectorAll('.card')];

function shuffle(){
	for (let plant of plants){
		const cardAIndex = parseInt(Math.random() * cards.length);
		const cardA = cards[cardAIndex];
		cards.splice(cardAIndex, 1);
		cardA.className += ` ${plant}`;
		cardA.setAttribute('data-plant', plant);

		const cardBIndex = parseInt(Math.random() * cards.length);
		const cardB = cards[cardBIndex];
		cards.splice(cardBIndex, 1);
		cardB.className += ` ${plant}`;
		cardB.setAttribute('data-plant', plant);

	}

}

shuffle();

function onCardClicked(e){
	const target = e.currentTarget;

	if ( preventClick ||target === clickedCard || target.className.includes('done')){
		console.log('done clicked done added')
		document.getElementById('gameStatus').innerHTML = 'Playing..';
		return;
		
	}
	//cant click a card name for a second time.
	document.getElementById('gameStatus').innerHTML = 'Playing..';
	target.className = target.className
		.replace('hidden', '')
		.trim();	
	target.className += ' done';
	console.log(target.getAttribute('data-plant'));

	if (!clickedCard){
	 clickedCard = target;
	}
	else if (clickedCard){
		preventClick = true;
		if (clickedCard.getAttribute('data-plant') === 
			target.getAttribute('data-plant'))
		{
			console.log('cards are equal');
			moves++;
			document.getElementById('gameStatus').innerHTML = 'Playing..';
			document.getElementById('moves').innerHTML = moves;
			clickedCard = null;
			preventClick = false;
			combosFound++;
			if (combosFound == 8){
				document.getElementById('gameStatus').innerHTML = 'YOU WIN!!';
				alert("YOU WIN"); // replace with html DOM to the p file 
				
				document.getElementById('moves').innerHTML = moves;
			}
		}
			
		
		else{
			console.log('cards not equal');
			moves++;
			document.getElementById('gameStatus').innerHTML = 'Playing..';
			document.getElementById('moves').innerHTML = moves;
			setTimeout(() => {
				console.log('we are here')
				clickedCard.className = clickedCard.className.replace('done', '') + ' hidden';
				target.className = target.className.replace('done', '')+ ' hidden' ;
				clickedCard = null;
				preventClick = false;
			}, 500)
		}
	}

}

