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

//Lists Pokemon names and heights
for (let i=0; i<pokemonList.length; i++) {
    document.write ('<div>'+pokemonList [i].name + ' (height: ' + pokemonList [i].height + '), </div>');

//checks for a height of 1.7 or higher, then gives a message if true   
    if (pokemonList [i].height >=1.7) {
    document.write ('Wow, that\'s big!');
}
}
