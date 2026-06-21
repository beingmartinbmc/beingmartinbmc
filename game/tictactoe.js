#!/usr/bin/env node
/**
 * README Tic-Tac-Toe vs an unbeatable (minimax) bot.
 *
 * Visitors play by opening a pre-filled GitHub Issue (e.g. title "ttt-move-4").
 * A GitHub Action runs this script, which:
 *   1. applies the visitor's move (X),
 *   2. lets the minimax bot respond (O),
 *   3. rewrites the board between the markers in README.md,
 *   4. persists state + win/loss/draw stats in game/state.json.
 *
 * Commands (passed as argv[2]):
 *   move-<0..8>   place X at the given cell (if empty and game is live)
 *   reset         start a fresh game
 *   render        just re-render the README from current state
 */

const fs = require("fs");
const path = require("path");

const REPO = process.env.GAME_REPO || "beingmartinbmc/beingmartinbmc";
const ROOT = path.join(__dirname, "..");
const STATE_PATH = path.join(__dirname, "state.json");
const README_PATH = path.join(ROOT, "README.md");

const HUMAN = "X";
const BOT = "O";
const START = "<!-- TICTACTOE:START -->";
const END = "<!-- TICTACTOE:END -->";

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
];

function defaultState() {
  return {
    board: ["", "", "", "", "", "", "", "", ""],
    status: "live", // live | win | lose | draw
    lastMove: null,
    stats: { wins: 0, losses: 0, draws: 0 },
    updatedAt: new Date().toISOString(),
  };
}

function loadState() {
  try {
    const raw = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
    const base = defaultState();
    return { ...base, ...raw, stats: { ...base.stats, ...(raw.stats || {}) } };
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  state.updatedAt = new Date().toISOString();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n");
}

function winnerOf(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: [a, b, c] };
    }
  }
  return null;
}

function isFull(board) {
  return board.every((c) => c !== "");
}

/** Minimax — returns best score for `player` to move. Bot is the maximizer. */
function minimax(board, player) {
  const win = winnerOf(board);
  if (win) return win.player === BOT ? 10 : -10;
  if (isFull(board)) return 0;

  const scores = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = player;
      scores.push(minimax(board, player === BOT ? HUMAN : BOT));
      board[i] = "";
    }
  }
  return player === BOT ? Math.max(...scores) : Math.min(...scores);
}

function bestBotMove(board) {
  let best = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = BOT;
      const score = minimax(board, HUMAN);
      board[i] = "";
      if (score > best) {
        best = score;
        move = i;
      }
    }
  }
  return move;
}

function resolve(state) {
  const win = winnerOf(state.board);
  if (win) {
    state.winLine = win.line;
    if (win.player === HUMAN) {
      state.status = "win";
      state.stats.wins++;
    } else {
      state.status = "lose";
      state.stats.losses++;
    }
    return true;
  }
  if (isFull(state.board)) {
    state.status = "draw";
    state.stats.draws++;
    return true;
  }
  return false;
}

function applyMove(state, cell) {
  if (state.status !== "live") return { ok: false, reason: "Game already finished. Start a new game!" };
  if (cell < 0 || cell > 8) return { ok: false, reason: "Invalid cell." };
  if (state.board[cell] !== "") return { ok: false, reason: "That cell is already taken." };

  state.board[cell] = HUMAN;
  state.lastMove = cell;
  if (resolve(state)) return { ok: true };

  const botCell = bestBotMove(state.board);
  if (botCell >= 0) {
    state.board[botCell] = BOT;
    state.lastMove = botCell;
    resolve(state);
  }
  return { ok: true };
}

// ---------- rendering ----------

function issueUrl(title) {
  const body = encodeURIComponent(
    "Just press **Submit new issue** below to make your move — a bot will take it from here and close this automatically. 🤖"
  );
  return `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${body}`;
}

const BADGE = {
  X: "https://img.shields.io/badge/-%E2%9D%8C-6C63FF?style=for-the-badge&labelColor=0D1117",
  O: "https://img.shields.io/badge/-%E2%AD%95-FF6584?style=for-the-badge&labelColor=0D1117",
  EMPTY: "https://img.shields.io/badge/-%20%E2%80%A2%20-1A1B27?style=for-the-badge&labelColor=1A1B27",
};

