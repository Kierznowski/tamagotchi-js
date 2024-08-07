import { footer, pgCenter, poops } from "./domElements.js";
import { StatsUpdater } from "./statsUpdater.js";

export default class Tamagotchi {
    
    constructor(name) {
        this.name = name;
        this.feed = 100;
        this.happy = 100;
        this.health = 100;
        this.age = 0;
        this.poopCount = 0;
        
        this.updater = new StatsUpdater();
        this.updateInterval = setInterval(() => this.update(), 2500);
        this.live();
    }

    live() {
        this.updater.displayStats();
        footer.innerHTML = '<button id="eatButton">eat</button>' + 
                            '<button id="cureButton">cure</button>' + 
                            '<button id="playButton">play</button>';
        pgCenter.innerHTML = '<img src="./../img/age0-sit.png" height="175px">';

        const eatButton = document.getElementById("eatButton");
        const cureButton = document.getElementById("cureButton");
        const playButton = document.getElementById("playButton");
        eatButton.onclick = () => this.eat(); 
        cureButton.onclick = () => this.cure();
        playButton.onclick = () => this.play(); 
    }

    eat() {
        this.feed += 10;
        if(this.feed > 100) {
            this.feed = 100;
        } else if(this.feed < 0) {
            feed = 0;
        }
        setTimeout(() => this.poop(), 1000 * 60);
    }
    
    poop() {
        this.poopCount++;
        if(this.poopCount > 3) {
            this.poopCount = 3;
        }
            
        for(let i = 0; i < 3; i++) {
            if(poops[i].innerHTML == "") {
                poops[i].innerHTML =  "<img src='./../img/icons/pooppx.png' width='30px'/>";
                break; 
            }
        }
    }

    clearPoop(poopIndex) {
        poops[poopIndex].innerHTML = "";
        this.poopCount--;
        if(this.poopCount < 0) {
            this.poopCount = 0;
        }
    }

    cure() {
        this.health += 20;
        if(this.health > 100) {
            this.health = 100;
        }
    }

    play() {
        this.happy += 20;
        if(this.happy > 100) {
            this.happy = 100;
        }
    }

    die() {
        clearInterval(this.hungerInterval);
        clearInterval(this.happyInterval);
        clearInterval(this.agingInterval);
        clearInterval(this.healtInterval);
        pgCenter.innerHTML = this.name + ' just died. R. I. P. <img src="./../img/gravepx.png">';
    }

    update() {
        this.updater.shareData(this.feed, this.poopCount, this.health, this.happy, this.age);
        this.health = this.updater.updateHealth();
        this.happy = this.updater.updateHappy();
        this.feed = this.updater.updateFeed();
        this.age = this.updater.updateAge();
        this.updater.displayStats();
    }
}