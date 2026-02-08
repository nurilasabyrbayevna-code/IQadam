const board = document.getElementById("board");
const currentPlayerSpan = document.getElementById("currentPlayer");
const questionModal = document.getElementById("questionModal");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");

let selected = null;
let currentPlayer = "white"; 
const cells = [];

// Шылау сұрақтары
const questions = [
  {q: "Қай шылау дұрыс?", options:["да","де"], a: "да"},
  {q: "Қай шылау дұрыс?", options:["-ғы","-гі"], a: "-гі"},
  {q: "Қай шылау дұрыс?", options:["менің","меніңнің"], a: "менің"},
];

// Модаль сұрақ көрсету функциясы
function askQuestion(callback){
    const index = Math.floor(Math.random()*questions.length);
    const q = questions[index];
    questionText.textContent = q.q;
    optionsDiv.innerHTML = '';
    q.options.forEach(opt=>{
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = ()=>{
            questionModal.classList.add("hidden");
            if(opt===q.a){
                alert("Дұрыс жауап! Жүріс жасауға болады.");
                callback(true);
            } else {
                alert("Қате жауап! Келесі ойыншыға ауысу.");
                callback(false);
            }
        };
        optionsDiv.appendChild(btn);
    });
    questionModal.classList.remove("hidden");
}

// 8x8 шашка тақтасы, 12+12 шашка
for(let i=0;i<64;i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    const row = Math.floor(i/8);
    const col = i%8;
    if((row+col)%2===0) cell.classList.add("white");
    else cell.classList.add("black");

    if(row<3 && (row+col)%2!==0){ cell.classList.add("piece"); cell.dataset.color="black"; cell.textContent="●"; }
    if(row>4 && (row+col)%2!==0){ cell.classList.add("piece"); cell.dataset.color="white"; cell.textContent="○"; }

    board.appendChild(cell);
    cells.push(cell);
}

board.addEventListener("click",(e)=>{
    const cell = e.target;
    if(!cell.classList.contains("cell")) return;

    if(cell.classList.contains("piece") && cell.dataset.color === currentPlayer){
        if(selected) selected.style.border="";
        selected = cell;
        cell.style.border="2px solid red";
    } else if(selected && cell.classList.contains("black") && cell.textContent===""){
        askQuestion((correct)=>{
            if(!correct){
                selected.style.border="";
                selected=null;
                currentPlayer = currentPlayer==="white" ? "black" : "white";
                currentPlayerSpan.textContent=currentPlayer;
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

            currentPlayer = currentPlayer==="white" ? "black" : "white";
            currentPlayerSpan.textContent=currentPlayer;
        });
    }
});