function cellMarkdown(state, i) {
  const v = state.board[i];
  if (v === HUMAN) return `<img src="${BADGE.X}" alt="X" />`;
  if (v === BOT) return `<img src="${BADGE.O}" alt="O" />`;
  if (state.status === "live") {
    return `<a href="${issueUrl(`ttt-move-${i}`)}"><img src="${BADGE.EMPTY}" alt="play cell ${i}" /></a>`;
  }
  return `<img src="${BADGE.EMPTY}" alt="empty" />`;
}

function statusLine(state) {
  switch (state.status) {
    case "win":
      return "🎉 <b>You win!</b> (good luck doing that again — it's minimax)";
    case "lose":
      return "🤖 <b>Bot wins.</b> The AI is unbeatable — best you can do is force a draw.";
    case "draw":
      return "🤝 <b>Draw!</b> Nicely played — that's the best possible result against minimax.";
    default:
      return "🟢 <b>Your move.</b> You're ❌ — click any empty square to play.";
  }
}

function renderBoard(state) {
  const rows = [];
  for (let r = 0; r < 3; r++) {
    const cells = [0, 1, 2].map((c) => cellMarkdown(state, r * 3 + c));
    rows.push(`      <tr>\n        <td align="center">${cells[0]}</td>\n        <td align="center">${cells[1]}</td>\n        <td align="center">${cells[2]}</td>\n      </tr>`);
  }

  const { wins, losses, draws } = state.stats;
  const newGame = `<a href="${issueUrl("ttt-reset")}"><img src="https://img.shields.io/badge/%E2%96%B6%20NEW%20GAME-6C63FF?style=for-the-badge&labelColor=0D1117" alt="New Game" /></a>`;

  return [
    "## 🎮 Play Me at Tic-Tac-Toe",
    "",
    "> You're **❌** vs an **unbeatable minimax bot ⭕**. Click an empty square — it opens a pre-filled issue; just submit it and the board updates automatically. _(Give it a few seconds for the Action to run, then refresh.)_",
    "",
    "<p align=\"center\">",
    "  <table>",
    rows.join("\n"),
    "  </table>",
    "</p>",
    "",
    `<p align="center">${statusLine(state)}</p>`,
    "",
    `<p align="center">${newGame}</p>`,
    "",
    `<p align="center"><sub>🏆 Wins: <b>${wins}</b> &nbsp;|&nbsp; 💀 Losses: <b>${losses}</b> &nbsp;|&nbsp; 🤝 Draws: <b>${draws}</b></sub></p>`,
  ].join("\n");
}

function writeReadme(state) {
  const readme = fs.readFileSync(README_PATH, "utf8");
  const block = `${START}\n${renderBoard(state)}\n${END}`;
  if (!readme.includes(START) || !readme.includes(END)) {
    throw new Error("README markers not found. Add the TICTACTOE markers first.");
  }
  const re = new RegExp(`${START}[\\s\\S]*?${END}`);
  fs.writeFileSync(README_PATH, readme.replace(re, block));
}

// ---------- main ----------

function main() {
  const cmd = (process.argv[2] || "render").trim().toLowerCase();
  let state = loadState();
  let message = "";

  if (cmd === "reset") {
    const stats = state.stats;
    state = defaultState();
    state.stats = stats; // keep the scoreboard across games
    message = "🔄 New game started. You're ❌ — make your move!";
  } else if (cmd.startsWith("move-")) {
    const cell = parseInt(cmd.slice("move-".length), 10);
    const res = applyMove(state, cell);
    message = res.ok ? statusLine(state) : `⚠️ ${res.reason}`;
  } else if (cmd === "render") {
    // no-op, just re-render
  } else {
    message = `⚠️ Unknown command: ${cmd}`;
  }

  saveState(state);
  writeReadme(state);

  // Expose a message for the workflow to comment back on the issue.
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `message<<EOF\n${message}\nEOF\n`);
  }
  console.log(message || "rendered");
}

main();
