const teams = [
    {
        Image: 'images/arsenal.jpeg',
        name: 'Arsenal',
        fouls: 0,
        points: 0
    },
    {
        Image: 'images/chelsea.jpeg',
        name: 'Chelsea',
        fouls: 0,
        points: 0
    },
    {
        Image: 'images/liverpool.jpeg',
        name: 'Liverpool',
        fouls: 0,
        points: 0
    },
    {
        Image: 'images/real_madrid.jpeg',
        name: 'Real Madrid',
        fouls: 0,
        points: 0
    },
    {
        Image: 'images/manchester_city.jpeg',
        name: 'Manchester City',
        fouls: 0,
        points: 0
    },
    {
        Image: 'images/barcelona.jpeg',
        name: 'Barcelona',
        fouls: 0,
        points: 0
    },
    {
        Image: 'images/bayern_munich.jpeg',
        name: 'Bayern Munich',
        fouls: 0,
        points: 0
    },
    {
        Image: 'images/paris_saint_germain.jpeg',
        name: 'Paris Saint-Germain',
        fouls: 0,
        points: 0
    },
    {
        Image: 'images/tottenham_hotspur.jpeg',
        name: 'Tottenham Hotspur',
        fouls: 0,
        points: 0
    },
    {
        Image: 'images/inter.jpeg',
        name: 'Inter Milan',
        fouls: 0,
        points: 0
    }
];

const tableBody = document.querySelector('#classificaTableBody');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function renderTable() {
    tableBody.innerHTML = '';
    for (team of teams) {
        team.fouls = getRandomInt(0, 10);
        team.points = getRandomInt(0, 30);
    }

    teams.sort((a, b) => a.fouls - b.fouls);//sort teams 

    for (team of teams) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="d-flex align-items-center gap-4"> <div class="image-logo"><img src="${team.Image}" alt=""></div>${team.name}</td>
            <td class="align-middle">${team.fouls}</td>
            <td class="align-middle">${team.points}</td>
            <td class="align-middle"></td>
        `;
        tableBody.appendChild(row);
    }
}
renderTable();