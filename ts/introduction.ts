import { Game, GameEnglish, GameGerman } from "./game.js";

class Opener 
{
    message:HTMLElement
    constructor() 
    {
        this.message = document.getElementById("welcome_message");
    }
}

class Intro extends Opener 
{
    lang: string
    heading: string
    welcome: string
    start: string
    game: Game
    constructor() 
    {
        super();
        this.lang;
        this.heading;
        this.welcome;
        this.start = "start";
        this.game;
    }

    startIntro(title:HTMLHeadingElement) 
    {
        var p:HTMLParagraphElement = document.createElement("p");
        var startbutton:HTMLButtonElement = document.createElement("button");

        title.textContent = this.heading;

        p.textContent = this.welcome;

        startbutton.id = "startbutton";
        startbutton.textContent = "Start";
        startbutton.onclick = () => 
        {
            this.message.removeChild(title);
            this.message.removeChild(p);
            this.message.removeChild(startbutton);
            this.game.run();

        };

        this.message.appendChild(p);
        this.message.appendChild(startbutton);
    }
}

class IntroGerman extends Intro 
{
    constructor()
    {
        super();
        this.lang = "ger";
        this.heading = "Willkommen zu Smash or Pass Pokemon!";
        this.welcome = "Oder wie ich es nenne: Der Tiefpunkt meiner Karriere als Programmierer. In diesem Spiel geht es darum zu bewerten, ob DU mit dem gezeigten Pokemon gerne schlafen möchtest. Smash heißt Ja und Pass heißt Nein!";
        this.game = new GameGerman();
    }
}

class IntroEnglish extends Intro 
{
    constructor()
    {
        super();
        this.lang = "eng";
        this.heading = "Welcome to Smash or Pass Pokemon!";
        this.welcome = "Or as I call it: The low point of my career as a programmer. This game is about evaluating whether YOU would like to have sex with the Pokemon shown. Smash means yes and pass means no!";
        this.game = new GameEnglish();
    }
}

class Starter extends Opener 
{
    intGer: IntroGerman
    intEng: IntroEnglish
    constructor() 
    {
        super();
        this.intGer = new IntroGerman();
        this.intEng = new IntroEnglish();
    }

    start() 
    {
        var title:HTMLHeadingElement = document.createElement("h1");
        var deutsch:HTMLButtonElement = document.createElement("button");
        var english:HTMLButtonElement = document.createElement("button");

        title.id = "schrift";
        title.textContent = "Select Language";
        this.message.appendChild(title);

        deutsch.id = "ger";
        deutsch.textContent = "Deutsch";
        deutsch.onclick = () => 
        {
            this.delete_buttons(deutsch, english);
            this.intGer.startIntro(title);
        };
        this.message.appendChild(deutsch);

        english.id = "en";
        english.textContent = "English";
        english.onclick = () => 
        {
            this.delete_buttons(deutsch, english);
            this.intEng.startIntro(title);
        };
        this.message.appendChild(english);
    }

    delete_buttons(ger:HTMLButtonElement, eng:HTMLButtonElement) 
    {
        this.message.removeChild(ger);
        this.message.removeChild(eng);
    }
}

export { Starter };
