import { ButtonFactory } from "./buttonfactory.ts";

// ---------- Style: a rainbow glow-up ----------
const style = document.createElement("style");
style.textContent = `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: "Segoe UI", system-ui, sans-serif;
    color: #fff;
    background: linear-gradient(
      270deg,
      #ff6ec4, #ffc93c, #78ff96, #4facfe, #b24bf3, #ff6ec4
    );
    background-size: 1200% 1200%;
    animation: rainbowShift 18s ease infinite;
    overflow-x: hidden;
  }

  @keyframes rainbowShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  #app {
    max-width: 480px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }

  h1 {
    font-size: 2.4rem;
    margin: 0;
    background: linear-gradient(90deg, #fffb7d, #ff6ec4, #4facfe, #78ff96);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: rainbowShift 6s ease infinite;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.25);
  }

  p {
    margin: 0;
    font-size: 1.05rem;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
  }

  #icon {
    width: 128px;
    height: 128px;
    margin: 1rem 0;
    cursor: pointer;
    user-select: none;
    filter: drop-shadow(0 0 24px rgba(255, 220, 100, 0.75));
    animation: flip 3.5s ease-in-out infinite;
    transition: transform 0.1s ease;
  }

  #icon:active {
    transform: scale(0.85);
  }

  @keyframes flip {
    0%, 100% { transform: translateY(0) rotateY(0deg); }
    50%      { transform: translateY(-10px) rotateY(180deg); }
  }

  #stats-panel {
    width: 100%;
    margin-top: 1rem;
    padding: 1rem 1.25rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  #stats-panel h2 {
    margin: 0 0 0.5rem;
    font-size: 1.15rem;
    letter-spacing: 0.02em;
  }

  #stats-panel .row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.25rem 0;
    font-size: 0.95rem;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  #stats-panel .row b {
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  #invest-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  #invest-button {
    background: linear-gradient(135deg, #00b894, #78ff96);
    box-shadow: 0 4px 18px rgba(0, 184, 148, 0.45);
  }

  #withdraw-button {
    background: linear-gradient(135deg, #ff9f43, #ffc93c);
    box-shadow: 0 4px 18px rgba(255, 159, 67, 0.45);
  }

  button {
    font: inherit;
    font-weight: 700;
    font-size: 1.05rem;
    color: #fff;
    padding: 0.75rem 1.6rem;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    background: linear-gradient(135deg, #ff6ec4, #b24bf3);
    box-shadow: 0 4px 18px rgba(178, 75, 243, 0.45);
    transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
  }

  button:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 8px 26px rgba(255, 110, 196, 0.6);
    filter: brightness(1.1);
  }

  button:active:not(:disabled) {
    transform: scale(0.96);
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }

  #click-button {
    background: linear-gradient(135deg, #ffc93c, #ff6ec4);
    box-shadow: 0 4px 18px rgba(255, 110, 196, 0.45);
    font-size: 1.25rem;
    padding: 0.9rem 2.2rem;
  }

  #upgrade-button1 {
    background: linear-gradient(135deg, #4facfe, #78ff96);
    box-shadow: 0 4px 18px rgba(79, 172, 254, 0.45);
  }

  #upgrade-button2 {
    background: linear-gradient(135deg, #b24bf3, #4facfe);
    box-shadow: 0 4px 18px rgba(120, 255, 150, 0.35);
  }

  .generator-button {
    background: linear-gradient(135deg, #ffc93c, #78ff96);
    box-shadow: 0 4px 18px rgba(255, 201, 60, 0.4);
  }

  #reset-button {
    background: linear-gradient(135deg, #ff5f5f, #ffc93c);
    box-shadow: 0 4px 18px rgba(255, 95, 95, 0.4);
    font-size: 0.95rem;
    padding: 0.6rem 1.4rem;
    margin-top: 0.5rem;
  }

  #counter {
    font-size: 2rem;
    font-weight: 800;
    text-shadow: 0 0 18px rgba(255, 255, 255, 0.6), 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  #particle-canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
  }
`;
document.head.append(style);

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "✨ Gold Rush ✨";

