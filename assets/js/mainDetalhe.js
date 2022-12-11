const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 3;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${("000" + pokemon.number).slice(-3)}</span>
                <div class="detailPoke">
            <a href="detalhe.html">
            <img src="${pokemon.photo}"
                 alt="${pokemon.name}"></a>
                 </div>
                     <div class="detailName">
            <span class="name">${pokemon.name}</span>
                     </div>
                <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                </ol>
                </div>
                    <div class="detailBox">
                    <h4>Ability</h4>
                            <p>Species <b>${pokemon.id}</b></p>
                            <p>Height <b>${pokemon.type}</b></p>
                            <p>Weight <b>${pokemon.type[1]}</b></p>
                            <p>Abilities <b>${pokemon.name}</b></p>
                    <h4>About</h4>
                            <p>Egg Groups <b>${pokemon.types}</b></p>
                            <p>Egg Cycle <b>${pokemon.name}</b></p>
                     </div>

        </li>

   
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})