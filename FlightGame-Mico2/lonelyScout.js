'use strict';

const aloitaButton = document.querySelector("#aloita");
const lataaButton = document.querySelector("#lataa");
const tekijätButton = document.querySelector("#tekijät");
const takaisinButton = document.querySelector("#takaisin")
const narratorLog = document.querySelector("#narrator-log");
const playerInput = document.querySelector("#player-input");

if (tekijätButton) 
{
    tekijätButton.addEventListener("click", function() {
        window.location.href = "tekijät.html"
    });
}

if (takaisinButton)
{
    takaisinButton.addEventListener("click", function(){
        window.location.href = "menu.html"
    })
}

if (playerInput)
{
    playerInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = playerInput.value.trim();
            if (command !== "")
            {
                const entry = document.createElement('p');
                entry.innerHTML = "> " + command;
                narratorLog.appendChild(entry)
                
                playerInput.value = "";
            }
        }
    })    
}

if (aloitaButton)
{
    aloitaButton.addEventListener("click", function(event){
        new_game();
        //window.location.href = "peli.html"
    });
}

if (lataaButton)
{
    lataaButton.addEventListener("click", function (){
        loadGameState();
    });
}

async function loadGameState() {
    let username = prompt("Anna haettavan peliukon nimi: ")
    username = username.toLowerCase()
    
    if (!username) 
        return;
    
    try {
        const response = await fetch(`http://localhost:8000/game_state/${username}`);
        if (response.ok) {
            alert(`Pelintila ladattiin nimimerkillä '${username}'.`)
        }
        else {
            alert(`Nimimerkillä '${username}' ei löytynyt pelintilaa ladattavaksi.`)
        }
    }
    catch (e) {
        alert("Jokin Error. Tarkista console.log.")
        console.log(e)
    }
}

async function new_game() {
    let username = prompt("Anna uusi käyttäjä nimi: ")
    username = username.toLowerCase()
    
    if (!username)
        return;
    
    try {
        const response = await fetch(`http://localhost:8000/new_game/${username}`);
        if (response.ok) {
            alert(`Pelintila luotiin nimimerkillä '${username}'!`)
        }
        else {
            alert(`Nimimerkillä '${username}' on jo peli olemassa.`)
        }
    }
    catch (e) {
        alert("Jokin error. Tarkista console.log")
        console.log(e)
    }
}
