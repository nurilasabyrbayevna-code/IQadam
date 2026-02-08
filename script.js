const board = document.getElementById("board");
const currentPlayerSpan = document.getElementById("currentPlayer");
let selected = null;
let currentPlayer = "white"; 
const cells = [];

// Шылау тақырыбы сұрақтары
const questions = [
  {q: "Қай шылау дұрыс: да немесе де?", a: "да"},
  {q: "Қай шылау дұрыс: -ғы немесе -гі?", a: "-гі"},
  {q: "Қай шылау дұрыс: менің немесе меніңнің?", a: "менің"},
];

// 8x8 шашка тақтасы, 12+12 шашка
for(let i=0;i<64;i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    const row = Math.floor(i/8);
    const col = i%8;
    if((row+col)%2===0) cell.classList.add("white");
    else cell.classList.add("black");

    // Шашкаларды орналастыру
    if(row<3 && (row+col)%2!==0){ cell.classList.add("piece"); cell.dataset.color="black"; cell.textContent="●"; }
    if(row>4 && (row+col)%2!==0){ cell.classList.add("piece"); cell.dataset.color="white"; cell.textContent="○"; }

    board.appendChild(cell);
    cells.push(cell);
}

function askQuestion(){
    const index = Math.floor(Math.random()*questions.length);
    const ans = prompt(questions[index].q);
    return ans === questions[index].a;
}

// Жүріс жасау
board.addEventListener("click",(e)=>{
    const cell = e.target;
    if(!cell.classList.contains("cell")) return;

    // Шашка таңдау
    if(cell.classList.contains("piece") && cell.dataset.color === currentPlayer){
        if(selected) selected.style.border="";
        selected = cell;
        cell.style.border="2px solid red";
    } else if(selected && cell.classList.contains("black") && cell.textContent===""){
        if(!askQuestion()){
            alert("Қате жауап! Келесі ойыншыға ауысу.");
            selected.style.border="";
            selected = null;
            currentPlayer = currentPlayer === "white" ? "black" : "white";
            currentPlayerSpan.textContent = currentPlayer;
            return;
        }

        const fromIndex = cells.indexOf(selected);
        const toIndex = cells.indexOf(cell);
        const jumpIndex = Math.floor((fromIndex+toIndex)/2);
        const jumped = cells[jumpIndex];

        if(jumped && jumped.classList.contains("piece") && jumped.dataset.color !== selected.dataset.color){
            jumped.textContent="";
            jumped.classList.remove("piece");
            delete jumped.dataset.color;
        }

        cell.textContent = selected.textContent;
        cell.classList.add("piece");
        cell.dataset.color = selected.dataset.color;

        selected.textContent="";
        selected.classList.remove("piece");
        delete selected.dataset.color;
        selected.style.border="";
        selected=null;

        currentPlayer = currentPlayer === "white" ? "black" : "white";
        currentPlayerSpan.textContent = currentPlayer;
    }
});
