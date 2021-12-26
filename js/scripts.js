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
    //Returns the functions declared above.    
    return {
        add: add,
        getAll: getAll
    };
})();

//Adds new pokemon and its height
pokemonRepository.add({name: 'Pikachu', height: 1.3})

//A function to print the names and heights of all pokemons, and also to return a message if it is bigger than 1.7
function printDetails(list) {
    list.forEach(function(pokemon) {
        if (pokemon.height >= 1.7){
            document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow - that\'s big! </p>');
        } else {
            document.write('<p>' + pokemon.name + ' (height: ' +pokemon.height + ') </p>');
        }
    });
}

//Calls the printDetails function to print out the pokemonRepository.
printDetails(pokemonRepository.getAll());


