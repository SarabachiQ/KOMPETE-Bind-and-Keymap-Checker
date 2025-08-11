// script50.js
/*
function debugLog(msg) {
  const log = document.getElementById("log"); if (!log) return; const p = document.createElement("div"); p.textContent = msg; log.appendChild(p); log.scrollTop = log.scrollHeight;
}
*/
const NUM_BIND_CELLS = 1;
const DUAL_PLACEHOLDER = "…" + " +" + "🕹L";

const gameCommands = [{
  name: "MOVE F/B/L/R",
  fixed: "🕹L"
}, {
  name: "FIRE🔥"
}, {
  name: "AIM"
}, {
  name: "MELEE"
}, {
  name: "RELOAD"
}, {
  name: "INTERACT"
}, {
  name: "CROUCH/SLIDE"
}, {
  name: "SPRINT"
}, {
  name: "JUMP/EXOSUIT (HOLD)"
}, {
  name: "EXOSUIT"
}, {
  name: "SWITCH WEAPON 1"
}, {
  name: "SWITCH WEAPON 2",
  fixed: "NUL"
}, {
  name: "EQUIP MELEE WEAPON",
  fixed: "LB"
}, {
  name: "EQUIP UTILITY 1",
  fixed: "RB"
}, {
  name: "EQUIP UTILITY 2",
  fixed: "RB"
}, {
  name: "EQUIP KAPSULE",
  fixed: "LB+RB"
}, {
  name: "LEAN L/R",
  dual: true
}, {
  name: "DROP ITEM"
}, {
  name: "PING"
}, {
  name: "SWITCH SHOULDER"
}, {
  name: "TOGGLE SCORECARD"
}, {
  name: "EMOTE WHEEL"
}];

const keymapCommands = [{
  name: "MOVE F/B/L/R",
  fixed: "🕹L"
}, {
  name: "FIRE🔥"
}, {
  name: "AIM"
}, {
  name: "MELEE"
}, {
  name: "RELOAD"
}, {
  name: "INTERACT"
}, {
  name: "CROUCH/SLIDE"
}, {
  name: "SPRINT"
}, {
  name: "JUMP/EXOSUIT (HOLD)"
}, {
  name: "EXOSUIT"
}, {
  name: "SWITCH WEAPON 1"
}, {
  name: "SWITCH WEAPON 2",
  fixed: "NUL"
}, {
  name: "EQUIP MELEE WEAPON",
  fixed: "LB"
}, {
  name: "EQUIP UTILITY 1",
  fixed: "RB"
}, {
  name: "EQUIP UTILITY 2",
  fixed: "RB"
}, {
  name: "EQUIP KAPSULE",
  fixed: "LB+RB"
}, {
  name: "LEAN L/R",
  dual: true
}, {
  name: "DROP ITEM"
}, {
  name: "PING"
}, {
  name: "SWITCH SHOULDER"
}, {
  name: "TOGGLE SCORECARD"
}, {
  name: "EMOTE WHEEL"
}];

const labelMaps = {
  modeXbox: {
    X: "X",
    Y: "Y",
    A: "A",
    B: "B",
    LB: "LB",
    RB: "RB",
    LT: "LT",
    RT: "RT",
    L3: "L3",
    R3: "R3",
    "❏": "❏",
    "≡": "≡",
    "📷": "📷",
    "⬡": "⬡",
    "⬆": "⬆",
    "⬇": "⬇",
    "⬅": "⬅",
    "➡": "➡"
  },
  modePlaystation: {
    "X": "✕",
    "Y": "△",
    "A": "〇",
    "B": "□",
    "LB": "L1",
    "RB": "R1",
    "LT": "L2",
    "RT": "R2",
    "L3": "L3",
    "R3": "R3",
    "❏": "❏",
    "≡": "≡",
    "📷": "📷",
    "⬡": "⬡",
    "⬆": "↑",
    "⬇": "↓",
    "⬅": "←",
    "➡": "→"
  },
  modeSwitch: {
    "X": "XX",
    "Y": "YY",
    "A": "AA",
    "B": "BB",
    "LB": "L",
    "RB": "R",
    "LT": "ZL",
    "RT": "ZR",
    "L3": "L3",
    "R3": "R3",
    "❏": "❏",
    "≡": "≡",
    "📷": "📷",
    "⬡": "⬡",
    "⬆": "↑",
    "⬇": "↓",
    "⬅": "←",
    "➡": "→"
  }
};

const roundBtn = ["X", "Y", "A", "B", "❐", "≡", "📷", "⬡"];
const oblongBtn = ["LB", "LT", "RB", "RT", "L3", "R3"];
const squareBtn = ["⬆", "⬇", "⬅", "➡"];
const joystickBtn = ["⇧🕹L", "⇩🕹L", "⇦🕹L", "⇨🕹L"];
const macroBtn = ["M1", "M2", "M3", "M4"];

const btnGamePool = [
  "X", "Y", "A", "B", "⬆", "⬇", "⬅", "➡",
  "LB", "RB", "LT", "RT", "L3", "R3",
  "❐", "≡", "📷", "⬡",
  "⇧🕹L", "⇩🕹L", "⇦🕹L", "⇨🕹L"
];
const btnKeymapPool2 = [
  "X", "Y", "A", "B", "⬆", "⬇", "⬅", "➡",
  "LB", "RB", "LT", "RT", "L3", "R3",
  "❐", "≡", "📷", "⬡", "M1", "M2", "M3", "M4"
];
const btnKeymapPool3 = [
  "X", "Y", "A", "B", "⬆", "⬇", "⬅", "➡",
  "LB", "RB", "LT", "RT", "L3", "R3",
  "❐", "≡", "📷", "⬡", "M1", "M2", "M3", "M4"
];
// DOM要素取得
const gameBody0001 = document.getElementById("gameBody");
const btnGamePool0001 = document.getElementById("btnGamePool");
const poolWindow0005 = document.getElementById("poolWindow5");

const keymapBody0002 = document.getElementById("keymapBody2");
const btnKeymapPool0002 = document.getElementById("btnKeymapPool2");
const poolWindow0002 = document.getElementById("poolWindow2");

const keymapBody0003 = document.getElementById("keymapBody3");
const btnKeymapPool0003 = document.getElementById("btnKeymapPool3");
const poolWindow0003 = document.getElementById("poolWindow3");

const container0001 = document.getElementById("container1");
const container0002 = document.getElementById("container2");
const container0003 = document.getElementById("container");

const commandCellMap = new Map();
const keymapCellMap = new Map();

let defaultMode = "modeXbox";
// 状態変数（Body と Pool 両方を管理）

// グローバルで1回だけ宣言する
let bodyButtons = []; // ← const だと上書きできないので let に

// 以降の処理では、bodyButtons を初期化しない！
let gameBody0001Current = []; // gameBody の配置状態
let btnGamePool0001Current = [...btnGamePool]; // プールにあるボタン状態
let keymapBody0002Current = []; // keymapBody2 の配置状態
let btnKeymapPool0002Current = [...btnKeymapPool2]; // プール状態
let keymapBody0003Current = []; // keymapBody3 の配置状態
let btnKeymapPool0003Current = [...btnKeymapPool3]; // プール状態

let selectedCell = null;
let selectedCommand = null;
let selectedAimBtn = "";
let selectedColIndex = null;
let selectedBodyId = null; // "gameBody0001", "keymapBody0002", "keymapBody0003" のいずれかを保持
let selectedCellClass = null; // ★ クラスベース管理に変更

