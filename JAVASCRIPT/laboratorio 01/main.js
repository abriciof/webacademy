// Capturando os elementos do HTML
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// Obter texto random dentro de um array
function randomValueFromArray(array){
	const random = Math.floor(Math.random()*array.length);
	return array[random];
}

// Textos
let storyText = "Era uma vez em uma galáxia muito, muito distante. :insertx: partiu em uma missão para alcançar o planeta :inserty:. Ao chegar lá, encontrou um grupo de :insertz:. Apesar das adversidades, :insertx: se uniu com Fabricio e emergiu vitorioso, deixando um legado que seria lembrado por toda a galáxia."

// Personagens aliados
let insertX = [
    "Luke Skywalker",
    "Anakin Skywalker",
    "Obi-Wan Kenobi"
]

// Lugares
let insertY = [
    "Tatooine",
    "Endor",
    "Coruscant"
]

// Personagens inimigos
let insertZ = [
    "Stormtroopers",
    "Senhores Sith",
    "Caçadores de Recompensa" 
]

// Ação do click do botão
randomize.addEventListener('click', result);

function result() {

	let newStory = storyText;

	let xItem = randomValueFromArray(insertX);
	let yItem = randomValueFromArray(insertY);
	let zItem = randomValueFromArray(insertZ);

	newStory = newStory.replaceAll(':insertx:', xItem);
	newStory = newStory.replaceAll(':inserty:', yItem);
	newStory = newStory.replaceAll(':insertz:', zItem);

	// Verificando nome escrito no form
	if(customName.value !== '') {
		const name = customName.value;
		newStory = newStory.replaceAll('Fabricio', name);
	}

	// Alterando a cor do resultado
	const tema = document.getElementById("tema");
	if (tema.checked){
		story.style.backgroundColor = 'black';
		story.style.color = 'yellow';
	} else{
		story.style.backgroundColor = 'yellow';
		story.style.color = 'black';
	}

	// Passando resultado para o elemento story e mostrando
	story.textContent = newStory;
	story.style.visibility = 'visible';
}




