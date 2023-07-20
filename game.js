import { PokemonGetter } from "./pokemon.js";
class Game
{
    constructor()
    {
        this.smashArray = []
        this.passArary = []
        this.stage = 1
        this.pokemonCount
        this.currentPokemon

        this.PokeGetter = new PokemonGetter()
        this.poke_container = document.getElementById("poke_container")
        this.titelrino = document.getElementById("titelrino")
        this.statsDiv = document.getElementById("stats")
        this.buttons = document.getElementById("buttons")
        this.imgId
        this.h1Id
        
        this.lang_smash
        this.lang_pass
        this.shiny = false
    }
    
    async run()
    {
        this.pokemonCount = await this.PokeGetter.pokemonCount()
        this.currentPokemon = await this.PokeGetter.pokemonName(this.stage, this.lang)
        //Titel and Artwork
        var h1 = document.createElement("h1")
        h1.id = "poketitle"
        this.h1Id = h1.id
        h1.innerHTML = this.currentPokemon + " #" + this.stage + `/#${this.pokemonCount}`
        
        var img = document.createElement("img")
        img.id = "pokeart"
        this.imgId = img.id
        img.src = this.PokeGetter.pokemonArt(this.stage, this.shiny)
        img.addEventListener("click", () =>
        {
            this.shiny = !this.shiny;
            this.updateImage(this.imgId)

        })
        
        var artwork = document.createElement("div")
        artwork.id = "artwork"
        artwork.appendChild(img)

        document.getElementById("titelrino").appendChild(h1)
        this.poke_container.appendChild(artwork)
        this.poke_container.appendChild(document.createElement("br"))

        //Buttons
        var smash = document.createElement("button")
        smash.textContent = "SMASH"
        smash.id = "smashButton"
        smash.onclick = () => this.update(this.statS, this.smashArray)
        this.buttons.appendChild(smash)

        var pass = document.createElement("button")
        pass.textContent = "PASS"
        pass.id = "passButton"
        pass.onclick = () => this.update(this.statP, this.passArary)
        this.buttons.appendChild(pass)

        //Text
        //Number of Smashes
        var statSNumElement = document.createElement("p")
        statSNumElement.id = "statSNum"
        statSNumElement.textContent = "Smash: " + this.passArary.length
        this.statsDiv.appendChild(statSNumElement)
        this.statsDiv.appendChild(document.createElement("br"))
        this.statSNum = document.getElementById("statSNum")

        //Number of Passes
        var statPNumElement = document.createElement("p")
        statPNumElement.id = "statPNum"
        statPNumElement.textContent = "Pass: " + this.passArary.length
        this.statsDiv.appendChild(statPNumElement)
        this.statsDiv.appendChild(document.createElement("br"))
        this.statPNum = document.getElementById("statPNum")

        //Smashed Pokemon
        var statSElement = document.createElement("p")
        statSElement.id = "statS"
        statSElement.textContent = this.lang_smash
        this.statsDiv.appendChild(statSElement)
        this.statsDiv.appendChild(document.createElement("br"))
        this.statS = document.getElementById("statS")

        //Passed Pokemon
        var statPElement = document.createElement("p")
        statPElement.id = "statP"
        statPElement.textContent = this.lang_pass
        this.statsDiv.appendChild(statPElement)
        this.statsDiv.appendChild(document.createElement("br"))
        this.statP = document.getElementById("statP")
    }

    async update(stat, Array)
    {
        if (this.stage<=this.pokemonCount) 
        {
            stat.textContent += this.currentPokemon + ", "
            Array.push(this.currentPokemon)
            this.stage++
        }
        document.getElementById("statSNum").textContent = this.lang_smash + this.smashArray.length
        document.getElementById("statPNum").textContent = this.lang_pass + this.passArary.length
        if (this.stage > this.pokemonCount) 
        {
            document.getElementById("buttons").removeChild(document.getElementById("passButton"))
            document.getElementById("buttons").removeChild(document.getElementById("smashButton"))
            document.getElementById("artwork").removeChild(document.getElementById("pokeart"))
            document.getElementById("titelrino").removeChild(document.getElementById("poketitle"))
            document.getElementById("poke_container").removeChild(document.getElementById("artwork"))
        } else 
        {
            this.currentPokemon = await this.PokeGetter.pokemonName(this.stage, this.lang)
            this.updateImage("pokeart")
        }
    }

    updateImage(imgID)
    {
        if (this.shiny)
        {
            document.getElementById(this.h1Id).innerHTML = "Shiny " + this.currentPokemon + " #" + this.stage + `/#${this.pokemonCount}`
        }
        else 
        {
            document.getElementById(this.h1Id).innerHTML = this.currentPokemon + " #" + this.stage + `/#${this.pokemonCount}`
        }
        document.getElementById(imgID).src = this.PokeGetter.pokemonArt(this.stage, this.shiny)
    }
}

class GameGerman extends Game
{
    constructor()
    {
        super()
        this.lang = "ger"

        this.lang_smash = "Würde Smashen: "
        this.lang_pass = "Würde nicht Smashen: "
    }
}

class GameEnglish extends Game
{
    constructor()
    {
        super()
        this.lang = "eng"

        this.lang_smash = "Would Smash: "
        this.lang_pass = "Would not Smash: "
    }
}

export { Game, GameGerman, GameEnglish }