const $ = s => document.querySelector(s);
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const typing = e => e.target.matches('input,textarea,select');

/* ---------- Perfil: validación + personalización ---------- */
const nick = $('#nick'), color = $('#color'), msg = $('#msg');
let profile = store.get('ff-profile', { name: 'Sobreviviente', color: '#ff5a1f' });
function applyProfile(p) {
  document.documentElement.style.setProperty('--flame', p.color);
  $('#name').textContent = p.name;
}
nick.value = profile.name === 'Sobreviviente' ? '' : profile.name;
color.value = profile.color;
applyProfile(profile);
color.addEventListener('input', () => applyProfile({ ...profile, color: color.value }));
$('#profile').addEventListener('submit', e => {
  e.preventDefault();
  const v = nick.value.trim();
  if (!/^[A-Za-z0-9áéíóúñÁÉÍÓÚÑ_ ]{3,12}$/.test(v)) {
    msg.textContent = 'El apodo debe tener de 3 a 12 letras, números o espacios.';
    msg.className = 'err';
    nick.focus();
    return;
  }
  profile = { name: v, color: color.value };
  store.set('ff-profile', profile);
  applyProfile(profile);
  msg.textContent = `Perfil guardado. Listo para saltar, ${v}.`;
  msg.className = 'ok';
});

/* ---------- Juego de puntería ---------- */
const arena = $('#arena'), arenaMsg = $('#arenaMsg'), startBtn = $('#start');
let score = 0, time = 20, timer = null, playing = false, best = store.get('ff-best', 0);
$('#best').textContent = best;

function burst(x, y) {
  const r = document.createElement('span');
  r.className = 'ring';
  r.style.left = x + 'px';
  r.style.top = y + 'px';
  r.addEventListener('animationend', () => r.remove());
  arena.append(r);
}
function spawn() {
  arena.querySelector('.target')?.remove();
  const t = document.createElement('button');
  t.className = 'target';
  t.setAttribute('aria-label', 'Blanco');
  const x = Math.random() * (arena.clientWidth - 56), y = Math.random() * (arena.clientHeight - 56);
  t.style.left = x + 'px';
  t.style.top = y + 'px';
  t.addEventListener('pointerdown', e => {
    e.preventDefault();
    score++;
    $('#score').textContent = score;
    burst(x, y);
    spawn();
  });
  arena.append(t);
}
function startGame() {
  if (playing) return;
  playing = true; score = 0; time = 20;
  $('#score').textContent = 0;
  $('#time').textContent = time;
  startBtn.disabled = true;
  arenaMsg.hidden = true;
  spawn();
  timer = setInterval(() => {
    time--;
    $('#time').textContent = time;
    if (time <= 0) endGame();
  }, 1000);
}
function endGame() {
  clearInterval(timer);
  playing = false;
  startBtn.disabled = false;
  arena.querySelector('.target')?.remove();
  if (score > best) {
    best = score;
    $('#best').textContent = best;
    store.set('ff-best', best);
    arenaMsg.textContent = `¡Nuevo récord: ${score} blancos! Pulsa Espacio para superarlo.`;
  } else {
    arenaMsg.textContent = `Derribaste ${score} blancos. Pulsa Espacio para intentarlo otra vez.`;
  }
  arenaMsg.hidden = false;
}
startBtn.addEventListener('click', startGame);

/* ---------- Imágenes: prueba varias extensiones y, si falla, usa un emoji ---------- */
const EXT = ['png', 'jpg', 'jpeg', 'webp', 'png.png', 'png.jpg', 'png.webp'];
const pic = (name, alt, fb) =>
  `<img class="pic" data-n="${name}" data-k="0" data-f="${fb}" src="${name}.${EXT[0]}" alt="${alt}" draggable="false">`;
document.addEventListener('error', e => {
  const im = e.target;
  if (!im.matches || !im.matches('img[data-n]')) return;
  const k = +im.dataset.k + 1;
  if (k < EXT.length) { im.dataset.k = k; im.src = `${im.dataset.n}.${EXT[k]}`; return; }
  const s = document.createElement('span');
  s.className = 'pic-fb';
  s.textContent = im.dataset.f;
  im.replaceWith(s);
}, true);

