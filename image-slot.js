/*
 * <image-slot> — framed photo with a saved crop.
 *  src      image file (images/<id>.webp)
 *  data-s   zoom (1 = cover fill)      data-x / data-y  offset of the image centre, in % of the frame
 * If the file is missing, a labelled placeholder shows the expected file name.
 * To swap a photo, replace the file in /images with one of the same name (any size, same aspect ratio).
 */
(function () {
  class ImageSlot extends HTMLElement {
    connectedCallback() {
      if (this._init) return;
      this._init = true;
      const src = this.getAttribute('src');
      const label = this.getAttribute('placeholder') || 'Image';
      const ph = document.createElement('div');
      ph.className = 'zs-ph';
      const a = document.createElement('span'); a.textContent = label;
      const b = document.createElement('small'); b.textContent = src || ('images/' + this.id + '.webp');
      ph.appendChild(a); ph.appendChild(b);
      this.appendChild(ph);
      if (!src) return;
      const img = new Image();
      img.alt = this.getAttribute('alt') || label;
      img.decoding = 'async';
      img.className = 'zs-img';
      img.onload = () => { ph.remove(); this.appendChild(img); this._img = img; this._fit(); };
      img.src = src;
      if ('ResizeObserver' in window) new ResizeObserver(() => requestAnimationFrame(() => this._fit())).observe(this);
      else window.addEventListener('resize', () => this._fit());
    }
    _fit() {
      const img = this._img;
      if (!img) return;
      const iw = img.naturalWidth, ih = img.naturalHeight, fw = this.clientWidth, fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return;
      const s = parseFloat(this.dataset.s) || 1, x = parseFloat(this.dataset.x) || 0, y = parseFloat(this.dataset.y) || 0;
      const k = Math.max(fw / iw, fh / ih) * s;
      img.style.width = (iw * k / fw * 100) + '%';
      img.style.height = (ih * k / fh * 100) + '%';
      img.style.left = (50 + x) + '%';
      img.style.top = (50 + y) + '%';
    }
  }
  if (!customElements.get('image-slot')) customElements.define('image-slot', ImageSlot);
})();
