class PokemonGetter
{
    async pokemonName(id, lang) 
    {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        const pokemon = await res.json()
        for (const languageName of pokemon.names)
        {
            if (languageName.language.name == 'de' && lang == "ger")
            {
                return languageName.name
            }
        }
        return pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    }

    pokemonArt(id, shiny)
    {
        if (shiny) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
        }
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    }

    async pokemonCount()
    {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon-species")
        const species = await res.json()
        return species.count
    }
}
export { PokemonGetter }