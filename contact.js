/* Contact | ZECO: page behaviour (state, menus, carousels, video). Mounted by js/runtime.js. */
(function () {
class Component extends ZECO.PageLogic {
  state = { w: null, open: null, scrolled: false, menuOpen: false, mAbout: false, mServices: false, sent: false, ev: 0, evPaused: false };
  services = [
    { num: '01', name: 'Corporate & Business Events', href: 'what-we-do.html#corporate', desc: 'Meetings, offsites, onboarding, and launches built around clear business priorities.' },
    { num: '02', name: 'Conferences & Learning Events', href: 'what-we-do.html#conferences', desc: 'Summits, seminars, and workshops structured around defined learning objectives.' },
    { num: '03', name: 'Networking & Community Events', href: 'what-we-do.html#networking', desc: 'Mixers, roundtables, and ZECO Socials designed for relevant conversations.' },
    { num: '04', name: 'Virtual & Hybrid Events', href: 'what-we-do.html#virtual', desc: 'Coordinated digital delivery that connects audiences across locations.' }
  ];
  submitForm = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (this.state.sending) return;
    const cfg = window.ZECO_CONFIG || {};
    const ep = cfg.formEndpoint || '';
    if (!ep || ep.indexOf('YOUR_FORM_ID') !== -1) { this.setState({ formError: 'The form is not connected yet. Add your Formspree endpoint in js/config.js.' }); return; }
    this.setState({ sending: true, formError: null });
    try {
      const r = await fetch(ep, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error('bad status');
      this.setState({ sent: true, sending: false });
    } catch (err) {
      this.setState({ sending: false, formError: 'Something went wrong. Please try again or email ' + (cfg.contactEmail || 'us') + '.' });
    }
  };
  rootRef = ZECO.createRef();
  navRef = ZECO.createRef();
  videoRef = ZECO.createRef();
  hoverAt = 0;
  toggle = (k) => () => {
    if (this.state.open === k && Date.now() - this.hoverAt < 500) return;
    this.setState(p => ({ open: p.open === k ? null : k }));
  };
  componentDidMount() {
    const v = this.videoRef.current;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (v && reduce) { v.removeAttribute('src'); v.removeAttribute('autoplay'); v.load(); }
    else if (v) { v.muted = true; v.defaultMuted = true; v.setAttribute('muted', ''); const p = v.play(); p && p.catch && p.catch(() => {}); }
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
  evTimer() {
    clearInterval(this.evInt);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || (this.props.motion ?? true) === false) return;
    this.evInt = setInterval(() => { if (!this.state.evPaused && !document.hidden) this.setState(p => ({ ev: (p.ev + 1) % 2 })); }, 6000);
  }
  componentWillUnmount() { clearInterval(this.evInt); window.removeEventListener('scroll', this.onScroll, true); document.removeEventListener('keydown', this.onKey); document.removeEventListener('pointerdown', this.onDown); this.ro && this.ro.disconnect(); }
  blob(style, dur, delay) {
    const motion = (this.props.motion ?? true) !== false;
    return ZECO.h('div', { style: Object.assign({ position: 'absolute', willChange: 'transform', animation: motion ? 'zdrift ' + dur + 's ease-in-out ' + delay + 's infinite alternate' : 'none' }, style) });
  }
  renderVals() {
    const s = this.state;
    const isMobile = s.w != null && s.w < 960;
    const glow = this.props.glow ?? 'Standard';
    return {
      rootRef: this.rootRef, navRef: this.navRef, videoRef: this.videoRef,
      services: this.services,
      hdrBg: s.menuOpen ? '#000' : s.scrolled ? 'rgba(0,0,0,.72)' : 'rgba(0,0,0,0)',
      hdrBlur: s.scrolled || s.menuOpen ? 'blur(16px)' : 'blur(0px)',
      hdrLine: s.scrolled || s.menuOpen ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,0)',
      aboutDeco: s.open === 'about' ? '#DA272F' : 'transparent',
      servicesDeco: s.open === 'services' ? '#DA272F' : 'transparent',
      aboutChev: s.open === 'about' ? 'translateY(2px) rotate(225deg)' : 'translateY(-2px) rotate(45deg)',
      servicesChev: s.open === 'services' ? 'translateY(2px) rotate(225deg)' : 'translateY(-2px) rotate(45deg)',
      menuLabel: s.menuOpen ? 'Close menu' : 'Open menu',
      blurMenu: (e) => { if (!e.currentTarget.contains(e.relatedTarget)) this.setState({ open: null }); },
      isDesktop: !isMobile, isMobile,
      glowOpacity: glow === 'Subtle' ? 0.55 : glow === 'Vivid' ? 1 : 0.8,
      aboutOpen: s.open === 'about', servicesOpen: s.open === 'services',
      menuOpen: s.menuOpen, menuClosed: !s.menuOpen,
      mAbout: s.mAbout, mServices: s.mServices,
      mAboutSign: s.mAbout ? '−' : '+', mServicesSign: s.mServices ? '−' : '+',
      openAbout: () => { this.hoverAt = Date.now(); this.setState({ open: 'about' }); },
      openServices: () => { this.hoverAt = Date.now(); this.setState({ open: 'services' }); },
      closeMenus: () => this.setState({ open: null }),
      closeAll: () => this.setState({ open: null, menuOpen: false }),
      toggleAbout: this.toggle('about'), toggleServices: this.toggle('services'),
      toggleMenu: () => this.setState(p => ({ menuOpen: !p.menuOpen })),
      toggleMAbout: () => this.setState(p => ({ mAbout: !p.mAbout })),
      toggleMServices: () => this.setState(p => ({ mServices: !p.mServices })),
      goTop: (e) => { e.preventDefault(); this.setState({ open: null, menuOpen: false }); window.scrollTo({ top: 0, behavior: 'smooth' }); },
      noop: (e) => e.preventDefault(),
      ev0Op: s.ev === 0 ? 1 : 0, ev0Tf: s.ev === 0 ? 'translateX(0)' : (s.ev > 0 ? 'translateX(-24px)' : 'translateX(24px)'), ev0Vis: s.ev === 0 ? 'visible' : 'hidden', ev0Hidden: s.ev !== 0, ev0Cur: s.ev === 0 ? 'true' : 'false', ev0Dot: s.ev === 0 ? '#DA272F' : 'rgba(174,174,174,.5)', ev0DotW: s.ev === 0 ? '28px' : '14px',
      evGo0: () => { this.setState({ ev: 0 }); this.evTimer(); },
      ev1Op: s.ev === 1 ? 1 : 0, ev1Tf: s.ev === 1 ? 'translateX(0)' : (s.ev > 1 ? 'translateX(-24px)' : 'translateX(24px)'), ev1Vis: s.ev === 1 ? 'visible' : 'hidden', ev1Hidden: s.ev !== 1, ev1Cur: s.ev === 1 ? 'true' : 'false', ev1Dot: s.ev === 1 ? '#DA272F' : 'rgba(174,174,174,.5)', ev1DotW: s.ev === 1 ? '28px' : '14px',
      evGo1: () => { this.setState({ ev: 1 }); this.evTimer(); },
      evPrev: () => { this.setState(p => ({ ev: (p.ev + 1) % 2 })); this.evTimer(); },
      evNext: () => { this.setState(p => ({ ev: (p.ev + 1) % 2 })); this.evTimer(); },
      evPause: () => { if (!s.evPaused) this.setState({ evPaused: true }); },
      evResume: () => this.setState({ evPaused: false }),
      evBlur: (e) => { if (!e.currentTarget.contains(e.relatedTarget)) this.setState({ evPaused: false }); },
      evLive: s.evPaused ? 'polite' : 'off',
      evCols: isMobile ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(0,1.25fr)', evImgOrder: -1, evImgAR: isMobile ? '4/3' : 'auto',
      alexaCols: isMobile ? 'minmax(0,1fr)' : '112px minmax(0,1fr)', portraitW: isMobile ? '160px' : '100%',
      sent: s.sent, notSent: !s.sent,
      submit: this.submitForm, formError: !!s.formError, formErrorMsg: s.formError || '',
      ctaGlow: ZECO.h(ZECO.Fragment, null,
        this.blob({ left: '-12%', top: '-40%', width: '55%', height: '160%', background: 'radial-gradient(closest-side,rgba(218,39,47,.28),rgba(0,0,0,0))', filter: 'blur(70px)' }, 24, 0),
        this.blob({ right: '-10%', bottom: '-50%', width: '45%', height: '150%', background: 'radial-gradient(closest-side,rgba(218,39,47,.16),rgba(0,0,0,0))', filter: 'blur(70px)' }, 30, -10)
      )
    };
  }
}
ZECO.mount(Component);
})();
