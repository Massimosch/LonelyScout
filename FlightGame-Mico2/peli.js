'use strict';

//Käytäjän nimi haetaan globaaliin muuttujaan..
const window_parameter = new URLSearchParams(window.location.search);
const username = window_parameter.get('username');


const health = document.querySelector('#health');
const score = document.querySelector('#score');
const checkpoint = document.querySelector('#checkpoint');
const takaisinBtn = document.querySelector('#back_to_menu');
const locationName = document.querySelector('#location_name');
const locationImage = document.querySelector('#location_image')
const inventory = document.querySelector('#inventory');
const liikuBtn = document.querySelector('#move');

if (liikuBtn) {
    liikuBtn.addEventListener("click", async () => {
        if (!username) 
            return;
        
        try {
            const response = await fetch(`http://localhost:8000/move/${username}`, { method: 'GET' });
            const data = await response.json()
            if (data) {
                await updateGameState(username);
            }
            else
            {
                alert("Ei voida liikkua eteenpäin");
            }
        }
        catch (e) {
            console.log(e)
        }
    })
}


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
        const userData = data[0][0]; //Nikita: muutin indexin uudelle responsille

        health.innerHTML = `TERVEYS: ${userData.health}`;
        score.innerHTML = `SCORE: ${userData.score}`;
        checkpoint.innerHTML = `CHECKPOINT: ${userData.checkpoint_name}`;
        locationName.innerHTML = `${userData.checkpoint_name}`;
        locationImage.src = `images/${userData.checkpoint_name}.png`
    }
    catch (e) {
        console.log(e)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (username) {
        updateGameState(username);
    }
    else {
        alert('Username parametri puuttuu');
    }
});