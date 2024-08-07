/* Code relliable for changing stats according to state of the Tamagotchi.
Here are implemented every dependenies between tamagotchi variables. 
Every 5 sec Tamagotchi class calls shareData() method and send tamagotchi stats 
to this class. Then Tamagotchi call update methods for every stat.
At last StatsUpdater display updated stats on the app screen. */

import { header } from "./domElements.js";

export class StatsUpdater {

    constructor() {
        this.poopCount = 0;
        this.health = 100;
        this.feed = 100;
        this.happy = 100;
        this.age = 0;
        this.happyFactor = 0;
        this.feedFactor = 0;
        this.healthFactor = 0;
    }

    shareData(feed, poopCount, health, happy, age) {
        this.feed = feed;
        this.poopCount = poopCount;
        this.happy = happy;
        this.health = health;
        this.age = age;
    }

    displayStats() {
        header.innerHTML = "<img src='./../img/icons/bowlpx.png' height='20px'/> " + Math.ceil(this.feed) + 
        " | <img src='./../img/icons/happinesspx.png' height='25px'/> " + Math.ceil(this.happy) + 
        " | <img src='./../img/icons/cakepx.png' height='30px'/> " + Math.floor(this.age) + 
        " | <img src='./../img/icons/healthpx.png' height='25px'/> " + Math.ceil(this.health);
    }

    updateHappy() {        
        this.happyFactor = this.poopCount ** 2 / 16;
        
        if(this.health < 90) {
            if(this.happy > this.health + 5) {
                this.happyFactor -= (100 - this.health)*0.1;
            }
        }
        
        if(this.feed < 0.8) {
            if(this.happy > this.feed + 5) {
                this.happyFactor -= (100 - this.feed)*0.1;
            }
        }
        //happy should grow if everything is ok. checking boudaries 0..100
        if(this.happyFactor == 0) {
            this.happyFactor = 2;
        }

        this.happy += this.happyFactor;
        if(this.happy < 0) {
            return 0;
        } else if(this.happy > 100) {
            this.happy = 100;
        }
        return this.happy; 
    }

    updateHealth() {
        this.healthFactor = 0;
        //if is old, slowly die
        if(this.age > 8) {
            return this.health -= 0.5;
        }
        this.healthFactor = -(this.poopCount**2) / 24;
        if(this.feed < 10) {
            this.healthFactor -= (100 - this.feed) * 0.1;
        } else if(this.feed < 30) {
            this.healthFactor -= (100 - this.feed) * 0.05;
        }
        if(this.healthFactor == 0) {
            this.healthFactor = 0.5;
        }

        this.health += this.healthFactor;
        if(this.health > (100 - (100 - this.happy) * 0.1)) {
            this.health = (100 - (100 - this.happy) * 0.1);
        }
        if(this.health < 0) {
            return 0;
        }
        if(this.health > 100) {
            this.health = 100;
        }
        return this.health;
    }  
    
    updateFeed() {
        this.feedFactor = -2 / 12;

        if(this.health < 80) {
            this.feedFactor -= (100 - this.health) / 20 / 12;
        }
        this.feed += this.feedFactor;
        if(this.feed < 0) {
            this.feed = 0;
        }
        if(this.feed > 100) {
            this.feed = 100;
        }
        return this.feed;
    }

    updateAge() {
        this.ageFactor = 5 / 3600;
        if(this.feed < 60 || this.health < 70) {
            this.ageFactor = 4 / 3600;
        } else if(this.feed < 40 || this.health < 50) {
            this.ageFactor = 2 / 3600;
        } else if(this.feed < 20 || this.health < 35) {
            this.ageFactor = 0;
        }
        this.age += this.ageFactor;
        return this.age;
    }
}



