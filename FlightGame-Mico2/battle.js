'use strict';

const health = document.querySelector('#health');
const score = document.querySelector('#score');
//const checkpoint = document.querySelector('#checkpoint');
const enemy_weakness = document.querySelector('#enemy_weakness');
const enemy_damage = document.querySelector('#enemy_damage');
const enemy_health = document.querySelector('#enemy_health');
const enemy_name = document.querySelector('#enemy_name');
const weapons = document.querySelector('#aseet');
const hit = document.querySelector('#hit');

document.addEventListener('DOMContentLoaded', async () => {
  const window_parameter = new URLSearchParams(window.location.search);
  const username = window_parameter.get('username');

  if (username) {
    await updateGameState(username);
    updateBattleView();
  } else {
    alert('Username parametri puuttuu');
  }
});

weapons.addEventListener('change', () => {
  battleState.playerState.selectedWeapon = battleState.weapons[weapons.value];
});

hit.addEventListener('click', runFightRound);

const battleState = {
  playerState:
      {
        player: 'test',
        game_id: 155,
        health: 100,
        score: 100,
        current_checkpoint_id: 0,
        selectedWeapon: {
          name: 'nyrkki',
          type: null,
          damage: 10,
          durability: Infinity,
        },
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

async function updateGameState(username) {
  try {
    const response = await fetch(`http://localhost:8000/load_game/${username}`,
        {method: 'GET'});
    const res_data = await response.json();
    battleState.playerState.player = username;
    battleState.playerState.health = res_data.player_stats.health;
    battleState.playerState.score = res_data.player_stats.score;
    battleState.playerState.game_id = res_data.player_stats.id;
    battleState.playerState.current_checkpoint_id = res_data.player_stats.current_checkpoint +
        1;
    // to add weapons, to add food

    console.log(res_data);

    const enemy_res = await fetch('http://localhost:8000/get_random_enemy');
    const enemy = (await enemy_res.json())[0];
    battleState.enemy.name = enemy.name;
    battleState.enemy.damage = enemy.damage;
    battleState.enemy.weakness = enemy.weakness;
    battleState.enemy.health = enemy.health;
  } catch (e) {
    console.log(e);
  }
}

function updateBattleView() {
  health.innerHTML = `TERVEYS: ${battleState.playerState.health}`;
  score.innerHTML = `SCORE: ${battleState.playerState.score}`;
  enemy_name.innerHTML = `Sinun vihollinen on ${battleState.enemy.name}`;
  enemy_weakness.innerHTML = `HAAVOITTUVUUS: ${battleState.enemy.weakness}`;
  enemy_damage.innerHTML = `ISKUVARIO: ${battleState.enemy.damage}`;
  enemy_health.innerHTML = `TERVEYS: ${battleState.enemy.health}`;

  for (let i = 0; i < battleState.weapons.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${battleState.weapons[i].name} (kestävyys: ${battleState.weapons[i].durability}, damage: ${battleState.weapons[i].damage})`;
    weapons.appendChild(option);
  }
}

async function runFightRound() {
  if (battleState.playerState.selectedWeapon.type ===
      battleState.enemy.weakness) {
    battleState.enemy.health -= 2 *
        battleState.playerState.selectedWeapon.damage;

  } else {
    battleState.enemy.health -= battleState.playerState.selectedWeapon.damage;
  }
  enemy_health.innerHTML = `TERVEYS: ${battleState.enemy.health}`;
  battleState.playerState.selectedWeapon.durability -= 1;
  if (battleState.enemy.health > 0) {
    battleState.playerState.health -= battleState.enemy.damage;
    health.innerHTML = `TERVEYS: ${battleState.playerState.health}`;
    if (battleState.playerState.health < 1) {
      // to call save game
    }
  } else {
    // some pop up like module in the store when player win
    await save_data();
    window.location.href = `peli.html?username=${battleState.playerState.player}`;
  }
}

async function save_data() {
  try {
    let data = {
      player_stats: {
        player: battleState.playerState.player,
        current_checkpoint_id: battleState.playerState.current_checkpoint_id,
        health: battleState.playerState.health,
        score: battleState.playerState.score,
      },
      consumables: battleState.food,
      weapons: battleState.weapons.slice(1),
    };

    console.log(data);

    const req = await fetch(
        `http://localhost:8000/save_game/${battleState.playerState.game_id}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        });
  } catch (e) {
    console.log(e);
  }
}