function syncGame02ToKeymap01() {
  const gameRows = [...gameBody0001.querySelectorAll("tr")];
  const keymapRows = [...keymapBody0002.querySelectorAll("tr")];
  
  gameRows.forEach((gameRow, i) => {
    const gameCell = gameRow.cells[1]; // gameBody 2列目
    const keymapRow = keymapRows[i];
    const keymapCell = keymapRow?.cells[0]; // keymapBody 1列目のみを対象
    
    if (!gameCell || !keymapCell) return;
    
    // 対象の 1列目のみクリア（他の列には触れない）
    keymapCell.innerHTML = "";
    keymapCell.className = "";
    
    const btn = gameCell.querySelector(".inner-btn");
    if (!btn) return;
    
    const clonedBtn = btn.cloneNode(true);
    
    // gameCell のクラスに応じてスタイルを適用
    if (gameCell.classList.contains("fixed-cell")) {
      keymapCell.classList.add("fixed-cell", "fixed-cell-copy");
      clonedBtn.classList.add("shape-fixed");
    } else if (gameCell.classList.contains("dual")) {
      keymapCell.classList.add("dual", "fixed-cell-copy");
    } else {
      keymapCell.classList.add("fixed-cell-copy");
      clonedBtn.classList.add("shape-copy");
    }
    
    keymapCell.appendChild(clonedBtn);
  });
}

function createGameTable() {
  console.log("🧪 gameCommands:", gameCommands);
  console.log("createGameTable start");
  
  gameBody0001.innerHTML = "";
  
  gameCommands.forEach((cmd, index) => {
    console.log("createGameTable loop start:", index, cmd.name);
    const row = document.createElement("tr");
    row.dataset.index = index;
    
    const nameCell = document.createElement("td");
    nameCell.textContent = cmd.name;
    if (cmd.fixed !== undefined) {
      nameCell.classList.add("fixed-cell");
    }
    row.appendChild(nameCell);
    commandCellMap.set(cmd.name, []);
    
    for (let i = 0; i < NUM_BIND_CELLS; i++) {
      const cell = document.createElement("td");
      
      if (cmd.fixed !== undefined && cmd.fixed !== "") {
        const btn = document.createElement("div");
        btn.classList.add("inner-btn", "shape-fixed");
        btn.textContent = cmd.fixed;
        
        cell.classList.add("fixed-cell");
        cell.appendChild(btn);
      } else if (cmd.dual) {
        cell.classList.add("dual");
        const placeholderSpan = document.createElement("span");
        placeholderSpan.textContent = "…";
        cell.appendChild(placeholderSpan);
        cell.append(" + ");
        
        const dualBtn = document.createElement("div");
        dualBtn.classList.add("inner-btn", "shape-dual");
        dualBtn.textContent = "🕹L";
        cell.appendChild(dualBtn);
        commandCellMap.get(cmd.name).push(cell);
      } else {
        // game 側
        cell.addEventListener("click", () => handleCellClick(cell, cmd.name, 0, false));
        cell.classList.add("btn-cell5");
        commandCellMap.get(cmd.name).push(cell);
      }
      
      row.appendChild(cell);
    }
    
    gameBody0001.appendChild(row);
  });
  
  // ✅ テーブル要素名をすべて最新の整合性に合わせる
  enableRowDragAndDrop(gameBody0001, keymapBody0002, keymapBody0003);
  console.log("createGameTable end, total rows in gameBody0001:", gameBody0001.querySelectorAll("tr").length);
  console.log("createGameTable end");
}

function createKeymapTable(commands) {
  console.log("createKeymapTable start");
  console.log("🧪 keymapCommands:", keymapCommands);
  /*
  keymapCellMap.clear();
  */
  keymapBody2.innerHTML = "";
  keymapBody3.innerHTML = "";
  
  commands.forEach((cmdObj, i) => {
    const cmdName = cmdObj.name;
    const row2 = document.createElement("tr");
    const row3 = document.createElement("tr");
    
    for (let col = 0; col < 4; col++) {
      // 🔽 各テーブルに必要な列のみ処理
      const includeIn2 = col === 0 || col === 1;
      const includeIn3 = col === 2 || col === 3;
      
      if (includeIn2) {
  const cell2 = document.createElement("td");
  if (col === 3) {
    if (cmdName.length > 0) {
      const container2 = document.createElement("div");
      container2.className = "scrolling-box-container";
      const box2 = document.createElement("div");
      box2.className = "scrolling-box";
      box2.textContent = cmdName;
      container2.appendChild(box2);
      cell2.appendChild(container2);
    } else {
      cell2.textContent = cmdName;
    }
    cell2.className = "label-cell";
  } else {
    cell2.className = `btn-cell6 btn-cell6-0${col + 1}`;
    cell2.addEventListener("click", () => handleCellClick(cell2, cmdName, col, true));
    const key = `${cmdName}_${col}`;
    if (!keymapCellMap.has(key)) keymapCellMap.set(key, []);
    keymapCellMap.get(key).push(cell2);
    
    // ここで空欄なら "+" を入れる
    if (!cmdName) {
      cell2.textContent = "+";
    }
  }
  row2.appendChild(cell2);
}

if (includeIn3) {
  const cell3 = document.createElement("td");
  if (col === 3) {
    if (cmdName.length > 0) {
      const container3 = document.createElement("div");
      container3.className = "scrolling-box-container";
      const box3 = document.createElement("div");
      box3.className = "scrolling-box";
      box3.textContent = cmdName;
      container3.appendChild(box3);
      cell3.appendChild(container3);
    } else {
      cell3.textContent = cmdName;
    }
    cell3.className = "label-cell";
  } else {
    cell3.className = `btn-cell6 btn-cell6-0${col + 1}`;
    cell3.addEventListener("click", () => handleCellClick(cell3, cmdName, col, true));
    const key = `${cmdName}_${col}`;
    if (!keymapCellMap.has(key)) keymapCellMap.set(key, []);
    keymapCellMap.get(key).push(cell3);
    
    // ここで空欄なら "+" を入れる
    if (!cmdName) {
      cell3.textContent = "+";
    }
  }
  row3.appendChild(cell3);
}
    }
    
    keymapBody2.appendChild(row2);
    keymapBody3.appendChild(row3);
  });
  
  console.log("createKeymapTable end");
}

function syncRowOrdersBetweenTables() {
  const gameRows = [...gameBody0001.querySelectorAll("tr")];
  const keymapRows2 = [...keymapBody0002.querySelectorAll("tr")];
  const keymapRows3 = [...keymapBody0003.querySelectorAll("tr")];
  
  // キーマップ2の行をゲームテーブル順に並び替え
  gameRows.forEach((gameRow, i) => {
    const correspondingRow2 = keymapRows2[i];
    if (correspondingRow2) {
      keymapBody0002.appendChild(correspondingRow2);
    }
  });
  
  // キーマップ3の行も同様に並び替え
  gameRows.forEach((gameRow, i) => {
    const correspondingRow3 = keymapRows3[i];
    if (correspondingRow3) {
      keymapBody0003.appendChild(correspondingRow3);
    }
  });
}
/*
function updateKeymapCell() {
  keymapCell.innerHTML = gameCell.innerHTML;
}
*/