// A golden coin stamped with a glowing gem — clickable money maker
const icon = document.createElement("div");
icon.id = "icon";
icon.setAttribute("role", "button");
icon.setAttribute("aria-label", "Click to collect gold");
icon.innerHTML = `
  <svg viewBox="0 0 100 100" width="128" height="128">
    <defs>
      <radialGradient id="coinFace" cx="35%" cy="30%" r="80%">
        <stop offset="0%" stop-color="#fff3b0"/>
        <stop offset="55%" stop-color="#ffc93c"/>
        <stop offset="100%" stop-color="#c98a00"/>
      </radialGradient>
      <linearGradient id="gemGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#aef4ff"/>
        <stop offset="50%" stop-color="#4facfe"/>
        <stop offset="100%" stop-color="#b24bf3"/>
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#coinFace)"
      stroke="#8a5a00" stroke-width="3"/>
    <circle cx="50" cy="50" r="36" fill="none"
      stroke="#8a5a00" stroke-width="2" opacity="0.5"/>
    <polygon points="50,26 68,42 50,74 32,42" fill="url(#gemGrad)"
      stroke="#ffffff" stroke-width="2"/>
    <ellipse cx="34" cy="30" rx="12" ry="7" fill="#ffffff" opacity="0.45"
      transform="rotate(-25 34 30)"/>
  </svg>
`;

const message = document.createElement("p");
message.textContent = "Click the coin to collect gold!";

app.append(heading, icon, message);

// Full-screen canvas for particle bursts
const canvas = document.createElement("canvas");
canvas.id = "particle-canvas";
document.body.append(canvas);
const ctx = canvas.getContext("2d")!;

function resizeCanvas() {
  canvas.width = globalThis.innerWidth * devicePixelRatio;
  canvas.height = globalThis.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
resizeCanvas();
globalThis.addEventListener("resize", resizeCanvas);

// ---------- Particle system ----------
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  spin: number;
  angle: number;
}

const particles: Particle[] = [];

