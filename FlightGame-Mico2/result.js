'use strict';

const game_results = document.querySelector('#game_results');

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
        const line = document.createElement('div')
        line.textContent = `${i+1} ${res_data[i].player_name} ${res_data[i].score}`
        game_results.appendChild(line)
    }
}




