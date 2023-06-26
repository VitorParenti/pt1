const urlParams = new URLSearchParams(window.location.search);
const urlCardName = urlParams.get('cardName');
var ec = []


function errorMensage(customMsg) {
    const errorMensages = [
        "Desculpe, dos derrubamos nosssas cartas enquanto embaralhavamos",
        "Perdão, zikamos land",
        "Mil desculpas, o shield de uma das nossas cartas estourou",
        "Desculpe-nos, deixamos cair coca no nosso deck",
        "Desculpe, mulligamos para 5",
        "Perdão, floodamos land",
        "Algo deu errado, o TI deve estar jogando Arena de novo"
    ]
    if (customMsg != undefined) document.getElementById("mainContainer").innerHTML = `<div class="error">${errorMensages[Math.floor(Math.random() * (errorMensages.length))]}</br> ${(customMsg)}</div> <image src="images/counterSpell.png"></image>`
    if (customMsg == undefined) document.getElementById("mainContainer").innerHTML = `<div class="error">${errorMensages[Math.floor(Math.random() * (errorMensages.length))]}</div> <image src="images/counterSpell.png"></image>`
}

function crateImage(url, cardName) {
    var a = document.createElement("a");
    var img = document.createElement("img");
    a.href = `./carta.html?cardName=${cardName}`;
    img.src = url;
    img.classList.add("card");
    a.appendChild(img);
    document.getElementById("cardContainer").appendChild(a);
}

function searchCardMatchs(posibleCards, cardName) {
    var card = null
    if (posibleCards.length == 1) {
        card = posibleCards[0];
    } else {
        posibleCards.forEach(posibleCard => {
            if (posibleCard.name == cardName) {
                card = posibleCard;
            }
        });
    }
    return card;
}

function showPossibleMatches(posibleCards) {
    createTitle(`Procurando por:${urlCardName}`)
    posibleCards.forEach((card) => {
        try {
            crateImage(card.image_uris.normal, card.name);
        } catch (e) { } 
    })
};

function createTitle(title) {
    document.getElementById("title").innerText=title;
}

function createP(text) {
    var p = document.createElement("p");
    p.innerHTML=text;
    document.getElementById("mainContainer").appendChild(p);
}
function createCardDescription(card) {
    var text=`A carta ${card.name}, que conta com a magestosa arte de ${card.artist} 
    pode ser comprada na TCGplayer <a href="${card.purchase_uris.tcgplayer}">clicando aqui</a>
    `
    createP(text)
}

function loadSingleCardPage(card){
    createTitle(card.name);
    crateImage(card.image_uris.normal, card.name);
    createCardDescription(card);
}

function loadPage(posibleCards) {
    if(posibleCards==undefined) errorMensage("");
    var card = searchCardMatchs(posibleCards, urlCardName);
    if (card == null) {//show other possible matches (typo problem)
        showPossibleMatches(posibleCards);
    } else {
        loadSingleCardPage(card);
    }
}

if (urlCardName == "") {
    errorMensage("acho que você esqueceu de selecionar um card");
}

fetch(`https://api.scryfall.com/cards/search?q=${urlCardName}&unique=cards`)
    .then(response => response.json())
    .then(json => loadPage(json.data))


