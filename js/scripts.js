//Creates a pokemon repository within an IIFE 
let pokemonRepository = (function () {
    const pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');

    //A function to add new Pokemons to the repository.
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon 
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is not correct');
        }   
      }
      
    //Function to return all items within the pokemonList array.
    function getAll() {
        return pokemonList;
    }

    //loads pokemon names and urls from the API 
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    //Creates buttons with the Pokemon names, with an event listener that shows details when clicked
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        //Adds name to button and capitalizes it
        button.innerText = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }   

    //When button is clicked, this loads the pokemon details and displays them within the modal 
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    //Loads the details of the pokemon
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //adds the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = [];
            for (let i = 0; i < details.types.length; i++) {
                let typesDetails = details.types[i].type.name;
                item.types.push(typesDetails[0].toUpperCase() + typesDetails.substring(1));
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    //sets up a modal that will only show when the 'Show modal' button is clicked
    function showModal(pokemon) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ' + pokemon.height;

        let weightElement = document.createElement('p');
        weightElement.innerText =  'Weight: ' + pokemon.weight;

        let typesElement = document.createElement('p');
        let pokemonTypes = pokemon.types;
        typesElement.innerText = "Type: " + pokemonTypes.join(', ');

        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', pokemon.imageUrl);

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(typesElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
         modalContainer.classList.remove('is-visible');
        }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    //Returns the functions declared above.    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });                                                                                                           
});



