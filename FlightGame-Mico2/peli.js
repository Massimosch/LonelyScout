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
let current_consumables, current_stats

const gameState = {
  playerState:
      {
        player: '',
        game_id: 0,
        health: 100,
        score: 100,
        current_checkpoint_id: 0,
      },
  food: [],
  weapons: [
    {
      name: 'nyrkki',
      damage: 10,
      durability: Infinity,
    },
    {
      name: 'steel sword',
      type: 'sword',
      saleValue: 250,
      damage: 100,
      durability: 10,
    },
    {
      name: 'slingshot',
      type: 'ranged',
      saleValue: 100,
      damage: 50,
      durability: 10,
    },
    {
      name: 'bow',
      type: 'ranged',
      saleValue: 150,
      damage: 50,
      durability: 10,
    },
    {
      name: 'magic staff',
      type: 'magic',
      saleValue: 175,
      damage: 60,
      durability: 10,
    },
  ],
  enemy: {
    name: 'orc',
    damage: 3,
    weakness: 'sword',
    health: 50,
  },
};

document.addEventListener('DOMContentLoaded', async() => {

  if (username) {
    await updateGameState(username);
  } else {
    alert('Username parametri puuttuu');
  }
});


if (liikuBtn) {
  liikuBtn.addEventListener('click', async () => {
    if (!gameState.playerState.player)
      return;

    try {
      let data = {
        current_checkpoint_id: gameState.playerState.current_checkpoint_id,
        health: gameState.playerState.health,
        score: gameState.playerState.score
      }
      
      const request = await fetch(`http://localhost:8000/save_game/${gameState.playerState.game_id}`,
          {method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)});

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
        `http://localhost:8000/load_game/${username}`, 
        {method: 'GET'});
    const res_data = await response.json();
    gameState.playerState.player = username;
    gameState.playerState.health = res_data.player_stats.health;
    gameState.playerState.score = res_data.player_stats.score;
    gameState.playerState.game_id = res_data.player_stats.id;
    gameState.playerState.current_checkpoint_id = res_data.player_stats.current_checkpoint_id;

    health.innerHTML = `TERVEYS: ${res_data.player_stats.health}`;
    score.innerHTML = `SCORE: ${res_data.player_stats.score}`;
    checkpoint.innerHTML = `CHECKPOINT: ${res_data.current_checkpoint_id.name}`;
    locationName.innerHTML = `${res_data.current_checkpoint_id.name}`;
    locationImage.src = `images/${res_data.current_checkpoint_id.name}.png`;
    

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
    current_consumables = user_consumables
    
for (let consumable of user_consumables) {
      const item = consumables.querySelector(`#${consumable.name}`);
      const item_quantity = item.querySelector('.quantity');
      item_quantity.innerHTML = `${consumable.quantity}`;
    }
  }
  catch (e) {
    console.log(e);
  }
}

consumables_buttons.forEach(consumable_button => {
      consumable_button.addEventListener('click', consumables_click)
})

let isProcessing = false;
async function consumables_click(event) {
  await current_consumables
  await current_stats
  const button=event.currentTarget
  if (isProcessing) return;
  isProcessing = true;
  for (let item of current_consumables) {
    if (item.name === button.id) {
      if (item.quantity > 0) {
        item.quantity -= 1;
        const quantityElement = button.querySelector(
            '.quantity');
        quantityElement.textContent = item.quantity;
        current_stats.health += item.heal_amount;
        health.innerHTML = `TERVEYS: ${current_stats.health}`;
      } else {
        alert('You dont have this item');
      }
    }
    isProcessing = false;
  }
}