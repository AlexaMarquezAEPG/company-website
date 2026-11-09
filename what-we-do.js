/* What We Do | ZECO: page behaviour (state, menus, carousels, video). Mounted by js/runtime.js. */
(function () {
class Component extends ZECO.PageLogic {
  state = { w: null, open: null, scrolled: false, menuOpen: false, mAbout: false, mServices: false };
  rootRef = ZECO.createRef();
  navRef = ZECO.createRef();
  hoverAt = 0;
  toggle = (k) => () => {
    if (this.state.open === k && Date.now() - this.hoverAt < 500) return;
    this.setState(p => ({ open: p.open === k ? null : k }));
  };
  videoRef = ZECO.createRef();
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
    const el = this.rootRef.current;
    if (!el) return;
    this.ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width);
      if (w !== this.state.w) this.setState({ w });
    });
    this.ro.observe(el);
  }
  componentWillUnmount() { window.removeEventListener('scroll', this.onScroll, true); document.removeEventListener('keydown', this.onKey); document.removeEventListener('pointerdown', this.onDown); this.ro && this.ro.disconnect(); }
  blob(style, dur, delay) {
    const motion = (this.props.motion ?? true) !== false;
    return ZECO.h('div', { style: Object.assign({ position: 'absolute', willChange: 'transform', animation: motion ? 'zdrift ' + dur + 's ease-in-out ' + delay + 's infinite alternate' : 'none' }, style) });
  }
  renderVals() {
    const s = this.state;
    const isMobile = s.w != null && s.w < 960;
    const glow = this.props.glow ?? 'Standard';
    return {
      rootRef: this.rootRef,
      videoRef: this.videoRef,
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
      closeAll: () => this.setState({ open: null, menuOpen: false }),
      heroGlow: ZECO.h(ZECO.Fragment, null,
        this.blob({ left: '-14%', top: '-30%', width: '60%', height: '110%', background: 'radial-gradient(closest-side,rgba(218,39,47,.2),rgba(58,58,58,.25) 55%,rgba(0,0,0,0))', filter: 'blur(90px)' }, 28, 0),
        this.blob({ right: '-12%', bottom: '-40%', width: '55%', height: '100%', background: 'radial-gradient(closest-side,rgba(218,39,47,.14),rgba(0,0,0,0))', filter: 'blur(90px)' }, 34, -12)
      ),
      ctaGlow: ZECO.h(ZECO.Fragment, null,
        this.blob({ left: '-12%', top: '-60%', width: '55%', height: '200%', background: 'radial-gradient(closest-side,rgba(218,39,47,.3),rgba(0,0,0,0))', filter: 'blur(70px)' }, 24, 0),
        this.blob({ right: '-10%', bottom: '-70%', width: '45%', height: '180%', background: 'radial-gradient(closest-side,rgba(218,39,47,.18),rgba(0,0,0,0))', filter: 'blur(70px)' }, 30, -10)
      )
    };
  }
}
ZECO.mount(Component);
})();
