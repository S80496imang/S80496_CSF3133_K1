// Game state variables
let gameStarted = false;
let playerNameValue = "";
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Starts the game after validating player name
function startGame() {
  const input = document.getElementById("playerName");
  const name = input.value.trim();

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  playerNameValue = name;
  gameStarted = true;

  document.getElementById("welcomeMsg").innerHTML = "Welcome, " + playerNameValue + "!";
  document.getElementById("startTime").innerHTML = "Started at: " + new Date();
}

// Randomly selects rock, paper, or scissors
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Plays one round and updates images, score, colour, and history table
function playRound(playerChoice) {
  if (!gameStarted) {
    alert("Click Start Game first.");
    return;
  }

  const computerChoice = getComputerChoice();
  roundCount++;

  // Update both choice images
  document.getElementById("playerImg").src = playerChoice + ".png";
  document.getElementById("computerImg").src = computerChoice + ".png";

  let outcomeText = "";
  let recordResult = "";
  let colour = "";

  // Decide winner using if...else
  if (playerChoice === computerChoice) {
    outcomeText = "Draw! Both chose " + playerChoice + ".";
    recordResult = "Draw";
    colour = "grey";
    draws++;
    document.getElementById("draws").innerHTML = draws;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    outcomeText = "You Win! " + playerChoice + " beats " + computerChoice + ".";
    recordResult = "Win";
    colour = "green";
    wins++;
    document.getElementById("wins").innerHTML = wins;
  } else {
    outcomeText = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
    recordResult = "Lose";
    colour = "red";
    losses++;
    document.getElementById("losses").innerHTML = losses;
  }

  // Update result text and colour
  const resultEl = document.getElementById("result");
  resultEl.innerHTML = outcomeText;
  resultEl.style.color = colour;

  // Store result in array and append row to history table
  results.push(recordResult);
  const tbody = document.querySelector("#history tbody");
  tbody.innerHTML +=
    "<tr>" +
    "<td>" + roundCount + "</td>" +
    "<td>" + playerChoice + "</td>" +
    "<td>" + computerChoice + "</td>" +
    "<td style='color:" + colour + ";font-weight:bold;'>" + recordResult + "</td>" +
    "</tr>";
}

// Counts wins with a for loop and shows total rounds and rounded win percentage
function showSummary() {
  let winCount = 0;

  for (let i = 0; i < results.length; i++) {
    if (results[i] === "Win") {
      winCount++;
    }
  }

  const totalRounds = results.length;
  const percentage = totalRounds > 0 ? Math.round((winCount / totalRounds) * 100) : 0;
  const summaryMessage = "You played " + totalRounds + " rounds and won " + percentage + "%.";

  document.getElementById("summary").innerHTML = summaryMessage;
  alert(summaryMessage);
}

// Resets scores, results array, table rows, and messages
function resetGame() {
  wins = 0;
  losses = 0;
  draws = 0;
  roundCount = 0;
  results = [];

  document.getElementById("wins").innerHTML = 0;
  document.getElementById("losses").innerHTML = 0;
  document.getElementById("draws").innerHTML = 0;
  document.getElementById("result").innerHTML = "";
  document.getElementById("summary").innerHTML = "";
  document.querySelector("#history tbody").innerHTML = "";
}