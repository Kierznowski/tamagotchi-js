import Tamagotchi from "./tamagotchi.js";
import { pgCenter, poop1, poop2, poop3 } from "./domElements.js";



document.addEventListener("DOMContentLoaded", () => {

    let gotchi;

    function startGame() {
        pgCenter.innerHTML = '<label for="petName">Give a name to your gotchi: </label>' +
                                '<input type="text" id="petName" name="petName">' +
                                '<input id="submit" type="submit" value="ok">';
        const start = document.getElementById("submit");
        start.onclick = () => {
            const name = document.getElementById("petName").value;
            gotchi = new Tamagotchi(name);
        }
    }

    poop1.onclick = () => gotchi.clearPoop(0); 
    poop2.onclick = () => gotchi.clearPoop(1);
    poop3.onclick = () => gotchi.clearPoop(2); 

    startGame();
});
