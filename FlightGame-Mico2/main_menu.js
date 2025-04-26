'use strict';

const aloitaButton = document.querySelector("#aloita");
const lataaButton = document.querySelector("#lataa");
const tekijätButton = document.querySelector("#tekijät");
const takaisinButton = document.querySelector("#takaisin")

if (tekijätButton) 
{
    tekijätButton.addEventListener("click", () => { window.location.href = "tekijät.html" })
}

if (takaisinButton)
{
    takaisinButton.addEventListener("click", () => { window.location.href = "menu.html" })
}

if (aloitaButton)
{
    aloitaButton.addEventListener("click", new_game)
}

if (lataaButton)
{
    lataaButton.addEventListener("click", loadGameState);
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
            window.location.href = `peli.html?username=${username}`;
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
        const response = await fetch(`http://localhost:8000/new_game/${username}`,{
            method: "POST"
        });
        const data = (await response.json())[0]
        console.log(data)
        if (response.ok) {
          //  alert(`Pelintila luotiin nimimerkillä '${username}'!`)
        //    window.location.href = `peli.html?username=${username}`;
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
