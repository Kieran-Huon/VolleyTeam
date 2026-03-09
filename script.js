

// let players = []
// let selectedPlayers = []

// fetch('players.json')
// .then(res => res.json())
// .then(data => {
// players = data
// displayPlayers()
// })

// function displayPlayers(){

// const container = document.getElementById("playersList")
// container.innerHTML=""

// players.forEach((p,i)=>{

// const div = document.createElement("div")
// div.className="player"

// // div.innerHTML = `
// // <label class="player-label">
// // <input type="checkbox" value="${i}">
// // <span>${p.name}</span>
// // <span class="poste">${p.poste}</span>
// // </label>
// // `
// div.innerHTML = `
// <label class="player-label">
// <input type="checkbox" value="${i}">
// <div class="player-name">${p.name}</div>
// <div class="poste">${p.poste}</div>
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

// if(selectedPlayers.length < 4){
// alert("Pas assez de joueurs")
// return
// }

// generateTeams()

// document.getElementById("regenBtn").style.display="block"

// }

// document.getElementById("regenBtn").onclick = generateTeams



// function calculateTeams(playerCount){

// const options = [2,4,6,8]

// let bestTeams = 2
// let bestScore = -Infinity

// options.forEach(t=>{

// let size = playerCount / t

// if(size > 6) return

// let score = size

// if(size >= 4) score += 5
// if(size >= 5) score += 5

// if(score > bestScore){
// bestScore = score
// bestTeams = t
// }

// })

// return bestTeams

// }



// function generateTeams(){

// const teamsContainer = document.getElementById("teams")
// teamsContainer.innerHTML=""

// let shuffled = [...selectedPlayers].sort(()=>Math.random()-0.5)

// let teamCount = calculateTeams(selectedPlayers.length)

// let teams = Array.from({length:teamCount}, ()=>[])

// shuffled.forEach((player,i)=>{
// teams[i % teamCount].push(player)
// })

// teams.forEach((team,i)=>{

// const div = document.createElement("div")
// div.className="team"

// let html = `<h2>Equipe ${i+1}</h2>`

// team.forEach(p=>{
// html += `<div class="playerTeam">${p.name} <span>${p.poste}</span></div>`
// })

// div.innerHTML = html

// teamsContainer.appendChild(div)

// })

// }

let players = []
let selectedPlayers = []

fetch('players.json')
.then(res => res.json())
.then(data=>{
players = data
displayPlayers()
})

function displayPlayers(){

const container = document.getElementById("playersList")
container.innerHTML=""

players.forEach((p,i)=>{

const div = document.createElement("div")
div.className="player"

div.innerHTML=`
<label class="player-label">
<input type="checkbox" value="${i}">
<div class="player-name">${p.name}</div>
<div class="poste">${p.poste}</div>
</label>
`

container.appendChild(div)

})

}

/* recherche */

document.getElementById("search").addEventListener("input",function(){

const value = this.value.toLowerCase()

document.querySelectorAll(".player").forEach(player=>{

const text = player.innerText.toLowerCase()

player.style.display = text.includes(value) ? "block" : "none"

})

})

/* select all */

document.getElementById("selectAll").onclick=()=>{

document.querySelectorAll("#playersList input").forEach(c=>{
c.checked=true
})

}

/* deselect */

document.getElementById("deselectAll").onclick=()=>{

document.querySelectorAll("#playersList input").forEach(c=>{
c.checked=false
})

}


/* génération */

document.getElementById("generateBtn").onclick=()=>{

selectedPlayers=[]

document.querySelectorAll("#playersList input:checked").forEach(c=>{
selectedPlayers.push(players[c.value])
})

if(selectedPlayers.length < 4){
alert("Pas assez de joueurs")
return
}

generateTeams()

document.getElementById("regenBtn").style.display="block"

}

document.getElementById("regenBtn").onclick=generateTeams


function calculateTeams(playerCount){

const options=[2,4,6,8]

let bestTeams=2
let bestScore=-Infinity

options.forEach(t=>{

let size=playerCount/t

if(size>6) return

let score=size

if(size>=4) score+=5
if(size>=5) score+=5

if(score>bestScore){
bestScore=score
bestTeams=t
}

})

return bestTeams

}


function generateTeams(){

const teamsContainer=document.getElementById("teams")
teamsContainer.innerHTML=""

let shuffled=[...selectedPlayers].sort(()=>Math.random()-0.5)

let teamCount=calculateTeams(selectedPlayers.length)

let teams=Array.from({length:teamCount},()=>[])

shuffled.forEach((player,i)=>{
teams[i%teamCount].push(player)
})

teams.forEach((team,i)=>{

const div=document.createElement("div")
div.className="team"

let html=`<h2>Equipe ${i+1}</h2>`

team.forEach(p=>{
html+=`<div class="playerTeam">${p.name} <span>${p.poste}</span></div>`
})

div.innerHTML=html

teamsContainer.appendChild(div)

})

}