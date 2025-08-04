// script46.js
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
  xbox: {
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
    M1: "M1",
    M2: "M2",
    M3: "M3",
    M4: "M4",
    "⬆": "⬆",
    "⬇": "⬇",
    "⬅": "⬅",
    "➡": "➡"
  },
  ps: {
    X: "✕",
    Y: "△",
    A: "〇",
    B: "□",
    LB: "L1",
    RB: "R1",
    LT: "L2",
    RT: "R2",
    L3: "L3",
    R3: "R3",
    M1: "M1",
    M2: "M2",
    M3: "M3",
    M4: "M4",
    "⬆": "↑",
    "⬇": "↓",
    "⬅": "←",
    "➡": "→"
  },
  switch: {
    X: "XX",
    Y: "YY",
    A: "AA",
    B: "BB",
    LB: "L",
    RB: "R",
    LT: "ZL",
    RT: "ZR",
    L3: "L3",
    R3: "R3",
    M1: "M1",
    M2: "M2",
    M3: "M3",
    M4: "M4",
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

const gameBtnPool = [
  "X", "Y", "A", "B", "⬆", "⬇", "⬅", "➡",
  "LB", "RB", "LT", "RT", "L3", "R3",
  "❐", "≡", "📷", "⬡",
  "⇧🕹L", "⇩🕹L", "⇦🕹L", "⇨🕹L"
];
const keymapBtnPool = [
  "X", "Y", "A", "B", "⬆", "⬇", "⬅", "➡",
  "LB", "RB", "LT", "RT", "L3", "R3",
  "❐", "≡", "📷", "⬡", "M1", "M2", "M3", "M4"
];

const gameBody = document.getElementById("gameBody");
const keymapBody = document.getElementById("keymapBody");
const btnGameBody = document.getElementById("btnGameBody");
const btnKeymapBody = document.getElementById("btnKeymapBody");

const container1 = document.getElementById("container1");
const container2 = document.getElementById("container2");
const poolWindow5 = document.getElementById("container5");
const poolWindow6 = document.getElementById("container6");

const commandCellMap = new Map();
const keymapCellMap = new Map();

let currentMode = "xbox";

let selectedCell = null;
let selectedCommand = null;
let aimButton = "";
let currentGamePool = [...gameBtnPool];
let currentKeymapPool = [...keymapBtnPool];

function syncGame02ToKeymap01() {
  const gameRows = [...gameBody.querySelectorAll("tr")];
  const keymapRows = [...keymapBody.querySelectorAll("tr")];
  
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
  gameCommands.forEach((cmd, index) => {
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
        // game側
        cell.addEventListener("click", () => handleCellClick(cell, cmd.name, false));
        /*
        cell.addEventListener("click", () => handleCellClick(cell, cmd.name));
        */
        cell.classList.add("btn-cell5");
        commandCellMap.get(cmd.name).push(cell);
      }
      
      row.appendChild(cell);
    }
    
    gameBody.appendChild(row);
  });
  // createGameTable() の最後などに
  enableRowDragAndDrop(gameBody, keymapBody);
}

function createKeymapTable() {
  keymapBody.innerHTML = ""; // 先にクリア
  
  keymapCommands.forEach((cmd, index) => {
    const row = document.createElement("tr");
    row.dataset.index = index;
    
    // 4列目のコマンド名セル
    const cmdCell = document.createElement("td");
    cmdCell.textContent = cmd.name;
    row.appendChild(cmdCell);
    
    // 2〜4列目（btn-cell6-02〜04）
    for (let i = 0; i < 3; i++) {
      const cell = document.createElement("td");
      cell.classList.add("btn-cell6", `btn-cell6-0${i + 2}`);
      cell.addEventListener("click", () => handleCellClick(cell, btn, true));
      /*
      cell.addEventListener("click", () => handleCellClick(cell, cmd.name));
      */
      if (!cmd) cell.innerHTML = "　";
      
      // 2列目だけ keymapCellMap に登録
      if (i === 0) {
        if (!keymapCellMap.has(cmd.name)) {
          keymapCellMap.set(cmd.name, []);
        }
        keymapCellMap.get(cmd.name).push(cell);
      }
      
      row.appendChild(cell);
    }
    
    keymapBody.appendChild(row);
  });
  
  enableRowDragAndDrop(gameBody, keymapBody);
}
/*
function createKeymapTable() {

  keymapBtnPool.forEach((btn, index) => {
    const row = document.createElement("tr");
    row.dataset.index = index;
    
    const toCell = document.createElement("td");
    
    toCell.textContent = btn;
    
    row.appendChild(toCell);
    
    for (let i = 0; i < 3; i++) {
      const cell = document.createElement("td");
      cell.classList.add("btn-cell6", `btn-cell6-0${i + 2}`);
      cell.addEventListener("click", () => handleCellClick(cell, btn));
      if (!btn) cell.innerHTML = "　";
      row.appendChild(cell);
    }
    
    keymapBody.appendChild(row);
  });
  enableRowDragAndDrop(gameBody, keymapBody);
}
*/
function syncRowOrdersBetweenTables() {
  const gameRows = [...gameBody.querySelectorAll("tr")];
  const keymapRows = [...keymapBody.querySelectorAll("tr")];
  
  gameRows.forEach((gameRow, i) => {
    const correspondingKeymapRow = keymapRows[i];
    if (correspondingKeymapRow) {
      keymapBody.appendChild(correspondingKeymapRow);
    }
  });
}