/* ---------- Novedades OB55: 6 tarjetas + ventana con acordeón ---------- */
const tabs = Object.keys(OB55), dlg = $('#obDialog');
const OB_META = {
  naruto: ['🍥', 'Nueve Colas, ninjutsu y shuriken'], br: ['🪂', 'Eventos, cajas y modo Seguir'], cs: ['⚔️', 'Granadas nuevas y ajustes'],
  chars: ['🧑‍🎤', 'Rework de Kenta y balance'], guns: ['🔫', 'M7, Skorp, RPK y Hawk'], sys: ['⚙️', 'Duelo de Honor y Pyro Pals']
};
let cur = 0;
$('#obTiles').innerHTML = tabs.map((k, i) => `<button type="button" class="tile" data-i="${i}" style="--d:${i * 70}ms">
  <span class="ico">${OB_META[k][0]}</span><strong>${OB55[k].t}</strong><small>${OB_META[k][1]}</small><em>${OB55[k].items.length} novedades</em></button>`).join('');
function openTab(i) {
  cur = (i + tabs.length) % tabs.length;
  const k = tabs[cur];
  $('#obTitle').textContent = `${OB_META[k][0]} ${OB55[k].t}`;
  $('#obBody').innerHTML = OB55[k].items.map(([h, p], n) => `<details${n === 0 ? ' open' : ''}><summary>${h}</summary><p>${p}</p></details>`).join('');
  $('#obPos').textContent = `${cur + 1} / ${tabs.length}`;
  if (!dlg.open) dlg.showModal();
}
$('#obTiles').addEventListener('click', e => { const t = e.target.closest('.tile'); if (t) openTab(+t.dataset.i); });
$('#obPrev').addEventListener('click', () => openTab(cur - 1));
$('#obNext').addEventListener('click', () => openTab(cur + 1));
$('#obClose').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') openTab(cur - 1);
  if (e.key === 'ArrowRight') openTab(cur + 1);
});

/* ---------- Personajes: todos, con búsqueda y filtros ---------- */
const ROLES = { all: ['Todos', ''], s: ['Apoyo', '💚'], d: ['Defensa', '🛡️'], m: ['Movilidad', '⚡'], a: ['Ataque', '🔥'], i: ['Sigilo e info', '🕵️'], o: ['Otros', '🎲'], new: ['Cambios OB55', ''] };
let role = 'all', query = '';
$('#roles').innerHTML = Object.entries(ROLES).map(([k, v]) => `<button type="button" data-r="${k}" aria-pressed="${k === 'all'}">${v[0]}</button>`).join('');
function drawChars() {
  const list = CHARS.filter(c => (role === 'all' || (role === 'new' ? c[5] : c[2] === role)) && c[0].toLowerCase().includes(query));
  $('#chars').innerHTML = list.map(c => {
    const emoji = ROLES[c[2]][1];
    const front = HAS_IMG.includes(c[1]) ? pic(c[1], c[0], emoji) : `<span class="pic-fb">${emoji}</span>`;
    return `<button class="card${c[5] ? ' new' : ''}" type="button" aria-label="${c[0]}: ${c[3]}">
      <span class="face front">${front}<strong>${c[0]}</strong></span>
      <span class="face back"><strong>${c[3]}</strong><small>${c[4]}</small>${c[5] ? `<small class="ob">OB55: ${c[5]}</small>` : ''}</span></button>`;
  }).join('') || '<p class="lead">No hay personajes con ese filtro.</p>';
  $('#count').textContent = `Mostrando ${list.length} de ${CHARS.length} personajes`;
}
$('#roles').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  role = b.dataset.r;
  document.querySelectorAll('#roles button').forEach(x => x.setAttribute('aria-pressed', x === b));
  drawChars();
});
$('#search').addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); drawChars(); });
$('#chars').addEventListener('click', e => e.target.closest('.card')?.classList.toggle('flip'));
drawChars();

/* ---------- Equipo: drag & drop + clic + teclado ---------- */
const guns = [['AK', '🔥', 'ak'], ['M1887', '💥', 'm1887'], ['MP40', '⚡', 'mp40'], ['AWM', '🎯', 'awm'], ['Groza', '🌪️', 'groza'], ['Desert Eagle', '🦅', 'desert']];
let loadout = store.get('ff-loadout', [null, null]);
$('#guns').innerHTML = guns.map((g, i) =>
  `<div class="gun" draggable="true" tabindex="0" data-i="${i}" role="button" aria-label="Equipar ${g[0]}">${pic(g[2], g[0], g[1])}<span>${g[0]} <small>(${i + 1})</small></span></div>`).join('');

