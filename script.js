const board = document.getElementById("board");
const currentPlayerSpan = document.getElementById("currentPlayer");
const questionModal = document.getElementById("questionModal");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");

let selected = null;
let currentPlayer = "white"; 
const cells = [];

// 24 шашкаға 24 бірегей сұрақ
const pieceQuestions = {
  "white":[
    {q:"'да' немесе 'де' қайсысы дұрыс? Мысалы: Мен де барамын.", options:["да","де","бірақ"], a:"де"},
    {q:"'мен' немесе 'және' қайсысы дұрыс? Мысалы: Мен мен досым бірге келдік.", options:["мен","және","бірақ"], a:"мен"},
    {q:"'үшін' немесе 'үшінде' қайсысы дұрыс? Мысалы: Оқу үшін уақыт керек.", options:["үшін","үшінде","үш"], a:"үшін"},
    {q:"'сол' немесе 'солы' қайсысы дұрыс? Мысалы: Сол адам дұрыс айтты.", options:["сол","солы","бұл"], a:"сол"},
    {q:"'пен' немесе 'бен' қайсысы дұрыс? Мысалы: Апай мен бала бірге отыр.", options:["бен","пен","және"], a:"пен"},
    {q:"'арқылы' немесе 'арқасында' қайсысы дұрыс? Мысалы: Мектеп арқылы өттік.", options:["арқылы","арқасында","арқасы"], a:"арқылы"},
    {q:"'және' немесе 'немесе' қайсысы дұрыс? Мысалы: Қалам мен дәптерді алдым.", options:["және","немесе","бірақ"], a:"және"},
    {q:"'дейін' немесе 'дейінгі' қайсысы дұрыс? Мысалы: Сабақ сағат 10 дейін.", options:["дейін","дейінгі","дейінсе"], a:"дейін"},
    {q:"'басы' немесе 'басың' қайсысы дұрыс? Мысалы: Кітап басында маңызды сөз бар.", options:["басы","басың","басысы"], a:"басы"},
    {q:"'болса' немесе 'бола' қайсысы дұрыс? Мысалы: Егер мүмкіндік болса, барғым келеді.", options:["болса","бола","бол"], a:"болса"},
    {q:"'сайын' немесе 'сайындық' қайсысы дұрыс? Мысалы: Оқушы сабақ сайын келеді.", options:["сайын","сайындық","сайыншы"], a:"сайын"},
    {q:"'ішінде' немесе 'ішіндегі' қайсысы дұрыс? Мысалы: Қораптың ішінде ойыншық бар.", options:["ішінде","ішіндегі","ішін"], a:"ішінде"}
  ],
  "black":[
    {q:"'сияқты' немесе 'сияқтысы' қайсысы дұрыс? Мысалы: Ол мен сияқты ойлайды.", options:["сияқты","сияқтысы","сияқтылар"], a:"сияқты"},
    {q:"'осылай' немесе 'солай' қайсысы дұрыс? Мысалы: Мынау осылай жасалады.", options:["осылай","солай","былай"], a:"осылай"},
    {q:"'қосымша' немесе 'қосыма' қайсысы дұрыс? Мысалы: Мәтінге қосымша ақпарат берілді.", options:["қосымша","қосыма","қосым"], a:"қосымша"},
    {q:"'арасында' немесе 'арасындағы' қайсысы дұрыс? Мысалы: Досым мен менің арамда пікір келіспеушілік болды.", options:["арасында","арасындағы","арасындасы"], a:"арасында"},
    {q:"'барлық' немесе 'бәрі' қайсысы дұрыс? Мысалы: Барлық оқушылар сабаққа келді.", options:["барлық","бәрі","бәріде"], a:"барлық"},
    {q:"'бірге' немесе 'біргелік' қайсысы дұрыс? Мысалы: Біз бірге жұмыс жасадық.", options:["бірге","біргелік","бірлік"], a:"бірге"},
    {q:"'бірақ' немесе 'және' қайсысы дұрыс? Мысалы: Мен келдім, бірақ сабақ басталды.", options:["бірақ","және","немесе"], a:"бірақ"},
    {q:"'солай' немесе 'осылай' қайсысы дұрыс? Мысалы: Ол солай істеді.", options:["солай","осылай","былай"], a:"солай"},
    {q:"'осы' немесе 'сол' қайсысы дұрыс? Мысалы: Осы кітап қызықты.", options:["осы","сол","бұл"], a:"осы"},
    {q:"'арқасында' немесе 'арқылы' қайсысы дұрыс? Мысалы: Мектептің арқасында көп нәрсе үйрендім.", options:["арқасында","арқылы","арқасы"], a:"арқасында"},
    {q:"'жөнінде' немесе 'жөніндегі' қайсысы дұрыс? Мысалы: Сабақ жоспары туралы әңгімелестік.", options:["жөнінде","жөніндегі","жөніндесы"], a:"жөнінде"},
    {q:"'тек' немесе 'ғана' қайсысы дұрыс? Мысалы: Бұл тапсырманы тек сен орындауың керек.", options:["тек","ғана","тек қана"], a:"тек"}
  ]
};

// Модаль сұрақ көрсету
function askQuestion(pieceColor, pieceIndex, callback){
    const q = pieceQuestions[pieceColor][pieceIndex];
    questionText.textContent = q.q;
    optionsDiv.innerHTML = '';
    q.options.forEach(opt=>{
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = ()=>{
            questionModal.classList.add("hidden");
            callback(opt===q.a);
        };
        optionsDiv.appendChild(btn);
    });
    questionModal.classList.remove("hidden");
}

// 8x8 шашка тақтасы
let whiteCounter = 0;
let blackCounter = 0;

for(let i=0;i<64;i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    const row = Math.floor(i/8);
    const col = i%8;
    if((row+col)%2===0) cell.classList.add("white");
    else cell.classList.add("black");

    if(row<3 && (row+col)%2!==0){
        cell.classList.add("piece"); cell.dataset.color="black"; 
        cell.dataset.index=blackCounter; cell.textContent="●"; blackCounter++;
    }
    if(row>4 && (row+col)%2!==0){
        cell.classList.add("piece"); cell.dataset.color="white"; 
        cell.dataset.index=whiteCounter; cell.textContent="○"; whiteCounter++;
    }

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
        const pieceColor = selected.dataset.color;
        const pieceIndex = parseInt(selected.dataset.index);

        askQuestion(pieceColor, pieceIndex, (correct)=>{
            if(!correct){
                alert("Қате жауап! Келесі ойыншыға ауысу.");
                selected.style.border="";
                selected=null;
                currentPlayer = currentPlayer==="white" ? "black" : "white";
                currentPlayerSpan.textContent=currentPlayer;
                return;
            }

            // Жүріс жасау
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
            cell.dataset.index = selected.dataset.index;

            selected.textContent="";
            selected.classList.remove("piece");
            delete selected.dataset.color;
            delete selected.dataset.index;
            selected.style.border="";
            selected=null;

            currentPlayer = currentPlayer==="white" ? "black" : "white";
            currentPlayerSpan.textContent=currentPlayer;
        });
    }
});
