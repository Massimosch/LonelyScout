'use strict';

const health = document.querySelector('#health');
const score = document.querySelector('#score');
//const checkpoint = document.querySelector('#checkpoint');
const enemy_weakness = document.querySelector('#enemy_weakness');
const enemy_damage = document.querySelector('#enemy_damage');
const enemy_health = document.querySelector('#enemy_health');
const enemy_name = document.querySelector('#enemy_name');
const weapons = document.querySelector('#aseet');

document.addEventListener('DOMContentLoaded', async () => {
  const window_parameter = new URLSearchParams(window.location.search);
  const username = window_parameter.get('username');

  if (true) {
    //await updateGameState(username);
    updateBattleView();
  } else {
    alert('Username parametri puuttuu');
  }
});

weapons.addEventListener('change', () => {
  battleState.playerState.selectedWeapon = battleState.weapons[weapons.value];
});
const battleState = {
  playerState:
      {
        health: 100,
        score: 100,
        selectedWeapon: {
          name: 'nyrkki',
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
    battleState.playerState.health = res_data[0].health;
    battleState.playerState.score = res_data[0].score;

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