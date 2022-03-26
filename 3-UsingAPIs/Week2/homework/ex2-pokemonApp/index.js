'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
}

function fetchAndPopulatePokemons(data) {
  const pokemonSelector = document.createElement('select');
  pokemonSelector.addEventListener('change', fetchImage);

  const getPokemonButton = document.createElement('button');
  getPokemonButton.type = 'button';
  getPokemonButton.textContent = 'Get Pokemon!';

  document.body.appendChild(pokemonSelector);

  getPokemonButton.addEventListener('click', () => {
    const pokemon = data.results;
    pokemon.forEach((monster) => {
      const allPokemon = document.createElement('option');
      allPokemon.value = monster.name;
      allPokemon.text = monster.name;
      pokemonSelector.appendChild(allPokemon);
    });
  });

  document.body.appendChild(getPokemonButton);
}

async function fetchImage(event) {
  const clearImg = document.querySelector('img');
  if (clearImg) {
    clearImg.remove();
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${event.currentTarget.value}`;

  try {
    const data = await fetchData(url);
    const selected = document.querySelector('select');

    if (selected) {
      const pokemonImage = document.createElement('img');
      pokemonImage.alt = 'Image of selected Pokemon';
      pokemonImage.src = data.sprites.front_default;
      document.body.appendChild(pokemonImage);
    }
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  try {
    const data = await fetchData(
      'https://pokeapi.co/api/v2/pokemon/?limit=151&offset=20'
    );
    fetchAndPopulatePokemons(data);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', main);
