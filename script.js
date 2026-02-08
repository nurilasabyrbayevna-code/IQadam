const board = document.getElementById("board");
let selected = null;
const cells = [];

// 8x8 шашка тақтасы
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

// Шашка таңдау және жылжыту
board.addEventListener("click",(e)=>{
    const cell = e.target;
    if(!cell.classList.contains("cell")) return;

    if(cell.classList.contains("piece")){
        if(selected) selected.style.border="";
        selected = cell;
        cell.style.border="2px solid red";
    } else if(selected && cell.classList.contains("black") && cell.textContent===""){
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
    }
});