function enableRowDragAndDrop(gameBody, keymapBody2, keymapBody3) {
  let draggingRowIndex = null;
  
  // 3つのtbodyの配列
  const bodies = [gameBody, keymapBody2, keymapBody3];
  
  bodies.forEach((tbody) => {
    tbody.querySelectorAll("tr").forEach((row, idx) => {
      row.setAttribute("draggable", true);
      
      row.addEventListener("dragstart", () => {
        draggingRowIndex = idx;
        // 全tbodyの該当行に 'dragging' クラス付与
        bodies.forEach((b) => {
          if (b.children[draggingRowIndex]) {
            b.children[draggingRowIndex].classList.add("dragging");
          }
        });
        
        // ドラッグ開始時に選択状態をリセットする
        if (selectedCell) {
          selectedCell.classList.remove("highlight");
          selectedCell = null;
          selectedCommand = null;
          selectedColIndex = null;
          selectedIsKeymap = false;
          selectedCellClass = null;
        }
      });
      
      row.addEventListener("dragend", () => {
        // 全tbodyの行から 'dragging' クラス削除
        bodies.forEach((b) => {
          Array.from(b.children).forEach((r) => r.classList.remove("dragging"));
        });
        draggingRowIndex = null;
        
        // ドラッグ終了時にも選択状態をリセットする
        if (selectedCell) {
          selectedCell.classList.remove("highlight");
          selectedCell = null;
          selectedCommand = null;
          selectedColIndex = null;
          selectedIsKeymap = false;
          selectedCellClass = null;
        }
      });
    });
  });
  
  // gameBody のみで dragover 判定（ドラッグ移動先決定）
  gameBody.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (draggingRowIndex === null) return;
    
    const draggingRows = bodies.map((b) => b.children[draggingRowIndex]);
    
    const afterRow = Array.from(gameBody.children).find((row) => {
      const rect = row.getBoundingClientRect();
      return e.clientY < rect.top + rect.height / 2;
    });
    
    if (!afterRow) {
      // 末尾に移動
      bodies.forEach((b) => {
        const row = b.children[draggingRowIndex];
        b.appendChild(row);
      });
    } else {
      const afterIndex = Array.from(gameBody.children).indexOf(afterRow);
      bodies.forEach((b) => {
        const row = b.children[draggingRowIndex];
        const refRow = b.children[afterIndex];
        b.insertBefore(row, refRow);
      });
    }
    
    // drag中の行インデックス更新（動いた先のindex）
    draggingRowIndex = Array.from(gameBody.children).indexOf(draggingRows[0]);
  });
}
/*
function enableRowDragAndDrop() {
  const gameBody = document.getElementById("gameBody");
  const keymapBody2 = document.getElementById("keymapBody2");
  const keymapBody3 = document.getElementById("keymapBody3");
  
  const allBodies = [gameBody, keymapBody2, keymapBody3];
  
  let draggedRow = null;
  
  allBodies.forEach((tbody) => {
    tbody.querySelectorAll("tr").forEach((row) => {
      row.draggable = true;
      
      row.addEventListener("dragstart", (e) => {
        draggedRow = row;
        allBodies.forEach(body => {
          const tr = Array.from(body.children).find(r => r.isSameNode(draggedRow));
          if (tr) tr.classList.add("dragging");
        });
        e.dataTransfer.effectAllowed = "move";
      });
      
      row.addEventListener("dragend", () => {
        allBodies.forEach(body => {
          const dragging = body.querySelector(".dragging");
          if (dragging) dragging.classList.remove("dragging");
        });
        draggedRow = null;
      });
    });
    
    tbody.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (!draggedRow) return;
      
      const rows = Array.from(tbody.children).filter(tr => tr !== draggedRow);
      let insertBeforeRow = null;
      
      for (const row of rows) {
        const rect = row.getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) {
          insertBeforeRow = row;
          break;
        }
      }
      
      allBodies.forEach(body => {
        const draggedIndex = Array.from(body.children).indexOf(draggedRow);
        const insertBeforeIndex = insertBeforeRow ? Array.from(body.children).indexOf(insertBeforeRow) : body.children.length;
        
        if (insertBeforeIndex === draggedIndex || insertBeforeIndex === draggedIndex + 1) return;
        
        // Remove draggedRow from current position
        body.removeChild(draggedRow);
        
        // Insert draggedRow before insertBeforeRow or at end
        if (insertBeforeRow) {
          body.insertBefore(draggedRow, insertBeforeRow);
        } else {
          body.appendChild(draggedRow);
        }
      });
    });
  });
}
*/
/*
function enableRowDragAndDrop() {
  const gameBody = document.getElementById("gameBody");
  const keymapBody2 = document.getElementById("keymapBody2");
  const keymapBody3 = document.getElementById("keymapBody3");
  
  const allBodies = [gameBody, keymapBody2, keymapBody3];
  let draggingIndex = null;
  
  allBodies.forEach((body) => {
    body.querySelectorAll("tr").forEach((row, index) => {
      row.setAttribute("draggable", true);
      row.addEventListener("dragstart", (e) => {
        draggingIndex = index;
        allBodies.forEach((b) => {
          if (b.children[draggingIndex]) b.children[draggingIndex].classList.add("dragging");
        });
      });
      
      row.addEventListener("dragend", () => {
        allBodies.forEach((b) => {
          const dragging = b.querySelector(".dragging");
          if (dragging) dragging.classList.remove("dragging");
        });
        draggingIndex = null;
      });
    });
    
    body.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (draggingIndex === null) return;
      
      const draggingRow = body.children[draggingIndex];
      const after = Array.from(body.children).find((child) => {
        const rect = child.getBoundingClientRect();
        return e.clientY < rect.top + rect.height / 2;
      });
      
      if (!after || after === draggingRow) return;
      const afterIndex = [...body.children].indexOf(after);
      
      allBodies.forEach((b) => {
        const rowToMove = b.children[draggingIndex];
        const target = b.children[afterIndex];
        if (rowToMove && target) {
          b.insertBefore(rowToMove, target);
        }
      });
      
      draggingIndex = afterIndex;
    });
  });
}
*/

function alignPopupToBtnCell603(popupRef, poolTbodyId = "btnGamePool") {
  if (!popupRef) return;
  
  // 指定されたプールtbody
  const poolTbody = document.getElementById(poolTbodyId);
  if (!poolTbody) return;
  
  // キーマップ3のtbody
  const keymap3Tbody = document.querySelector("#keymapBody3");
  if (!keymap3Tbody) return;
  
  // キーマップ3の2列目、最初の行のセル（コマンド名セル）
  const firstRowSecondColTd = keymap3Tbody.querySelector("tr:first-child td:nth-child(2)");
  if (!firstRowSecondColTd) return;
  
  // 座標取得
  const poolRect = poolTbody.getBoundingClientRect();
  const targetRect = firstRowSecondColTd.getBoundingClientRect();
  
  // 右上座標計算
  const poolRight = poolRect.left + poolRect.width;
  const targetRight = targetRect.left + targetRect.width;
  
  const offsetX = targetRight - poolRight;
  const offsetY = targetRect.top - poolRect.top;
  
  // popupRefを絶対配置
  popupRef.style.position = "absolute";
  
  // popupRefの現在位置取得（スクロール考慮）
  const popupRect = popupRef.getBoundingClientRect();
  const popupCurrentLeft = popupRect.left + window.scrollX;
  const popupCurrentTop = popupRect.top + window.scrollY;
  
  // 新しい位置計算
  const newLeft = popupCurrentLeft + offsetX;
  const newTop = popupCurrentTop + offsetY;
  
  // 位置設定
  popupRef.style.left = newLeft + "px";
  popupRef.style.top = newTop + "px";
  
  // 高さはキーマップ3 tbodyの高さに合わせる
  popupRef.style.height = keymap3Tbody.getBoundingClientRect().height + "px";
}
/*
function alignPopupToBtnCell603(popupRef) {
  if (!popupRef) return;
  
  // 1. プールのtbody
  const poolTbody = document.querySelector("#btnGamePool");
  if (!poolTbody) return;
  
  // 2. キーマップ3のtbody
  const keymap3Tbody = document.querySelector("#keymapBody3");
  if (!keymap3Tbody) return;
  
  // 3. キーマップ3の2列目、最初の行のセル（コマンド名セル）
  const firstRowSecondColTd = keymap3Tbody.querySelector("tr:first-child td:nth-child(2)");
  if (!firstRowSecondColTd) return;
  
  // 座標取得
  const poolRect = poolTbody.getBoundingClientRect();
  const targetRect = firstRowSecondColTd.getBoundingClientRect();
  
  // 右上座標でオフセット計算
  // 右上 = left + width (x), top (y)
  const poolRight = poolRect.left + poolRect.width;
  const targetRight = targetRect.left + targetRect.width;
  
  const offsetX = targetRight - poolRight;
  const offsetY = targetRect.top - poolRect.top;
  
  // popupRef（#poolWindow5）を基準に絶対配置
  popupRef.style.position = "absolute";
  
  // popupRefの元の位置を基準に、オフセットだけ移動
  const popupRect = popupRef.getBoundingClientRect();
  const popupCurrentLeft = popupRect.left + window.scrollX;
  const popupCurrentTop = popupRect.top + window.scrollY;
  
  const newLeft = popupCurrentLeft + offsetX;
  const newTop = popupCurrentTop + offsetY;
  
  popupRef.style.left = newLeft + "px";
  popupRef.style.top = newTop + "px";
  
  // 高さはキーマップ3のtbodyの高さに合わせる
  popupRef.style.height = keymap3Tbody.getBoundingClientRect().height + "px";
}
*/

