let score = 0;
const foods = [
  { type: "A", emoji: "🍎" },
  { type: "B", emoji: "🥦" }
];

function spawnFood() {
  const table = document.getElementById("table");
  // 랜덤 음식 선택
  const foodData = foods[Math.floor(Math.random() * foods.length)];
  const food = document.createElement("div");
  food.textContent = foodData.emoji;
  food.className = "food";
  food.dataset.type = foodData.type;
  food.setAttribute("draggable", "true");
  food.style.left = Math.random() * 80 + "%";
  food.style.top = Math.random() * 100 + "px";

  // 드래그 이벤트
  food.addEventListener("dragstart", e => {
    e.dataTransfer.setData("type", food.dataset.type);
    e.dataTransfer.setData("id", Date.now().toString());
    food.id = e.dataTransfer.getData("id");
  });

  table.appendChild(food);
}

// 캐릭터 drop 이벤트
["charA", "charB"].forEach(id => {
  const char = document.getElementById(id);
  char.addEventListener("dragover", e => e.preventDefault());
  char.addEventListener("drop", e => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const fid = e.dataTransfer.getData("id");
    const food = document.getElementById(fid);
    if (!food) return;

    // 정답 판정
    if ((id === "charA" && type === "A") || (id === "charB" && type === "B")) {
      score++;
      alert("정답! 점수 +1");
      food.remove();
      document.getElementById("score").textContent = score;
    } else {
      alert("틀렸어요! 😢");
      food.remove();
    }
  });
});