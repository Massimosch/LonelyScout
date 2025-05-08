'use strict';

const health = document.querySelector('#health');
const score = document.querySelector('#score');
const checkpoint = document.querySelector('#checkpoint');
const enemy_weakness = document.querySelector('#enemy_weakness');
const enemy_damage = document.querySelector('#enemy_damage');
const enemy_health = document.querySelector('#enemy_health');
const enemy_name = document.querySelector('#enemy_name');
const enemyImage = document.querySelector('#enemy_image');
const weapons = document.querySelector('#aseet');
const hit = document.querySelector('#hit');
const battleModal = document.getElementById('battleResultModal');
const battleModalHeader = document.getElementById('battleHeader');
const battleModalDesc = document.getElementById('description');
const btnModal = document.getElementById('continue');

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
   console.log(weapons.value, 'i am here', battleState.playerState.selectedWeapon, battleState.last_checkpoint)
});

hit.addEventListener('click', runFightRound);

const battleState = {
  playerState:
      {
        player: 'test',
        game_id: 155,
        health: 3,
        score: 100,
        checkpoint_name:'',
        current_checkpoint_id: 0,
        selectedWeapon: {
          name: 'nyrkki',
          type: null,
          damage: 7,
          current_durability: Infinity,
        },
      },
  food: [],
  weapons: [
    {
      name: 'nyrkki',
      damage: 7,
      type: null,
      current_durability: Infinity,
    }
  ],
  enemy: {
    name: 'orc',
    damage: 3,
    weakness: 'sword',
    health: 50,
  },
  last_checkpoint: null
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
    battleState.playerState.checkpoint_name = res_data.player_stats.checkpoint_name
    // to add weapons, to add food
    battleState.food=res_data.consumables
    res_data.weapons.forEach(w =>battleState.weapons.push(w))
    console.log(res_data);

    const enemy_res = await fetch('http://localhost:8000/get_random_enemy');
    const enemy = (await enemy_res.json())[0];
    battleState.enemy.name = enemy.name;
    battleState.enemy.damage = enemy.damage;
    battleState.enemy.weakness = enemy.weakness;
    battleState.enemy.health = enemy.health;

    const last_checkpoint_res = await fetch('http://localhost:8000/get_last_checkpoint')
    console.log(last_checkpoint_res)
    battleState.last_checkpoint = await last_checkpoint_res.json()
    console.log('tyrsdjhfbkjars',battleState.last_checkpoint.id) //dictionary


  } catch (e) {
    console.log(e);
  }
}

function updateBattleView() {
  health.innerHTML = `TERVEYS: ${battleState.playerState.health}`;
  score.innerHTML = `PISTEET: ${battleState.playerState.score}`;
  enemy_name.innerHTML = `Sinun vihollinen on ${battleState.enemy.name}`;
  enemy_weakness.innerHTML = `HAAVOITTUVUUS: ${battleState.enemy.weakness}`;
  enemy_damage.innerHTML = `ISKUVARIO: ${battleState.enemy.damage}`;
  enemy_health.innerHTML = `TERVEYS: ${battleState.enemy.health}`;
  enemyImage.src = `images/enemies/${battleState.enemy.name}.png`;
  checkpoint.innerHTML = `PAIKKA: ${battleState.playerState.checkpoint_name}`

  view_weapons()
}
function view_weapons() {
    weapons.innerHTML = '';
    console.log(battleState.weapons)
    for (let i = 0; i < battleState.weapons.length; i++) {

        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${battleState.weapons[i].name} (kestävyys: ${battleState.weapons[i].current_durability}, damage: ${battleState.weapons[i].damage})`;
        weapons.appendChild(option);

  }
}
async function runFightRound() {
  if (battleState.playerState.selectedWeapon.current_durability>0) {
    if (battleState.playerState.selectedWeapon.type ===
        battleState.enemy.weakness) {
      battleState.enemy.health -= 2 *
          battleState.playerState.selectedWeapon.damage;

    } else {
      battleState.enemy.health -= battleState.playerState.selectedWeapon.damage;
    }
    //hit
    enemy_health.innerHTML = `TERVEYS: ${battleState.enemy.health}`;
    battleState.playerState.selectedWeapon.current_durability -= 1;
  }
 //I need to renew weapons display
  view_weapons()

  if (battleState.enemy.health > 0) {

    battleModal.style.display = 'block';
    battleModalHeader.innerHTML = 'Vihollinen pysyi hengissä';
    battleModalDesc.innerHTML = `Hänellä on vielä voimaa ja hän hyökkää aiheuttaen ${battleState.enemy.damage} vahinkoa sinulle.`;
    btnModal.innerHTML = 'OK';
    btnModal.onclick = async function() {

      battleState.playerState.health -= battleState.enemy.damage;
      health.innerHTML = `TERVEYS: ${battleState.playerState.health}`;
      battleModal.style.display = 'none';
    };
    //enemy hit
    if (battleState.playerState.health < 1) {
      // modal 'sinä kuolit' to call save game
      battleModal.style.display = 'block';
      battleModalHeader.innerHTML = 'Sinä kuolit.';
      battleModalDesc.innerHTML = `Sait ${battleState.playerState.score} pistettä ja selvisit checkpointille ${battleState.playerState.current_checkpoint_id}. Voit aloittaa uuden pelin.`;
      btnModal.innerHTML = 'OK';
      btnModal.onclick = async function() {
        await save_data();
        window.location.href = `menu.html`;
        battleModal.style.display = 'none';
      };
    }
  } else {
    // enemy dead -> some pop up like modal in the store 'you can do futher'
    let pistePalkinto = 125
    battleState.playerState.score += pistePalkinto;
    //implement different Modal for end of game and if game continue
    if (battleState.playerState.current_checkpoint_id > battleState.last_checkpoint.id) {
      //game ended
      battleModal.style.display = 'block';
      get_joke().then(joke=>{battleModalHeader.innerHTML = `Viimeinen vihollinen on voitettu! Sait ${pistePalkinto} pistettä!<br><br>Vitsi: ${joke}`});
      battleModalDesc.innerHTML = '';
      btnModal.onclick = async function() {
        count_scores();
        await save_data();
        window.location.href = `results.html?game_id=${battleState.playerState.game_id}`;
        battleModal.style.display = 'none';}
    } else {
      battleModal.style.display = 'block';
      get_joke().then(joke=>{battleModalHeader.innerHTML = `Vihollinen on voitettu! Sait ${pistePalkinto} pistettä!<br><br>Vitsi: ${joke}`});
      battleModalDesc.innerHTML = 'Voit siirtyä eteenpäin.';
      btnModal.onclick = async function() {
      await save_data();
      window.location.href = `peli.html?username=${battleState.playerState.player}`;
      battleModal.style.display = 'none';
    };
    }
  }
}

async function save_data() {
  try {
    if (battleState.playerState.health>1) {
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
    }
    } catch (e) {
    console.log(e);
  }
}

async function get_joke () {
  try{
    const response=await fetch ('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single')
    const data=await response.json()
    const joke=data.joke
    return joke
  }catch (e) {
    console.log(e)
    return "The service is unavailable, check console"
  }
}

function count_scores() {
  battleState.food.forEach((item)=>{
    battleState.playerState.score += item.quantity * item.sale_value
  })
  battleState.food = []
  battleState.weapons.slice(1).forEach((weapon)=>{
    battleState.playerState.score += weapon.current_durability * (weapon.sale_value/weapon.durability)
  })
  battleState.weapons = []
}