/*
function alignPopup(containerRef, popupRef) {
  const rect = containerRef.getBoundingClientRect();
  
  console.log('alignPopup to:', containerRef.id, rect);
  
  // container4の中心を計算
  const centerX = rect.left + rect.width / 2 + window.scrollX;
  const centerY = rect.top + rect.height / 2 + window.scrollY;
  
  // 最初はサイズ0で中央に配置（transformで中央基準）
  popupRef.style.position = "absolute";
  popupRef.style.width = "0px";
  popupRef.style.height = "0px";
  popupRef.style.top = centerY + "px";
  popupRef.style.left = centerX + "px";
  popupRef.style.transform = "translate(-50%, -50%)";
  popupRef.style.transition = "all 1.0s ease";
  
  // 強制再描画してスタイルを反映
  popupRef.offsetHeight;
  
  // 次のフレームでcontainer4に合わせてサイズ・位置を拡大
  requestAnimationFrame(() => {
    popupRef.style.top = rect.top + window.scrollY + "px";
    popupRef.style.left = rect.left + window.scrollX + "px";
    popupRef.style.width = rect.width + "px";
    popupRef.style.height = rect.height + "px";
    popupRef.style.transform = "translate(0, 0)";
  });
}
*/
/*
function alignPopup(containerRef, popupRef) {
  const rect = containerRef.getBoundingClientRect();
  
  console.log('alignPopup to:',
    containerRef.id,
    rect); // ← ここを追加
  
  popupRef.style.top = rect.top + window.scrollY + "px";
  popupRef.style.left = rect.left + window.scrollX + "px";
  popupRef.style.width = rect.width + "px";
  popupRef.style.height = rect.height + "px";
}
let rotationTimeout = null;
*/
/*
window.addEventListener("resize", () => {
  // 画面回転やウインドウサイズ変更時に一旦ウインドウ閉じる
  closePoolWindow5(); // 例: poolWindow5を閉じる関数（必要に応じて他のウインドウも）
  closePoolWindow2();
  closePoolWindow3();
  
  // 連続resize対策にタイマーをクリアしてセットし直す
  if (rotationTimeout) clearTimeout(rotationTimeout);
  
  rotationTimeout = setTimeout(() => {
    // 回転処理完了とみなし、ウインドウを再オープン
    openPoolWindow5(); // 元のウインドウを開く関数を呼ぶ（適宜調整）
    // 必要に応じて他のウインドウも同様に開く
  }, 500); // 0.5秒の遅延。調整可
});
*/
function closePoolWindow5() {
  poolWindow0005.classList.remove("show");
}

function closePoolWindow2() {
  poolWindow0002.classList.remove("show");
}

function closePoolWindow3() {
  poolWindow0003.classList.remove("show");
}

function handleCellClick(cell, cmd, colIndex = 0, isKeymap = false) {
  if (isKeymap && colIndex === 0) return; // キーマップ2の1列目は選択不可にする
  if (cell.classList.contains("fixed-cell-copy")) return;
  
  console.log("handleCellClick called:", cell, cmd, colIndex);
  
  if (selectedCell === cell) {
    selectedCell.classList.remove("highlight");
    selectedCell = null;
    selectedCommand = null;
    selectedColIndex = null;
    selectedIsKeymap = false;
    selectedCellClass = null;
    return;
  }
  
  if (selectedCell) {
    const oldVal = selectedCell.textContent;
    const newVal = cell.textContent;
    
    console.log("🔧 updateCommandCells selected:", selectedCommand, newVal, selectedColIndex, isKeymap);
    console.log("🔧 updateCommandCells current :", cmd, oldVal, colIndex, isKeymap);
    
    updateCommandCells(selectedCommand, newVal, selectedColIndex, isKeymap);
    updateCommandCells(cmd, oldVal, colIndex, isKeymap);
    
    selectedCell.classList.remove("highlight");
    selectedCell = null;
    selectedCommand = null;
    selectedColIndex = null;
    selectedCellClass = null;
    return;
  }
  
  selectedCell = cell;
  selectedCommand = cmd;
  selectedColIndex = colIndex;
  
  // クラス名記録（btn-cell6-02 / btn-cell6-03 など）
  selectedCellClass = Array.from(cell.classList).find(cls =>
    cls.startsWith("btn-cell6-") || cls === "btn-cell5"
  );
  
  cell.classList.add("highlight");
  
  // ここでpopupRefを定義（表示するプールウインドウを入れる変数）
  let popupRef = null;
  if (cell.classList.contains("btn-cell5")) {
    popupRef = poolWindow0005;
  } else if (cell.classList.contains("btn-cell6-02")) {
    popupRef = poolWindow0002;
  } else if (cell.classList.contains("btn-cell6-03")) {
    popupRef = poolWindow0003;
  }
  
  // 既存のウインドウ表示リセット処理
  poolWindow0002.classList.remove("show");
  poolWindow0003.classList.remove("show");
  poolWindow0005.classList.remove("show");
  container1.style.zIndex = 99;
  container2.style.zIndex = 97;
  container3.style.zIndex = 95;
  container4.style.zIndex = 1;
  
  // popupRefがセットされていれば表示＆位置調整
  if (popupRef) {
    popupRef.classList.add("show");
    alignPopupToBtnCell603(popupRef); // 位置調整
    popupRef.style.display = "block"; // 必要に応じて
  }
}
/*
function handleCellClick(cell, cmd, colIndex = 0, isKeymap = false) {
  if (isKeymap && colIndex === 0) return;  // キーマップ2の1列目は選択不可にする
  if (cell.classList.contains("fixed-cell-copy")) return;
  
  console.log("handleCellClick called:", cell, cmd, colIndex);
  
  if (selectedCell === cell) {
    selectedCell.classList.remove("highlight");
    selectedCell = null;
    selectedCommand = null;
    selectedColIndex = null;
    selectedIsKeymap = false;
    selectedCellClass = null;
    return;
  }
  
  if (selectedCell) {
    const oldVal = selectedCell.textContent;
    const newVal = cell.textContent;
    
    console.log("🔧 updateCommandCells selected:", selectedCommand, newVal, selectedColIndex, isKeymap);
    console.log("🔧 updateCommandCells current :", cmd, oldVal, colIndex, isKeymap);
    
    updateCommandCells(selectedCommand, newVal, selectedColIndex, isKeymap);
    updateCommandCells(cmd, oldVal, colIndex, isKeymap);
    
    selectedCell.classList.remove("highlight");
    selectedCell = null;
    selectedCommand = null;
    selectedColIndex = null;
    selectedCellClass = null;
    return;
  }
  
  selectedCell = cell;
  selectedCommand = cmd;
  selectedColIndex = colIndex;
  
  // クラス名記録（btn-cell6-02 / btn-cell6-03 など）
  selectedCellClass = Array.from(cell.classList).find(cls =>
    cls.startsWith("btn-cell6-") || cls === "btn-cell5"
  );
  
  cell.classList.add("highlight");
  
  // ウィンドウ表示処理
  if (cell.classList.contains("btn-cell5")) {
    // ゲーム用ボタンウィンドウ表示
    poolWindow0002.classList.remove("show");
    poolWindow0003.classList.remove("show");
    container1.style.zIndex = 99;
    container2.style.zIndex = 97;
    container3.style.zIndex = 95;
    container4.style.zIndex = 1;
    
   // alignPopup(container4, poolWindow5);
    
    poolWindow0005.classList.add("show");
    alignPopupToBtnCell603(popupRef); // 表示前に位置調整
    popupRef.style.display = "block"; // またはクラス付与など
    
  } else if (cell.classList.contains("btn-cell6-02")) {
    // キーマップ2用ボタンウィンドウ表示
    poolWindow0003.classList.remove("show");
    poolWindow0005.classList.remove("show");
    container1.style.zIndex = 99;
    container2.style.zIndex = 97;
    container3.style.zIndex = 95;
    container4.style.zIndex = 1;
    
   // alignPopup(container4, poolWindow2);
    
    poolWindow0002.classList.add("show");
    alignPopupToBtnCell603(popupRef); // 表示前に位置調整
    popupRef.style.display = "block"; // またはクラス付与など
    
  } else if (cell.classList.contains("btn-cell6-03")) {
    // キーマップ3用ボタンウィンドウ表示
    poolWindow0002.classList.remove("show");
    poolWindow0005.classList.remove("show");
    container1.style.zIndex = 99;
    container2.style.zIndex = 97;
    container3.style.zIndex = 95;
    container4.style.zIndex = 1;
    
   // alignPopup(container4, poolWindow3);
    
    poolWindow0003.classList.add("show");
    alignPopupToBtnCell603(popupRef); // 表示前に位置調整
    popupRef.style.display = "block"; // またはクラス付与など
  }
} 
*/