function drawSlots() {
  document.querySelectorAll('.slot').forEach((s, k) => {
    const g = guns[loadout[k]];
    s.classList.toggle('full', !!g);
    s.innerHTML = g ? `${pic(g[2], g[0], g[1])}<span>${g[0]}</span>` : '<em>Suelta un arma aquí</em>';
  });
  const names = loadout.filter(x => x !== null).map(x => guns[x][0]);
  $('#combo').textContent = names.length ? 'Tu combo: ' + names.join(' + ') : 'Aún no elegiste armas.';
  store.set('ff-loadout', loadout);
}
function equip(i, k) {
  if (k === undefined) { k = loadout.indexOf(null); if (k < 0) k = 1; }
  const dup = loadout.indexOf(i);
  if (dup >= 0) loadout[dup] = null;
  loadout[k] = i;
  drawSlots();
}
$('#guns').addEventListener('dragstart', e => {
  const g = e.target.closest('.gun');
  if (!g) return;
  e.dataTransfer.setData('text/plain', g.dataset.i);
  g.classList.add('drag');
});
$('#guns').addEventListener('dragend', e => e.target.classList?.remove('drag'));
$('#guns').addEventListener('click', e => { const g = e.target.closest('.gun'); if (g) equip(+g.dataset.i); });
$('#guns').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.dataset.i) equip(+e.target.dataset.i);
});
document.querySelectorAll('.slot').forEach(s => {
  s.addEventListener('dragover', e => { e.preventDefault(); s.classList.add('over'); });
  s.addEventListener('dragleave', () => s.classList.remove('over'));
  s.addEventListener('drop', e => {
    e.preventDefault();
    s.classList.remove('over');
    const i = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (!Number.isNaN(i)) equip(i, +s.dataset.slot);
  });
  s.addEventListener('click', () => { loadout[+s.dataset.slot] = null; drawSlots(); });
});
drawSlots();

/* ---------- Teclado global ---------- */
document.addEventListener('keydown', e => {
  if (typing(e) || dlg.open) return;
  if (e.code === 'Space' && !e.target.matches('button')) { e.preventDefault(); startGame(); }
  if (/^[1-6]$/.test(e.key)) equip(+e.key - 1);
});

/* ---------- API externa: precio del dólar (open.er-api.com + mindicador.cl, gratis y sin clave) ---------- */
const coins = { CLP: 'peso chileno', ARS: 'peso argentino', MXN: 'peso mexicano', COP: 'peso colombiano', PEN: 'sol peruano', BRL: 'real brasileño', EUR: 'euro' };
const fmt = (n, d = 2) => n.toLocaleString('es-CL', { maximumFractionDigits: d });
let rates = null, coin = null;

$('#coins').innerHTML = Object.keys(coins).map(c => `<button type="button" data-c="${c}" aria-pressed="false">${c}</button>`).join('');

const ok = r => (r.ok ? r.json() : Promise.reject(new Error(r.status)));
async function getRates() {
  if (rates) return rates;
  // Tipos de cambio generales + dólar observado oficial de Chile (Banco Central, vía mindicador.cl)
  const [g, c] = await Promise.allSettled([
    fetch('https://open.er-api.com/v6/latest/USD').then(ok),
    fetch('https://mindicador.cl/api/dolar').then(ok)
  ]);
  const out = { rates: {}, date: null, official: null };
  if (g.status === 'fulfilled' && g.value.result === 'success') {
    out.rates = { ...g.value.rates };
    out.date = new Date(g.value.time_last_update_utc);
  }
  const last = c.status === 'fulfilled' && c.value.serie && c.value.serie[0];
  if (last && last.valor > 0) {
    out.rates.CLP = last.valor;
    out.official = new Date(last.fecha);
  }
  if (!Object.keys(out.rates).length) throw new Error('api');
  return (rates = out);
}
async function showRate() {
  const box = $('#rate');
  if (!coin) return;
  const amt = parseFloat($('#usd').value);
  if (!(amt > 0)) { box.textContent = 'Escribe una cantidad de dólares mayor que 0.'; return; }
  if (!rates) box.innerHTML = '<span class="spin">🔥</span> Consultando el precio...';
  try {
    const d = await getRates(), r = d.rates[coin];
    if (!r) { box.textContent = 'Esa moneda no está disponible ahora. Prueba con otra.'; return; }
    const day = x => x.toLocaleDateString('es-CL', { timeZone: 'UTC' });
    const src = coin === 'CLP' && d.official
      ? `Dólar observado oficial del Banco Central de Chile, ${day(d.official)}. Bancos y casas de cambio suman su propio margen.`
      : `Tipo de cambio de referencia${d.date ? ', actualizado ' + day(d.date) : ''}.`;
    box.innerHTML = `<div class="big">${fmt(amt * r)} ${coin}</div>
      <p>${fmt(amt)} USD en ${coins[coin]}s. Precio de 1 USD: <strong>${fmt(r)} ${coin}</strong>.<br>
      <small>${src}</small></p>`;
  } catch {
    box.textContent = 'No se pudo conectar con la API. Revisa tu internet e inténtalo otra vez.';
  }
}
$('#coins').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  coin = b.dataset.c;
  document.querySelectorAll('#coins button').forEach(x => x.setAttribute('aria-pressed', x === b));
  showRate();
});
$('#usd').addEventListener('input', showRate);

