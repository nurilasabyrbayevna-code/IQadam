console.log("Интеллектуалды шашка Final Version жүктелді!");

const board = document.getElementById("board");
let score = 0;
let selectedPiece = null;

const questions = [
    { q: "Сұрақ 1: Қазақша дұрыс шылау қайсы?", a: "дұрыс жауап 1" },
    { q: "Сұрақ 2: Мысал дұрыс па?", a: "дұрыс жауап 2" }
];

const cells = [];
for (let i = 0; i < 64; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    const row = Math.floor(i / 8);
    const col = i % 8;
    if ((row + col) % 2 === 0) cell.classList.add("white");
    else cell.classList.add("black");

    if (row < 3 && (row + col) % 2 !== 0) { cell.classList.add("piece"); cell.dataset.color = "black"; cell.textContent = "●"; }
    else if (row > 4 && (row + col) % 2 !== 0) { cell.classList.add("piece"); cell.dataset.color = "white"; cell.textContent = "○"; }

    board.appendChild(cell);
    cells.push(cell);
}

board.addEventListener("click", (e) => {
    const cell = e.target;
    if (!cell.classList.contains("cell")) return;

    if (cell.classList.contains("piece")) {
        if (selectedPiece) selectedPiece.style.border = "";
        selectedPiece = cell;
        cell.style.border = "2px solid red";
    } else if (selectedPiece) {
        if (cell.classList.contains("black") && cell.textContent === "") {
            const fromIndex = cells.indexOf(selectedPiece);
            const toIndex = cells.indexOf(cell);
            const jumpedIndex = Math.floor((fromIndex + toIndex)/2);
            const jumped = cells[jumpedIndex];

            if (jumped && jumped.classList.contains("piece") && jumped.dataset.color !== selectedPiece.dataset.color) {
                jumped.textContent = "";
                jumped.classList.remove("piece");
                delete jumped.dataset.color;
                addPoint();
            }

            cell.textContent = selectedPiece.textContent;
            cell.classList.add("piece");
            cell.dataset.color = selectedPiece.dataset.color;

            selectedPiece.textContent = "";
            selectedPiece.classList.remove("piece");
            delete selectedPiece.dataset.color;
            selectedPiece.style.border = "";
            selectedPiece = null;

            askQuestion();
            checkDamka();
        }
    }
});

function askQuestion() {
    const index = Math.floor(Math.random() * questions.length);
    const userAnswer = prompt(questions[index].q);
    if (userAnswer === questions[index].a) { addPoint(); }
    else { alert("Қате! Ұпай қосылмады"); }
}

function addPoint() {
    score++;
    alert("Дұрыс жауап! Ұпай: " + score);
}

function checkDamka() {
    if (score >= 10) {
        alert("Дамка пайда болды! 👑");
        document.querySelectorAll(".piece").forEach(p => {
            if (p.dataset.color === "white") p.textContent = "♔";
        });
    }
}
