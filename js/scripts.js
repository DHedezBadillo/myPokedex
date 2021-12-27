//Creates a pokemon repository within an IIFE 
let pokemonRepository = (function () {
    const pokemonList = [

        {
            name: 'Golem',
            height: 1.4,
            type: ['rock', 'ground']
        },
    
        {
            name: 'Venusaur',
            height: 1.4,
            type: ['grass', 'poison']
        },
    
        {
            name: 'Pidgey',
            height: 0.3,
            type: ['flying', 'normal']
        },
    
        {
            name: ' Charizard',
            height: 1.7,
            type: ['fire', 'flying']
        },
    
        {
            name: 'Weedle',
            height: 0.3,
            type: ['bug', 'poison']
        }
    
    ];

    //A function to add new Pokemons to the repository.
    function add(pokemon) {
        pokemonList.push(pokemon);
      }
      
    //Function to return all item within the pokemonList array.
    function getAll() {
        return pokemonList;
    }

    //Puts the pokemon names within buttons, and when clicked, displays the pokemon keys
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });

    function showDetails(pokemon) {
        document.write('Name: ' + pokemon.name + ', Height: ' + pokemon.height + ', Type: ' + pokemon.type);
    }

    }
    //Returns the functions declared above.    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

//Adds new pokemon and its height
pokemonRepository.add({name: 'Pikachu', height: 1.3, type: 'air'})


pokemonRepository.getAll().forEach( function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  }
 );
  