function updateKeymapCell() {
  keymapCell.innerHTML = gameCell.innerHTML;
}

function enableRowDragAndDrop(primaryBody, syncedBody) {
  let draggingRow = null;
  
  primaryBody.querySelectorAll("tr").forEach((row) => {
    row.setAttribute("draggable", true);
    
    row.addEventListener("dragstart", () => {
      draggingRow = row;
      row.classList.add("dragging");
      
      const index = [...primaryBody.children].indexOf(row);
      const syncedRow = syncedBody.children[index];
      if (syncedRow) syncedRow.classList.add("dragging");
    });
    
    row.addEventListener("dragend", () => {
      syncRowOrdersBetweenTables()
      const index = [...primaryBody.children].indexOf(draggingRow);
      const syncedRow = syncedBody.querySelector(".dragging");
      
      if (syncedRow) syncedRow.classList.remove("dragging");
      if (draggingRow) draggingRow.classList.remove("dragging");
      
      draggingRow = null;
    });
    
  });
  
  primaryBody.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = primaryBody.querySelector(".dragging");
    if (!dragging) return;
    
    const after = Array.from(primaryBody.children).find((child) => {
      const rect = child.getBoundingClientRect();
      return e.clientY < rect.top + rect.height / 2;
    });
    
    const draggingIndex = [...primaryBody.children].indexOf(dragging);
    
    if (!after) {
      primaryBody.appendChild(dragging);
      syncedBody.appendChild(syncedBody.children[draggingIndex]);
    } else {
      const afterIndex = [...primaryBody.children].indexOf(after);
      primaryBody.insertBefore(dragging, after);
      syncedBody.insertBefore(syncedBody.children[draggingIndex], syncedBody.children[afterIndex]);
    }
  });
}

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

function closePoolWindow5() {
  poolWindow5.classList.remove("show");
}

function closePoolWindow6() {
  poolWindow6.classList.remove("show");
}

function handleCellClick(cell, cmd) {
  console.log("handleCellClick called:", cell, cmd);
  console.log("cell.classList:", cell.classList);
  
  if (selectedCell === cell) {
    selectedCell.classList.remove("highlight");
    selectedCell = null;
    selectedCommand = null;
    return;
  }
  
  if (selectedCell) {
    const oldVal = selectedCell.textContent;
    const newVal = cell.textContent;
    updateCommandCells(selectedCommand, newVal, isKeymap);
    updateCommandCells(cmd, oldVal, isKeymap);
    /*
    updateCommandCells(selectedCommand, newVal);
    updateCommandCells(cmd, oldVal);
    */
    selectedCell.classList.remove("highlight");
    selectedCell = null;
    selectedCommand = null;
    
    syncGame02ToKeymap01();
    
  } else {
    selectedCell = cell;
    selectedCommand = cmd;
    cell.classList.add("highlight");
    
    // ウィンドウ表示処理（poolWindow5 or poolWindow6）
    if (cell.classList.contains("btn-cell5")) {
      poolWindow6.classList.remove("show");
      container2.style.zIndex = 97;
      container1.style.zIndex = 99;
      alignPopup(container2, poolWindow5);
      poolWindow5.classList.add("show");
    } else if (cell.classList.contains("btn-cell6-02")) {
      poolWindow5.classList.remove("show");
      container1.style.zIndex = 97;
      container2.style.zIndex = 99;
      alignPopup(container1, poolWindow6);
      poolWindow6.classList.add("show");
    }
  }
}