function updateCommandCells(cmd, val, colIndex = 0, cellClass = "btn-cell5") {
  console.log("🔧 updateCommandCells called with:", cmd, val, colIndex, cellClass);
  
  let isBtn = false;
  
  if (cellClass === "btn-cell5") {
    isBtn = btnGamePool.includes(val);
  } else if (cellClass === "btn-cell6-02") {
    isBtn = btnKeymapPool2.includes(val);
  } else if (cellClass === "btn-cell6-03") {
    isBtn = btnKeymapPool3.includes(val);
  }
  
  const createBtnEl = (value) => {
    const original = getOriginalLabel(value);
    const shapeClass = getBtnShapeClass(original);
    const colorClass = "btn-" + original;
    const label = labelMaps[currentMode]?.[original] ?? original;
    
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    
    const btnEl = document.createElement("div");
    btnEl.className = `inner-btn ${shapeClass} ${colorClass}`;
    btnEl.textContent = label;
    btnEl.dataset.original = original;
    
    wrapper.appendChild(btnEl);
    return wrapper;
  };
  
  // ▼ 直接選択されたセルだけを更新（selectedCell が対象）
  if (selectedCell && selectedCell.classList.contains(cellClass)) {
    selectedCell.innerHTML = "";
    if (isBtn) {
      selectedCell.appendChild(createBtnEl(val));
    } else {
      selectedCell.textContent = val;
    }
    return;
  }
  
  // ▼ keymap2 or keymap3 側
  if (cellClass === "btn-cell6-02" || cellClass === "btn-cell6-03") {
    const key = `${cmd}_${colIndex}`;
    if (!keymapCellMap.has(key)) return;
    
    keymapCellMap.get(key).forEach((c) => {
      c.innerHTML = "";
      if (isBtn) {
        c.appendChild(createBtnEl(val));
      } else {
        c.textContent = val;
      }
    });
    return;
  }
  
  // ▼ game 側（btn-cell5）
  if (!commandCellMap.has(cmd)) return;
  
  commandCellMap.get(cmd).forEach((c) => {
    c.innerHTML = "";
    if (isBtn) {
      c.appendChild(createBtnEl(val));
    } else {
      c.textContent = val;
    }
  });
  
  // ▼ 特別処理
  if (cmd === "AIM") {
    aimButton = val;
    updateLeanBinds();
  }
  
  if (cmd === "RELOAD" || cmd === "INTERACT") {
    const groupVal = val;
    ["RELOAD", "INTERACT"].forEach((key) => {
      if (!commandCellMap.has(key)) return;
      commandCellMap.get(key).forEach((c) => {
        c.innerHTML = "";
        if (isBtn) {
          c.appendChild(createBtnEl(groupVal));
        } else {
          c.textContent = groupVal;
        }
      });
    });
  }
}
/*
function updateCommandCells(cmd, val, colIndex = 0, isKeymap = false) {
  console.log("🔧 updateCommandCells called with:", cmd, val, colIndex, isKeymap);
  
  const isBtn = btnKeymapPool2.includes(val) || btnKeymapPool3.includes(val) || btnGamePool.includes(val);
  
  const createBtnEl = (value) => {
    const original = getOriginalLabel(value);
    const shapeClass = getBtnShapeClass(original);
    const colorClass = "btn-" + original;
    const label = labelMaps[currentMode]?.[original] ?? original;
    
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    
    const btnEl = document.createElement("div");
    btnEl.className = `inner-btn ${shapeClass} ${colorClass}`;
    btnEl.textContent = label;
    btnEl.dataset.original = original;
    
    wrapper.appendChild(btnEl);
    return wrapper;
  };
  
  // ✅ selectedCellClass に応じて selectedCell にのみ反映
  if (typeof selectedCellClass === "string" && selectedCell && selectedCell.classList.contains(selectedCellClass)
  ) {
    let oldVal = null;
    const existingBtn = selectedCell.querySelector(".inner-btn");
    if (existingBtn) {
      oldVal = existingBtn.dataset.original || getOriginalLabel(existingBtn.textContent.trim());
    } else {
      oldVal = getOriginalLabel(selectedCell.textContent.trim());
    }
    
    selectedCell.innerHTML = "";
    if (isBtn) {
      selectedCell.appendChild(createBtnEl(val));
    } else {
      selectedCell.textContent = val;
    }
    
    // ▼ selectedCellClass に応じて正しいマスターデータを参照
    let bodyList, currentBodyList, PoolList, currentPoolList, type;
    
    if (selectedCellClass === "btn-cell5") {
      bodyList = gameBody0001;
      currentBodyList = gameBody0001Current;
      PoolList = btnGamePool0001;
      currentPoolList = btnGamePool0001Current;
      type = "game";
      
    } else if (selectedCellClass === "btn-cell6-02") {
      bodyList = keymapBody0002;
      currentBodyList = keymapBody0002Current;
      PoolList = btnKeymapPool0002;
      currentPoolList = btnKeymapPool0002Current;
      type = "keymap2";
      
    } else if (selectedCellClass === "btn-cell6-03") {
      bodyList = keymapBody0003;
      currentBodyList = keymapBody0003Current;
      PoolList = btnKeymapPool0003;
      currentPoolList = btnKeymapPool0003Current;
      type = "keymap3";
    }
    
    if (PoolList && currentPoolList) {
      const idx = currentPoolList.indexOf(val);
      if (idx !== -1) currentPoolList.splice(idx, 1);
      
      if (oldVal && !currentPoolList.includes(oldVal)) {
        currentPoolList.push(oldVal);
      }
      
      // ▼ rebuildBtnPool 呼び出し（DOM もマスターデータに合わせる）
      if (type === "game") {
        rebuildBtnPool(btnGamePool, gameBody0001Current, document.getElementById("btnGamePool"), "game");
      } else if (type === "keymap2") {
        rebuildBtnPool(btnKeymapPool2, keymapBody0002Current, document.getElementById("btnKeymapPool2"), "keymap2");
      } else if (type === "keymap3") {
        rebuildBtnPool(btnKeymapPool3, keymapBody0003Current, document.getElementById("btnKeymapPool3"), "keymap3");
      }
    }
    
    return;
  }
  
  // ▼ keymap 側（複数セルに反映）
  if (isKeymap) {
    const key = `${cmd}_${colIndex}`;
    const cells = keymapCellMap.get(key);
    if (!cells) return;
    
    cells.forEach((c) => {
      c.innerHTML = "";
      if (isBtn) {
        c.appendChild(createBtnEl(val));
      } else {
        c.textContent = val;
      }
    });
    
    return;
  }
  
  // ▼ game 側（複数セルに反映）
  if (!commandCellMap.has(cmd)) return;
  
  commandCellMap.get(cmd).forEach((c) => {
    c.innerHTML = "";
    if (isBtn) {
      c.appendChild(createBtnEl(val));
    } else {
      c.textContent = val;
    }
  });
  
  // ▼ 特別処理
  if (cmd === "AIM") {
    selectedAimBtn = val;
    updateLeanBinds();
  }
  
  if (cmd === "RELOAD" || cmd === "INTERACT") {
    const groupVal = val;
    ["RELOAD", "INTERACT"].forEach((key) => {
      if (!commandCellMap.has(key)) return;
      commandCellMap.get(key).forEach((c) => {
        c.innerHTML = "";
        if (isBtn) {
          c.appendChild(createBtnEl(groupVal));
        } else {
          c.textContent = groupVal;
        }
      });
    });
  }
}
*/
function updateLeanBinds() {
  const cells = commandCellMap.get("LEAN L/R");
  if (!cells) return;
  
  // AIMボタン取得
  const aimCell = commandCellMap.get("AIM")?.[0];
  let aimBtnClone = null;
  
  if (aimCell) {
    const originalBtn = aimCell.querySelector(".inner-btn");
    if (originalBtn) {
      aimBtnClone = originalBtn.cloneNode(true); // ◉ のスタイルをそのままコピー
    }
  }
  
  cells.forEach((cell) => {
    // 既存の内容をクリア
    cell.textContent = "";
    
    if (aimBtnClone) {
      cell.appendChild(aimBtnClone.cloneNode(true)); // ◉のクローンを挿入
    } else {
      cell.append("…");
    }
    
    // + をテキストで追加
    cell.append(" + ");
    
    // 🕹Lボタンを新たに作成
    const dualBtn = document.createElement("div");
    dualBtn.className = "inner-btn shape-dual";
    dualBtn.textContent = "🕹L";
    
    cell.appendChild(dualBtn);
  });
}

