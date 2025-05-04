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
const weapons=document.querySelector('#weapons');
const consumables_buttons = consumables.querySelectorAll('.item-container');
const locationName = document.querySelector('#location_name');
const locationImage = document.querySelector('#location_image');
const liikuBtn = document.querySelector('#move');

const gameState = {
  playerState:
      {
        player: '',
        game_id: 0,
        health: 100,
        score: 100,
        checkpoint_name: '',
        current_checkpoint_id: 1,
      },
  food: [
      {
         item_id: 1,
         name: 'parantava juoma',
         heal_amount: 25,
         quantity: 0
      },
      {
         item_id: 2,
         name: 'nakki',
         heal_amount: 5,
         quantity: 0,
      },
      {
          item_id: 3,
          name: 'piirakka',
          heal_amount: 15,
          quantity: 0
      }
  ],
  enemy: {
    name: 'orc',
    damage: 3,
    weakness: 'sword',
    health: 50,
  },
};
let current_consumables=gameState.food;
let current_stats = gameState.playerState;

function change_symbol_in_name(dictionary,symbol1,symbol2) {
   for (let item of dictionary){
      item.name=item.name.replace(symbol1,symbol2)
    }
}

document.addEventListener('DOMContentLoaded', async () => {

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
        player_stats:
            {
              current_checkpoint_id: gameState.playerState.current_checkpoint_id,
              health: gameState.playerState.health,
              score: gameState.playerState.score,
            },
      };

      const request = await fetch(
          `http://localhost:8000/save_game/${gameState.playerState.game_id}`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          });
      console.log('I am cheking player name', gameState.playerState.player)
      window.location.href = `battle.html?username=${gameState.playerState.player}`;
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
    gameState.playerState.current_checkpoint_id = res_data.player_stats.current_checkpoint;
    gameState.playerState.checkpoint_name = res_data.player_stats.checkpoint_name;

    health.innerHTML = `TERVEYS: ${res_data.player_stats.health}`;
    score.innerHTML = `SCORE: ${res_data.player_stats.score}`;
    checkpoint.innerHTML = `CHECKPOINT: ${res_data.player_stats.checkpoint_name}`;
    locationName.innerHTML = `${res_data.player_stats.checkpoint_name}`;
    locationImage.src = `images/${res_data.player_stats.checkpoint_name}.png`;

    gameState.weapons=res_data.weapons

    if (gameState.weapons.length>0) {
      create_weapon_elements(gameState.weapons)
      }


    if (res_data.consumables && res_data.consumables.length > 0) {
      gameState.food = res_data.consumables;
    }

    current_consumables=gameState.food;

    change_symbol_in_name(current_consumables,' ','-')

    for (let consumable of current_consumables) {
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
  consumable_button.addEventListener('click', consumables_click);
});

let isProcessing = false;

async function consumables_click(event) {
  await current_consumables;
  await current_stats;
  const button = event.currentTarget;
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
  }
  isProcessing = false;
}

function create_weapon_elements(weaponList){
  const emojiMap = {
  'steel sword': '🗡️',
  'bow': '🏹',
  'slingshot': '🪀',
  'magic staff': '🔮',
  };
  for (let weapon of weaponList){
    const weaponElement=document.createElement('div')
    weaponElement.classList.add('item-container')
    const weaponEmoji=document.createElement('span')
    weaponEmoji.textContent=`${emojiMap[weapon.name]}`
    const popup=document.createElement('div')
    popup.classList.add('item-popup')
    popup.textContent=`name:${weapon.name} | type:${weapon.type} | sale value:${weapon.sale_value} | damage:${weapon.damage} | current durability:${weapon.current_durability}`
    weaponElement.appendChild(weaponEmoji)
    weaponElement.appendChild(popup)
    weapons.appendChild(weaponElement)
  }
}
