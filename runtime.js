/*
 * ZECO page runtime (vanilla JS, no framework).
 * Each page's HTML is fully pre-rendered. This file wires up the live parts:
 *  - data-zb="N"     → element whose style/attributes update from page state (rules in #zb-data)
 *  - <!--zb:path-->  → text that updates from page state
 *  - <z-if data-if>  → block shown/hidden from page state
 *  - data-on="click:handler ..." → event listeners
 *  - data-ref="name" → element handed to the page logic (this.name.current)
 * Page logic lives in js/pages/<page>.js as a small class with state + renderVals().
 */
(function () {
  var UNITLESS = { 'opacity': 1, 'z-index': 1, 'order': 1, 'flex': 1, 'flex-grow': 1, 'flex-shrink': 1, 'font-weight': 1, 'line-height': 1 };

  function createRef() { return { current: null }; }
  function h() { return null; } // decorative glows are pre-rendered in the HTML
  var Fragment = 'fragment';

  function resolve(vals, path) {
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(path)) return +path;
    var v = vals, seg = path.split('.');
    for (var i = 0; i < seg.length; i++) { if (v == null) return undefined; v = v[seg[i]]; }
    return v;
  }
  function str(v) { return v == null || typeof v === 'boolean' ? '' : String(v); }
  function fmt(t, vals) {
    if (t.length === 1 && typeof t[0] !== 'string') return resolve(vals, t[0].p);
    return t.map(function (x) { return typeof x === 'string' ? x : str(resolve(vals, x.p)); }).join('');
  }

  function PageLogic(props) { this.props = props || {}; this.state = {}; }
  PageLogic.prototype.setState = function (u) {
    var patch = typeof u === 'function' ? u(this.state, this.props) : u;
    if (!patch) return;
    this.state = Object.assign({}, this.state, patch);
    schedule(this);
  };
  PageLogic.prototype.forceUpdate = function () { schedule(this); };

  var pending = false, queued = null;
  function schedule(comp) {
    queued = comp;
    if (pending) return;
    pending = true;
    Promise.resolve().then(function () { pending = false; render(queued); });
  }

  var view = null;
  function collect() {
    var rules = JSON.parse(document.getElementById('zb-data').textContent || '[]');
    var bound = [].slice.call(document.querySelectorAll('[data-zb]')).map(function (el) {
      return { el: el, rules: rules[+el.getAttribute('data-zb')] || [] };
    });
    var texts = [];
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
    var c;
    while ((c = w.nextNode())) {
      if (c.nodeValue.indexOf('zb:') !== 0) continue;
      var t = c.nextSibling;
      if (!t || t.nodeType !== 3) { t = document.createTextNode(''); c.parentNode.insertBefore(t, c.nextSibling); }
      texts.push({ node: t, path: c.nodeValue.slice(3) });
    }
    var ifs = [].slice.call(document.querySelectorAll('z-if[data-if]'));
    var refs = [].slice.call(document.querySelectorAll('[data-ref]'));
    var ons = [].slice.call(document.querySelectorAll('[data-on]'));
    return { bound: bound, texts: texts, ifs: ifs, refs: refs, ons: ons };
  }

  function apply(vals) {
    view.bound.forEach(function (b) {
      b.rules.forEach(function (r) {
        var v = fmt(r.t, vals);
        if (r.k === 's') {
          if (typeof v === 'number' && !UNITLESS[r.p]) v = v + 'px';
          b.el.style.setProperty(r.p, v == null ? '' : String(v));
        } else if (r.w && typeof v === 'boolean') {
          if (r.n.indexOf('aria-') === 0 || r.n.indexOf('data-') === 0) b.el.setAttribute(r.n, String(v));
          else if (v) b.el.setAttribute(r.n, ''); else b.el.removeAttribute(r.n);
        } else if (v == null) b.el.removeAttribute(r.n);
        else b.el.setAttribute(r.n, String(v));
      });
    });
    view.texts.forEach(function (t) { var s = str(resolve(vals, t.path)); if (t.node.nodeValue !== s) t.node.nodeValue = s; });
    view.ifs.forEach(function (el) { el.hidden = !resolve(vals, el.getAttribute('data-if')); });
  }

  function render(comp) { comp.__vals = comp.renderVals(); apply(comp.__vals); }

  function mount(Component) {
    var comp = new Component({});
    view = collect();
    render(comp);
    view.refs.forEach(function (el) {
      var r = resolve(comp.__vals, el.getAttribute('data-ref'));
      if (r && typeof r === 'object' && 'current' in r) r.current = el;
    });
    view.ons.forEach(function (el) {
      el.getAttribute('data-on').split(' ').forEach(function (pair) {
        var i = pair.indexOf(':'), type = pair.slice(0, i), path = pair.slice(i + 1);
        el.addEventListener(type, function (e) {
          var fn = resolve(comp.__vals, path);
          if (typeof fn === 'function') fn(e);
        });
      });
    });
    if (comp.componentDidMount) comp.componentDidMount();
    return comp;
  }

  window.ZECO = { PageLogic: PageLogic, createRef: createRef, h: h, Fragment: Fragment, mount: mount };
})();