/* ---------- Visor 3D (three.js) ---------- */
(function () {
  const box = $('#viewer');
  if (!window.THREE || !THREE.OrbitControls || !window.MODELS) {
    box.innerHTML = '<span class="hint">No se pudo cargar el visor 3D. Revisa tu conexión a internet y recarga la página.</span>';
    return;
  }
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  cam.position.set(0, 0.8, 5);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x553377, 1.2));
  const sun = new THREE.DirectionalLight(0xffffff, 1.3);
  sun.position.set(3, 4, 5);
  scene.add(sun);
  const controls = new THREE.OrbitControls(cam, renderer.domElement);
  Object.assign(controls, { enableDamping: true, minDistance: 2, maxDistance: 9, autoRotate: true, autoRotateSpeed: 2.5 });

  const cache = {}, loader = new THREE.TextureLoader();
  function build(id) {
    const m = MODELS[id];
    let obj;
    if (m.type === 'obj') obj = new THREE.OBJLoader().parse(m.data);
    else {
      const b = atob(m.data), u = new Uint8Array(b.length);
      for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
      obj = new THREE.FBXLoader().parse(u.buffer, '');
    }
    const tex = loader.load(m.tex);
    tex.encoding = THREE.sRGBEncoding;
    const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, metalness: 0.3, side: THREE.DoubleSide });
    obj.traverse(o => { if (o.isMesh) o.material = mat; });
    const bb = new THREE.Box3().setFromObject(obj), size = bb.getSize(new THREE.Vector3());
    obj.position.sub(bb.getCenter(new THREE.Vector3()));
    const g = new THREE.Group();
    g.add(obj);
    g.scale.setScalar(3.4 / Math.max(size.x, size.y, size.z));
    if (size.z > size.x && size.z >= size.y) g.rotation.y = Math.PI / 2;
    else if (size.y > size.x && size.y > size.z) g.rotation.z = Math.PI / 2;
    return g;
  }

  const inLoadout = { ak: 0, mp40: 2, awm: 3 };
  let current = null, currentId = null;
  function show(id) {
    try {
      cache[id] = cache[id] || build(id);
    } catch (err) {
      box.innerHTML = '<span class="hint">No se pudo abrir este modelo.</span>';
      return;
    }
    if (current) scene.remove(current);
    current = cache[id];
    currentId = id;
    scene.add(current);
    controls.reset();
    cam.position.set(0, 0.8, 5);
    document.querySelectorAll('#models button').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === id));
    $('#equipBtn').hidden = !(id in inLoadout);
    $('#winfo').textContent = WINFO[id] || '';
  }

  $('#models').innerHTML = Object.entries(MODELS).map(([id, m]) =>
    `<button type="button" data-id="${id}" aria-pressed="false">${m.name}</button>`).join('');
  $('#models').addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(b.dataset.id); });
  $('#spin').addEventListener('click', e => {
    controls.autoRotate = !controls.autoRotate;
    e.target.textContent = controls.autoRotate ? 'Pausar giro' : 'Reanudar giro';
  });
  $('#reset').addEventListener('click', () => { controls.reset(); cam.position.set(0, 0.8, 5); });
  $('#equipBtn').addEventListener('click', () => equip(inLoadout[currentId]));

  box.innerHTML = '';
  box.append(renderer.domElement);
  new ResizeObserver(() => {
    const w = box.clientWidth, h = box.clientHeight;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  }).observe(box);
  let visible = true;
  new IntersectionObserver(en => { visible = en[0].isIntersecting; }).observe(box);
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    controls.update();
    renderer.render(scene, cam);
  })();
  show('ak');
})();
