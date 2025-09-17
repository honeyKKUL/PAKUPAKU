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

  // 랜덤 음식 생성
  const foodData = foods[Math.floor(Math.random() * foods.length)];
  const food = document.createElement("div");
  food.textContent = foodData.emoji;
  food.className = "food";
  food.dataset.type = foodData.type;
  food.setAttribute("draggable", "true");

  // table 안 중앙 위치 (원하면 style.css에서 table 위치로 조정)
  food.style.left = "20px";
  food.style.top = "20px";

  // 드래그 이벤트
  food.addEventListener("dragstart", e => {
    e.dataTransfer.setData("type", food.dataset.type);
    e.dataTransfer.setData("id", Date.now().toString());
    food.id = e.dataTransfer.getData("id");
  });

  table.appendChild(food);
}

// 캐릭터 drop 이벤트
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
    spawnFood(); // 다음 음식 바로 등장
  });
});

// 처음 음식 등장
spawnFood();
