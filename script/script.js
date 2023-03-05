
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')
const how = document.querySelector('.how');
const info = document.querySelector('.info');
const x = document.querySelector('.x')

const updateGame = (p1,p2,gameState) => {
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health
  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver
    result.innerText = game.declareWinner(game.isOver,p1,p2)
    return gameState
  } 
}
class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike (player, enemy, attackDmg) {
    let damageAmount = Math.ceil(Math.random() * attackDmg) 
    enemy.health -= damageAmount
    updateGame(p1,p2,gameState)
    return `${player.name} attacks ${enemy.name} for ${damageAmount}` 
  }
  // ** Heal the player for random number from  1 to 5 **
  heal (player) {
    let hpAmount = Math.ceil(Math.random() * 5)
    player.health += hpAmount
    updateGame(p1,p2,gameState)
    return `${player.name} heals for ${hpAmount} HP!`
  }
}

// ** Create the Game class with all it's attributes and methods to run a match **
class Game {
  constructor() {
    this.isOver = false;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver,p1, p2) {
    let message
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!`;
    }
    else if(isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!`
    } 
    console.log(isOver, p1.health, p2.health)
    document.getElementById('victory').play()
    return message
  }
  reset(p1,p2) {
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = ''
    updateGame(p1,p2)
  }
  
  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    this.reset(p1, p2);
    while (!this.isOver) {
      p1.strike(p1,p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2,p1, p2.attackDmg);
      p1.heal(p1)
    }
    return this.declareWinner(this.isOver,p1,p2);
  }
}
let player1 = new Player('Josh', 100, 15)
let player2 = new Player('Kile', 100, 15)
let p1 = player1
let p2 = player2
let game = new Game();
updateGame(p1,p2)
let gameState = game.isOver
play.onclick = () => result.innerText = game.play(p1,p2);



// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  if (e.key == "q" && p2.health > 0 && game.isOver == false ){
    p1.strike(p1, p2, p1.attackDmg)
    // After striking then play attack sound
    document.getElementById('p1attack').play();
  }
});

document.addEventListener('keydown', function(e) {
    // if you press a AND the player health is greater than 0 AND isOver is still false then strike()
  if (e.key == "a" && p2.health > 0 ){
   p1.heal(p1)
    // After healing then play heal sound
   document.getElementById('p1heal').play();
  }
});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if (e.key == "p" && p1.health > 0 && game.isOver == false ){
    p2.strike(p2, p1, p2.attackDmg)
    // After striking then play attack sound
    document.getElementById('p2attack').play();
  }
});

document.addEventListener('keydown', function(e) {
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()
  if (e.key == "l" && p2.health > 0 ){
    // After healing then play heal sound
   player2.heal(p2)
  document.getElementById('p2heal').play();
  }
});


how.onclick = () =>{
  info.style.display="block";
}

x.onclick =()=>{
  info.style.display="none";
}