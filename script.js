let players = []
let selectedPlayers = []

fetch('players.json')
.then(res => res.json())
.then(data => {
players = data
console.log(players)
displayPlayers()
})

function displayPlayers(){

const container = document.getElementById("playersList")

players.forEach((p,i)=>{

const div = document.createElement("div")
div.className="player"

div.innerHTML = `
<label>
<input type="checkbox" value="${i}">
${p.name} (${p.poste})
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

generateTeams()

document.getElementById("regenBtn").style.display="block"

}

document.getElementById("regenBtn").onclick = generateTeams

function generateTeams(){

const teamsContainer = document.getElementById("teams")
teamsContainer.innerHTML=""

let shuffled = [...selectedPlayers].sort(()=>Math.random()-0.5)

let teamCount = 2

if(selectedPlayers.length >= 12) teamCount = 4
if(selectedPlayers.length >= 18) teamCount = 6

let teams = Array.from({length:teamCount}, ()=>[])

shuffled.forEach((player,i)=>{
teams[i % teamCount].push(player)
})

teams.forEach((team,i)=>{

const div = document.createElement("div")
div.className="team"

div.innerHTML = `<h2>Equipe ${i+1}</h2>`

team.forEach(p=>{
div.innerHTML += `<p>${p.name} (${p.poste})</p>`
})

teamsContainer.appendChild(div)

})


}