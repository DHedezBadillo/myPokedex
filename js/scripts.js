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
        let pokemonList = document.querySelector(".list-group");
        let listpokemon = document.createElement("li");
        listpokemon.classList.add("group-list-item");
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


    function showModal(item) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");

        modalTitle.empty();
        modalBody.empty();

        let nameElement = $("<h1" + item.name + "</h1>");

        let imageElementFront = $('<img class="modal-img" style="width:50%">');
        imageElementFront.attr("src", item.imageUrlFront);

        let imageElementBack = $('<img class="modal-img" style="width:50%">');
        imageElementBack.attr("src", item.imageUrlBack);

        let heightElement = $("<p>" + "height: " + item.height + "</p>");

        let weightElement = $("<p>" + "weight: " + item.weight + "</p>");

        let typesElement = $("<p>" + "types: " + item.types + "</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
    }

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