function updateCommandCells(cmd, val, isKeymap = false) {
  const map = isKeymap ? keymapCellMap : commandCellMap;
  if (!map.has(cmd)) return;
  
  const isBtn = keymapBtnPool.includes(val) || gameBtnPool.includes(val);
  
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
  
  map.get(cmd).forEach((c) => {
    c.innerHTML = "";
    if (isBtn) {
      c.appendChild(createBtnEl(val));
    } else {
      c.textContent = val;
    }
  });
  
  if (!isKeymap) {
    if (cmd === "AIM") {
      aimButton = val;
      updateLeanBinds();
    }
    
    if (cmd === "RELOAD" || cmd === "INTERACT") {
      const groupVal = val;
      ["RELOAD", "INTERACT"].forEach((key) => {
        if (!map.has(key)) return;
        map.get(key).forEach((c) => {
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
}

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
  document.body.className = `mode-${mode}`;
  updateButtonLabels(mode);
  updateCommandCellLabels(); // ←追加：セル内も更新
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
      innerBtn.textContent = btn;
      
      if (btn === "⬡") {
        innerBtn.style.opacity = "1.0";
        cell.classList.add("fixed-cell");
      } else
      
      if (current.includes(btn)) {
        innerBtn.style.opacity = "0.9";
        cell.addEventListener("click", () => {
          if (!selectedCell) return;
          
          const isKeymapCell = selectedCell.parentElement.parentElement === keymapBody && selectedCell.cellIndex === 1;
          
          if (isKeymapCell) {
            // 🎯 keymapBody の 2列目セルに配置
            selectedCell.innerHTML = ""; // 中身クリア
            const newBtn = innerBtn.cloneNode(true);
            selectedCell.appendChild(newBtn);
            
            selectedCell.classList.remove("highlight");
            selectedCell = null;
            selectedCommand = null;
            
            rebuildBtnPool(master, current, tbody, type);
            return;
          }
          
          // 1. コマンドセル側の元のボタン取得  
          const oldEl = selectedCell.querySelector(".inner-btn");
          let oldVal;
          
          if (oldEl) {
            oldVal = oldEl.dataset.original || getOriginalLabel(oldEl.textContent.trim());
          } else {
            oldVal = getOriginalLabel(selectedCell.textContent.trim());
          }
          
          // 2. コマンドセルに新しいボタンを配置  
          updateCommandCells(selectedCommand, btn);
          
          
          // 3. oldVal を Btn Pool に戻す（重複防止）  
          if (oldVal && !current.includes(oldVal)) {
            current.push(oldVal);
          }
          
          
          // 4. 今クリックされたボタンを Btn Pool から削除  
          const index = current.indexOf(btn);
          if (index > -1) current.splice(index, 1);
          
          // 5. 終了処理  
          selectedCell.classList.remove("highlight");
          selectedCell = null;
          selectedCommand = null;
          
          // 6. 再描画  
          rebuildBtnPool(master, current, tbody, type);
          /*
          clearKeymapButtons();
          */
          syncGame02ToKeymap01();
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
          /*
          clearKeymapButtons();
          */
          syncGame02ToKeymap01();
          
          selectedCell.classList.remove("highlight");
          selectedCell = null;
          selectedCommand = null;
          
          rebuildBtnPool(master, current, tbody, type);
        });
      }
      
      cell.appendChild(innerBtn);
      row.appendChild(cell);
    }
    
    tbody.appendChild(row);
  }
  
}

document.querySelectorAll("#container1 .btn-cell5").forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell, cell));
});

document.querySelectorAll("#container2 .btn-cell6").forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell, cell));
});

document.addEventListener("DOMContentLoaded", () => {
  createGameTable();
  createKeymapTable();
  rebuildBtnPool(gameBtnPool, currentGamePool, btnGameBody, "game");
  rebuildBtnPool(keymapBtnPool, currentKeymapPool, btnKeymapBody, "keymap");
  
  document.querySelectorAll(".mode-btn button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode");
      if (!mode) return;
      setMode(mode);
    });
  });
  // poolWindow 初期非表示
  closePoolWindow5();
  closePoolWindow6();
  /*
  clearKeymapButtons();
  */
  syncGame02ToKeymap01();
});