function randomRainbow(): string {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 62%)`;
}

function burst(x: number, y: number, count: number = 28) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 120 + Math.random() * 320;
    const maxLife = 0.5 + Math.random() * 0.6;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 80,
      size: 4 + Math.random() * 7,
      color: randomRainbow(),
      life: maxLife,
      maxLife,
      spin: (Math.random() - 0.5) * 12,
      angle: Math.random() * Math.PI * 2,
    });
  }
}

// Spawn particles exactly where the player pressed. Keyboard-activated
// clicks report (0, 0), so fall back to the center of the acted-on element.
function burstAtPointer(event: PointerEvent, fallbackEl: Element, count = 28) {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  let x = event.clientX;
  let y = event.clientY;
  if (x === 0 && y === 0) {
    const rect = fallbackEl.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  }
  burst(x, y, count);
}

function updateParticles(dt: number) {
  ctx.clearRect(0, 0, globalThis.innerWidth, globalThis.innerHeight);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }
    p.vy += 900 * dt; // gravity
    p.vx *= 0.98;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.angle += p.spin * dt;

    const alpha = p.life / p.maxLife;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  }
}

// Button
const clickButton = document.createElement("button");
clickButton.id = "click-button";
clickButton.textContent = "Money!";
app.append(clickButton);

// Counter state + display — start with 500 million golds
let counter: number = 500000000; // start with 500 million golds
let growthRate: number = 500_000_000; // Golds per second (passive generation)

const counterDisplay = document.createElement("div");
counterDisplay.id = "counter";
app.append(counterDisplay);

// Named scales from Million up to Decillion (10^6 .. 10^33)
const SCALES = [
  { name: "Million", threshold: 1e6 },
  { name: "Billion", threshold: 1e9 },
  { name: "Trillion", threshold: 1e12 },
  { name: "Quadrillion", threshold: 1e15 },
  { name: "Quintillion", threshold: 1e18 },
  { name: "Sextillion", threshold: 1e21 },
  { name: "Septillion", threshold: 1e24 },
  { name: "Octillion", threshold: 1e27 },
  { name: "Nonillion", threshold: 1e30 },
  { name: "Decillion", threshold: 1e33 },
];

// Format gold with suffixes: 1234 -> "1,234 Golds",
// 2500000000 -> "2.50 Billion Golds"
function formatGold(value: number): string {
  const whole = Math.floor(value);
  if (whole < 1e6) {
    return `${whole.toLocaleString()} Golds`;
  }
  if (whole >= 1e36) {
    return `${whole.toExponential(2)} Golds`;
  }
  let scale = SCALES[0];
  for (const s of SCALES) {
    if (whole >= s.threshold) scale = s;
  }
  return `${(whole / scale.threshold).toFixed(2)} ${scale.name} Golds`;
}

//establish upgrade button1 with initial cost of 50 Golds
const upgradeButton1 = document.createElement("button");
upgradeButton1.id = "upgrade-button1";
upgradeButton1.textContent = "More Money! (50 Golds)";
upgradeButton1.setAttribute("disabled", "true");
let upgrade1Clicks: number = 50;
app.append(upgradeButton1);

//establish upgrade button 2 with initial cost of 200 Golds
const upgradeButton2 = document.createElement("button");
upgradeButton2.id = "upgrade-button2";
upgradeButton2.textContent = "Even More Money!";
upgradeButton2.setAttribute("disabled", "true");
let upgrade2Clicks: number = 200;
app.append(upgradeButton2);

const myButtonFactory = new ButtonFactory();
const myNewButton: HTMLButtonElement = myButtonFactory.createButton(
  "myNewButton",
  "myNewID",
);
app.append(myNewButton);

// Passive gold generators: buy one and it permanently raises growth rate
interface GoldGenerator {
  button: HTMLButtonElement;
  name: string;
  baseCost: number;
  cost: number;
  income: number; // Golds per second per purchase
}

const generatorDefs = [
  { name: "Gold Mine", baseCost: 100e6, income: 1e6 },
  { name: "Gold Factory", baseCost: 5e9, income: 50e6 },
  { name: "Orbital Refinery", baseCost: 500e9, income: 5e9 },
];

const generators: GoldGenerator[] = [];
for (const def of generatorDefs) {
  const button = document.createElement("button");
  button.classList.add("generator-button");
  button.setAttribute("disabled", "true");
  app.append(button);
  generators.push({
    button,
    name: def.name,
    baseCost: def.baseCost,
    cost: def.baseCost,
    income: def.income,
  });
}

// ---------- Investment: park gold, earn 1% compounding interest per second ----------
let invested: number = 0;
let totalEarned: number = 500000000; // includes the starting gold
let totalClicks: number = 0;

const investRow = document.createElement("div");
investRow.id = "invest-row";

const investButton = document.createElement("button");
investButton.id = "invest-button";
investButton.textContent = "Invest 10%";
investButton.setAttribute("disabled", "true");

const withdrawButton = document.createElement("button");
withdrawButton.id = "withdraw-button";
withdrawButton.textContent = "Withdraw";
withdrawButton.setAttribute("disabled", "true");

investRow.append(investButton, withdrawButton);
app.append(investRow);

// ---------- GUI: live stats panel ----------
const panel = document.createElement("div");
panel.id = "stats-panel";
panel.innerHTML = `
  <h2>📊 Ledger</h2>
  <div class="row"><span>Gold per second</span><b id="stat-gps"></b></div>
  <div class="row"><span>Total earned</span><b id="stat-total"></b></div>
  <div class="row"><span>Clicks</span><b id="stat-clicks"></b></div>
  <div class="row"><span>Invested</span><b id="stat-invested"></b></div>
  <div class="row"><span>Interest</span><b>+1% / sec</b></div>
