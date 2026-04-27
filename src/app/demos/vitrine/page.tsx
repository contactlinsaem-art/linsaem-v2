"use client";
import { useState, useEffect, useRef } from "react";

/* ─── PALETTE ─── */
const C = {
  anthracite: "#2d2d2d",
  anthraciteLight: "#4a4a4a",
  blanc: "#fafafa",
  blancCasse: "#f0ede8",
  or: "#c9a84c",
  orLight: "#e8d5a3",
  grisMoyen: "#8a8a8a",
  grisClair: "#e8e8e8",
};

/* ─── GLOBAL STYLES ─── */
const G = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes bounceSoft {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(6px); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes dotsPulse {
    0%,80%,100% { opacity: 0; }
    40%         { opacity: 1; }
  }
`;

/* ─── hook useInView ─── */
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

/* ─── anim helper ─── */
function anim(name: string, delay = 0, visible = true): React.CSSProperties {
  if (!visible) return { opacity: 0 };
  return {
    animationName: name,
    animationDuration: "600ms",
    animationTimingFunction: "ease",
    animationFillMode: "both",
    animationDelay: `${delay}ms`,
  };
}

/* ─── DATA ─── */
const COLLECTION = [
  { name: "Robe Lucie",    price: "185€", cat: "robes",       slot: "r1-large", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80" },
  { name: "Chemise Léa",   price: "95€",  cat: "hauts",       slot: "r1-small", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80" },
  { name: "Pantalon Iris", price: "145€", cat: "pantalons",   slot: "r2-small", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80" },
  { name: "Robe Céleste",  price: "220€", cat: "robes",       slot: "r2-large", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80" },
  { name: "Foulard Brume", price: "65€",  cat: "accessoires", slot: "r3-a",     image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80" },
  { name: "Haut Nuage",    price: "110€", cat: "hauts",       slot: "r3-b",     image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80" },
  { name: "Robe Alba",     price: "195€", cat: "robes",       slot: "r3-c",     image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&q=80" },
  { name: "Sac Miel",      price: "175€", cat: "accessoires", slot: "r4-a",     image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
];

const LOOKS = [
  { label: "01", title: "Bohème Parisienne",   pieces: [{ name: "Robe Lucie", price: "185€" }, { name: "Foulard Brume", price: "65€" }],  image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80" },
  { label: "02", title: "Élégance Naturelle",  pieces: [{ name: "Chemise Léa", price: "95€" }, { name: "Pantalon Iris", price: "145€" }], image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=700&q=80" },
  { label: "03", title: "Lumière du Soir",     pieces: [{ name: "Robe Céleste", price: "220€" }, { name: "Sac Miel", price: "175€" }],    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=700&q=80" },
];

const TEMOIGNAGES = [
  { text: "Une qualité exceptionnelle, les matières sont divines. Je ne commande plus qu'ici.", name: "Sophie M.", ville: "Paris" },
  { text: "Le style bohème que je cherchais depuis des années. Chaque pièce est une œuvre.", name: "Camille R.", ville: "Lyon" },
  { text: "Service impeccable, livraison rapide. La robe Alba est sublime.", name: "Léa D.", ville: "Bordeaux" },
];

/* ─── FLOATING LABEL COMPONENTS ─── */
function FloatingInput({ label, type = "text" }: { label: string; type?: string }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const up = focused || val.length > 0;
  const labelStyle: React.CSSProperties = {
    position: "absolute", left: 0,
    top: up ? 0 : 26,
    fontSize: up ? 11 : 15,
    color: focused ? C.or : C.grisMoyen,
    fontWeight: up ? 600 : 400,
    letterSpacing: up ? "0.08em" : "0",
    textTransform: up ? "uppercase" : "none",
    transition: "all 300ms ease",
    pointerEvents: "none",
  };
  return (
    <div style={{ position: "relative", paddingTop: 20 }}>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={val} onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${focused ? C.or : C.grisClair}`, outline: "none", fontSize: 15, color: C.anthracite, padding: "6px 0", transition: "border-color 300ms ease" }} />
    </div>
  );
}

