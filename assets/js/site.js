window.BAG = {
  name: "BACKPACK",
  ticker: "$BACKPACK",
  ca: "",
  pons: "https://www.ponsfamily.com/launchpad",
  x: "",
  chain: "Robinhood Chain",
  chainId: 4663,
};

window.BAG.short = "CA · coming soon";

function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return [...root.querySelectorAll(sel)]; }

function toast(msg) {
  let t = $(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(t._id);
  t._id = setTimeout(() => t.classList.remove("on"), 1800);
}

function copyCA() {
  const ca = window.BAG.ca;
  if (!ca) {
    toast("CA coming soon");
    return;
  }
  navigator.clipboard.writeText(ca).then(() => toast("CA coming soon")).catch(() => toast(ca));
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("on");
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove("on");
}

function drawChart(svg) {
  if (!svg) return;
  const w = 640, h = 280;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  let close = 150;
  const candles = [];
  const vols = [];
  for (let i = 0; i < 22; i++) {
    const open = close;
    close = Math.max(70, Math.min(190, open + (Math.sin(i / 2.4) * 18) + (Math.random() * 28 - 14)));
    const high = Math.min(200, Math.max(open, close) + 8 + Math.random() * 10);
    const low = Math.max(60, Math.min(open, close) - 8 - Math.random() * 10);
    candles.push({ open, close, high, low });
    vols.push(20 + Math.random() * 50);
  }
  const body = candles.map((c, i) => {
    const x = 28 + i * 28;
    const up = c.close <= c.open;
    const y = Math.min(c.open, c.close);
    const ht = Math.max(8, Math.abs(c.close - c.open));
    const fill = up ? "#FFD43B" : "#fff";
    const volH = vols[i];
    return `
      <rect x="${x}" y="${240 - volH}" width="10" height="${volH}" fill="#1B1438" opacity=".55"/>
      <line x1="${x + 7}" x2="${x + 7}" y1="${c.high}" y2="${c.low}" stroke="#1B1438" stroke-width="3"/>
      <rect x="${x}" y="${y}" width="14" height="${ht}" rx="2" fill="${fill}" stroke="#1B1438" stroke-width="2.5"/>
    `;
  }).join("");
  svg.innerHTML = `
    <line x1="20" y1="40" x2="630" y2="40" stroke="rgba(27,20,56,.15)"/>
    <line x1="20" y1="100" x2="630" y2="100" stroke="rgba(27,20,56,.15)"/>
    <line x1="20" y1="160" x2="630" y2="160" stroke="rgba(27,20,56,.15)"/>
    ${body}
  `;
}

function spinReels() {
  toast("BACKPACK FIRE lights up at launch");
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-action]");
  if (!t) return;
  const a = t.getAttribute("data-action");
  if (a === "copy-ca") copyCA();
  if (a === "connect") openModal("connect-modal");
  if (a === "close") closeModal(t.getAttribute("data-modal") || "connect-modal");
  if (a === "spin") spinReels();
  if (a === "menu") openModal("menu-modal");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") $all(".modal").forEach((m) => m.classList.remove("on"));
});

$all(".modal").forEach((m) => {
  m.addEventListener("click", (e) => { if (e.target === m) m.classList.remove("on"); });
});

$all("[data-tf]").forEach((b) => {
  b.addEventListener("click", () => {
    $all("[data-tf]").forEach((x) => x.classList.remove("on"));
    b.classList.add("on");
  });
});

drawChart($("#bag-chart"));

$all("[data-ca]").forEach((el) => {
  el.textContent = window.BAG.short;
  el.setAttribute("title", window.BAG.ca || "coming soon");
});
$all("[data-ca-full]").forEach((el) => {
  el.textContent = window.BAG.ca || "coming soon";
  el.setAttribute("title", window.BAG.ca || "coming soon");
});

if (window.BACKPACK_LOGO) {
  $all('img[src*="coin.jpg"]').forEach((el) => { el.src = window.BACKPACK_LOGO; });
  $all('link[rel="icon"]').forEach((el) => { el.href = window.BACKPACK_LOGO; });
}
