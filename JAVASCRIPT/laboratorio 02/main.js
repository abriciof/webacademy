const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Objeto que leva os src e os alts das imagens 
const imagens_alts = {
  'images/star_wars_1.png' : 'Banner 01 - Star Wars',
  'images/star_wars_2.webp' : 'Personagens 01 - Star Wars',
  'images/star_wars_3.webp' : 'Personagens 02 - Star Wars',
  'images/star_wars_4.webp' : 'Banner 02 - Star Wars',
  'images/star_wars_5.jpg' : 'Banner 03 - Star Wars'
}

// adicionando imagens miniaturas
for (const imagem of Object.keys(imagens_alts)) {

    // configurando miniatura
    const miniatura = document.createElement('img');
    miniatura.setAttribute('src', imagem);
    miniatura.setAttribute('alt', imagens_alts[imagem]);

    // adicionando a miniatura a thumbBar
    thumbBar.appendChild(miniatura);

    // adicionando evendo ao click
    miniatura.addEventListener('click', e => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
    });
}


// botao de claro e escuro
btn.addEventListener('click', () => {
    const btnClass = btn.getAttribute('class');

    // botao em dark -> ir para ligth
    if (btnClass === 'dark') {
        // mudando botao
        btn.setAttribute('class','light');
        btn.textContent = 'Lighten';

        // mudando fundo, adicionando o efeito
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } 
    // botao em light -> ir pra dark
    else {
        // mudando botao
        btn.setAttribute('class','dark');
        btn.textContent = 'Darken';
        
        // mudando fundo, removendo o efeito
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
});