function getBtnShapeClass(btn) {
  if (roundBtn.includes(btn)) return "shape-round";
  if (oblongBtn.includes(btn)) return "shape-oblong";
  if (squareBtn.includes(btn)) return "shape-square";
  if (joystickBtn.includes(btn)) return "shape-joystick";
  if (macroBtn.includes(btn)) return "shape-macro";
  return "shape-square";
}

function getOriginalLabel(label) {
  for (const mode in labelMaps) {
    for (const key in labelMaps[mode]) {
      if (labelMaps[mode][key] === label) return key;
    }
  }
  return label; // fallback
}

function updateButtonLabels(mode) {
  const btns = document.querySelectorAll(".inner-btn");
  
  btns.forEach((btn) => {
    let original = btn.dataset.original;
    
    // 初回のみ保存
    if (!original) {
      original = getOriginalLabel(btn.textContent.trim());
      btn.dataset.original = original;
    }
    
    const mapped = labelMaps[mode]?.[original];
    btn.textContent = mapped ?? original;
  });
}

function setMode(mode) {
  currentMode = mode;
  
  // 直接 modeXbox, modePlaystation, modeSwitch をクラスとして付与
  document.body.className = mode;
  
  updateButtonLabels(mode);
  updateCommandCellLabels(); // ラベルだけ更新
  
  // 🔧 各セルのボタンも再生成する
  gameCommands.forEach((cmd, i) => {
    const val = cmd.value;
    updateCommandCells(cmd, val, 0, "game");
  });
  
  keymapCommands.forEach((cmd, i) => {
    const val = cmd.value2;
    updateCommandCells(cmd, val, 1, "keymap2");
    updateCommandCells(cmd, cmd.value3, 2, "keymap3");
  });
}

function updateCommandCellLabels() {
  for (const list of commandCellMap.values()) {
    list.forEach((cell) => {
      const btn = cell.querySelector(".inner-btn");
      if (!btn || !btn.dataset.original) return;
      const original = btn.dataset.original;
      btn.textContent = labelMaps[currentMode]?.[original] ?? original;
    });
  }
}

