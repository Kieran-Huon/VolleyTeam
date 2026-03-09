// let players = []
// let selectedPlayers = []

// fetch('players.json')
// .then(res => res.json())
// .then(data => {
// players = data
// console.log(players)
// displayPlayers()
// })

// function displayPlayers(){

// const container = document.getElementById("playersList")

// players.forEach((p,i)=>{

// const div = document.createElement("div")
// div.className="player"

// div.innerHTML = `
// <label>
// <input type="checkbox" value="${i}">
// ${p.name} (${p.poste})
// </label>
// `

// container.appendChild(div)

// })

// }

// document.getElementById("generateBtn").onclick = ()=>{

// selectedPlayers = []

// document.querySelectorAll("input[type=checkbox]:checked").forEach(c=>{
// selectedPlayers.push(players[c.value])
// })

// generateTeams()

// document.getElementById("regenBtn").style.display="block"

// }

// document.getElementById("regenBtn").onclick = generateTeams

// function generateTeams(){

// const teamsContainer = document.getElementById("teams")
// teamsContainer.innerHTML=""

// let shuffled = [...selectedPlayers].sort(()=>Math.random()-0.5)

// let teamCount = 2

// if(selectedPlayers.length >= 12) teamCount = 4
// if(selectedPlayers.length >= 18) teamCount = 6

// let teams = Array.from({length:teamCount}, ()=>[])

// shuffled.forEach((player,i)=>{
// teams[i % teamCount].push(player)
// })

// teams.forEach((team,i)=>{

// const div = document.createElement("div")
// div.className="team"

// div.innerHTML = `<h2>Equipe ${i+1}</h2>`

// team.forEach(p=>{
// div.innerHTML += `<p>${p.name} (${p.poste})</p>`
// })

// teamsContainer.appendChild(div)

// })


// }

let players = []
let selectedPlayers = []

fetch('players.json')
.then(res => res.json())
.then(data => {
players = data
displayPlayers()
})

function displayPlayers(){

const container = document.getElementById("playersList")
container.innerHTML=""

players.forEach((p,i)=>{

const div = document.createElement("div")
div.className="player"

div.innerHTML = `
<label class="player-label">
<input type="checkbox" value="${i}">
<span>${p.name}</span>
<span class="poste">${p.poste}</span>
</label>
`

container.appendChild(div)

})

}

document.getElementById("generateBtn").onclick = ()=>{

selectedPlayers = []

document.querySelectorAll("input[type=checkbox]:checked").forEach(c=>{
selectedPlayers.push(players[c.value])
})

if(selectedPlayers.length < 4){
alert("Pas assez de joueurs")
return
}

generateTeams()

document.getElementById("regenBtn").style.display="block"

}

document.getElementById("regenBtn").onclick = generateTeams



function calculateTeams(playerCount){

const options = [2,4,6,8]

let bestTeams = 2
let bestScore = -Infinity

options.forEach(t=>{

let size = playerCount / t

if(size > 6) return

let score = size

if(size >= 4) score += 5
if(size >= 5) score += 5

if(score > bestScore){
bestScore = score
bestTeams = t
}

})

return bestTeams

}



function generateTeams(){

const teamsContainer = document.getElementById("teams")
teamsContainer.innerHTML=""

let shuffled = [...selectedPlayers].sort(()=>Math.random()-0.5)

let teamCount = calculateTeams(selectedPlayers.length)

let teams = Array.from({length:teamCount}, ()=>[])

shuffled.forEach((player,i)=>{
teams[i % teamCount].push(player)
})

teams.forEach((team,i)=>{

const div = document.createElement("div")
div.className="team"

let html = `<h2>Equipe ${i+1}</h2>`

team.forEach(p=>{
html += `<div class="playerTeam">${p.name} <span>${p.poste}</span></div>`
})

div.innerHTML = html

teamsContainer.appendChild(div)

})

}