function FloatingSelect({ label, options }: { label: string; options: string[] }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const up = focused || val.length > 0;
  const labelStyle: React.CSSProperties = {
    position: "absolute", left: 0,
    top: up ? 0 : 26,
    fontSize: up ? 11 : 15,
    color: focused ? C.or : C.grisMoyen,
    fontWeight: up ? 600 : 400,
    letterSpacing: up ? "0.08em" : "0",
    textTransform: up ? "uppercase" : "none",
    transition: "all 300ms ease",
    pointerEvents: "none",
  };
  return (
    <div style={{ position: "relative", paddingTop: 20 }}>
      <label style={labelStyle}>{label}</label>
      <select value={val} onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${focused ? C.or : C.grisClair}`, outline: "none", fontSize: 15, color: val ? C.anthracite : "transparent", padding: "6px 0", appearance: "none", cursor: "pointer", transition: "border-color 300ms ease" }}>
        <option value="" />
        {options.map(o => <option key={o} value={o} style={{ color: C.anthracite }}>{o}</option>)}
      </select>
    </div>
  );
}

function FloatingTextarea({ label }: { label: string }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const up = focused || val.length > 0;
  const labelStyle: React.CSSProperties = {
    position: "absolute", left: 0,
    top: up ? 0 : 26,
    fontSize: up ? 11 : 15,
    color: focused ? C.or : C.grisMoyen,
    fontWeight: up ? 600 : 400,
    letterSpacing: up ? "0.08em" : "0",
    textTransform: up ? "uppercase" : "none",
    transition: "all 300ms ease",
    pointerEvents: "none",
  };
  return (
    <div style={{ position: "relative", paddingTop: 20 }}>
      <label style={labelStyle}>{label}</label>
      <textarea value={val} onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        rows={4}
        style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${focused ? C.or : C.grisClair}`, outline: "none", fontSize: 15, color: C.anthracite, padding: "6px 0", resize: "none", fontFamily: "inherit", transition: "border-color 300ms ease" }} />
    </div>
  );
}

