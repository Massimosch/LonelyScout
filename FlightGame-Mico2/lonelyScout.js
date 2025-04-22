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
        window.location.href = "peli.html"
    });
}

