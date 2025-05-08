'use strict';

const game_results = document.querySelector('#game_results');
const button=document.querySelector('#back_to_menu')

document.addEventListener('DOMContentLoaded', async () => {
  const window_parameter = new URLSearchParams(window.location.search);
  const game_id = window_parameter.get('game_id');

  await getStats(game_id);
});


async function getStats(game_id) {
    const response = await fetch(
        `http://localhost:8000/best_scores/${game_id}`);
    const res_data = await response.json();


    for (let i = 0; i < res_data.length; i++) {
        const place=document.createElement('div');
        place.classList.add('place');
        const image=document.createElement('img');
        image.src='images/adventurechar.png';
        const line = document.createElement('div');
        line.textContent = `${res_data[i].place}. ${res_data[i].player_name} ${res_data[i].score}p`;
        place.appendChild(image);
        place.appendChild(line);
        game_results.appendChild(place);
    }
}

button.addEventListener('click',()=>{
    window.location.href = 'menu.html';
    })


