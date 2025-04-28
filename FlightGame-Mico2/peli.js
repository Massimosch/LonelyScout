'use strict';

const health = document.querySelector('#health');
const score = document.querySelector('#score');
const checkpoint = document.querySelector('#checkpoint');
const takaisinBtn = document.querySelector('#back_to_menu');


if (takaisinBtn) {
    takaisinBtn.addEventListener("click", () => {
        window.location.href = "menu.html";
    });
}

async function updateGameState(username) {

    if (!username)
        return;
    
    try {
        const response = await fetch(`http://localhost:8000/load_game/${username}`, {method: "GET"});
        const data = await response.json();
        const userData = data[0];
        
        health.innerHTML = `TERVEYS: ${userData.health}`;
        score.innerHTML = `SCORE: ${userData.score}`;
        checkpoint.innerHTML = `CHECKPOINT: ${userData.current_checkpoint}`;
    }
    catch (e) {
        console.log(e)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    //Ehkä vähän outo tapa tehdä... täytyy miettiä.
    const window_parameter = new URLSearchParams(window.location.search);
    const username = window_parameter.get('username')
    
    if (username) {
        updateGameState(username);
    }
    else {
        alert('Username parametri puuttuu');
    }
});