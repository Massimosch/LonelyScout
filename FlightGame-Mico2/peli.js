'use strict';


const health = document.querySelector('#health');
const score = document.querySelector('#score');
const checkpoint = document.querySelector('#checkpoint');
const takaisinBtn = document.querySelector('#back_to_menu');
const inventory = document.querySelector('#consumables');
const consumables_buttons=document.querySelectorAll('.consumable-container') ;



if (takaisinBtn) {
    takaisinBtn.addEventListener("click", () => {
        window.location.href = "menu.html";
    });
}




async function updateGameState(username) {

    if (!username)
        return;
    
    try {
        const response = await fetch(
            `http://localhost:8000/load_game/${username}`, {method: "GET"});
        const data = await response.json();
        const user_stats = data[0][0];
        let user_consumables
        if (!data[1]||data[1].length === 0) {
            user_consumables=[
                {'name': 'nakki', 'heal_amount': 5, 'quantity': 0},
                {'name': 'parantava-juoma', 'heal_amount': 25, 'quantity': 0},
                {'name': 'piirakka', 'heal_amount': 15, 'quantity': 0}
            ]
        }
        else {
            user_consumables=data[1]
        }
        console.log(user_consumables)

        health.innerHTML = `TERVEYS: ${user_stats.health}`;
        score.innerHTML = `SCORE: ${user_stats.score}`;
        checkpoint.innerHTML = `CHECKPOINT: ${user_stats.current_checkpoint}`;


        for (let consumable of user_consumables) {
            const item = inventory.querySelector(`#${consumable.name}`);
            const item_quantity=item.querySelector('.quantity');
            item_quantity.innerHTML = `${consumable.quantity}`;
        }
        let isProcessing=false
        consumables_buttons.forEach(consumable_button=>{
            consumable_button.addEventListener('click',()=>{
                if (isProcessing) return;
                isProcessing = true;
                for (let item of user_consumables){
                   if (item.name===consumable_button.id){
                       if (item.quantity>0) {
                           item.quantity -= 1
                           const quantityElement = consumable_button.querySelector(
                               '.quantity')
                           quantityElement.textContent = item.quantity
                           console.log(user_stats.health)
                           user_stats.health += item.heal_amount
                           health.innerHTML = `TERVEYS: ${user_stats.health}`
                       }
                   else {
                       alert('You dont have this item')
                       }
                   }
                isProcessing=false
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