function rebuildBtnPool(master, current, tbody, type, bodyElement) {
  // ✅【追加機能】bodyElementから配置済ボタンを収集して current をリアルタイム更新
    console.log("bodyElement.id:", bodyElement?.id);
    console.log("master:", [...master]);
    console.log("current BEFORE update:", [...current]);
    console.log("配置済みボタン（除外対象）:", 
    Array.from(bodyElement?.querySelectorAll(".inner-btn")).map(el => el.textContent.trim()));
  if (bodyElement) {
  const bodyButtons = [];
  
  // bodyElement 内の td をすべてチェック
  const tds = Array.from(bodyElement.querySelectorAll("td"));
  for (const td of tds) {
    const cls = td.className;
    
    // ゲームボディ: btn-cell5
    // キーマップ2: btn-cell6-02
    // キーマップ3: btn-cell6-03
    if (
      (type === "game" && cls.includes("btn-cell5")) ||
      (type === "keymap2" && cls.includes("btn-cell6-02")) ||
      (type === "keymap3" && cls.includes("btn-cell6-03"))
    ) {
      const inner = td.querySelector(".inner-btn");
      if (inner) {
        const label = inner.textContent.trim();
        if (label) bodyButtons.push(label);
      }
    }
  }
  
  console.log("bodyElement.id:", bodyElement.id);
  console.log("master:", [...master]);
  console.log("current BEFORE update:", [...current]);
  console.log("配置済みボタン（除外対象）:", bodyButtons);
  
  // current を master から再構成（body にあるボタンを除外）
  current.length = 0;
  for (const btn of master) {
    if (!bodyButtons.includes(btn)) {
      current.push(btn);
    }
  }
}
  
  // ✅以下はあなたの元のコードそのまま（既存機能を保持）
  tbody.innerHTML = "";
  for (let i = 0; i < master.length; i += 2) {
    const row = document.createElement("tr");
    
    for (let j = 0; j < 2; j++) {
      const idx = i + j;
      const btn = master[idx];
      if (!btn) continue;
      
      const cell = document.createElement("td");
      cell.className = "btn";
      
      const shapeClass = getBtnShapeClass(btn);
      const colorClass = "btn-" + btn;
      
      const innerBtn = document.createElement("div");
      innerBtn.className = `inner-btn ${shapeClass} ${colorClass}`;
      innerBtn.textContent = btn;
      
      if (btn === "⬡") {
        innerBtn.style.opacity = "1.0";
        cell.classList.add("fixed-cell");
      } else if (!current.includes(btn)) {
        innerBtn.style.opacity = "0.15";
        cell.style.pointerEvents = "none";
      } else {
        innerBtn.style.opacity = "0.9";
        cell.addEventListener("click", () => {
          console.log("Pool button clicked, selectedCell:", selectedCell);
          console.log("Selection cleared");
          if (!selectedCell) return;
          
          const className = Array.from(selectedCell.classList).find(cls =>
            cls === "btn-cell5" || cls === "btn-cell6-02" || cls === "btn-cell6-03"
          );
          
          if (!className) return;
          
          // ✅ 元のボタン取得と current 反映処理（元コードのまま）
          const oldEl = selectedCell.querySelector(".inner-btn");
          let oldVal;
          if (oldEl) {
            oldVal = oldEl.dataset.original || getOriginalLabel(oldEl.textContent.trim());
          } else {
            oldVal = getOriginalLabel(selectedCell.textContent.trim());
          }
          
          if (oldVal && !current.includes(oldVal)) {
            current.push(oldVal);
          }
          
          // クリックしたボタンを current から削除
          const index = current.indexOf(btn);
          if (index > -1) current.splice(index, 1);
          
          // 既存配置処理
          selectedCell.innerHTML = "";
          const newBtn = innerBtn.cloneNode(true);
          selectedCell.appendChild(newBtn);
          
          updateCommandCells(selectedCommand, btn, selectedColIndex, className);
          
          selectedCell.classList.remove("highlight");
          selectedCell = null;
          selectedCommand = null;
          selectedColIndex = null;
          selectedCellClass = null;
          
          rebuildBtnPool(master, current, tbody, type, bodyElement);
          syncGame02ToKeymap01();
        });
      }
      
      cell.appendChild(innerBtn);
      row.appendChild(cell);
    }
    
    tbody.appendChild(row);
  }
}
/*
function rebuildBtnPool(master, current, tbody, type, bodyElement) {
  // 🔽 ここで current を計算し直す（bodyElement: BodyのDOM要素を引数で渡す想定）
  const bodyButtons = Array.from(bodyElement.querySelectorAll(".inner-btn")).map(el => el.textContent.trim());
  current.length = 0; // current配列をクリア
  for (const btn of master) {
    if (!bodyButtons.includes(btn)) current.push(btn);
  }
  
  tbody.innerHTML = "";
  for (let i = 0; i < master.length; i += 4) {
    const row = document.createElement("tr");
    
    for (let j = 0; j < 4; j++) {
      const idx = i + j;
      const btn = master[idx];
      if (!btn) continue;
      
      const cell = document.createElement("td");
      cell.className = "btn";
      
      const shapeClass = getBtnShapeClass(btn);
      const colorClass = "btn-" + btn;
      
      const innerBtn = document.createElement("div");
      innerBtn.className = `inner-btn ${shapeClass} ${colorClass}`;
      innerBtn.textContent = btn;
      
      if (btn === "⬡") {
        innerBtn.style.opacity = "1.0";
        cell.classList.add("fixed-cell");
      } else if (!current.includes(btn)) {
        // ボディに配置済みのボタンは半透明にしてクリック無効にする（または除外もあり）
        innerBtn.style.opacity = "0.15";
        cell.style.pointerEvents = "none"; // クリック不可にするなら
      } else {
        // プールにあるボタン（未配置）
        innerBtn.style.opacity = "0.9";
        cell.addEventListener("click", () => {
          if (!selectedCell) return;
          
          const className = Array.from(selectedCell.classList).find(cls =>
            cls === "btn-cell5" || cls === "btn-cell6-02" || cls === "btn-cell6-03"
          );
          
          if (!className) return;
          
          // ボタン配置ロジック（省略せず既存のまま使う）
          // ... (あなたの既存処理をここにそのまま入れてください)
          
          // 再描画や同期処理もそのまま
          rebuildBtnPool(master, current, tbody, type, bodyElement);
          syncGame02ToKeymap01();
        });
      }
      
      cell.appendChild(innerBtn);
      row.appendChild(cell);
    }
    
    tbody.appendChild(row);
  }
}
*/
/*
function rebuildBtnPool(master, current, tbody, type) {
  tbody.innerHTML = "";
  
  for (let i = 0; i < master.length; i += 4) {
    const row = document.createElement("tr");
    
    for (let j = 0; j < 4; j++) {
      const idx = i + j;
      const btn = master[idx];
      if (!btn) continue;
      
      const cell = document.createElement("td");
      cell.className = "btn";
      
      const shapeClass = getBtnShapeClass(btn);
      const colorClass = "btn-" + btn;
      
      const innerBtn = document.createElement("div");
      innerBtn.className = `inner-btn ${shapeClass} ${colorClass}`;
      innerBtn.dataset.original = btn;
      innerBtn.textContent = labelMaps[currentMode]?.[btn] ?? btn;
      
      if (btn === "⬡") {
        innerBtn.style.opacity = "1.0";
        cell.classList.add("fixed-cell");
      } else if (current.includes(btn)) {
        innerBtn.style.opacity = "0.9";
        cell.addEventListener("click", () => {
          if (!selectedCell) return;
          
          const oldEl = selectedCell.querySelector(".inner-btn");
          let oldVal;
          
          if (oldEl) {
            oldVal = oldEl.dataset.original || getOriginalLabel(oldEl.textContent.trim());
          } else {
            oldVal = getOriginalLabel(selectedCell.textContent.trim());
          }
          
          updateCommandCells(selectedCommand, btn);
          
          if (oldVal && !current.includes(oldVal)) {
            current.push(oldVal);
          }
          
          const index = current.indexOf(btn);
          if (index > -1) current.splice(index, 1);
          
          selectedCell.classList.remove("highlight");
          selectedCell = null;
          selectedCommand = null;
          
          // 再構築（3種類）
          rebuildBtnPool(btnGamePool, gameBody0001Current, document.getElementById("btnGamePool"), "game");
rebuildBtnPool(btnKeymapPool2, keymapBody0002Current, document.getElementById("btnKeymapPool2"), "keymap2");
rebuildBtnPool(btnKeymapPool3, keymapBody0003Current, document.getElementById("btnKeymapPool3"), "keymap3");
        });
      } else {
        innerBtn.style.opacity = "0.15";
        cell.addEventListener("click", () => {
          if (!selectedCell) return;
          
          const valEl = selectedCell.querySelector(".inner-btn");
          const val = valEl ? valEl.textContent.trim() : selectedCell.textContent.trim();
          
          if (val && !current.includes(val)) {
            current.push(val);
          }
          
          updateCommandCells(selectedCommand, "");
          
          selectedCell.classList.remove("highlight");
          selectedCell = null;
          selectedCommand = null;
          
          // 再構築（3種類）
          rebuildBtnPool(btnGamePool, gameBody0001Current, document.getElementById("btnGamePool"), "game");
rebuildBtnPool(btnKeymapPool2, keymapBody0002Current, document.getElementById("btnKeymapPool2"), "keymap2");
rebuildBtnPool(btnKeymapPool3, keymapBody0003Current, document.getElementById("btnKeymapPool3"), "keymap3");
        });
      }
      
      cell.appendChild(innerBtn);
      row.appendChild(cell);
    }
    
    tbody.appendChild(row);
  }
}
*/
/*
function rebuildBtnPool(master, current, tbody, type) {
  tbody.innerHTML = "";
  for (let i = 0; i < master.length; i += 4) {
    const row = document.createElement("tr");
    
    for (let j = 0; j < 4; j++) {
      const idx = i + j;
      const btn = master[idx];
      if (!btn) continue;
      
      const cell = document.createElement("td");
      cell.className = "btn";
      
      const shapeClass = getBtnShapeClass(btn);
      const colorClass = "btn-" + btn;
      
      const innerBtn = document.createElement("div");
      innerBtn.className = `inner-btn ${shapeClass} ${colorClass}`;
      innerBtn.dataset.original = btn;
      innerBtn.textContent = labelMaps[currentMode]?.[btn] ?? btn;
      
      if (btn === "⬡") {
        innerBtn.style.opacity = "1.0";
        cell.classList.add("fixed-cell");
      } else
      
      if (current.includes(btn)) {
        innerBtn.style.opacity = "0.9";
        cell.addEventListener("click", () => {
          if (!selectedCell) return;
          /*
          const isKeymapCell =
            selectedCell.parentElement.parentElement === keymapBody &&
            selectedCell.cellIndex === 1;
          
          if (isKeymapCell) {
            selectedCell.innerHTML = "";
            const newBtn = innerBtn.cloneNode(true);
            selectedCell.appendChild(newBtn);
            
            selectedCell.classList.remove("highlight");
            selectedCell = null;
            selectedCommand = null;
            
            rebuildBtnPool(btngamePool, gameBody0001Current, btnGamePool, "game");
            rebuildBtnPool(btnKeymapPool2, keymapCurrent2, btnKeymapPool2, "keymap2");
            rebuildBtnPool(btnKeymapPool3, keymapCurrent3, btnKeymapPool3, "keymap3");
            return;
          }
          
          const oldEl = selectedCell.querySelector(".inner-btn");
          let oldVal;
          
          if (oldEl) {
            oldVal = oldEl.dataset.original || getOriginalLabel(oldEl.textContent.trim());
          } else {
            oldVal = getOriginalLabel(selectedCell.textContent.trim());
          }
          
          updateCommandCells(selectedCommand, btn);
          
          if (oldVal && !current.includes(oldVal)) {
            current.push(oldVal);
          }
          
          const index = current.indexOf(btn);
          if (index > -1) current.splice(index, 1);
          
          selectedCell.classList.remove("highlight");
          selectedCell = null;
          selectedCommand = null;
          
          rebuildBtnPool(btngamePool, gameBody0001Current, btnGameBody, "game");
          rebuildBtnPool(btnKeymapPool2, keymapCurrent2, btnKeymapPool2, "keymap2");
          rebuildBtnPool(btnKeymapPool3, keymapCurrent3, btnKeymapPool3, "keymap3");
        });
      } else {
        innerBtn.style.opacity = "0.15";
        cell.addEventListener("click", () => {
          if (!selectedCell) return;
          
          const valEl = selectedCell.querySelector(".inner-btn");
          const val = valEl ? valEl.textContent.trim() : selectedCell.textContent.trim();
          
          if (val && !current.includes(val)) {
            current.push(val);
          }
          
          updateCommandCells(selectedCommand, "");
          
          selectedCell.classList.remove("highlight");
          selectedCell = null;
          selectedCommand = null;
          
          rebuildBtnPool(btngamePool, gameBody0001Current, btnGamePool, "game");
          rebuildBtnPool(btnKeymapPool2, keymapCurrent2, btnKeymapPool2, "keymap2");
          rebuildBtnPool(btnKeymapPool3, keymapCurrent3, btnKeymapPool3, "keymap3");
        });
      }
      
      cell.appendChild(innerBtn);
      row.appendChild(cell);
    }
    
    tbody.appendChild(row);
  }
}
*/
/*
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded fired");
  console.log("DOM loaded!");
  createGameTable();
  createKeymapTable(keymapCommands);
  // 🎮 テーブル作成
  createGameTable();
  console.log("🧪 gameCommands:", gameCommands);
  createKeymapTable(keymapCommands);
  console.log("🧪 keymapCommands:", keymapCommands);
  
  // ✅ 初期モードを明示的に設定（例えば "default"）
  setMode("default"); // ここを追加
  
  // ✅ プール描画前に currentMode を活かせるようにする
  rebuildBtnPool(btnGamePool, gameBody0001Current, document.getElementById("btnGamePool"), "game");
  rebuildBtnPool(btnKeymapPool2, keymapBody0002Current, document.getElementById("btnKeymapPool2"), "keymap2");
  rebuildBtnPool(btnKeymapPool3, keymapBody0003Current, document.getElementById("btnKeymapPool3"), "keymap3");
  
  // 🔘 モード切り替えボタン
  document.querySelectorAll(".mode-btn button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode");
      if (!mode) return;
      
      setMode(mode);
      rebuildBtnPool(btnGamePool, gameBody0001Current, document.getElementById("btnGamePool"), "game");
      rebuildBtnPool(btnKeymapPool2, keymapBody0002Current, document.getElementById("btnKeymapPool2"), "keymap2");
      rebuildBtnPool(btnKeymapPool3, keymapBody0003Current, document.getElementById("btnKeymapPool3"), "keymap3");
      
      closePoolWindow6();
    });
  });
});
*/
/*
document.querySelectorAll("#container1 .btn-cell5").forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell, cell));
});

document.querySelectorAll("#container2 .btn-cell6-02").forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell, cell));
});

document.querySelectorAll("#container2 .btn-cell6-03").forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell, cell));
});
*/
document.addEventListener("DOMContentLoaded", () => {
  createGameTable();
  createKeymapTable(keymapCommands);
  
  // Body は空なら空のままセット（不要なら空配列のままでもOK）
  gameBody0001Current = [];
  keymapBody0002Current = [];
  keymapBody0003Current = [];
  
  // ここでBodyのDOMから配置されているボタンを読み取って current 配列に反映しても良い
  // 例: gameBody0001Current = Array.from(document.querySelectorAll("#gameBody .inner-btn")).map(el => el.textContent.trim());
  
  rebuildBtnPool(btnGamePool, gameBody0001Current, 
  document.getElementById("btnGamePool"), "game", 
  document.getElementById("gameBody"));
  rebuildBtnPool(btnKeymapPool2, keymapBody0002Current, 
  document.getElementById("btnKeymapPool2"), "keymap2", 
  document.getElementById("keymapBody2"));
  rebuildBtnPool(btnKeymapPool3, keymapBody0003Current, 
  document.getElementById("btnKeymapPool3"), "keymap3", 
  document.getElementById("keymapBody3"));
  
  document.querySelectorAll(".mode-btn button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode");
      if (!mode) return;
      setMode(mode);
    });
  });
  setMode(defaultMode);
  closePoolWindow5();
  closePoolWindow2();
  closePoolWindow3();
  
  
  
  syncGame02ToKeymap01();
});