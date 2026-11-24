(() => {
  const C = CONFIG;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const get = (path) => path.split('.').reduce((o, k) => o?.[k], C);
  const wa = (text) => `https://wa.me/${C.contacto.whatsapp}?text=${encodeURIComponent(text)}`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Colores desde CONFIG
  const r = document.documentElement.style;
  r.setProperty('--amber', C.colores.primario);
  r.setProperty('--amber-d', C.colores.primarioOscuro);
  r.setProperty('--ink', C.colores.tinta);
  r.setProperty('--steel', C.colores.acero);
  r.setProperty('--cream', C.colores.crema);

  // Bindings simples
  $$('[data-bind]').forEach((el) => (el.textContent = get(el.dataset.bind) ?? ''));
  $$('[data-bind-src]').forEach((el) => (el.src = get(el.dataset.bindSrc)));
  $$('[data-wa]').forEach((el) => (el.href = wa(get('contacto.' + el.dataset.wa))));
  $('#waFloat').href = wa(C.contacto.mensajeWhatsapp);
  $('#year').textContent = new Date().getFullYear();

  // Íconos de beneficios
  const ICONS = {
    ship: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.5 3.2 3.5 14.8 0 18M12 3c-3.5 3.2-3.5 14.8 0 18"/>',
    box: '<path d="M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M2 10h20M6 15h4"/>',
    truck: '<path d="M2 6h12v10H2zM14 10h4l4 3v3h-8M7 19a2 2 0 100-4 2 2 0 000 4zM18 19a2 2 0 100-4 2 2 0 000 4z"/>',
  };

  // Mini beneficios en hero
  $('#mini').innerHTML = ['Importadores directos', 'Stock inmediato', 'Financiación a 120 días', 'Envíos a todo el país']
    .map((t) => `<li>${t}</li>`).join('');

  // Engranajes SVG
  const gear = (cx, cy, ro, ri, n) => {
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, s = Math.PI / n / 2.2;
      const pts = [[ri, a - s * 2], [ro, a - s], [ro, a + s], [ri, a + s * 2]];
      pts.forEach(([rad, ang], j) => {
        d += (i === 0 && j === 0 ? 'M' : 'L') + (cx + Math.cos(ang) * rad).toFixed(1) + ' ' + (cy + Math.sin(ang) * rad).toFixed(1);
      });
    }
    return `<path d="${d}Z"/><circle cx="${cx}" cy="${cy}" r="${ri * .45}"/>`;
  };
  $('#gears').innerHTML = gear(300, 300, 290, 250, 22) + gear(300, 300, 190, 160, 16);

  // Hero: slides 3D que rotan
  const heroProds = C.productos.filter((p) => p.foto === 'producto');
  $('#slides').innerHTML = heroProds.map((p, i) => `<div class="slide${i ? '' : ' on'}"><img src="${p.imagen}" alt="${p.alt}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></div>`).join('');
  $('#heroDots').innerHTML = heroProds.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('');
  let hi = 0;
  const slides = $$('.slide'), hdots = $$('#heroDots i');
  const showHero = (n) => {
    slides[hi].classList.remove('on'); hdots[hi].classList.remove('on');
    hi = n % slides.length;
    slides[hi].classList.add('on'); hdots[hi].classList.add('on');
  };
  if (!reduce) setInterval(() => showHero(hi + 1), 4200);

  // Tilt 3D con puntero y con scroll en celular
  const stage = $('#stage');
  const wrap = $('#stageWrap');
  wrap.addEventListener('pointermove', (e) => {
    const b = wrap.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
    stage.style.setProperty('--ry', (x * 22).toFixed(1) + 'deg');
    stage.style.setProperty('--rx', (-y * 18).toFixed(1) + 'deg');
  });
  wrap.addEventListener('pointerleave', () => { stage.style.setProperty('--ry', '0deg'); stage.style.setProperty('--rx', '0deg'); });
  if (!reduce) {
    addEventListener('scroll', () => {
      if (matchMedia('(hover:hover)').matches) return;
      const y = Math.min(scrollY / 500, 1);
      stage.style.setProperty('--ry', (y * 24 - 6).toFixed(1) + 'deg');
      stage.style.setProperty('--rx', (y * -10).toFixed(1) + 'deg');
    }, { passive: true });
  }

  // Abierto ahora (hora de Argentina)
  const ahora = () => {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Argentina/Buenos_Aires', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
    const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    return { dia, min: (+p.hour % 24) * 60 + +p.minute };
  };
  const toMin = (s) => +s.slice(0, 2) * 60 + +s.slice(3);
  const estaAbierto = () => {
    const { dia, min } = ahora();
    return (C.horarios[dia] || []).some(([a, c]) => {
      const A = toMin(a), Cc = toMin(c);
      return Cc > A ? min >= A && min < Cc : min >= A || min < Cc;
    });
  };
  const setAbierto = () => {
    const ab = estaAbierto();
    ['#abierto', '#abierto2'].forEach((s) => {
      const el = $(s); el.classList.toggle('on', ab);
      $('em', el).textContent = ab ? 'Abierto ahora · respondemos en el día' : 'Cerrado ahora · escribinos y te respondemos al abrir';
    });
  };
  setAbierto();

  // Carrusel de productos
  $('#carousel').innerHTML = C.productos.map((p, i) => `
    <article class="card" data-i="${i}">
      <div class="card-img ${p.foto === 'taller' ? 'foto' : ''}"><span class="card-tag">${p.etiqueta}</span>
        <img src="${p.imagen}" alt="${p.alt}" loading="lazy" width="600" height="600"></div>
      <h3>${p.nombre}</h3><p>${p.resumen}</p>
      <ul>${p.destacados.map((d) => `<li>${d}</li>`).join('')}</ul>
      <div class="card-btns">
        <button class="btn btn-ghost" data-det="${p.id}">Ver ficha</button>
        <a class="btn btn-wa" href="${wa(`¡Hola Metal Tools! Quiero consultar precio y disponibilidad de: ${p.nombre}.`)}">Consultar</a>
      </div>
    </article>`).join('');
  const car = $('#carousel'), cards = $$('.card', car);
  $('#carDots').innerHTML = cards.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('');
  const cdots = $$('#carDots i');
  const stepW = () => cards[0].getBoundingClientRect().width + 20;
  $('#prev').onclick = () => car.scrollBy({ left: -stepW(), behavior: 'smooth' });
  $('#next').onclick = () => car.scrollBy({ left: stepW(), behavior: 'smooth' });
  car.addEventListener('scroll', () => {
    const i = Math.round(car.scrollLeft / stepW());
    cdots.forEach((d, k) => d.classList.toggle('on', k === Math.min(i, cards.length - 1)));
  }, { passive: true });
  // inclinación 3D de tarjetas con el mouse
  if (matchMedia('(hover:hover)').matches && !reduce) {
    cards.forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const b = c.getBoundingClientRect();
        const x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
        c.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
      });
      c.addEventListener('pointerleave', () => (c.style.transform = ''));
    });
  }

  // Detalle de producto
  const dlg = $('#detalle');
  const abrir = (id) => {
    const p = C.productos.find((x) => x.id === id);
    $('#dImg').className = 'd-img' + (p.foto === 'taller' ? ' foto' : '');
    $('#dImg').innerHTML = `<img src="${p.imagen}" alt="${p.alt}">`;
    $('#dEtq').textContent = p.etiqueta;
    $('#dTitulo').textContent = p.nombre;
    $('#dDesc').textContent = p.descripcion;
    $('#dSpecs').innerHTML = p.specs.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('');
    $('#dWa').href = wa(`¡Hola Metal Tools! Quiero consultar precio y disponibilidad de: ${p.nombre}.`);
    dlg.showModal();
  };
  $$('[data-det]').forEach((b) => (b.onclick = () => abrir(b.dataset.det)));
  $('#dClose').onclick = () => dlg.close();
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

  // Configurador de aparejo
  const ap = C.productos.find((p) => p.id === 'aparejos');
  const cfg = { cap: C.configurador.capacidades[1] ?? C.configurador.capacidades[0], alt: C.configurador.alturas[1] ?? C.configurador.alturas[0] };
  const mkOpts = (el, arr, key, unit) => {
    el.innerHTML = arr.map((v) => `<button type="button" class="opt" data-v="${v}" aria-pressed="${cfg[key] === v}">${v} ${unit}</button>`).join('');
    $$('.opt', el).forEach((b) => (b.onclick = () => { cfg[key] = +b.dataset.v; $$('.opt', el).forEach((x) => x.setAttribute('aria-pressed', x === b)); updateCfg(); }));
  };
  const maxAlt = Math.max(...C.configurador.alturas), maxCap = Math.max(...C.configurador.capacidades);
  function updateCfg() {
    const drop = 6 + (cfg.alt / maxAlt) * 110;
    $('#hoistDrop').style.transform = `translateY(${(drop - 6).toFixed(0)}px)`;
    $('#cable').style.transform = `scaleY(${(1 + (drop - 6) / 20).toFixed(2)})`;
    const k = cfg.cap / maxCap, w = 44 + k * 54, h = 36 + k * 26;
    const load = $('#load');
    load.setAttribute('x', 160 - w / 2); load.setAttribute('width', w); load.setAttribute('height', h);
    $('#loadTxt').setAttribute('y', 150 + h / 2 + 6);
    $('#loadTxt').textContent = cfg.cap + ' t';
    $('#altTxt').textContent = cfg.alt + ' m';
    const fixed = ap.specs.filter(([a]) => !['Capacidad', 'Altura de elevación'].includes(a));
    $('#ficha').innerHTML = `<li>Capacidad<b>${cfg.cap} t</b></li><li>Altura de elevación<b>${cfg.alt} m</b></li>` + fixed.map(([a, b]) => `<li>${a}<b>${b}</b></li>`).join('');
    const loc = $('#cfgLoc').value.trim();
    $('#cfgBtn').href = wa(`¡Hola Metal Tools! Quiero cotizar un aparejo eléctrico:\n• Capacidad: ${cfg.cap} t\n• Altura de elevación: ${cfg.alt} m\n• Con carro de traslación eléctrico` + (loc ? `\nMi localidad: ${loc}` : ''));
  }
  mkOpts($('#optCap'), C.configurador.capacidades, 'cap', 't');
  mkOpts($('#optAlt'), C.configurador.alturas, 'alt', 'm');
  $('#cfgLoc').addEventListener('input', updateCfg);
  updateCfg();

  // Por qué + pasos + galería
  $('#why').innerHTML = C.beneficios.map((b) => `<div class="why-card rv"><div class="why-ic"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[b.icono]}</svg></div><h3>${b.titulo}</h3><p>${b.texto}</p></div>`).join('');
  $('#steps').innerHTML = C.pasos.map((s) => `<li class="rv"><h3>${s.titulo}</h3><p>${s.texto}</p></li>`).join('');
  $('#gal').innerHTML = C.galeria.map((g) => `<figure class="rv"><img src="${g.imagen}" alt="${g.alt}" loading="lazy" width="1125" height="760"><figcaption><b>${g.titulo}</b><span>${g.texto}</span></figcaption></figure>`).join('');

  // Contacto
  $('#dir').textContent = C.contacto.direccion;
  $('#hrs').textContent = C.horariosTexto;
  $('#map').src = C.contacto.mapsEmbed;
  $('#como-llegar').href = C.contacto.mapsLink;
  $('#llamar').href = 'tel:' + C.contacto.telefonoLink;
  $('#llamar').textContent = 'Llamar ' + C.contacto.telefono;
  $('#formMaq').innerHTML = C.productos.map((p) => `<option>${p.nombre}</option>`).join('') + '<option>Otra consulta</option>';
  $('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const t = `¡Hola Metal Tools! Quiero pedir presupuesto.\n• Máquina: ${f.maq}\n• Nombre: ${f.nombre}\n• Localidad: ${f.loc}` + (f.msg ? `\n• Mensaje: ${f.msg}` : '');
    location.href = wa(t);
  });

  // Footer
  const fl = [
    [C.contacto.instagram, 'Instagram ' + C.contacto.instagramUser],
    [wa(C.contacto.mensajeWhatsapp), 'WhatsApp'],
    ['tel:' + C.contacto.telefonoLink, C.contacto.telefono],
  ];
  if (C.contacto.facebook) fl.push([C.contacto.facebook, 'Facebook']);
  if (C.contacto.email) fl.push(['mailto:' + C.contacto.email, C.contacto.email]);
  $('#footLinks').innerHTML = fl.map(([h, t]) => `<a href="${h}" target="_blank" rel="noopener">${t}</a>`).join('');

  // Menú móvil
  const burger = $('#burger'), links = $('#links');
  burger.onclick = () => { const o = links.classList.toggle('open'); burger.setAttribute('aria-expanded', o); };
  $$('a', links).forEach((a) => a.addEventListener('click', () => { links.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));

  // Animaciones al scroll
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
})();
