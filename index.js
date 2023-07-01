//Elementos HTML en JS
const form = document.querySelector('#form');
const searchInput = document.querySelector('#input');
const pokemonsContainer = document.querySelector('.resultados');

//Buscar los pokemons por id en la API
function fetchpokemon(id)   {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => response.json())
    .then(data => createPokemon(data))
}
   
//Mostrar los primeros 30 pokemones 
function showPokemons(number){
    for(let i=1;i <= number; i++){
     fetchpokemon(i);
    }
}
showPokemons(30);

//Crear un nuevo pokemon & mostrar la información en pantalla
function createPokemon(pokemon){

    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add('pokemonCard');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer');

    const imagePokemon = document.createElement('img');
    imagePokemon.src = pokemon.sprites.front_default

    imgContainer.appendChild(imagePokemon);
    
    const infoPokemon = document.createElement('div');
    infoPokemon.classList.add('infoPokemon');

    const numberPokemon = document.createElement('p');
    numberPokemon.textContent = `#${pokemon.id.toString().padStart(3,0)}`;

    const namePokemon = document.createElement('h2');
    namePokemon.textContent = pokemon.name;

    const typePokemon = document.createElement('p');
    typePokemon.textContent = `Tipo: ${pokemon.types[0].type.name}`
   

    const heightPokemon = document.createElement('p');
    heightPokemon.textContent = `Altura:${pokemon.height}M`;

    const weightPokemon = document.createElement('p');
    weightPokemon.textContent = `Peso:${pokemon.weight}KG`;

    infoPokemon.appendChild(numberPokemon);
    infoPokemon.appendChild(namePokemon);
    infoPokemon.appendChild(typePokemon);
    infoPokemon.appendChild(heightPokemon);
    infoPokemon.appendChild(weightPokemon);

    pokemonCard.appendChild(imgContainer);
    pokemonCard.appendChild(infoPokemon);
   
    pokemonsContainer.appendChild(pokemonCard);

}

//Buscar Pokemon en input & limpiar pantalla & luego mostrar resultado
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const searchValue = searchInput.value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}/`)
    .then(response => response.json())
    .then(data => {
        pokemonsContainer.innerHTML = '';
        createPokemon(data)    
    })
})