`;
app.append(panel);

const statGps = panel.querySelector<HTMLElement>("#stat-gps")!;
const statTotal = panel.querySelector<HTMLElement>("#stat-total")!;
const statClicks = panel.querySelector<HTMLElement>("#stat-clicks")!;
const statInvested = panel.querySelector<HTMLElement>("#stat-invested")!;

function updateDisplay() {
  counterDisplay.textContent = formatGold(counter);
  upgradeButton1.textContent = `More Money! (${
    Math.floor(upgrade1Clicks)
  } Golds)`;
  upgradeButton2.textContent = `Even More Money! (${
    Math.floor(upgrade2Clicks)
  } Golds)`;
  for (const g of generators) {
    g.button.textContent = `Buy ${g.name} — ${formatGold(g.cost)} (+${
      formatGold(g.income)
    }/s)`;
  }
  investButton.textContent = `Invest 10% (${
    formatGold(Math.floor(counter * 0.1))
  })`;
  withdrawButton.textContent = `Withdraw (${formatGold(invested)})`;
  statGps.textContent = `${formatGold(growthRate)}/s`;
  statTotal.textContent = formatGold(totalEarned);
  statClicks.textContent = totalClicks.toLocaleString();
  statInvested.textContent = formatGold(invested);
}
updateDisplay();

//click upgrade button to increase growth rate by 1
//also increases cost by 1 per use
upgradeButton1.addEventListener("click", () => {
  counter -= upgrade1Clicks;
  growthRate += 1;
  upgrade1Clicks += 1;
  updateDisplay();
});

//click upgrade button 2 to increase growth rate by 10
//also increases cost by 5 per use
upgradeButton2.addEventListener("click", () => {
  counter -= upgrade2Clicks;
  growthRate += 10;
  upgrade2Clicks += 5;
  updateDisplay();
});

// Buying a generator spends its cost and permanently raises growth rate
// by its income. Each purchase doubles the cost of the next one.
for (const g of generators) {
  g.button.addEventListener("click", () => {
    counter -= g.cost;
    growthRate += g.income;
    g.cost = Math.floor(g.cost * 2);
    updateDisplay();
  });
}

// Investing moves 10% of your gold into the pool; it compounds at +1%/sec
investButton.addEventListener("click", () => {
  const amount = Math.floor(counter * 0.1);
  if (amount <= 0) return;
  counter -= amount;
  invested += amount;
  updateDisplay();
});

withdrawButton.addEventListener("click", () => {
  counter += invested;
  invested = 0;
  updateDisplay();
});

//check for counter number to enable upgrade buttons
function updateClick() {
  if (counter >= upgrade1Clicks) {
    upgradeButton1.removeAttribute("disabled");
  } else {
    upgradeButton1.setAttribute("disabled", "true");
  }

  if (counter >= upgrade2Clicks) {
    upgradeButton2.removeAttribute("disabled");
  } else {
    upgradeButton2.setAttribute("disabled", "true");
  }

  for (const g of generators) {
    if (counter >= g.cost) {
      g.button.removeAttribute("disabled");
    } else {
      g.button.setAttribute("disabled", "true");
    }
  }

  if (counter >= 1000) {
    investButton.removeAttribute("disabled");
  } else {
    investButton.setAttribute("disabled", "true");
  }

  if (invested > 0) {
    withdrawButton.removeAttribute("disabled");
  } else {
    withdrawButton.setAttribute("disabled", "true");
  }
}
updateClick();

// Automatic growth based on real elapsed time
// Also updates clickability of upgrade buttons
let lastTime = performance.now();

function tick(now: number) {
  const elapsedSeconds = (now - lastTime) / 1000;
  lastTime = now;

  counter += growthRate * elapsedSeconds;
  totalEarned += growthRate * elapsedSeconds;
  // Investment compounds at +1% per second
  invested *= Math.pow(1.01, elapsedSeconds);
  updateDisplay();
  updateClick();
  updateParticles(elapsedSeconds);

  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

// Reset button
const resetButton = document.createElement("button");
resetButton.id = "reset-button";
resetButton.textContent = "Reset";
app.append(resetButton);

resetButton.addEventListener("click", () => {
  counter = 500000000;
  growthRate = 500_000_000;
  invested = 0;
  totalEarned = 500000000;
  totalClicks = 0;
  for (const g of generators) {
    g.cost = g.baseCost;
  }
  updateDisplay();
});

// Particles fire on pointerdown so they appear at the exact spot pressed
resetButton.addEventListener("pointerdown", (event) => {
  burstAtPointer(event, resetButton, 40);
});

// Click adds to the counter
clickButton.addEventListener("click", () => {
  counter += 1;
  totalEarned += 1;
  totalClicks += 1;
  updateDisplay();
});
clickButton.addEventListener("pointerdown", (event) => {
  burstAtPointer(event, clickButton);
});

// Clicking the coin also adds to the counter
icon.addEventListener("click", () => {
  counter += 1;
  totalEarned += 1;
  totalClicks += 1;
  updateDisplay();
});
icon.addEventListener("pointerdown", (event) => {
  burstAtPointer(event, icon);
});

// Generators burst where pressed too
for (const g of generators) {
  g.button.addEventListener("pointerdown", (event) => {
    burstAtPointer(event, g.button, 34);
  });
}
