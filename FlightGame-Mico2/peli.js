'use strict';


const health = document.querySelector('#health');
const score = document.querySelector('#score');
const checkpoint = document.querySelector('#checkpoint');
const takaisinBtn = document.querySelector('#back_to_menu');
const inventory = document.querySelector('#consumables');


if (takaisinBtn) {
    takaisinBtn.addEventListener("click", () => {
        window.location.href = "menu.html";
    });
}

let user_Stats= []
let user_Consumables = []

async function updateGameState(username) {

    if (!username)
        return;
    
    try {
        const response = await fetch(
            `http://localhost:8000/load_game/${username}`, {method: "GET"});
        const data = await response.json();
        const downloaded_User_Stats = data[0][0];
        user_Stats=downloaded_User_Stats
        const downloaded_User_Consumables = data[1]
        user_Consumables=downloaded_User_Consumables

        health.innerHTML = `TERVEYS: ${downloaded_User_Stats.health}`;
        score.innerHTML = `SCORE: ${downloaded_User_Stats.score}`;
        checkpoint.innerHTML = `CHECKPOINT: ${downloaded_User_Stats.current_checkpoint}`;


        for (let consumable of downloaded_User_Consumables) {
            const item = document.createElement('div');
            const item_emoji = document.createElement('span')
            const item_quantity = document.createElement('span')
            item.id = `${consumable.name}`;
            item.className = 'consumable-container';
            item_quantity.className = 'quantity'
            let emoji;
            if (`${consumable.name}` === 'parantava juoma') {
                emoji = '\u{1F9EA}';
            } else if (`${consumable.name}` === 'nakki') {
                emoji = '\u{1F32D}';
            } else {
                emoji = '\u{1F967}';
            }
            item_emoji.innerHTML = emoji;
            item_quantity.innerHTML = `${consumable.quantity}`
            item.appendChild(item_emoji)
            item.appendChild(item_quantity)
            const popup = document.createElement('div');
            popup.className = 'consumable-popup';
            popup.textContent = `Sale value:${consumable.sale_value}  Heal amount:${consumable.heal_amount}`;
            item.appendChild(popup);
            inventory.appendChild(item);
        }
        const consumables_buttons=document.querySelectorAll('.consumable-container') ;
        consumables_buttons.forEach(consumable_button=>{
            consumable_button.addEventListener('click',()=>{
               for (let item of user_Consumables){
                   if (item.name===consumable_button.id){
                       item.quantity-=1
                       const quantityElement = consumable_button.querySelector('.quantity')
                       quantityElement.textContent=item.quantity
                       console.log(user_Stats.health)
                       user_Stats.health+=item.heal_amount
                       health.innerHTML = `TERVEYS: ${user_Stats.health}`
                   }
               }
            })
        })
        


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








