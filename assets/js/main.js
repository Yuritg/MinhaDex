const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const botaoModal = document.getElementById('testeButton');
const pModal =  document.getElementById('pmodal');

const maxRecords = 151
const limit = 10
let offset = 0;

function capitalizarPrimeiraLetra(stringDesejada) {
    return stringDesejada.charAt(0).toUpperCase() + stringDesejada.slice(1);
}

function convertPokemonToLi(pokemon) {

    return `
        <li class="pokemon ${pokemon.type}" onclick="window.detalhesDoPokemon('${pokemon.name}','${pokemon.number}','${pokemon.types[0]}','${pokemon.types[1]}','${pokemon.weight}',
                                                                            '${pokemon.abilities[0]}','${pokemon.abilities[1]}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
                
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function detalhesDoPokemon(pkNome, pkNumero, pkTipo1, pkTipo2, pkPeso, pkHabilidade1, pkHabilidade2) {
    console.log(`Você clicou no Pokémon: '${pkNome}'`);
    
    pModal.showModal();
    
    const dialogClass = document.getElementById("pmodal");
    const nome = document.getElementById('pnome');
    const numero = document.getElementById('pnumero');
    const tipo1 = document.getElementById('tipo1');
    const tipo2 = document.getElementById('tipo2');
    const peso = document.getElementById('peso');
    const habilidades = document.getElementById('skills');
    
    dialogClass.classList = null;
    dialogClass.style.background = "";
    dialogClass.classList.add(`${pkTipo1}`);

    nome.textContent = `Nome: ${capitalizarPrimeiraLetra(pkNome)}`;
    numero.textContent = `Nº: ${capitalizarPrimeiraLetra(pkNumero)}`;
    tipo1.textContent = `Tipo 1:${capitalizarPrimeiraLetra(pkTipo1)}`;
    
    if (pkTipo2 !== 'undefined') {
        tipo2.textContent = `Tipo 2: ${capitalizarPrimeiraLetra(pkTipo2)}`;
        dialogClass.classList.add(`${pkTipo2}`);
        
        const elementoTemporario1 = document.createElement('div');
        const elementoTemporario2 = document.createElement('div');
        
        elementoTemporario1.classList.add(pkTipo1);
        elementoTemporario2.classList.add(pkTipo2);
        
        document.body.appendChild(elementoTemporario1);
        document.body.appendChild(elementoTemporario2);
        
        const estiloCor1 = window.getComputedStyle(elementoTemporario1).getPropertyValue('background-color');
        const estiloCor2 = window.getComputedStyle(elementoTemporario2).getPropertyValue('background-color');
        
        document.body.removeChild(elementoTemporario1);
        document.body.removeChild(elementoTemporario2);
        
        dialogClass.style.background = `linear-gradient(to right, ${estiloCor1}, ${estiloCor2})`;
    }
    
    peso.textContent = `Peso: ${capitalizarPrimeiraLetra(pkPeso)}Kg`;
    habilidades.textContent = `Algumas Habilidades: ${capitalizarPrimeiraLetra(pkHabilidade1)}, ${capitalizarPrimeiraLetra(pkHabilidade2)}`
}


document.getElementById("btnModalClose").onclick = function(){
     pModal.close();
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