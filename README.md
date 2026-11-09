# ZECO Website

A complete static website in HTML, CSS and JavaScript. There is no build step and no framework: open or serve the folder as-is, with `index.html` at the top level.

## Pages
- `index.html`: Homepage
- `founder.html`: About the Founder
- `what-we-do.html`: What We Do
- `upcoming-events.html`: Upcoming Events
- `contact.html`: Contact and enquiry form

## Preview locally
From this folder run `python3 -m http.server 8000` and open http://localhost:8000. Opening the HTML files directly also works; the contact form needs a served page.

## Publish
- **GitHub Pages:** push this folder to a repository, then go to Settings → Pages → Deploy from a branch → `main` / root.
- **Replit:** import the repository. The included `.replit` serves the folder on port 8000; deploy as Static with the project root as the public directory.
- **Any static host** (Netlify, Vercel, Cloudflare Pages): upload the folder; no build command.

## Connect the contact form (Formspree)
1. Go to https://formspree.io and sign up with **info@aepg.ca**.
2. Create a new form and copy its endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. Open `js/config.js` and replace `https://formspree.io/f/YOUR_FORM_ID` with it.
4. Submit a test enquiry from contact.html and confirm it arrives.

## Edit content
- Text, links and layout: edit the page's `.html` file directly (styles are inline on each element).
- Hover and focus colours: `css/<page>.css`.
- Photos: replace files in `/images` keeping the same names; saved crops are re-applied automatically.
- Video: `assets/hero-video.mp4` (Homepage and Contact) with its still `assets/hero-poster.jpg`.
- Menus, carousels and the form are driven by `js/runtime.js` and `js/pages/<page>.js`.

## Reference
See **BUILD-SPEC.md** for the full design specification: colours, typography, layout, components, motion and all page copy.
