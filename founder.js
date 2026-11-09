/* About the Founder | ZECO: page behaviour (state, menus, carousels, video). Mounted by js/runtime.js. */
(function () {
class Component extends ZECO.PageLogic {
  state = { w: null, open: null, scrolled: false, menuOpen: false, mAbout: false, mServices: false, spIdx: 0, spPaused: false };
  talks = [
    {
      "year": "2025",
      "title": "Lunch & Learn Webinar: Using AI to Power Go-To-Market Growth",
      "assoc": "",
      "desc": "A webinar on how AI is transforming go-to-market planning and execution, introducing the Glass-Box AI model."
    },
    {
      "year": "2024",
      "title": "Speaker at Outlook 2024: Strategic Foresight Initiative",
      "assoc": "",
      "desc": "How AI acceleration, geopolitical fragmentation, and regional energy dynamics are reshaping commodity markets."
    },
    {
      "year": "2023",
      "title": "Keynote Speaker at Global Gasoline & COP28 Impact Analysis",
      "assoc": "",
      "desc": "Connecting COP28 climate commitments to operational, financial, and risk implications across gasoline markets."
    },
    {
      "year": "2022",
      "title": "Keynote Speaker at Enterprise Information Due Diligence & Risk Strategy",
      "assoc": "",
      "desc": "Reframing information governance as a board-level risk issue."
    },
    {
      "year": "2021",
      "title": "Speaker at The Green Hydrogen Roadmap",
      "assoc": "Associated with ZE Power Engineering",
      "desc": "The capital, infrastructure, and execution required to scale a green hydrogen economy."
    },
    {
      "year": "2020",
      "title": "Downstream Information Optimization Program",
      "assoc": "Associated with ZE Power Engineering",
      "desc": "Refinery information orchestration that turns operational complexity into a competitive advantage."
    },
    {
      "year": "2020",
      "title": "Speaker at Downstream Digitalization & AI Integration (LATAM)",
      "assoc": "",
      "desc": "An industrial AI framework moving downstream operators to real-time, decision-grade intelligence."
    },
    {
      "year": "2019",
      "title": "Speaker at NGL Infrastructure Visualization Project",
      "assoc": "Associated with ZE Power Engineering",
      "desc": "Uncovering bottlenecks and delivery constraints in the Permian Basin NGL market."
    },
    {
      "year": "2018",
      "title": "Speaker at Latin American Energy Infrastructure Reform",
      "assoc": "Associated with ZE Power Engineering",
      "desc": "Mexico's energy deregulation and related infrastructure risks during regulatory transition."
    },
    {
      "year": "Multi-decade",
      "title": "North American Market Transparency Initiative",
      "assoc": "Associated with ZE Power Engineering",
      "desc": "Translating complex federal energy regulation into actionable market insight."
    }
  ];
  rootRef = ZECO.createRef();
  navRef = ZECO.createRef();
  hoverAt = 0;
  perView() { return this.state.w != null && this.state.w < 640 ? 1 : 3; }
  spMax() { return Math.max(0, this.talks.length - this.perView()); }
  spStep = (d) => this.setState(s => {
    const m = this.spMax(); let i = Math.min(s.spIdx, m) + d;
    if (i > m) i = 0; if (i < 0) i = m;
    return { spIdx: i };
  });
  toggle = (k) => () => {
    if (this.state.open === k && Date.now() - this.hoverAt < 500) return;
    this.setState(p => ({ open: p.open === k ? null : k }));
  };
  componentDidMount() {
    this.onScroll = () => {
      const r = this.rootRef.current; if (!r) return;
      const sc = r.getBoundingClientRect().top < -12;
      if (sc !== this.state.scrolled) this.setState({ scrolled: sc });
    };
    window.addEventListener('scroll', this.onScroll, { capture: true, passive: true });
    this.onKey = (e) => { if (e.key === 'Escape' && (this.state.open || this.state.menuOpen)) this.setState({ open: null, menuOpen: false }); };
    document.addEventListener('keydown', this.onKey);
    this.onDown = (e) => { if (this.state.open && this.navRef.current && !this.navRef.current.contains(e.target)) this.setState({ open: null }); };
    document.addEventListener('pointerdown', this.onDown);
    const rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!rm) this.spTimer = setInterval(() => { if (!this.state.spPaused && (this.props.motion ?? true) !== false) this.spStep(1); }, 6000);
    const el = this.rootRef.current;
    if (!el) return;
    this.ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width);
      if (w !== this.state.w) this.setState({ w });
    });
    this.ro.observe(el);
  }
  componentWillUnmount() { window.removeEventListener('scroll', this.onScroll, true); document.removeEventListener('keydown', this.onKey); document.removeEventListener('pointerdown', this.onDown); this.ro && this.ro.disconnect(); clearInterval(this.spTimer); }
  blob(style, dur, delay) {
    const motion = (this.props.motion ?? true) !== false;
    return ZECO.h('div', { style: Object.assign({ position: 'absolute', willChange: 'transform', animation: motion ? 'zdrift ' + dur + 's ease-in-out ' + delay + 's infinite alternate' : 'none' }, style) });
  }
  renderVals() {
    const s = this.state;
    const isMobile = s.w != null && s.w < 960;
    const glow = this.props.glow ?? 'Standard';
    const pv = this.perView();
    const idx = Math.min(s.spIdx, this.spMax());
    const n = this.talks.length;
    const pad = (x) => String(x).padStart(2, '0');
    const col = pv === 1 ? '100%' : 'calc((100% - ' + ((pv - 1) * 16) + 'px) / ' + pv + ')';
    return {
      rootRef: this.rootRef,
      navRef: this.navRef,
      hdrBg: s.menuOpen ? '#000' : s.scrolled ? 'rgba(0,0,0,.72)' : 'rgba(0,0,0,0)',
      hdrBlur: s.scrolled || s.menuOpen ? 'blur(16px)' : 'blur(0px)',
      hdrLine: s.scrolled || s.menuOpen ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,0)',
      aboutDeco: s.open === 'about' ? '#DA272F' : 'transparent',
      servicesDeco: s.open === 'services' ? '#DA272F' : 'transparent',
      aboutChev: s.open === 'about' ? 'translateY(2px) rotate(225deg)' : 'translateY(-2px) rotate(45deg)',
      servicesChev: s.open === 'services' ? 'translateY(2px) rotate(225deg)' : 'translateY(-2px) rotate(45deg)',
      menuLabel: s.menuOpen ? 'Close menu' : 'Open menu',
      blurMenu: (e) => { if (!e.currentTarget.contains(e.relatedTarget)) this.setState({ open: null }); },
      isDesktop: !isMobile,
      isMobile,
      glowOpacity: glow === 'Subtle' ? 0.55 : glow === 'Vivid' ? 1 : 0.8,
      aboutOpen: s.open === 'about',
      servicesOpen: s.open === 'services',
      menuOpen: s.menuOpen,
      menuClosed: !s.menuOpen,
      mAbout: s.mAbout,
      mServices: s.mServices,
      mAboutSign: s.mAbout ? '−' : '+',
      mServicesSign: s.mServices ? '−' : '+',
      openAbout: () => { this.hoverAt = Date.now(); this.setState({ open: 'about' }); },
      openServices: () => { this.hoverAt = Date.now(); this.setState({ open: 'services' }); },
      closeMenus: () => this.setState({ open: null }),
      toggleAbout: this.toggle('about'),
      toggleServices: this.toggle('services'),
      toggleMenu: () => this.setState(p => ({ menuOpen: !p.menuOpen })),
      toggleMAbout: () => this.setState(p => ({ mAbout: !p.mAbout })),
      toggleMServices: () => this.setState(p => ({ mServices: !p.mServices })),
      goTop: (e) => { e.preventDefault(); this.setState({ open: null, menuOpen: false }); window.scrollTo({ top: 0, behavior: 'smooth' }); },
      noop: (e) => e.preventDefault(),
      talks: this.talks.map((t, i) => ({ ...t, label: (i + 1) + ' of ' + n, hidden: i < idx || i >= idx + pv })),
      spCol: col,
      spTransform: 'translate3d(calc(' + (-idx) + ' * (' + col + ' + 16px)),0,0)',
      spCurrent: pv > 1 ? pad(idx + 1) + '–' + pad(Math.min(n, idx + pv)) : pad(idx + 1),
      spTotal: pad(n),
      spPrev: () => this.spStep(-1), spNext: () => this.spStep(1),
      spPause: () => this.setState({ spPaused: true }), spResume: () => this.setState({ spPaused: false }),
      ctaGlow: ZECO.h(ZECO.Fragment, null,
        this.blob({ left: '-12%', top: '-60%', width: '55%', height: '200%', background: 'radial-gradient(closest-side,rgba(218,39,47,.3),rgba(0,0,0,0))', filter: 'blur(70px)' }, 24, 0),
        this.blob({ right: '-10%', bottom: '-70%', width: '45%', height: '180%', background: 'radial-gradient(closest-side,rgba(218,39,47,.18),rgba(0,0,0,0))', filter: 'blur(70px)' }, 30, -10)
      )
    };
  }
}
ZECO.mount(Component);
})();
