//Creates a pokemon repository within an IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#exampleModal');

    //A function to add new Pokemons to the repository
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        )   {
            pokemonList.push(pokemon);
        }   else {
            console.log('Pokemon is not correct');
        }
    }

    //Function to return all items within the pokemonList array
    function getAll() {
        return pokemonList;
    }
    //Creates buttons with the Pokemon names, with an event listener that shows details when clicked
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        listItem.classList.add('listItem-class');
        button.innerText = pokemon.name;
        button.classList.add('button-class');

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        loadDetails(pokemon).then(function () {
        let imageDiv = document.createElement('div');
        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageURL;
        pokemonImage.classList.add('pokemon-image');

        imageDiv.appendChild(pokemonImage);
        button.appendChild(imageDiv);
        })

        //on-click event
        button.addEventListener('click', function() {
            showDetails(pokemon, modalContainer);
        });
    }
    
    //Loads pokemon names and urls from the API
    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    //loads the details of the pokemon
    function loadDetails(pokemon) {
        let url = pokemon.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.types = details.types;
            pokemon.height = details.height;
            pokemon.weight = details.weight;
            pokemon.abilities = details.abilities;
            pokemon.imageURL = details.sprites.front_default;
        }).catch(function (e) {
            console.error(e);
        })
    }

    //When button is clicked, this loads the pokemon details and displays them within the modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
        
    }

    //Creates a boostrap modal that displays the pokemon info
    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        // let modalHeader = $('.modal-header');

        modalTitle.empty();
        modalBody.empty();

        let pokemonName = $('<h1>' + pokemon.name + '</h1>');
        let pokemonImage = $('<img class="modal-img" style="width:50%">');
        pokemonImage.attr('src', pokemon.imageURL);

        let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
        let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

        let pokemonType = document.createElement('p');
        let typesCon = ''
        pokemon.types.forEach(element => {
            typesCon += `${element.type.name},`
        });
        pokemonType.innerText = 'Type(s): ' + typesCon;

        let pokemonAbility = document.createElement('p');
        let abilitiesCon = ''
        pokemon.abilities.forEach(element => {
            abilitiesCon += `${element.ability.name},`
        });
        pokemonAbility.innerText = 'Abilities: ' + abilitiesCon;

        modalTitle.append(pokemonName);
        modalBody.append(pokemonImage);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonWeight);
        modalBody.append(pokemonType);
        modalBody.append(pokemonAbility);

        $('#exampleModal').modal();
      }
         
    //Returns the functions declared above
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    };

})();

// forEach loop to iterate over the pokemon in pokemonList
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});