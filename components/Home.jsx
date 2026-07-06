'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { ALL_SOC, buildWorld, FLAT_NAMES, GEO } from '@/lib/group-data';
import { heroImg, holdingLogo } from '@/lib/logos';
import { nameFromSlug, slugify } from '@/lib/seo';

const hexA = (hex, a) => {
  const h = hex.replace('#', '');
  return `rgba(${parseInt(h.substr(0, 2), 16)},${parseInt(h.substr(2, 2), 16)},${parseInt(h.substr(4, 2), 16)},${a})`;
};

function useGlobe(ref) {
  const suppress = useRef(false);
  useEffect(() => {
    const n = ALL_SOC.length, GA = Math.PI * (3 - Math.sqrt(5));
    const base = [];
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(Math.max(0, 1 - y * y)), th = GA * i;
      base.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
    }
    let rx = -0.12, ry = 0, vx = 0, vy = 0, drag = false, last = null, raf;
    const down = (e) => { const g = ref.current; if (g && g.contains(e.target)) { drag = true; last = { x: e.clientX, y: e.clientY }; g.style.cursor = 'grabbing'; } };
    const move = (e) => {
      if (!drag) return;
      const dx = e.clientX - last.x, dy = e.clientY - last.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) suppress.current = true;
      ry += dx * 0.008;
      rx = Math.max(-0.7, Math.min(0.7, rx + dy * 0.008));
      vx = dx * 0.008; vy = dy * 0.008;
      last = { x: e.clientX, y: e.clientY };
    };
    const up = () => { if (!drag) return; drag = false; if (ref.current) ref.current.style.cursor = 'grab'; setTimeout(() => { suppress.current = false; }, 70); };
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    const loop = () => {
      const g = ref.current;
      if (g) {
        if (!drag) {
          ry += vx + 0.0016;
          rx = Math.max(-0.7, Math.min(0.7, rx + vy));
          vx *= 0.94; vy *= 0.94;
          if (Math.abs(vx) < 0.0002) vx = 0;
          if (Math.abs(vy) < 0.0002) vy = 0;
        }
        const Rpx = g.clientWidth / 2 * 0.82;
        const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
        g.querySelectorAll('[data-soc-node]').forEach((el) => {
          const b = base[+el.getAttribute('data-soc-node')]; if (!b) return;
          const x1 = b.x * cy + b.z * sy, z1 = -b.x * sy + b.z * cy, y1 = b.y;
          const y2 = y1 * cx - z1 * sx, z2 = y1 * sx + z1 * cx;
          const d = (z2 + 1) / 2, sc = 0.58 + d * 0.62;
          el.style.transform = `translate(-50%,-50%) translate(${(x1 * Rpx).toFixed(1)}px,${(y2 * Rpx).toFixed(1)}px) scale(${sc.toFixed(3)})`;
          el.style.zIndex = Math.round(d * 100) + 5;
          el.style.opacity = (0.3 + d * 0.7).toFixed(2);
          const lb = el.querySelector('[data-soc-label]');
          if (lb) lb.style.opacity = d < 0.5 ? '0' : ((d - 0.5) / 0.5).toFixed(2);
        });
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [ref]);
  return suppress;
}

const MONO = "'IBM Plex Mono', monospace";
const goldText = { background: 'linear-gradient(115deg,#E9C879,#C5A039)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' };
const plate = (size, radius) => ({ flex: 'none', width: size, height: size, borderRadius: radius, background: '#fff', boxShadow: '0 4px 12px -6px rgba(30,45,70,0.4), inset 0 0 0 1px rgba(20,24,31,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' });
const logoFill = (url, pad) => ({ width: '100%', height: '100%', backgroundImage: `url("${url}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundOrigin: 'content-box', backgroundClip: 'content-box', padding: pad });
const reveal = (range) => ({ animation: 'lh-reveal both', animationTimeline: 'view()', animationRange: range });

const TIMELINE = [
  { year: '2020', items: ['Leaders Immobilier'] },
  { year: '2021', items: ['Négoce Immobilier', 'Le Portail Immobilier', 'Leaders Digital', 'Leaders Fish'] },
  { year: '2022', items: ['Le Coin Immobilier', 'Leaders Building'] },
  { year: '2023', items: ['Inna Immobilier', 'Sté Promotion Ben Ismail', 'Leaders Business'] },
  { year: '2024', items: ['Leaders Makeup', 'Gratia Immobilier', 'Leaders Import Export', 'Gratia Service', 'Leaders Travel'] },
];
const GROUP_STATS = [{ v: '25', k: 'Sociétés' }, { v: '13', k: 'Secteurs' }, { v: '2020', k: 'Création' }, { v: 'Tunis', k: 'Siège' }];
const CONTACT = { address: 'Cité des Pins, Les Berges du Lac 2 — 1053 Tunis, Tunisie', email: 'contact@leadersholding.tn', phone: '+216 27 360 038' };

/* ============================================================
   3D NEXUS FIELD
   ============================================================ */
function useNexusField(canvasRef, { nodeDensity = 66, showCore = true } = {}) {
  const inited = useRef(false);
  useEffect(() => {
    if (inited.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    inited.current = true;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 1, 600);
    camera.position.set(0, 0, 95);
    const tx = document.createElement('canvas'); tx.width = tx.height = 128;
    const g = tx.getContext('2d');
    const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, 'rgba(255,255,255,0.95)'); rg.addColorStop(0.38, 'rgba(255,255,255,0.42)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = rg; g.beginPath(); g.arc(64, 64, 64, 0, Math.PI * 2); g.fill();
    const tex = new THREE.CanvasTexture(tx);
    const group = new THREE.Group(); scene.add(group);
    const tints = ['#ffffff', '#ffffff', '#f2f6fb', '#E9C879', '#dfe7f1', '#E9C879', '#cdd9e8'];
    const density = Math.max(20, Math.min(110, nodeDensity));
    const orbs = [];
    for (let i = 0; i < density; i++) {
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.NormalBlending });
      mat.color = new THREE.Color(tints[i % tints.length]);
      const isGold = i % tints.length === 3 || i % tints.length === 5;
      mat.opacity = isGold ? 0.26 + Math.random() * 0.22 : 0.12 + Math.random() * 0.26;
      const spr = new THREE.Sprite(mat);
      const x = (Math.random() - 0.5) * 190, y = (Math.random() - 0.5) * 120, z = -130 + Math.random() * 150;
      spr.position.set(x, y, z);
      const sc = 6 + Math.random() * 24; spr.scale.set(sc, sc, 1);
      spr.userData = { baseY: y, ph: Math.random() * Math.PI * 2, sp: 0.2 + Math.random() * 0.4, amp: 1.5 + Math.random() * 3 };
      group.add(spr); orbs.push(spr);
    }
    for (let i = 0; i < 14; i++) {
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      mat.color = new THREE.Color('#C5A039'); mat.opacity = 0.7;
      const spr = new THREE.Sprite(mat);
      spr.position.set((Math.random() - 0.5) * 150, (Math.random() - 0.5) * 95, -40 + Math.random() * 70);
      const sc = 1 + Math.random() * 1.8; spr.scale.set(sc, sc, 1);
      spr.userData = { baseY: spr.position.y, ph: Math.random() * 6.28, sp: 0.3 + Math.random() * 0.5, amp: 2 + Math.random() * 3 };
      group.add(spr); orbs.push(spr);
    }
    let core = null;
    if (showCore) {
      core = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(30, 1)), new THREE.LineBasicMaterial({ color: 0xc5a039, transparent: true, opacity: 0.1 }));
      scene.add(core);
    }
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => { mouse.tx = e.clientX / window.innerWidth - 0.5; mouse.ty = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', onMove);
    const onResize = () => { const w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    window.addEventListener('resize', onResize); onResize();
    const clock = new THREE.Clock();
    let raf; let spLerp = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = Math.sin(t * 0.04) * 0.18; group.rotation.x = Math.cos(t * 0.03) * 0.08;
      for (const o of orbs) o.position.y = o.userData.baseY + Math.sin(t * o.userData.sp + o.userData.ph) * o.userData.amp;
      if (core) { core.rotation.y += 0.0011; core.rotation.x += 0.0006; }
      const hs = document.getElementById('hub-scroll');
      const sp = hs ? hs.scrollTop / Math.max(hs.clientHeight, 1) : 0;
      spLerp += (sp - spLerp) * 0.08;
      mouse.x += (mouse.tx - mouse.x) * 0.045; mouse.y += (mouse.ty - mouse.y) * 0.045;
      camera.position.x = mouse.x * 22; camera.position.y = -mouse.y * 14;
      camera.position.z = 95 - Math.min(spLerp, 2.2) * 17;
      if (core) core.scale.setScalar(1 + Math.min(spLerp, 2) * 0.22);
      camera.lookAt(0, 0, -10);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); window.removeEventListener('resize', onResize); tex.dispose(); renderer.dispose(); };
  }, [canvasRef, nodeDensity, showCore]);
}

export default function Home({ initialSocietySlug, skipIntro = false }) {
  const router = useRouter();
  const [view, setView] = useState(initialSocietySlug ? 'world' : 'hub');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSectorKey, setActiveSectorKey] = useState(null);
  const [activeWorldName, setActiveWorldName] = useState(() => (
    initialSocietySlug ? nameFromSlug(initialSocietySlug) : null
  ));
  const canvasRef = useRef(null);
  const globeRef = useRef(null);
  const suppress = useGlobe(globeRef);
  const lastNav = useRef(0);
  const [showIntro, setShowIntro] = useState(!skipIntro && !initialSocietySlug);
  const [introExit, setIntroExit] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const introVidRef = useRef(null);

  const activeSector = activeSectorKey ? GEO.find((s) => s.key === activeSectorKey) : null;
  const world = view === 'world' ? buildWorld(activeWorldName) : null;

  useEffect(() => {
    if (!showIntro) return;
    const v = introVidRef.current; if (!v) return;
    const ready = () => setVideoReady(true);
    if (v.readyState >= 3) ready();
    else { v.addEventListener('playing', ready, { once: true }); v.addEventListener('canplaythrough', ready, { once: true }); }
    const t = setTimeout(ready, 7000);
    return () => clearTimeout(t);
  }, [showIntro]);
  const warp = () => {
    document.querySelectorAll('.lh-warp').forEach((e) => e.remove());
    const el = document.createElement('div');
    el.className = 'lh-warp';
    el.innerHTML = '<div class="lh-warp-core"></div>';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 980);
  };
  const enterSite = () => { warp(); setIntroExit(true); setTimeout(() => { setShowIntro(false); setIntroExit(false); }, 780); };
  useNexusField(canvasRef, { nodeDensity: 66, showCore: true });

  useEffect(() => {
    let raf, hp = null;
    const loop = () => {
      const scroller = document.getElementById('hub-scroll');
      const sec = document.getElementById('hscroll-section');
      const pin = document.getElementById('hscroll-pin');
      const track = document.getElementById('hscroll-track');
      if (scroller && sec && pin && track) {
        const vh = scroller.clientHeight;
        const top = sec.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
        const len = Math.max(1, sec.offsetHeight - vh);
        const p = Math.max(0, Math.min(1, (-top) / len));
        hp = hp == null ? p : hp + (p - hp) * 0.12;
        const vw = pin.clientWidth;
        const maxX = Math.max(0, track.scrollWidth - vw);
        track.style.transform = `translateX(${(-hp * maxX).toFixed(1)}px)`;
        const N = track.children.length;
        const idx = Math.max(0, Math.min(N - 1, Math.round(hp * (N - 1))));
        const ac = track.children[idx] && track.children[idx].getAttribute('data-accent');
        pin.style.background = ac ? `linear-gradient(125deg,${hexA(ac, 0.18)} 0%,#f4f6fa 62%)` : 'linear-gradient(125deg,rgba(197,160,57,0.16) 0%,#f4f6fa 62%)';
        const pf = hp * (N - 1);
        for (let i = 0; i < N; i++) { const c = track.children[i].querySelector('.lh-hpanel-c'); if (c) { const d = Math.abs(i - pf); const op = d < 0.4 ? 1 : Math.max(0, Math.min(1, 1 - (d - 0.4) * 1.05)); c.style.opacity = op.toFixed(3); c.style.transform = `translateY(${((i - pf) * 22).toFixed(1)}px)`; } }
        const prog = document.getElementById('hscroll-prog'); if (prog) prog.style.width = `${(hp * 100).toFixed(1)}%`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  const worldWheel = (e) => {
    const el = e.currentTarget;
    if (e.deltaY > 4 && el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
      const now = Date.now();
      if (now - lastNav.current > 900) { lastNav.current = now; const i = FLAT_NAMES.indexOf(activeWorldName); openWorld(FLAT_NAMES[(i + 1) % FLAT_NAMES.length]); }
    }
  };

  const openSector = (k) => { setActiveSectorKey(k); setMenuOpen(false); };
  const openWorld = (n, { skipWarp = false } = {}) => {
    if (!skipWarp) warp();
    router.push(`/societe/${slugify(n)}`);
  };
  const backToHub = () => {
    router.push('/');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'radial-gradient(120% 100% at 50% 0%,#fbfcfe 0%,#eef1f6 55%,#e4e9f1 100%)', fontFamily: "'Inter Tight', sans-serif", color: '#14181f' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, background: 'radial-gradient(ellipse at 50% 42%,rgba(255,255,255,0) 40%,rgba(160,180,205,0.18) 100%)' }} />

      {showIntro && (
        <div className={introExit ? 'lh-introwrap lh-warpout' : 'lh-introwrap'} style={{ position: 'fixed', inset: 0, zIndex: 300, background: '#0b0b0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <video ref={introVidRef} src="/intro.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div className={videoReady ? 'lh-loader lh-loader-hidden' : 'lh-loader'} style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, background: '#0b0b0d' }}>
            <img src={holdingLogo} alt="Leaders Holding" style={{ height: 78, width: 'auto', display: 'block', animation: 'lh-logopulse 2.2s ease-in-out infinite', filter: 'drop-shadow(0 6px 26px rgba(197,160,57,0.4))' }} />
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(233,200,121,0.85)' }}>Plusieurs sociétés · une vision</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C5A039', display: 'block', animation: 'lh-loaddot 1.2s ease-in-out infinite' }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C5A039', display: 'block', animation: 'lh-loaddot 1.2s ease-in-out 0.18s infinite' }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C5A039', display: 'block', animation: 'lh-loaddot 1.2s ease-in-out 0.36s infinite' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%,rgba(11,11,13,0) 38%,rgba(11,11,13,0.55) 100%)' }} />
          <div onClick={enterSite} style={{ position: 'absolute', bottom: '8vh', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', fontFamily: MONO, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#0b0b0d', padding: '16px 34px', borderRadius: 100, background: 'linear-gradient(115deg,#E9C879,#C5A039)', boxShadow: '0 16px 40px -12px rgba(197,160,57,0.6)' }}>Entrer dans le Nexus →</div>
          <div onClick={enterSite} style={{ position: 'absolute', top: 28, right: 34, zIndex: 6, cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>Passer →</div>
        </div>
      )}

      {/* HUD */}
      <header className="lh-hud" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 40px', pointerEvents: 'none' }}>
        <div onClick={backToHub} style={{ display: 'flex', alignItems: 'center', gap: 13, pointerEvents: 'auto', cursor: 'pointer' }}>
          <img src={holdingLogo} alt="Leaders Holding" style={{ height: 46, width: 'auto', display: 'block', filter: 'drop-shadow(0 4px 14px rgba(160,120,30,0.22))' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#14181f', lineHeight: 1 }}>Leaders Holding</span>
            <span className="lh-hud-sub" style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.42)', lineHeight: 1 }}>Plusieurs sociétés · une vision</span>
          </div>
        </div>
        <div className="lh-hud-actions" style={{ display: 'flex', alignItems: 'center', gap: 18, pointerEvents: 'auto' }}>
          <span className="lh-hud-count" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)' }}>25 sociétés · 13 secteurs</span>
          <Link href="/recrutement" className="lh-pill" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#14181f', textDecoration: 'none', padding: '11px 18px', borderRadius: 100, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)', boxShadow: '0 8px 24px -10px rgba(30,45,70,0.3), inset 0 1px 0 rgba(255,255,255,0.8)' }}>Carrières</Link>
          <button className="lh-pill" onClick={() => setMenuOpen((v) => !v)} style={{ display: 'flex', alignItems: 'center', gap: 10, border: 'none', cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#14181f', padding: '11px 18px', borderRadius: 100, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)', boxShadow: '0 8px 24px -10px rgba(30,45,70,0.3), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
            <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 3, width: 14 }}>
              <span style={{ height: 1.5, width: 14, background: '#C5A039', display: 'block' }} />
              <span style={{ height: 1.5, width: 9, background: '#C5A039', display: 'block' }} />
              <span style={{ height: 1.5, width: 14, background: '#C5A039', display: 'block' }} />
            </span>
            Index Nexus
          </button>
        </div>
      </header>

      {/* HUB */}
      {view === 'hub' && (
        <main id="hub-scroll" style={{ position: 'absolute', inset: 0, zIndex: 10, overflowY: 'auto', overflowX: 'hidden', animation: 'lh-fade 0.8s ease both' }}>
          <section style={{ position: 'relative', height: '100vh', minHeight: 660 }}>
          <div ref={globeRef} id="nexus-globe" style={{ position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%,-50%)', width: 'min(86vmin,860px)', height: 'min(86vmin,860px)', cursor: 'grab', touchAction: 'pan-y' }}>
            <div onClick={() => setMenuOpen(true)} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 3, width: 118, height: 118, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer', animation: 'lh-drift 7s ease-in-out infinite', background: 'radial-gradient(circle at 50% 35%,rgba(255,255,255,0.9),rgba(255,255,255,0.5))', backdropFilter: 'blur(20px) saturate(170%)', WebkitBackdropFilter: 'blur(20px) saturate(170%)', border: '1.5px solid rgba(197,160,57,0.5)', boxShadow: '0 20px 50px -22px rgba(160,120,30,0.45), inset 0 2px 4px rgba(255,255,255,0.9)' }}>
              <img src={holdingLogo} alt="" style={{ height: 44, width: 'auto', display: 'block' }} />
              <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)' }}>Index</span>
            </div>
            {ALL_SOC.map((soc) => (
              <div key={soc.idx} data-soc-node={soc.idx} className="lh-globe-node" onClick={() => { if (!suppress.current) openWorld(soc.name); }} style={{ position: 'absolute', left: '50%', top: '50%', width: 74, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, cursor: 'pointer', willChange: 'transform' }}>
                <div className="lh-globe-plate" style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff', boxShadow: '0 10px 26px -12px rgba(30,45,70,0.5), inset 0 0 0 1px rgba(20,24,31,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transition: 'box-shadow .35s, transform .35s', '--soft': soc.softA, '--glow': soc.glowA }}>
                  {soc.hasLogo ? <div style={logoFill(soc.logoUrl, 9)} /> : <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 500, color: soc.P }}>{soc.initials}</span>}
                </div>
                <span data-soc-label style={{ fontSize: 9.5, fontWeight: 500, letterSpacing: '0.01em', textAlign: 'center', color: '#14181f', lineHeight: 1.1, whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.72)', padding: '2px 7px', borderRadius: 6, backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}>{soc.shortName}</span>
              </div>
            ))}
          </div>

          <div className="lh-hero-panel" style={{ position: 'absolute', left: 40, bottom: 40, maxWidth: 392, padding: '30px 32px 32px', borderRadius: 22, background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(26px) saturate(160%)', WebkitBackdropFilter: 'blur(26px) saturate(160%)', border: '1px solid rgba(255,255,255,0.7)', boxShadow: '0 30px 70px -28px rgba(30,45,70,0.4), inset 0 1px 0 rgba(255,255,255,0.7)', animation: 'lh-rise 0.9s cubic-bezier(.22,1,.36,1) both' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 16 }}>La carte de la holding</div>
            <h1 style={{ fontSize: 38, lineHeight: 1.04, fontWeight: 600, letterSpacing: '-0.035em', color: '#14181f' }}>Plusieurs sociétés.<br />Une <span style={goldText}>vision.</span></h1>
            <p style={{ marginTop: 16, fontSize: 14.5, lineHeight: 1.62, fontWeight: 400, color: 'rgba(20,24,31,0.66)' }}>Un écosystème unique de 25 sociétés réparties sur 13 secteurs. Chacune porte sa marque et son univers — explorez la carte, puis faites défiler pour découvrir l’histoire complète.</p>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C5A039', display: 'block', animation: 'lh-pulse 2.6s ease-out infinite' }} />
              Faites glisser le Nexus · cliquez sur une société
            </div>
          </div>

          <div style={{ position: 'absolute', left: '50%', bottom: 26, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, pointerEvents: 'none', fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)' }}>
            Faites défiler pour explorer
            <span style={{ width: 1, height: 36, background: 'linear-gradient(180deg,rgba(197,160,57,0.7),transparent)' }} />
          </div>
          </section>

          <div style={{ position: 'relative', background: 'linear-gradient(180deg,rgba(238,241,246,0) 0%,rgba(238,241,246,0.97) 7%,#eef1f6 16%,#e9edf3 100%)' }}>

            {/* ONE VISION */}
            <section className="lh-sec" style={{ maxWidth: 1080, margin: '0 auto', padding: '130px 40px 80px' }}>
              <div style={reveal('entry 2% cover 20%')}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 18 }}>Le groupe</div>
                <h2 style={{ fontSize: 'clamp(34px,5vw,62px)', lineHeight: 1.02, fontWeight: 600, letterSpacing: '-0.04em', color: '#14181f', maxWidth: '17ch' }}>Une holding.<br />Vingt-cinq <span style={goldText}>sociétés.</span></h2>
                <p style={{ marginTop: 26, fontSize: 'clamp(16px,1.6vw,20px)', lineHeight: 1.6, fontWeight: 400, color: 'rgba(20,24,31,0.62)', maxWidth: '60ch' }}>Leaders Holding est un groupe diversifié basé à Tunis. Créé en 2020, il couvre aujourd’hui l’immobilier, la construction, la technologie, le commerce, l’agriculture et bien plus encore — chaque société gardant sa propre marque et son propre univers, unies par un standard commun.</p>
              </div>
              <div className="lh-grid-4" style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, borderTop: '1px solid rgba(20,24,31,0.1)', paddingTop: 42, ...reveal('entry 0% cover 24%') }}>
                {GROUP_STATS.map((g) => (
                  <div key={g.k}>
                    <div style={{ fontSize: 'clamp(30px,3.6vw,50px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: '#14181f' }}>{g.v}</div>
                    <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)', marginTop: 12 }}>{g.k}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* TIMELINE */}
            <section className="lh-sec" style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px 96px' }}>
              <div style={reveal('entry 0% cover 18%')}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 16 }}>Notre histoire</div>
                <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', lineHeight: 1.04, fontWeight: 600, letterSpacing: '-0.035em', color: '#14181f', maxWidth: '18ch' }}>Construite, année après année.</h2>
              </div>
              <div style={{ marginTop: 52, position: 'relative', display: 'flex', gap: 22, overflowX: 'auto', paddingBottom: 16 }}>
                <div style={{ position: 'absolute', left: 6, right: 6, top: 34, height: 2, background: 'linear-gradient(90deg,rgba(197,160,57,0.55),rgba(197,160,57,0.1))' }} />
                {TIMELINE.map((yr) => (
                  <div key={yr.year} style={{ flex: 'none', width: 216, position: 'relative', ...reveal('entry 0% cover 26%') }}>
                    <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1, ...goldText }}>{yr.year}</div>
                    <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#C5A039', margin: '14px 0 22px', boxShadow: '0 0 0 5px rgba(197,160,57,0.18)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                      {yr.items.map((it) => (
                        <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,255,255,0.82)', boxShadow: '0 8px 22px -16px rgba(30,45,70,0.4)' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C5A039', display: 'block', flex: 'none' }} />
                          <span style={{ fontSize: 13.5, fontWeight: 500, letterSpacing: '-0.01em', color: '#14181f', lineHeight: 1.25 }}>{it}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HORIZONTAL PINNED GALLERY */}
            <section id="hscroll-section" style={{ position: 'relative', height: '480vh' }}>
              <div id="hscroll-pin" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'linear-gradient(125deg,rgba(197,160,57,0.16) 0%,#f4f6fa 62%)', transition: 'background 0.6s ease' }}>
                <div style={{ position: 'absolute', top: 98, left: 40, right: 40, zIndex: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
                  <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039' }}>The ecosystem · in motion</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)' }}>Keep scrolling ↓</div>
                </div>
                <div style={{ position: 'absolute', bottom: 38, left: 40, right: 40, zIndex: 6, height: 2, background: 'rgba(20,24,31,0.1)', pointerEvents: 'none' }}>
                  <div id="hscroll-prog" style={{ height: '100%', width: '0%', background: 'linear-gradient(90deg,#E9C879,#C5A039)', transition: 'width 0.1s linear' }} />
                </div>
                <div id="hscroll-track" style={{ display: 'flex', height: '100%', willChange: 'transform' }}>
                  <div style={{ flex: 'none', width: '100vw', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 8vw', boxSizing: 'border-box' }}>
                    <div className="lh-hpanel-c" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', willChange: 'opacity,transform' }}>
                      <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 24 }}>Thirteen sectors</div>
                      <h2 style={{ fontSize: 'clamp(40px,7vw,104px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.96, color: '#14181f', maxWidth: '16ch' }}>An ecosystem<br />in motion.</h2>
                      <p style={{ marginTop: 26, fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(20,24,31,0.58)', maxWidth: '46ch', lineHeight: 1.5 }}>Keep scrolling — the map glides sideways through every sector, each with its own world and mood, then returns you to the vertical story.</p>
                    </div>
                  </div>
                  {GEO.map((s) => (
                    <div key={s.key} data-accent={s.accent} onClick={() => openSector(s.key)} className="lh-sector-card" style={{ flex: 'none', width: '100vw', height: '100%', display: 'flex', alignItems: 'center', gap: '5vw', padding: '0 9vw', boxSizing: 'border-box', cursor: 'pointer', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', right: '5vw', transform: 'translateY(-50%)', width: '40vw', height: '40vw', maxWidth: 560, maxHeight: 560, borderRadius: '50%', background: `radial-gradient(circle,${hexA(s.accent, 0.18)},transparent 68%)`, pointerEvents: 'none' }} />
                      <div className="lh-hpanel-c lh-sector-row" style={{ display: 'flex', alignItems: 'center', gap: '5vw', flex: 1, minWidth: 0, width: '100%', willChange: 'opacity,transform' }}>
                      <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                          <span style={{ width: 50, height: 4, borderRadius: 3, background: s.accent, display: 'block' }} />
                          <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.24em', color: s.accent }}>{s.countPad} / 13</span>
                        </div>
                        <div style={{ fontSize: 'clamp(46px,7.5vw,120px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.9, color: '#14181f' }}>{s.short}</div>
                        <div style={{ fontSize: 'clamp(15px,1.6vw,21px)', color: 'rgba(20,24,31,0.6)', marginTop: 22, maxWidth: '32ch', lineHeight: 1.4 }}>{s.name}</div>
                        <div style={{ marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: s.accent }}>Enter sector →</div>
                      </div>
                      <div className="lh-sector-logos" style={{ flex: 'none', position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 16, maxWidth: 240, justifyContent: 'flex-end' }}>
                        {s.societies.map((soc) => (
                          <div key={soc.name} style={{ width: 88, height: 88, borderRadius: 18, background: '#fff', boxShadow: '0 16px 40px -18px rgba(30,45,70,0.4), inset 0 0 0 1px rgba(20,24,31,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            {soc.hasLogo ? <div style={logoFill(soc.logoUrl, 14)} /> : <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 500, color: soc.P }}>{soc.initials}</span>}
                          </div>
                        ))}
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED WORK */}
            <section style={{ position: 'relative', height: '86vh', minHeight: 520, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${heroImg}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(10,14,20,0.12) 0%,rgba(10,14,20,0) 28%,rgba(10,14,20,0.74) 100%)' }} />
              <div className="lh-feat" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 40px 70px', ...reveal('entry 6% cover 42%') }}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E9C879', marginBottom: 18 }}>Featured work</div>
                <h2 style={{ fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.02, fontWeight: 600, letterSpacing: '-0.035em', color: '#fff', maxWidth: '20ch' }}>Finished to a standard the market follows.</h2>
                <div style={{ marginTop: 20, fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>Private residence · Les Berges du Lac 2, Tunis</div>
              </div>
            </section>

            {/* CONTACT */}
            <section className="lh-sec" style={{ maxWidth: 1080, margin: '0 auto', padding: '104px 40px 48px' }}>
              <div className="lh-grid-contact" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'end', ...reveal('entry 0% cover 22%') }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 18 }}>Get in touch</div>
                  <h2 style={{ fontSize: 'clamp(34px,5vw,62px)', lineHeight: 1.0, fontWeight: 600, letterSpacing: '-0.04em', color: '#14181f' }}>Let's build<br />together.</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.42)', marginBottom: 7 }}>Address</div>
                    <div style={{ fontSize: 15, lineHeight: 1.5, color: '#14181f' }}>{CONTACT.address}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.42)', marginBottom: 7 }}>Email</div>
                    <a href="mailto:contact@leadersholding.tn" style={{ fontSize: 15, color: '#14181f', textDecoration: 'none', borderBottom: '1px solid rgba(197,160,57,0.5)', paddingBottom: 2 }}>{CONTACT.email}</a>
                  </div>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.42)', marginBottom: 7 }}>Phone</div>
                    <div style={{ fontSize: 15, color: '#14181f' }}>{CONTACT.phone}</div>
                  </div>
                </div>
              </div>
            </section>

            <footer className="lh-foot" style={{ borderTop: '1px solid rgba(20,24,31,0.1)', maxWidth: 1080, margin: '0 auto', padding: '30px 40px 50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <img src={holdingLogo} alt="" style={{ height: 30, width: 'auto', display: 'block' }} />
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)' }}>© 2026 Leaders Holding</span>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.4)' }}>Tunis · Tunisie</span>
            </footer>

          </div>

          {activeSector && (
            <aside className="lh-drawer" style={{ position: 'fixed', top: 96, right: 24, bottom: 24, width: 392, maxWidth: 'calc(100vw - 48px)', zIndex: 30, borderRadius: 24, padding: '30px 28px', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.66)', backdropFilter: 'blur(30px) saturate(170%)', WebkitBackdropFilter: 'blur(30px) saturate(170%)', border: '1px solid rgba(255,255,255,0.78)', boxShadow: '0 40px 90px -34px rgba(30,45,70,0.5), inset 0 1px 0 rgba(255,255,255,0.8)', animation: 'lh-rise 0.5s cubic-bezier(.22,1,.36,1) both', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)', marginBottom: 11 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: activeSector.accent, display: 'block' }} />
                    Sector · {activeSector.count} societies
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.08, color: '#14181f' }}>{activeSector.name}</h2>
                </div>
                <button className="lh-close" onClick={() => setActiveSectorKey(null)} style={{ flex: 'none', width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(20,24,31,0.12)', background: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 17, color: 'rgba(20,24,31,0.55)', lineHeight: 1 }}>×</button>
              </div>
              <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', paddingRight: 4 }}>
                {activeSector.societies.map((soc) => (
                  <div key={soc.name} className="lh-soc" onClick={() => openWorld(soc.name)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', borderRadius: 15, cursor: 'pointer', background: 'rgba(255,255,255,0.62)', border: '1px solid rgba(255,255,255,0.7)', boxShadow: '0 8px 22px -14px rgba(30,45,70,0.35)', '--accentSoft': soc.softA, '--accentGlow': soc.glowA }}>
                    <div style={plate(46, 11)}>
                      {soc.hasLogo ? <div style={logoFill(soc.logoUrl, 6)} /> : <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 500, color: soc.P }}>{soc.initials}</span>}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: '-0.01em', color: '#14181f', lineHeight: 1.2 }}>{soc.name}</div>
                      <div style={{ fontSize: 12, fontWeight: 400, color: 'rgba(20,24,31,0.55)', marginTop: 3, lineHeight: 1.4 }}>{soc.blurb}</div>
                    </div>
                    <span style={{ flex: 'none', color: soc.P, fontSize: 16 }}>→</span>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </main>
      )}

      {/* NEXUS INDEX MENU */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 130, background: 'rgba(238,241,246,0.74)', backdropFilter: 'blur(28px) saturate(150%)', WebkitBackdropFilter: 'blur(28px) saturate(150%)', animation: 'lh-fade 0.4s ease both', overflowY: 'auto' }}>
          <div className="lh-menu-wrap" style={{ maxWidth: 1220, margin: '0 auto', padding: '108px 40px 80px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', borderBottom: '1px solid rgba(20,24,31,0.1)', paddingBottom: 26, marginBottom: 40 }}>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 12 }}>Global Index</div>
                <h2 style={{ fontSize: 46, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1, color: '#14181f' }}>All <span style={goldText}>societies</span></h2>
              </div>
              <button className="lh-close" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid rgba(20,24,31,0.14)', background: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#14181f', padding: '13px 20px', borderRadius: 100 }}>Close ×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '34px 44px' }}>
              {GEO.map((s) => (
                <div key={s.key}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 13, marginBottom: 8, borderBottom: '1px solid rgba(20,24,31,0.1)' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: s.accent, display: 'block' }} />
                    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.02em', color: '#14181f' }}>{s.name}</span>
                    <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(20,24,31,0.4)', marginLeft: 'auto' }}>{s.countPad}</span>
                  </div>
                  {s.societies.map((soc) => (
                    <div key={soc.name} className="lh-menu-row" onClick={() => openWorld(soc.name)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 4px', cursor: 'pointer', borderBottom: '1px solid rgba(20,24,31,0.05)' }}>
                      <div style={plate(34, 9)}>
                        {soc.hasLogo ? <div style={logoFill(soc.logoUrl, 5)} /> : <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, color: soc.P }}>{soc.initials}</span>}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em', color: '#14181f', flex: 1 }}>{soc.name}</span>
                      <span style={{ flex: 'none', color: 'rgba(20,24,31,0.3)', fontSize: 13 }}>→</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WORLD */}
      {world && (
        <div id="world-scroll" onWheel={worldWheel} style={{ position: 'fixed', inset: 0, zIndex: 100, overflowY: 'auto', background: world.bg, animation: 'lh-worldin 0.55s cubic-bezier(.22,1,.36,1) both', '--accent': world.P, '--accentSoft': world.softA, '--accentGlow': world.glowA }}>
          <div className="lh-world-nav" style={{ position: 'sticky', top: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '78px 40px 18px', background: `linear-gradient(180deg,${world.navFade} 35%,rgba(255,255,255,0))`, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            <button className="lh-back" onClick={backToHub} style={{ display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${world.softA}`, background: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: world.P, padding: '12px 20px', borderRadius: 100, boxShadow: '0 8px 22px -12px rgba(30,45,70,0.3)' }}>← Return to Nexus</button>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)' }}>{world.sector}</span>
          </div>

          <div className="lh-world-wrap" style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 40px 90px', position: 'relative' }}>
            {/* Hero */}
            <section style={{ padding: '30px 0 56px', borderBottom: `1px solid ${world.softA}`, position: 'relative', overflow: 'hidden' }}>
              {world.hasLogo && <div style={{ position: 'absolute', top: -20, right: -50, width: 340, height: 340, backgroundImage: `url("${world.logoUrl}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', opacity: 0.06, pointerEvents: 'none' }} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, position: 'relative' }}>
                <div style={{ ...plate(96, 20), boxShadow: '0 18px 44px -20px rgba(30,45,70,0.45), inset 0 0 0 1px rgba(20,24,31,0.05)' }}>
                  {world.hasLogo ? <div style={logoFill(world.logoUrl, 14)} /> : <span style={{ fontFamily: MONO, fontSize: 30, fontWeight: 500, color: world.P }}>{world.initials}</span>}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: world.P, display: 'block', boxShadow: `0 0 0 5px ${world.softA}` }} />
                    <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase', color: world.P }}>{world.eyebrow}</span>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', color: '#14181f' }}>{world.name}</div>
                </div>
              </div>
              <h1 style={{ fontSize: 'clamp(38px,6vw,76px)', lineHeight: 0.99, fontWeight: 600, letterSpacing: '-0.04em', color: '#14181f', maxWidth: '17ch', position: 'relative' }}>{world.title}</h1>
              <p style={{ marginTop: 24, fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.55, fontWeight: 400, color: 'rgba(20,24,31,0.62)', maxWidth: '60ch', position: 'relative' }}>{world.about}</p>
            </section>

            {/* Bento services */}
            <section style={{ padding: '56px 0' }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)', marginBottom: 26 }}>What we do</div>
              <div className="lh-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 18, gridAutoFlow: 'row dense' }}>
                {world.services.map((sv) => (
                  <div key={sv.no} className="lh-tile" style={{ gridColumn: sv.gc, gridRow: sv.gr, position: 'relative', overflow: 'hidden', borderRadius: 22, padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: sv.minh, background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(16px) saturate(150%)', WebkitBackdropFilter: 'blur(16px) saturate(150%)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 22px 54px -28px rgba(30,45,70,0.35)' }}>
                    <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, borderRadius: '50%', background: `radial-gradient(circle,${world.softA},transparent 70%)`, pointerEvents: 'none' }} />
                    <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: world.P, position: 'relative' }}>{sv.no}</div>
                    <div style={{ position: 'relative' }}>
                      <h3 style={{ fontSize: sv.size, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.08, color: '#14181f', marginTop: 16 }}>{sv.name}</h3>
                      <p style={{ marginTop: 11, fontSize: 14, lineHeight: 1.6, color: 'rgba(20,24,31,0.6)', maxWidth: '48ch' }}>{sv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Stats + chart */}
            <section className="lh-statschart" style={{ padding: '8px 0 56px', borderTop: `1px solid ${world.softA}`, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 40, alignItems: 'start' }}>
              <div style={{ paddingTop: 34 }}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)', marginBottom: 26 }}>By the numbers</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '26px 30px' }}>
                  {world.stats.map((st) => (
                    <div key={st.k}>
                      <div style={{ fontSize: 'clamp(30px,3.4vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: st.color }}>{st.v}</div>
                      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)', marginTop: 11 }}>{st.k}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 34, borderRadius: 22, padding: '26px 28px 22px', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px) saturate(150%)', WebkitBackdropFilter: 'blur(16px) saturate(150%)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 22px 54px -30px rgba(30,45,70,0.35)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: world.P, display: 'block' }} /><span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em', color: '#14181f' }}>Annual activity</span></div>
                  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.4)' }}>Indicative · awaiting figures</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 160, borderBottom: '1px solid rgba(20,24,31,0.1)' }}>
                  {world.bars.map((b, i) => (
                    <div key={i} style={{ flex: 1, height: `${b.h}%`, borderRadius: '4px 4px 0 0', background: `linear-gradient(180deg,${world.A},${world.P})`, transformOrigin: 'bottom', animation: 'lh-grow 0.7s cubic-bezier(.22,1,.36,1) both' }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                  {world.months.map((m) => <span key={m} style={{ flex: 1, textAlign: 'center', fontFamily: MONO, fontSize: 8, letterSpacing: '0.04em', color: 'rgba(20,24,31,0.38)' }}>{m}</span>)}
                </div>
              </div>
            </section>

            {/* Projects */}
            <section style={{ padding: '48px 0', borderTop: `1px solid ${world.softA}` }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)', marginBottom: 26 }}>Selected work</div>
              <div className="lh-proj" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
                {world.projects.map((pj) => (
                  <div key={pj.name} style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio: '4 / 5', backgroundImage: `repeating-linear-gradient(135deg,${world.softA} 0 2px,transparent 2px 12px)`, backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.7)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)', display: 'flex', alignItems: 'flex-end', padding: 22 }}>
                    <div>
                      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: world.P, marginBottom: 8 }}>{pj.tag}</div>
                      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: '#14181f' }}>{pj.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section style={{ marginTop: 24, borderRadius: 26, padding: '52px 46px', overflow: 'hidden', position: 'relative', background: `linear-gradient(135deg,${world.P},#14181f 85%)`, boxShadow: '0 40px 90px -40px rgba(20,24,31,0.6)' }}>
              <div style={{ position: 'absolute', top: -80, right: -60, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle,${world.glowA},transparent 70%)` }} />
              <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 16 }}>Work with {world.name}</div>
                  <h2 style={{ fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.04, color: '#fff', maxWidth: '18ch' }}>Let's build the next chapter together.</h2>
                </div>
                <button className="lh-cta" style={{ flex: 'none', border: 'none', cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: world.P, padding: '16px 30px', borderRadius: 100, background: '#fff', boxShadow: '0 14px 34px -12px rgba(0,0,0,0.4)', transition: 'transform .3s' }}>Start a conversation →</button>
              </div>
            </section>

            <section onClick={() => openWorld(world.nextName)} className="lh-teaser" style={{ marginTop: 40, borderRadius: 26, overflow: 'hidden', cursor: 'pointer', position: 'relative', background: `linear-gradient(135deg,${world.next.P},#0f1318 92%)`, padding: '44px 46px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ flex: 'none', width: 74, height: 74, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 14px 30px -14px rgba(0,0,0,0.5)' }}>
                  {world.next.hasLogo ? <div style={logoFill(world.next.logoUrl, 11)} /> : <span style={{ fontFamily: MONO, fontSize: 24, fontWeight: 500, color: world.next.P }}>{world.next.initials}</span>}
                </div>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 9 }}>Next world</div>
                  <div style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 600, letterSpacing: '-0.025em', color: '#fff', lineHeight: 1.04 }}>{world.next.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>{world.next.sector}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#fff' }}>Continue<span style={{ fontSize: 18 }}>↓</span></div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
