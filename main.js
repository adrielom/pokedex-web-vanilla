let listOfPokemons = []
let pokemonImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png'

function getPokemons() {
    let pokemons = {}
    fetch('https://pokeapi.co/api/v2/pokemon/')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            pokemons = data
        })
    return pokemons.results;    
}

async function getPokemonImage(url) {
    let response = await fetch(url)
    let pokemonInfo = await response.json();
    return pokemonInfo.sprites.front_default
}


async function getPokemons() {
    const responsePokemons = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const pokemons = await responsePokemons.json()
    return pokemons.results;    
}

async function main () {
    const allPokemons = await getPokemons()
    loadPokemons(allPokemons)    
}

async function loadPokemons (listOfPokemons) {
    const ul = document.querySelector('ul')

    const li = document.createElement('li')
    li.classList.add('pokemon-card')
    const infoWrapper = document.createElement('div')
    const pokemonTitle = document.createElement('h1')
    const pokemonType = document.createElement('p')
    pokemonTitle.classList.add('pokemon-title')
    pokemonType.classList.add('pokemon-type')
    const pokemonImage = document.createElement('img')
    infoWrapper.appendChild(pokemonTitle)
    infoWrapper.appendChild(pokemonType)
    li.appendChild(infoWrapper)
    li.appendChild(pokemonImage)
    let size = listOfPokemons.length - 1
    for (let i = 0; i < size; i++) {
        console.count()
        const pokemonTag = li.cloneNode(true)
        pokemonTag.querySelector('.pokemon-title').textContent = listOfPokemons[i].name
        ul.appendChild(pokemonTag)
        
        pokemonImageUrl = await getPokemonImage(listOfPokemons[i].url);
      
        let pokemon = new Pokemon(listOfPokemons[i].name, pokemonImageUrl)
        console.log(pokemon)
        pokemonTag.querySelector('img').src = pokemon.image_url
        listOfPokemons.push(pokemon)

        
    }
}


main()



class Pokemon {
    constructor(name, image_url){
        this.name = name;
        this.image_url = image_url;
    }
}
