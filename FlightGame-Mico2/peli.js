'use strict';

//Käytäjän nimi haetaan globaaliin muuttujaan..
const window_parameter = new URLSearchParams(window.location.search);
const username = window_parameter.get('username');

const health = document.querySelector('#health');
const score = document.querySelector('#score');
const checkpoint = document.querySelector('#checkpoint');
const takaisinBtn = document.querySelector('#back_to_menu');
const inventory = document.querySelector('#inventory');
const consumables = document.querySelector('#consumables');
const consumables_buttons = document.querySelectorAll('.consumable-container');
const locationName = document.querySelector('#location_name');
const locationImage = document.querySelector('#location_image');
const liikuBtn = document.querySelector('#move');

if (liikuBtn) {
  liikuBtn.addEventListener('click', async () => {
    if (!username)
      return;

    try {
      const response = await fetch(`http://localhost:8000/move/${username}`,
          {method: 'GET'});
      const data = await response.json();
      if (data) {
        await updateGameState(username);
      } else {
        alert('Ei voida liikkua eteenpäin');
      }
    } catch (e) {
      console.log(e);
    }
  });
}
if (takaisinBtn) {
  takaisinBtn.addEventListener('click', () => {
    window.location.href = 'menu.html';
  });
}

async function updateGameState(username) {

  if (!username)
    return;

  try {
    const response = await fetch(
        `http://localhost:8000/load_game/${username}`, {method: 'GET'});
    const data = await response.json();
    console.log(data);
    const userData = data;
    let user_consumables;
    if (!data.consumables || data.consumables.length === 0) {
      user_consumables = [
        {'name': 'nakki', 'heal_amount': 5, 'quantity': 0},
        {'name': 'parantava-juoma', 'heal_amount': 25, 'quantity': 0},
        {'name': 'piirakka', 'heal_amount': 15, 'quantity': 0},
      ];
    } else {
      user_consumables = data.consumables;
    }
    console.log(user_consumables);

    health.innerHTML = `TERVEYS: ${userData.player_stats.health}`;
    score.innerHTML = `SCORE: ${userData.player_stats.score}`;
    checkpoint.innerHTML = `CHECKPOINT: ${userData.player_stats.checkpoint_name}`;
    locationName.innerHTML = `${userData.player_stats.checkpoint_name}`;
    locationImage.src = `images/${userData.player_stats.checkpoint_name}.png`;

    for (let consumable of user_consumables) {
      const item = consumable.querySelector(`#${consumable.name}`);
      const item_quantity = item.querySelector('.quantity');
      item_quantity.innerHTML = `${consumable.quantity}`;
    }
    let isProcessing = false;
    consumables_buttons.forEach(consumable_button => {
      consumable_button.addEventListener('click', () => {
        if (isProcessing) return;
        isProcessing = true;
        for (let item of user_consumables) {
          if (item.name === consumable_button.id) {
            if (item.quantity > 0) {
              item.quantity -= 1;
              const quantityElement = consumable_button.querySelector(
                  '.quantity');
              quantityElement.textContent = item.quantity;
              console.log(userData.health);
              userData.health += item.heal_amount;
              health.innerHTML = `TERVEYS: ${userData.health}`;
            } else {
              alert('You dont have this item');
            }
          }
          isProcessing = false;
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
}

document.addEventListener('DOMContentLoaded', () => {

  if (username) {
    updateGameState(username);
  } else {
    alert('Username parametri puuttuu');
  }
});