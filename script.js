const poke_container = document.getElementById("poke_container")
const titelrino = document.getElementById("titelrino")
const message = document.getElementById("welcome_message") 
const pokemons_number = 1008;
const buttons = document.getElementById("buttons")
const statsDiv = document.getElementById("stats")
const smashArray = []
const passArray = []
statSNum = document.createElement("p")
statPNum = document.createElement("p")
statS = document.createElement("p")
statP = document.createElement("p")

var stage = 1
var current_pokemon

const start = () => {
    titel = document.createElement("h1")
    titel.id = "schrift"
    deutsch =document.createElement("button")
    english =document.createElement("button")
    deutsch.id = "ger"
    deutsch.textContent = "Deutsch"
    english.textContent = "English"
    english.id = "en"
    titel.textContent = "Select Language"
    welcome_message.appendChild(titel)
    welcome_message.appendChild(deutsch)
    welcome_message.appendChild(english)
    deutsch.onclick = () => introDeutsch(titel,deutsch,english)
    english.onclick = () => introEnglish(titel,deutsch,english)
}

const introDeutsch = (t,b1,b2) => {
    t.textContent = "Willkommen zu Smash or Pass Pokemon!"
    p = document.createElement("p")
    startbutton = document.createElement("button")
    p.textContent = "Oder wie ich es nenne: Der Tiefpunkt meiner Karriere als Programmierer. In diesem Spiel geht es darum zu bewerten, ob DU mit dem gezeigten Pokemon gerne schlafen möchtest. Smash heißt Ja und Pass heißt Nein!"
    startbutton.textContent = "Start"
    startbutton.id = "stert"
    message.removeChild(b1)
    message.removeChild(b2)
    welcome_message.appendChild(p)
    welcome_message.appendChild(startbutton)
    startbutton.onclick = () => {
        message.removeChild(p)
        message.removeChild(startbutton)
        message.removeChild(t)
        run()
    }

}
    const introEnglish = (t,b1,b2) => {
        t.textContent = "Welcome to Smash or Pass Pokemon!"
        p = document.createElement("p")
        startbutton = document.createElement("button")
        p.textContent = "Or as I call it: The low point of my career as a programmer. This game is about evaluating whether YOU would like to have sex with the Pokemon shown. Smash means yes and pass means no!"
        startbutton.textContent = "Start"
        startbutton.id = "stert"
        message.removeChild(b1)
        message.removeChild(b2)
        welcome_message.appendChild(p)
        welcome_message.appendChild(startbutton)
        startbutton.onclick = () => {
            message.removeChild(p)
            message.removeChild(startbutton)
            message.removeChild(t)
            run()
        }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url);
    const pokemon = await res.json();
    current_pokemon = pokemon.name
    showPokemon(pokemon, id)
}
const showPokemon = (pokemon,id) => {
    const art = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    if (!document.getElementById("pokeart")) {
        h1 = document.createElement("h1")
        artwork = document.createElement("div")
        img = document.createElement("img")
        br = document.createElement("br")
        img.id = "pokeart"
        h1.id = "poketitle"
    }
    img.src = art
    h1.innerHTML = pokemon.name[0].toUpperCase() + pokemon.name.slice(1) + " #" +stage + "/#1008"
    artwork.id = "artwork"
    document.getElementById("titelrino").appendChild(h1)
    //poke_container.appendChild(br)
    artwork.appendChild(img)
    poke_container.appendChild(artwork)
    poke_container.appendChild(br)
}
const run= ()  => {
    smash = document.createElement("button")
    pass = document.createElement("button")
    br = document.createElement("br")
    smash.textContent = "SMASH"
    pass.textContent = "PASS"
    smash.id = "smashButton"
    pass.id= "passButton"
    smash.onclick = () => smashing()
    pass.onclick = () => passing()
    getPokemon(stage)
    buttons.appendChild(smash)
    buttons.appendChild(pass)
    statsDiv.appendChild(statSNum)
    statsDiv.appendChild(document.createElement("br"))
    statsDiv.appendChild(statPNum)
    statsDiv.appendChild(document.createElement("br"))
    statsDiv.appendChild(statS)
    statsDiv.appendChild(document.createElement("br"))
    statsDiv.appendChild(statP)
    statSNum.textContent = "Smash: "+smashArray.length
    statPNum.textContent = "Pass: "+passArray.length
    statS.textContent = "Would Smash: "
    statP.textContent = "Would not Smash: "

}
const smashing = () => {
    if (stage<=pokemons_number){
        statS.textContent = statS.textContent + current_pokemon+", "
        smashArray.push(current_pokemon)
        stage++
        update()
    }
}
const passing = () => {
    if (stage<=pokemons_number){
        statP.textContent = statP.textContent+ current_pokemon+", "
        passArray.push(current_pokemon)
        stage++
        update()
    }
}

const update = () => {
    statSNum.textContent = "Smash: "+smashArray.length
    statPNum.textContent = "Pass: "+passArray.length
    if(stage>pokemons_number) {
        buttons.removeChild(document.getElementById("smashButton"))
        buttons.removeChild(document.getElementById("passButton"))
        document.getElementById("artwork").removeChild(document.getElementById("pokeart"))
        titelrino.removeChild(document.getElementById("poketitle"))
        poke_container.removeChild(document.getElementById("artwork"))
    } else getPokemon(stage)
}
//getPokemon(448)
start()
