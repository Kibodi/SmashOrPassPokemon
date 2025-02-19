import { PokemonGetter } from "./pokemon.js";
class Game
{
    lang:string
    lang_smash:string
    lang_pass:string
    smashArray:Array<string>
    passArary:Array<string>
    stage:number
    pokemonCount:number
    currentPokemon:string
    PokeGetter:PokemonGetter
    poke_container:HTMLDivElement
    titelrino:HTMLDivElement
    statsDiv:HTMLDivElement
    buttons:HTMLDivElement
    imgId:string
    h1Id:string
    shiny:boolean
    statS:HTMLParagraphElement
    statP:HTMLParagraphElement
    statSNum:HTMLParagraphElement
    statPNum:HTMLParagraphElement
     
    constructor()
    {
        this.smashArray = [];
        this.passArary = [];
        this.stage = 1;
        this.pokemonCount;
        this.currentPokemon;

        this.PokeGetter = new PokemonGetter();
        this.poke_container = document.getElementById("poke_container") as HTMLDivElement;
        this.titelrino = document.getElementById("titelrino") as HTMLDivElement;
        this.statsDiv = document.getElementById("stats") as HTMLDivElement;
        this.buttons = document.getElementById("buttons") as HTMLDivElement;
        this.imgId;
        this.h1Id;

        this.lang_smash;
        this.lang_pass;
        this.shiny = false;
    }

    async run()
    {
        this.pokemonCount = await this.PokeGetter.pokemonCount();
        this.currentPokemon = await this.PokeGetter.pokemonName(this.stage, this.lang);
        //Titel and Artwork
        var h1 = document.createElement("h1");
        h1.id = "poketitle";
        this.h1Id = h1.id;
        h1.innerHTML = this.currentPokemon + " #" + this.stage + `/#${this.pokemonCount}`;

        var img = document.createElement("img");
        img.id = "pokeart";
        this.imgId = img.id;
        img.src = this.PokeGetter.pokemonArt(this.stage, this.shiny);
        img.onload = () => this.enableButtons();
        img.addEventListener("click", () =>
        {
            this.disableButtons();
            this.shiny = !this.shiny;
            this.updateImage(this.imgId);

        });

        var artwork = document.createElement("div");
        artwork.id = "artwork";
        artwork.appendChild(img);

        document.getElementById("titelrino").appendChild(h1);
        this.poke_container.appendChild(artwork);
        this.poke_container.appendChild(document.createElement("br"));

        //Buttons
        var smash = document.createElement("button");
        smash.textContent = "SMASH";
        smash.id = "smashButton";
        smash.onclick = () => this.update(this.statS, this.smashArray);
        this.buttons.appendChild(smash);

        var pass = document.createElement("button");
        pass.textContent = "PASS";
        pass.id = "passButton";
        pass.onclick = () => this.update(this.statP, this.passArary);
        this.buttons.appendChild(pass);

        //Text
        //Number of Smashes
        var statSNumElement = document.createElement("p");
        statSNumElement.id = "statSNum";
        statSNumElement.textContent = "Smash: " + this.passArary.length;
        this.statsDiv.appendChild(statSNumElement);
        this.statsDiv.appendChild(document.createElement("br"));
        this.statSNum = document.getElementById("statSNum") as HTMLParagraphElement;

        //Number of Passes
        var statPNumElement = document.createElement("p");
        statPNumElement.id = "statPNum";
        statPNumElement.textContent = "Pass: " + this.passArary.length;
        this.statsDiv.appendChild(statPNumElement);
        this.statsDiv.appendChild(document.createElement("br"));
        this.statPNum = document.getElementById("statPNum") as HTMLParagraphElement;

        //Smashed Pokemon
        var statSElement = document.createElement("p");
        statSElement.id = "statS";
        statSElement.textContent = this.lang_smash;
        this.statsDiv.appendChild(statSElement);
        this.statsDiv.appendChild(document.createElement("br"));
        this.statS = document.getElementById("statS") as HTMLParagraphElement;

        //Passed Pokemon
        var statPElement = document.createElement("p");
        statPElement.id = "statP";
        statPElement.textContent = this.lang_pass;
        this.statsDiv.appendChild(statPElement);
        this.statsDiv.appendChild(document.createElement("br"));
        this.statP = document.getElementById("statP") as HTMLParagraphElement;
    }

    async update(stat:HTMLParagraphElement, Array:Array<string>)
    {
        this.disableButtons();
        if (this.stage <= this.pokemonCount) 
        {
            stat.textContent += this.currentPokemon + ", ";
            Array.push(this.currentPokemon);
            this.stage++;
        }
        document.getElementById("statSNum").textContent = this.lang_smash + this.smashArray.length;
        document.getElementById("statPNum").textContent = this.lang_pass + this.passArary.length;
        if (this.stage > this.pokemonCount) 
        {
            document.getElementById("buttons").removeChild(document.getElementById("passButton"));
            document.getElementById("buttons").removeChild(document.getElementById("smashButton"));
            document.getElementById("artwork").removeChild(document.getElementById("pokeart"));
            document.getElementById("titelrino").removeChild(document.getElementById("poketitle"));
            document.getElementById("poke_container").removeChild(document.getElementById("artwork"));
        } else 
        {
            this.currentPokemon = await this.PokeGetter.pokemonName(this.stage, this.lang);
            this.updateImage("pokeart");
        }
    }

    updateImage(imgID:string)
    {
        if (this.shiny)
        {
            if (this.imageExists(this.PokeGetter.pokemonArt(this.stage, true)))
            {
                document.getElementById(this.h1Id).innerHTML = "Shiny " + this.currentPokemon + " #" + this.stage + `/#${this.pokemonCount}`;
                (document.getElementById(imgID) as HTMLImageElement).src = this.PokeGetter.pokemonArt(this.stage, true);
            } else
            {
                document.getElementById(this.h1Id).innerHTML = this.currentPokemon + " #" + this.stage + `/#${this.pokemonCount}`;
                (document.getElementById(imgID) as HTMLImageElement).src = this.PokeGetter.pokemonArt(this.stage, false);
            }
        }
        else 
        {
            document.getElementById(this.h1Id).innerHTML = this.currentPokemon + " #" + this.stage + `/#${this.pokemonCount}`;
            (document.getElementById(imgID) as HTMLImageElement).src = this.PokeGetter.pokemonArt(this.stage, false);
        }
    }
    
    imageExists(imageUrl:string)
    {
        var http = new XMLHttpRequest();
        http.open('HEAD', imageUrl, false);
        http.send();
        return http.status !== 404;
    }

    enableButtons()
    {
        document.getElementById("smashButton").removeAttribute("disabled");
        document.getElementById("passButton").removeAttribute("disabled");
    }

    disableButtons()
    {
        document.getElementById("smashButton").setAttribute("disabled", "disabled");
        document.getElementById("passButton").setAttribute("disabled", "disabled")
    }
}

class GameGerman extends Game
{
    constructor()
    {
        super();
        this.lang = "ger";

        this.lang_smash = "Würde Smashen: ";
        this.lang_pass = "Würde nicht Smashen: ";
    }
}

class GameEnglish extends Game
{
    constructor()
    {
        super();
        this.lang = "eng";

        this.lang_smash = "Would Smash: ";
        this.lang_pass = "Would not Smash: ";
    }
}

export { Game, GameGerman, GameEnglish };
