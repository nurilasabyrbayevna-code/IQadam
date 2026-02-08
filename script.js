{\rtf1\ansi\ansicpg1251\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // --- \uc0\u1055 \u1077 \u1088 \u1077 \u1084 \u1077 \u1085 \u1085 \u1099 \u1077  ---\
const board = document.getElementById("board");\
let selectedPiece = null;\
let cells = [];\
let currentPlayer = 1;\
let score1 = 0;\
let score2 = 0;\
\
// --- \uc0\u1054 \u1085 \u1083 \u1072 \u1081 \u1085  \u1079 \u1074 \u1091 \u1082 \u1080  ---\
const sounds = \{\
  correct: new Audio("https://www.soundjay.com/button/sounds/button-3.mp3"),\
  wrong:   new Audio("https://www.soundjay.com/button/sounds/button-10.mp3"),\
  move:    new Audio("https://www.soundjay.com/button/sounds/button-16.mp3"),\
  king:    new Audio("https://www.soundjay.com/button/sounds/button-09.mp3")\
\};\
\
// --- \uc0\u1041 \u1072 \u1079 \u1086 \u1074 \u1099 \u1077  \u1074 \u1086 \u1087 \u1088 \u1086 \u1089 \u1099  ---\
const baseQuestions = [\
  "\'ab\uc0\u1199 \u1096 \u1110 \u1085 \'bb \u1096 \u1099 \u1083 \u1072 \u1091 \u1099 \u1085 \u1099 \u1187  \u1179 \u1099 \u1079 \u1084 \u1077 \u1090 \u1110  \u1179 \u1072 \u1085 \u1076 \u1072 \u1081 ?",\
  "\'ab\uc0\u1171 \u1072 \u1085 \u1072 \'bb \u1096 \u1099 \u1083 \u1072 \u1091 \u1099  \u1179 \u1072 \u1085 \u1076 \u1072 \u1081  \u1084 \u1072 \u1171 \u1099 \u1085 \u1072  \u1073 \u1077 \u1088 \u1077 \u1076 \u1110 ?",\
  "\'ab\uc0\u1073 \u1110 \u1088 \u1072 \u1179 \'bb \u1179 \u1072 \u1081  \u1096 \u1099 \u1083 \u1072 \u1091  \u1090 \u1199 \u1088 \u1110 \u1085 \u1077  \u1078 \u1072 \u1090 \u1072 \u1076 \u1099 ?",\
  "\'ab\uc0\u1078 \u1241 \u1085 \u1077 \'bb \u1089 \u1257 \u1081 \u1083 \u1077 \u1084 \u1076 \u1077  \u1085 \u1077  \u1110 \u1089 \u1090 \u1077 \u1081 \u1076 \u1110 ?"\
];\
\
// --- AI \uc0\u1075 \u1077 \u1085 \u1077 \u1088 \u1072 \u1094 \u1080 \u1103  \u1074 \u1086 \u1087 \u1088 \u1086 \u1089 \u1086 \u1074  ---\
function generateAIQuestion() \{\
  const templates = [\
    "\'ab\{w\}\'bb \uc0\u1096 \u1099 \u1083 \u1072 \u1091 \u1099  \u1179 \u1072 \u1085 \u1076 \u1072 \u1081  \u1084 \u1072 \u1171 \u1099 \u1085 \u1072  \u1073 \u1077 \u1088 \u1077 \u1076 \u1110 ?",\
    "\'ab\{w\}\'bb \uc0\u1179 \u1072 \u1081  \u1090 \u1086 \u1087 \u1179 \u1072  \u1078 \u1072 \u1090 \u1072 \u1076 \u1099 ?",\
    "\'ab\{w\}\'bb \uc0\u1089 \u1257 \u1081 \u1083 \u1077 \u1084 \u1076 \u1077  \u1179 \u1072 \u1085 \u1076 \u1072 \u1081  \u1179 \u1099 \u1079 \u1084 \u1077 \u1090  \u1072 \u1090 \u1179 \u1072 \u1088 \u1072 \u1076 \u1099 ?"\
  ];\
  const words = ["\uc0\u1076 \u1072 ","\u1076 \u1077 ","\u1090 \u1072 ","\u1090 \u1077 ","\u1199 \u1096 \u1110 \u1085 ","\u1171 \u1072 \u1085 \u1072 ","\u1073 \u1110 \u1088 \u1072 \u1179 ","\u1078 \u1241 \u1085 \u1077 ","\u1085 \u1077 \u1084 \u1077 \u1089 \u1077 "];\
  const w = words[Math.floor(Math.random() * words.length)];\
  const t = templates[Math.floor(Math.random() * templates.length)];\
  return t.replace("\{w\}", w);\
\}\
\
// --- \uc0\u1057 \u1086 \u1079 \u1076 \u1072 \u1085 \u1080 \u1077  \u1076 \u1086 \u1089 \u1082 \u1080  ---\
for (let r = 0; r < 8; r++) \{\
  for (let c = 0; c < 8; c++) \{\
    const cell = document.createElement("div");\
    cell.className = ((r + c) % 2 === 1) ? "cell dark" : "cell light";\
    cell.dataset.row = r;\
    cell.dataset.col = c;\
    cell.onclick = () => moveHere(cell);\
    board.appendChild(cell);\
    cells.push(cell);\
  \}\
\}\
\
function getCell(r, c) \{\
  return cells.find(x => x.dataset.row == r && x.dataset.col == c);\
\}\
\
// --- \uc0\u1056 \u1072 \u1079 \u1084 \u1077 \u1097 \u1077 \u1085 \u1080 \u1077  \u1096 \u1072 \u1096 \u1077 \u1082  ---\
function placePiece(r, c, player) \{\
  const piece = document.createElement("div");\
  piece.className = "piece";\
  piece.dataset.player = player;\
  piece.onclick = (e) => selectPiece(e, piece);\
  getCell(r, c).appendChild(piece);\
\}\
\
// \uc0\u1053 \u1072 \u1095 \u1072 \u1083 \u1100 \u1085 \u1072 \u1103  \u1088 \u1072 \u1089 \u1089 \u1090 \u1072 \u1085 \u1086 \u1074 \u1082 \u1072  \u1096 \u1072 \u1096 \u1077 \u1082 \
for (let r = 0; r < 3; r++)\
  for (let c = 0; c < 8; c++)\
    if ((r + c) % 2 === 1) placePiece(r, c, 2);\
\
for (let r = 5; r < 8; r++)\
  for (let c = 0; c < 8; c++)\
    if ((r + c) % 2 === 1) placePiece(r, c, 1);\
\
// --- \uc0\u1042 \u1099 \u1073 \u1086 \u1088  \u1096 \u1072 \u1096 \u1082 \u1080  ---\
function selectPiece(e, piece) \{\
  e.stopPropagation();\
  if (piece.dataset.player != currentPlayer) return;\
  selectedPiece = piece;\
  piece.style.outline = "3px solid yellow";\
\}\
\
// --- \uc0\u1061 \u1086 \u1076  ---\
function moveHere(cell) \{\
  if (!selectedPiece) return;\
\
  askQuestion(() => \{\
    const fromCell = selectedPiece.parentElement;\
    animateMove(selectedPiece, fromCell, cell);\
    sounds.move.play(); // \uc0\u1079 \u1074 \u1091 \u1082  \u1093 \u1086 \u1076 \u1072 \
\
    const fr = +fromCell.dataset.row;\
    const fc = +fromCell.dataset.col;\
    const tr = +cell.dataset.row;\
    const tc = +cell.dataset.col;\
\
    // \uc0\u1057 \u1098 \u1077 \u1076 \u1072 \u1077 \u1084  \u1096 \u1072 \u1096 \u1082 \u1091  \u1077 \u1089 \u1083 \u1080  \u1077 \u1089 \u1090 \u1100 \
    if (Math.abs(fr - tr) == 2) \{\
      const midCell = getCell((fr + tr) / 2, (fc + tc) / 2);\
      if (midCell.firstChild) \{\
        midCell.removeChild(midCell.firstChild);\
        if (currentPlayer == 1) score1++; else score2++;\
      \}\
    \}\
\
    setTimeout(() => \{\
      cell.appendChild(selectedPiece);\
      selectedPiece.style.outline = "none";\
\
      // \uc0\u1044 \u1072 \u1084 \u1082 \u1072 \
      if (currentPlayer == 1 && tr == 0) makeKing(selectedPiece);\
      if (currentPlayer == 2 && tr == 7) makeKing(selectedPiece);\
\
      currentPlayer = currentPlayer == 1 ? 2 : 1;\
      selectedPiece = null;\
      updateScore();\
    \}, 300);\
  \});\
\}\
\
// --- \uc0\u1040 \u1085 \u1080 \u1084 \u1072 \u1094 \u1080 \u1103  \u1093 \u1086 \u1076 \u1072  ---\
function animateMove(piece, fromCell, toCell) \{\
  piece.style.transition = "all 0.3s ease";\
\}\
\
// --- \uc0\u1042 \u1086 \u1087 \u1088 \u1086 \u1089  \u1087 \u1086 \u1083 \u1100 \u1079 \u1086 \u1074 \u1072 \u1090 \u1077 \u1083 \u1102  ---\
function askQuestion(success) \{\
  const q = Math.random() > 0.5\
    ? baseQuestions[Math.floor(Math.random() * baseQuestions.length)]\
    : generateAIQuestion();\
\
  const ans = prompt(q + "\\n1) \uc0\u1178 \u1086 \u1089 \u1099 \u1084 \u1096 \u1072 \\n2) \u1178 \u1072 \u1088 \u1089 \u1099 \u1083 \u1099 \u1179 \\n3) \u1057 \u1077 \u1073 \u1077 \u1087 \\n4) \u1041 \u1072 \u1081 \u1083 \u1072 \u1085 \u1099 \u1089 ");\
  if (ans == 1) \{\
    alert("\uc0\u1044 \u1201 \u1088 \u1099 \u1089 !");\
    sounds.correct.play(); // \uc0\u1079 \u1074 \u1091 \u1082  \u1087 \u1088 \u1072 \u1074 \u1080 \u1083 \u1100 \u1085 \u1086 \u1075 \u1086  \u1086 \u1090 \u1074 \u1077 \u1090 \u1072 \
    success();\
  \} else \{\
    alert("\uc0\u1178 \u1072 \u1090 \u1077 !");\
    sounds.wrong.play(); // \uc0\u1079 \u1074 \u1091 \u1082  \u1086 \u1096 \u1080 \u1073 \u1082 \u1080 \
  \}\
\}\
\
// --- \uc0\u1044 \u1077 \u1083 \u1072 \u1077 \u1084  \u1076 \u1072 \u1084 \u1082 \u1091  ---\
function makeKing(piece) \{\
  piece.style.background = "gold";\
  piece.innerText = "
\f1 \uc0\u9819 
\f0 ";\
  sounds.king.play(); // \uc0\u1079 \u1074 \u1091 \u1082  \u1076 \u1072 \u1084 \u1082 \u1080 \
\}\
\
// --- \uc0\u1054 \u1073 \u1085 \u1086 \u1074 \u1083 \u1077 \u1085 \u1080 \u1077  \u1089 \u1095 \u1077 \u1090 \u1072  ---\
function updateScore() \{\
  document.getElementById("score").innerText = `\uc0\u1054 \u1081 \u1099 \u1085 \u1096 \u1099 1: $\{score1\} | \u1054 \u1081 \u1099 \u1085 \u1096 \u1099 2: $\{score2\}`;\
\}\
\
// --- \uc0\u1055 \u1088 \u1072 \u1074 \u1080 \u1083 \u1072  \u1080  \u1088 \u1091 \u1082 \u1086 \u1074 \u1086 \u1076 \u1089 \u1090 \u1074 \u1086  ---\
function showRules() \{ document.getElementById("rulesBox").classList.remove("hidden"); \}\
function hideRules() \{ document.getElementById("rulesBox").classList.add("hidden"); \}\
function showGuide() \{ document.getElementById("guide").classList.remove("hidden"); \}\
function hideGuide() \{ document.getElementById("guide").classList.add("hidden"); \}\
}