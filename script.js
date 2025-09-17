let score = 0;
let failCount = 0;
const maxFail = 5;
const foods = [
  { type: "A", emoji: "🍎" },
  { type: "B", emoji: "🥦" }
];

function spawnFood() {
  if(failCount >= maxFail){
    document.getElementById("gameOver").textContent = "게임 오버! 😢";
    return;
  }

  const table = document.getElementById("table");
  table.innerHTML = ""; // 이전 음식 제거

  const foodData = foods[Math.floor(Math.random() * foods.length)];
  const food = document.createElement("div");
  food.textContent = foodData.emoji;
  food.className = "food";
  food.dataset.type = foodData.type;
  food.setAttribute("draggable", "true");

  food.style.left = "20px";
  food.style.top = "20px";

  food.addEventListener("dragstart", e => {
    e.dataTransfer.setData("type", food.dataset.type);
    e.dataTransfer.setData("id", Date.now().toString());
    food.id = e.dataTransfer.getData("id");
  });

  table.appendChild(food);
}

["charA","charB"].forEach(id => {
  const char = document.getElementById(id);
  char.addEventListener("dragover", e => e.preventDefault());
  char.addEventListener("drop", e => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const fid = e.dataTransfer.getData("id");
    const food = document.getElementById(fid);
    if(!food) return;

    if((id==="charA" && type==="A") || (id==="charB" && type==="B")){
      score++;
      document.getElementById("score").textContent = score;
    } else {
      failCount++;
      document.getElementById("failCount").textContent = failCount;
      if(failCount >= maxFail){
        document.getElementById("gameOver").textContent = "게임 오버! 😢";
      }
    }

    food.remove();
    spawnFood();
  });
});

spawnFood();
