const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');

function obterConteudo() {
    const url = `https://pokemondb.net/pokedex/all`;
    request(url, function (error, response, body) {
        if(error) {
            console.log(error);
            return;
        }

        const dom = new JSDOM(body);
        
        const pokemonsRetorno = [];
        const pokemons = dom.window.document.querySelectorAll('#pokedex > tbody > tr');
        for(const pokemon of pokemons) {
            const pokemonRetorno = {

            }
            
            let queryPokedex = pokemon.querySelector('.infocard-cell-data');
            if(queryPokedex) 
                pokemonRetorno.pokeDex = queryPokedex.textContent;

            let evolutionName = pokemon.querySelector('.text-muted');
            if(evolutionName) 
                pokemonRetorno.evolutionName = evolutionName.textContent;

            let queryName = pokemon.querySelector('.ent-name');
            if(queryName) 
                pokemonRetorno.name = queryName.textContent;

            let queryType = pokemon.querySelectorAll('.type-icon');
            if(queryType) {
                pokemonRetorno.types = [];
                for(const type of queryType) {
                    pokemonRetorno.types.push(type.textContent);
                }   
            }

            let queryTotal = pokemon.querySelector('.cell-total');
            if(queryTotal)
                pokemonRetorno.total = queryTotal.textContent;

            let queryNums = pokemon.querySelectorAll('.cell-num');
            if(queryNums) {
                pokemonRetorno.hp = queryNums[1].textContent;
                pokemonRetorno.attack = queryNums[2].textContent;
                pokemonRetorno.defense = queryNums[3].textContent;
                pokemonRetorno.spAtk = queryNums[4].textContent;
                pokemonRetorno.spDef = queryNums[5].textContent;
                pokemonRetorno.speed = queryNums[6].textContent;
            }

            pokemonsRetorno.push(pokemonRetorno);
        }
        fs.writeFileSync('./pokemons.json', JSON.stringify(pokemonsRetorno, null, 2), 'UTF8');
        console.log("Concluído com sucesso");

    });
}

obterConteudo();