/* ─── PRODUCT CARD ─── */
function ProductCard({ item, height }: { item: typeof COLLECTION[0]; height: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ height, borderRadius: 2, position: "relative", overflow: "hidden", cursor: "pointer", transition: "transform 400ms ease", transform: hovered ? "scale(1.01)" : "scale(1)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <img src={item.image} alt={item.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 600ms ease", transform: hovered ? "scale(1.05)" : "scale(1)" }} />
      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)", opacity: hovered ? 1 : 0, transition: "opacity 400ms ease", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24 }}>
        <div style={{ transform: hovered ? "translateY(0)" : "translateY(10px)", transition: "transform 400ms ease" }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 15, color: C.blanc, marginBottom: 4 }}>{item.name}</div>
          <div style={{ fontSize: 13, color: "rgba(250,250,250,0.75)" }}>{item.price}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function VitrinePage() {
  const [scrolled, setScrolled]             = useState(false);
  const [lineGrown, setLineGrown]           = useState(false);
  const [activeFilter, setActiveFilter]     = useState("tout");
  const [lookIdx, setLookIdx]               = useState(0);
  const [lookFade, setLookFade]             = useState(true);
  const [nlDone, setNlDone]                 = useState(false);
  const [nlVal, setNlVal]                   = useState("");
  const [contactState, setContactState]     = useState<"idle"|"loading"|"done">("idle");
  const [touchStart, setTouchStart]         = useState<number|null>(null);

  const heroRef    = useRef<HTMLDivElement>(null);
  const collRef    = useRef<HTMLDivElement>(null);
  const lookRef    = useRef<HTMLDivElement>(null);
  const philoRef   = useRef<HTMLDivElement>(null);
  const temoinRef  = useRef<HTMLDivElement>(null);
  const nlRef      = useRef<HTMLDivElement>(null);
  const ctRef      = useRef<HTMLDivElement>(null);

  const heroV   = useInView(heroRef);
  const collV   = useInView(collRef);
  const lookV   = useInView(lookRef);
  const philoV  = useInView(philoRef);
  const temoinV = useInView(temoinRef);
  const nlV     = useInView(nlRef);
  const ctV     = useInView(ctRef);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLineGrown(true), 400);
    return () => clearTimeout(t);
  }, []);

  const goLook = (dir: 1|-1) => {
    setLookFade(false);
    setTimeout(() => {
      setLookIdx(i => (i + dir + LOOKS.length) % LOOKS.length);
      setLookFade(true);
    }, 250);
  };

  const filtered = activeFilter === "tout" ? COLLECTION : COLLECTION.filter(i => i.cat === activeFilter);
  const r1large  = filtered.filter(i => i.slot === "r1-large");
  const r1small  = filtered.filter(i => i.slot === "r1-small");
  const r2small  = filtered.filter(i => i.slot === "r2-small");
  const r2large  = filtered.filter(i => i.slot === "r2-large");
  const r3       = filtered.filter(i => ["r3-a","r3-b","r3-c","r4-a"].includes(i.slot));

  const look = LOOKS[lookIdx];

  return (
    <>
      <style>{G}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 32, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", background: scrolled ? "rgba(250,250,250,0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? `1px solid ${C.grisClair}` : "1px solid transparent", transition: "all 300ms ease" }}>
        <div style={{ display: "flex", gap: 32 }}>
          {["Collection","Lookbook","À propos"].map(l => (
            <a key={l} href="#" style={{ color: C.grisMoyen, textDecoration: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 250ms" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.anthracite)}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.grisMoyen)}>{l}</a>
          ))}
        </div>
        <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 20, letterSpacing: "0.3em", textTransform: "uppercase", color: C.anthracite }}>CÉLESTE</div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <a href="#" style={{ color: C.grisMoyen, textDecoration: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 250ms" }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.anthracite)}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.grisMoyen)}>Contact</a>
          <a href="#" style={{ color: C.anthracite, fontSize: 18, textDecoration: "none" }}>🛍</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ background: C.blancCasse, minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 48px 60px", overflow: "hidden" }}>
        {/* Left: image */}
        <div style={{ flex: "0 0 58%", height: "85vh", borderRadius: 4, overflow: "hidden", cursor: "pointer", transition: "transform 800ms ease", ...anim("slideLeft", 0, heroV) }}
          onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)")}
          onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = "scale(1)")}>
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85" alt="Collection CÉLESTE"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>

        {/* Right: text */}
        <div style={{ flex: 1, padding: "0 56px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, ...anim("fadeIn", 100, heroV) }}>
            <span style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: C.grisMoyen }}>Nouvelle Collection</span>
            <div style={{ height: 1, background: C.or, width: lineGrown ? 40 : 0, transition: "width 600ms ease" }} />
          </div>
          <div style={anim("fadeUp", 200, heroV)}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: "clamp(38px,4.5vw,64px)", fontWeight: 400, color: C.anthracite, lineHeight: 1.1 }}>L&apos;Art du</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: "clamp(38px,4.5vw,64px)", fontStyle: "italic", fontWeight: 400, color: C.anthracite, lineHeight: 1.1 }}>Mouvement</div>
          </div>
          <p style={{ fontSize: 15, color: C.grisMoyen, lineHeight: 1.8, maxWidth: 300, ...anim("fadeUp", 350, heroV) }}>
            Des pièces pensées pour la femme libre. Matières naturelles, coupes intemporelles, éditions limitées.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, ...anim("fadeUp", 500, heroV) }}>
            <button style={{ alignSelf: "flex-start", background: C.anthracite, color: C.blanc, border: `1px solid ${C.anthracite}`, padding: "14px 32px", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 400ms ease" }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = C.anthracite; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = C.anthracite; b.style.color = C.blanc; }}>
              Découvrir la collection
            </button>
            <span style={{ fontSize: 12, color: C.grisMoyen, letterSpacing: "0.1em", animationName: "bounceSoft", animationDuration: "2s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", display: "inline-block" }}>↓ Scroll</span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section style={{ background: C.anthracite, padding: "28px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap" }}>
          {[0,1].map(rep => (
            <div key={rep} style={{ display: "inline-flex", animationName: "marquee", animationDuration: "30s", animationTimingFunction: "linear", animationIterationCount: "infinite" }}>
              <span style={{ fontFamily: "Georgia,serif", fontStyle: "italic", color: C.blanc, fontSize: 18, letterSpacing: "0.15em" }}>
                NOUVELLE COLLECTION&nbsp;&nbsp;•&nbsp;&nbsp;BOHÈME CHIC&nbsp;&nbsp;•&nbsp;&nbsp;FAIT EN FRANCE&nbsp;&nbsp;•&nbsp;&nbsp;ÉDITION LIMITÉE&nbsp;&nbsp;•&nbsp;&nbsp;CÉLESTE&nbsp;&nbsp;•&nbsp;&nbsp;AUTOMNE 2025&nbsp;&nbsp;•&nbsp;&nbsp;
                NOUVELLE COLLECTION&nbsp;&nbsp;•&nbsp;&nbsp;BOHÈME CHIC&nbsp;&nbsp;•&nbsp;&nbsp;FAIT EN FRANCE&nbsp;&nbsp;•&nbsp;&nbsp;ÉDITION LIMITÉE&nbsp;&nbsp;•&nbsp;&nbsp;CÉLESTE&nbsp;&nbsp;•&nbsp;&nbsp;AUTOMNE 2025&nbsp;&nbsp;•&nbsp;&nbsp;
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── COLLECTION ── */}
      <section ref={collRef} style={{ background: C.blancCasse, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 56, ...anim("fadeUp", 0, collV) }}>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 400, color: C.anthracite, marginBottom: 8 }}>La Collection</h2>
            <p style={{ color: C.grisMoyen, fontSize: 14, letterSpacing: "0.1em", fontStyle: "italic" }}>Automne — Hiver 2025</p>
            <div style={{ height: 1, background: C.or, margin: "16px auto 0", width: collV ? 40 : 0, transition: "width 800ms ease" }} />
          </div>
          {/* Filters */}
          <div style={{ display: "flex", gap: 36, justifyContent: "center", marginBottom: 48, flexWrap: "wrap", ...anim("fadeIn", 100, collV) }}>
            {[["tout","Tout"],["robes","Robes"],["hauts","Hauts"],["pantalons","Pantalons"],["accessoires","Accessoires"]].map(([k,v]) => (
              <button key={k} onClick={() => setActiveFilter(k)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: activeFilter === k ? C.anthracite : C.grisMoyen, fontWeight: activeFilter === k ? 600 : 400, paddingBottom: 4, borderBottom: activeFilter === k ? `1px solid ${C.or}` : "1px solid transparent", transition: "all 300ms ease" }}>
                {v}
              </button>
            ))}
          </div>
          {/* Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, ...anim("fadeIn", 200, collV) }}>
            {(r1large.length > 0 || r1small.length > 0) && (
              <div style={{ display: "grid", gridTemplateColumns: r1large.length && r1small.length ? "2fr 1fr" : "1fr", gap: 16 }}>
                {r1large.map(i => <ProductCard key={i.name} item={i} height={520} />)}
                {r1small.map(i => <ProductCard key={i.name} item={i} height={380} />)}
              </div>
            )}
            {(r2small.length > 0 || r2large.length > 0) && (
              <div style={{ display: "grid", gridTemplateColumns: r2small.length && r2large.length ? "1fr 2fr" : "1fr", gap: 16 }}>
                {r2small.map(i => <ProductCard key={i.name} item={i} height={380} />)}
                {r2large.map(i => <ProductCard key={i.name} item={i} height={520} />)}
              </div>
            )}
            {r3.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(r3.length, 3)},1fr)`, gap: 16 }}>
                {r3.map(i => <ProductCard key={i.name} item={i} height={440} />)}
              </div>
            )}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: C.grisMoyen, fontSize: 14, fontStyle: "italic" }}>Aucun article dans cette catégorie.</div>
            )}
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK ── */}
      <section ref={lookRef} style={{ background: C.blanc, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 56, ...anim("slideLeft", 0, lookV) }}>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(36px,5vw,56px)", fontStyle: "italic", fontWeight: 400, color: C.anthracite, marginBottom: 8 }}>Lookbook</h2>
            <p style={{ color: C.grisMoyen, fontStyle: "italic", fontSize: 15 }}>Une histoire de légèreté</p>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center", ...anim("fadeIn", 200, lookV) }}
            onTouchStart={e => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={e => {
              if (touchStart === null) return;
              const dx = e.changedTouches[0].clientX - touchStart;
              setTouchStart(null);
              if (dx < -50) goLook(1);
              else if (dx > 50) goLook(-1);
            }}>
            <button onClick={() => goLook(-1)}
              style={{ background: "none", border: "none", fontSize: 28, cursor: "pointer", color: C.anthracite, flexShrink: 0, transition: "transform 200ms" }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = "translateX(-4px)")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = "translateX(0)")}>←</button>

            <div style={{ flex: 1, display: "flex", gap: 48, alignItems: "center" }}>
              {/* Card */}
              <div style={{ flexShrink: 0, width: 340, height: 520, borderRadius: 2, position: "relative", overflow: "hidden", transition: "opacity 250ms ease", opacity: lookFade ? 1 : 0 }}>
                <img src={look.image} alt={look.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
                <span style={{ position: "absolute", bottom: 16, right: 16, fontFamily: "Georgia,serif", fontSize: 72, fontWeight: 700, color: "rgba(255,255,255,0.15)", lineHeight: 1, userSelect: "none" }}>{look.label}</span>
              </div>
              {/* Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20, transition: "opacity 250ms ease", opacity: lookFade ? 1 : 0 }}>
                <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: C.or }}>Look {look.label}</span>
                <h3 style={{ fontFamily: "Georgia,serif", fontSize: 28, fontStyle: "italic", fontWeight: 400, color: C.anthracite }}>{look.title}</h3>
                <div style={{ height: 1, width: 40, background: C.grisClair }} />
                <ul style={{ listStyle: "none" }}>
                  {look.pieces.map(p => (
                    <li key={p.name} style={{ display: "flex", justifyContent: "space-between", gap: 48, fontSize: 14, color: C.anthraciteLight, marginBottom: 10 }}>
                      <span style={{ fontFamily: "Georgia,serif" }}>{p.name}</span>
                      <span style={{ color: C.grisMoyen }}>{p.price}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" style={{ fontSize: 13, color: C.anthracite, textDecoration: "none", borderBottom: `1px solid ${C.or}`, paddingBottom: 2, alignSelf: "flex-start", letterSpacing: "0.08em" }}>Voir les pièces →</a>
              </div>
            </div>

            <button onClick={() => goLook(1)}
              style={{ background: "none", border: "none", fontSize: 28, cursor: "pointer", color: C.anthracite, flexShrink: 0, transition: "transform 200ms" }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = "translateX(4px)")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = "translateX(0)")}>→</button>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 28 }}>
            {LOOKS.map((_,i) => (
              <button key={i} onClick={() => { setLookFade(false); setTimeout(() => { setLookIdx(i); setLookFade(true); }, 250); }}
                style={{ width: i === lookIdx ? 24 : 6, height: 6, borderRadius: 3, border: "none", background: i === lookIdx ? C.anthracite : C.grisClair, cursor: "pointer", transition: "all 300ms", padding: 0 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHIE ── */}
      <section ref={philoRef} style={{ background: C.anthracite, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 3fr", gap: 80, alignItems: "center" }}>
          {/* Photo */}
          <div style={{ height: 500, borderRadius: 2, overflow: "hidden", transition: "transform 600ms ease", transform: philoV ? "rotate(0deg)" : "rotate(-2deg)", ...anim("slideLeft", 0, philoV) }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg)")}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = "rotate(-2deg)")}>
            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80" alt="Atelier CÉLESTE"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: C.or, fontWeight: 500, ...anim("slideRight", 0, philoV) }}>Notre Histoire</span>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px,3vw,44px)", fontWeight: 400, color: C.blanc, lineHeight: 1.3, ...anim("slideRight", 100, philoV) }}>
              Née d&apos;une passion<br />pour la liberté
            </h2>
            <p style={{ fontSize: 16, lineHeight: 2, color: "rgba(250,250,250,0.75)", maxWidth: 480, ...anim("slideRight", 200, philoV) }}>
              CÉLESTE est née en 2018 d&apos;une vision simple : créer des vêtements qui racontent une histoire. Chaque pièce est pensée pour la femme moderne, libre et élégante.
            </p>
            <div style={{ height: 1, background: C.or, width: philoV ? 60 : 0, transition: "width 800ms ease 300ms" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {["Fait en France","Matières naturelles","Éditions limitées"].map((v,i) => (
                <div key={v} style={{ display: "flex", alignItems: "center", gap: 12, color: C.blanc, fontSize: 15, ...anim("fadeIn", 300 + i * 100, philoV) }}>
                  <span style={{ color: C.or, fontSize: 12 }}>✦</span>{v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section ref={temoinRef} style={{ background: C.blancCasse, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px,3.5vw,44px)", fontStyle: "italic", fontWeight: 400, color: C.anthracite, textAlign: "center", marginBottom: 64, ...anim("fadeUp", 0, temoinV) }}>
            Elles parlent de nous
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 28 }}>
            {TEMOIGNAGES.map((t,i) => (
              <div key={i}
                style={{ background: C.blanc, border: `1px solid ${C.grisClair}`, borderTop: `2px solid ${C.or}`, padding: "36px 32px", cursor: "default", transition: "all 300ms ease", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", ...anim("fadeUp", i * 100, temoinV) }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = C.or; d.style.transform = "translateY(-4px)"; d.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = C.grisClair; d.style.borderTopColor = C.or; d.style.transform = "translateY(0)"; d.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {[...Array(5)].map((_,j) => <span key={j} style={{ color: C.or, fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 15, lineHeight: 1.8, color: C.anthraciteLight, marginBottom: 24, position: "relative" }}>
                  <span style={{ position: "absolute", top: -12, left: -8, fontSize: 48, color: C.orLight, fontFamily: "Georgia,serif", lineHeight: 1, pointerEvents: "none" }}>&ldquo;</span>
                  {t.text}
                </p>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.grisMoyen }}>{t.name} — {t.ville}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section ref={nlRef} style={{ background: C.anthracite, padding: "100px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20, ...anim("fadeUp", 0, nlV) }}>
          <span style={{ color: C.or, fontSize: 20 }}>✦</span>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 400, color: C.blanc }}>Rejoignez l&apos;univers CÉLESTE</h2>
          <p style={{ color: "rgba(250,250,250,0.6)", fontStyle: "italic", fontSize: 15 }}>Accès en avant-première aux nouvelles collections</p>
          {nlDone ? (
            <p style={{ color: C.or, fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 18, padding: "20px 0" }}>Merci ! ✦ Bienvenue dans l&apos;univers CÉLESTE</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setNlDone(true); }} style={{ display: "flex", gap: 0, marginTop: 8 }}>
              <input type="email" required placeholder="Votre adresse email" value={nlVal} onChange={e => setNlVal(e.target.value)}
                style={{ flex: 1, background: "transparent", border: "1px solid rgba(250,250,250,0.3)", borderRight: "none", color: C.blanc, fontSize: 14, padding: "14px 20px", outline: "none", transition: "border-color 300ms" }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(250,250,250,0.8)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(250,250,250,0.3)")} />
              <button type="submit"
                style={{ background: C.blanc, color: C.anthracite, border: `1px solid ${C.blanc}`, padding: "14px 28px", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", transition: "all 300ms ease", whiteSpace: "nowrap" }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = C.or; b.style.borderColor = C.or; b.style.color = C.blanc; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = C.blanc; b.style.borderColor = C.blanc; b.style.color = C.anthracite; }}>
                S&apos;inscrire
              </button>
            </form>
          )}
          <p style={{ color: "rgba(250,250,250,0.4)", fontSize: 12 }}>Pas de spam. Désabonnement en 1 clic.</p>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section ref={ctRef} style={{ background: C.blanc, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28, ...anim("slideLeft", 0, ctV) }}>
            <div>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, color: C.anthracite, marginBottom: 8 }}>Nous écrire</h2>
              <p style={{ color: C.grisMoyen, fontStyle: "italic", fontSize: 15 }}>Nous répondons sous 24h, du lundi au samedi.</p>
            </div>
            <div style={{ height: 1, width: 40, background: C.or }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {["contact@celeste-paris.fr","+33 1 XX XX XX XX","12 Rue du Faubourg, Paris 75008","Mar – Sam 10h – 19h"].map(v => (
                <div key={v} style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: C.or, fontSize: 12, marginTop: 2 }}>✦</span>
                  <span style={{ color: C.anthraciteLight, fontSize: 15, lineHeight: 1.5 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {["Instagram","Pinterest"].map(s => (
                <a key={s} href="#"
                  style={{ color: C.grisMoyen, textDecoration: "none", fontSize: 13, letterSpacing: "0.08em", paddingBottom: 2, borderBottom: "1px solid transparent", transition: "all 300ms" }}
                  onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = C.anthracite; a.style.borderBottomColor = C.or; }}
                  onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = C.grisMoyen; a.style.borderBottomColor = "transparent"; }}>{s}</a>
              ))}
            </div>
          </div>
          {/* Form */}
          <form onSubmit={e => { e.preventDefault(); setContactState("loading"); setTimeout(() => setContactState("done"), 1500); }}
            style={{ display: "flex", flexDirection: "column", gap: 28, ...anim("slideRight", 0, ctV) }}>
            <FloatingInput label="Nom" />
            <FloatingInput label="Email" type="email" />
            <FloatingSelect label="Sujet" options={["Commande","Retour / Échange","Partenariat","Autre"]} />
            <FloatingTextarea label="Message" />
            <button type="submit" disabled={contactState !== "idle"}
              style={{ marginTop: 8, padding: "16px", background: contactState === "done" ? C.or : C.anthracite, color: C.blanc, border: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, cursor: contactState === "idle" ? "pointer" : "default", transition: "all 300ms ease", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              onMouseEnter={e => { if (contactState !== "idle") return; (e.currentTarget as HTMLButtonElement).style.background = C.or; }}
              onMouseLeave={e => { if (contactState !== "idle") return; (e.currentTarget as HTMLButtonElement).style.background = C.anthracite; }}>
              {contactState === "idle" && "Envoyer le message"}
              {contactState === "loading" && <>Envoi<span style={{ letterSpacing: "0.3em" }}>{[".",".",".",].map((d,i) => <span key={i} style={{ animationName: "dotsPulse", animationDuration: "1.4s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: `${i*0.2}s`, display: "inline-block" }}>{d}</span>)}</span></>}
              {contactState === "done" && "Message envoyé ✦"}
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.anthracite, padding: "64px 48px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", fontFamily: "Georgia,serif", fontSize: "clamp(60px,10vw,120px)", fontWeight: 400, color: "rgba(250,250,250,0.05)", letterSpacing: "0.2em", textTransform: "uppercase", userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap" }}>CÉLESTE</div>
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 36, flexWrap: "wrap", justifyContent: "center" }}>
            {["Collection","Lookbook","À propos","Contact","CGV"].map(l => (
              <a key={l} href="#"
                style={{ color: "rgba(250,250,250,0.5)", textDecoration: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 250ms" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.blanc)}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(250,250,250,0.5)")}>{l}</a>
            ))}
          </div>
          <div style={{ width: 120, height: 1, background: C.or, opacity: 0.5 }} />
          <div style={{ color: "rgba(250,250,250,0.35)", fontSize: 12, textAlign: "center", lineHeight: 1.8 }}>
            © 2025 CÉLESTE Paris. Tous droits réservés.<br />
            Site créé par{" "}
            <a href="https://www.linsaem.fr" target="_blank" rel="noopener noreferrer"
              style={{ color: C.or, textDecoration: "none", transition: "color 250ms" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.blanc)}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.or)}>LINSAEM</a>
          </div>
        </div>
      </footer>
    </>
  );
}
