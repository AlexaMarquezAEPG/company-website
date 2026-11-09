# ZECO Website — Build Specification

This document describes the ZECO website exactly as designed. The accompanying files **are** the finished site; this spec is the reference for anyone (or Replit Agent) maintaining or extending it.

> **Instruction for developers and AI agents:** This project is a complete, working static website. Do **not** rebuild, re-theme, restructure, or convert it to a framework. Serve the folder as-is (index.html at the root). Only make changes that are explicitly requested, and when you do, follow the tokens and patterns in this document exactly.

---

## 1. Pages

| File | Page | Nav label |
|---|---|---|
| index.html | Homepage | (logo) |
| founder.html | About the Founder | About the founder |
| what-we-do.html | What We Do (4 services) | What We Do ▾ (dropdown) |
| upcoming-events.html | Upcoming Events | Upcoming Events |
| contact.html | Contact + enquiry form | Let’s Plan Your Event (red button) |

Shared on every page: sticky header, desktop dropdown + mobile full-screen menu, closing CTA (except Contact), footer.

## 2. File structure

```
index.html, founder.html, what-we-do.html, contact.html, upcoming-events.html
css/base.css            shared helpers (image frames, show/hide blocks)
css/<page>.css          page resets, keyframes, hover/focus states
js/config.js            contact email + Formspree endpoint (edit here)
js/runtime.js           tiny vanilla runtime that wires up live state (menus, carousels, form)
js/image-slot.js        framed photos with saved crops
js/pages/<page>.js      page behaviour: state + values for each page
assets/                 logos, hero video, video poster
images/                 all photographs (.webp / .jpg)
```

Layout and typography are written inline on each element in the HTML, so each page is a faithful 1:1 of the design.

## 3. Colour

| Token | Value | Use |
|---|---|---|
| Black | #000000 | Page background, header (scrolled: rgba(0,0,0,.72) + 16px blur) |
| White | #FFFFFF | Headings, primary text, outline buttons |
| Grey | #AEAEAE | Supporting text, labels, captions |
| ZECO Red | #DA272F | Primary buttons, bullets, icons, active nav underline, glows |
| Red (hover) | #B51F26 | Hover on red "View Upcoming Events" button |
| Red (focus ring) | rgba(218,39,47,.35) | 3px ring on primary button hover |
| Error text | #FF6B70 | Form error message |
| Charcoal | #3A3A3A | Hero gradients, dropdown panel (rgba(58,58,58,.98)), cards (rgba(58,58,58,.42–.5)) |
| Panel | #141414 / #0B0B0B | Image frames, event cards |
| Hairlines | rgba(255,255,255,.08 / .10 / .12 / .14 / .18) | Borders and dividers |

## 4. Typography

- Font: **Manrope** (Google Fonts) weights 400, 500, 600, 700, 800. Fallback: Helvetica, Arial, sans-serif.
- H1 page titles: `clamp(44px, 4.6cqw, 68px)` (44px mobile → 68px desktop); the homepage hero H1 is capped at 66px so it holds three lines. Weight 500, letter-spacing −0.035em, `text-wrap: balance`. What We Do and Upcoming Events hero H1s are centred.
- H2 section headings: `clamp(36px, 3.4cqw, 48px)` (36px mobile → 48px desktop), weight 500, line-height 1.08, letter-spacing −0.035em, `text-wrap: balance`.
- Card headings: `clamp(24px, 2.2cqw, 30px)` (700) or `clamp(28px, 2.4cqw, 36px)` (500).
- Hero supporting text: `clamp(17px, 1.4cqw, 20px)`, line-height 1.6, grey.
- Body: 17–18px, line-height 1.65, grey; list items 16–17px.
- Labels / small: 13–15px, weight 600–700.
- All arrows are chevrons: › and ‹.

## 5. Layout

- Content width: max 1320px, centred, side padding `clamp(20px, 4cqw, 56px)` → **116px left/right edges on a 1440px screen**. Every heading, paragraph and grid shares these edges.
- Two-column rows: `grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr))`, column gap `clamp(40px, 6cqw, 96px)`.
- Section padding: `clamp(48px, 5cqw, 80px)` top/bottom (service rows `clamp(40px, 4.5cqw, 72px)`).
- Hero: homepage `min-height: max(640px, 100vh)`; subpages `max(480px, 58vh)`. Hero panel inset 8–14px from the edges with rounded bottom corners `clamp(12px, 1.2cqw, 18px)`.
- Breakpoints: **960px** (below → mobile header/menu, carousel stacks, Alexa card stacks); **640px** (Founder speaking carousel shows 1 card instead of 3).
- Corner radii: buttons 6–10px, cards 8–16px, chips 4px.

## 6. Components

- **Header:** 72px (64px mobile), transparent over the hero; after 12px of scroll becomes rgba(0,0,0,.72) with 16px backdrop blur and a hairline. Nav links get a 2px red underline on hover; the current page is underlined in red.
- **What We Do dropdown:** opens on hover/click, 540px two-column panel, numbered 01–04, closes on Escape, outside click or focus leaving.
- **Mobile menu:** hamburger → full-screen black panel with 58px rows; "What We Do" expands with +/−; red "Let’s Plan Your Event" button.
- **Primary button:** #DA272F, white 600 text, 52px tall, radius 10px, chevron ›; hover adds a 3px red ring.
- **Outline button:** transparent, 1px rgba(174,174,174,.6) border; hover white border + 6% white fill.
- **Bullets:** 6×6px red squares.
- **Event card (Upcoming Events page):** 16:10 photo, title, description, red calendar + location icons with date and place.
- **Closing CTA:** "Bring Your Next Event into Focus" + "Discuss Your Event ›" → contact.html.
- **Footer:** logo, tagline, links (About, What We Do, Upcoming Events, Contact, LinkedIn, Instagram, Privacy Policy), © 2026 ZECO.

## 7. Motion

- **Red glows:** blurred radial gradients of #DA272F (12–30% strength, 70–90px blur) behind sections, drifting slowly with the `zdrift` keyframes (translate ±4%, scale .96–1.08) over 24–34s, alternating.
- **Homepage events carousel:** auto-advances every 6s; cross-fade + 24px slide (0.6s, cubic-bezier(.2,.7,.2,1)); pauses on hover/focus; dots (active 28px red, inactive 14px grey); ‹ › buttons.
- **Founder "Speaking & Engagements" carousel:** 3 cards per view (1 below 640px), 16px gap, auto-advances every 6s, pauses on hover, ‹ › controls with counter.
- **Hero video:** autoplay, muted, looping, inline. Homepage and Contact: assets/hero-video.mp4 (poster assets/hero-poster.jpg, a frame from the video). What We Do and Upcoming Events heroes use red gradients (stronger upper right, fainter lower left) with no video.
- **Transitions:** header background .35s; underlines .2s; buttons .15–.2s.
- **Reduced motion:** all animation and transitions are switched off; videos don't autoplay.

## 8. Links & integrations

- LinkedIn (company): https://www.linkedin.com/company/zeco-events/
- Instagram: https://www.instagram.com/zeco.events/
- Alexa Marquez LinkedIn: linkedin.com/in/alexa-marquez-mr (email is a mailto link)
- Contact form → **Formspree** (see README). Required fields: Name, Email, Organization, message (red asterisks). Success state: "Thank you. We’ve received your details and will be in touch shortly."
- Privacy Policy link is a placeholder (no page yet).

## 9. Images

All photos live in `/images`. To replace one, upload a new file with the **same file name**; the saved crop is re-applied automatically. If a file is missing, a labelled placeholder appears showing the expected file name.

- images/about-discussion.webp
- images/about-workshop.webp
- images/alexa-portrait.webp
- images/ev-cement.webp
- images/ev-fourco.webp
- images/event-cement.webp
- images/event-fourco.webp
- images/founder-portrait.jpg
- images/svc-conferences.webp
- images/svc-corporate.webp
- images/svc-networking.webp
- images/svc-virtual.webp
- images/wwd-conferences.webp
- images/wwd-corporate.webp
- images/wwd-networking.webp
- images/wwd-virtual.webp

Recommended sizes: What We Do photos 900×1125 (4:5); Upcoming Events cards and homepage carousel slides 1600×1000 (16:10).

## 10. Content (all copy, by page and section)

### Homepage — index.html

**Section 1 (`hero-h`)**
- H1: Event Management for Business, Learning and Networking.
- P: ZECO helps businesses, organizations, and communities connect, learn, and collaborate through thoughtfully planned events.
- Link: Let’s Plan Your Event› → contact.html
- Link: What We Do → what-we-do.html

**Section 2 (`planning-h`)**
- H2: Event planning aligned withyour business objectives
- P: Translate your objectives into a clear event plan. ZECO coordinates formats, agendas, logistics, and delivery to support your audience, budget, and priorities.
- H3: Align teams
- P: Support planning, collaboration, and organizational priorities.
- H3: Engage stakeholders
- P: Strengthen relationships with clients, partners, and industry peers.
- H3: Share expertise
- P: Facilitate practical learning and informed discussion.

**Section 3 (`services-h`)**
- H2: What We Do
- P: From internal meetings to industry conferences, ZECO coordinates the agenda, logistics, and participant experience so your event delivers on its purpose.
- H3: Corporate & Business Events
- P: Meetings, offsites, onboarding, and launches built around clear business priorities.
- Link: Explore Corporate Events› → what-we-do.html#corporate
- H3: Conferences & Learning Events
- P: Summits, seminars, and workshops structured around defined learning objectives.
- Link: Explore Learning Events› → what-we-do.html#conferences
- H3: Networking & Community Events
- P: Mixers, roundtables, and ZECO Socials designed for relevant conversations.
- Link: Explore Networking Events› → what-we-do.html#networking
- H3: Virtual & Hybrid Events
- P: Coordinated digital delivery that connects audiences across locations.
- Link: Explore Virtual & Hybrid Events› → what-we-do.html#virtual

**Section 4 (`about-h`)**
- H2: Get to know ZECO
- H3: Our mission
- P: To plan and deliver purposeful events that connect people, support learning, and strengthen professional relationships.
- H3: Our vision
- P: To make well-planned events a catalyst for stronger communities, shared knowledge, and business opportunities.
- H3: Meet the founder
- P: Led by founder Aiman El-Ramly, ZECO brings decades of enterprise experience to every programme.
- Link: Meet the Founder› → founder.html

**Section 5 (`events-h`)**
- H2: Upcoming Events
- P: Discover opportunities to meet people, exchange ideas, and explore the changes shaping business and work.
- Link: View Upcoming Events → #events
- Link: ZECO on LinkedIn → https://www.linkedin.com/company/zeco-events/
- Link: ZECO on Instagram → https://www.instagram.com/zeco.events/
- H3: Transforming Cement
- DT: Date
- DD: November 25, 2026
- DT: Location
- DD: Sky Executive Resort, New Cairo, Egypt
- DT: Details
- DD: An exclusive evening reception to explore innovation and the future of cement across North America and the Middle East.
- H3: Fourco Exhibition
- DD: To be confirmed
- DD: Further details to be announced.
- Button: Show Transforming Cement
- Button: Show Fourco Exhibition
- Button: ‹
- Button: ›

**Section 6 (`cta-h`)**
- H2: Bring Your Next Event into Focus
- P: Share your objectives, audience, and requirements. Let’s define the right format and planning support.
- Link: Discuss Your Event› → contact.html

### About the Founder — founder.html

**Section 1 (`founder-h`)**
- H1: Aiman El-Ramly
- P: Aiman El-Ramly brings more than three decades of enterprise leadership to ZECO, with experience building and growing businesses across technology, engineering, artificial intelligence, SaaS, and professional services.
- P: As a founder, executive, board director, and speaker, Aiman understands the priorities that bring business audiences together.

**Section 2 (`bg-h`)**
- H2: Business experience behind purposeful events
- P: Aiman’s experience provides ZECO with a business perspective on event planning, from understanding what an audience needs to shaping discussions around relevant industry challenges.
- P: 30+ years of enterprise leadership across technology and engineering.
- P: Founder and CEO of AEPG, supporting business growth and platform development.
- P: Certified Management Consultant advising organizations on strategy.
- P: Industry contributor on AI, energy markets, information strategy, and infrastructure.

**Section 3 (`sp-h`)**
- H2: Speaking & Engagements
- P: Over the past decade, Aiman has delivered keynotes, webinars, and strategic sessions across industry and executive forums focused on AI, energy markets, information strategy, and infrastructure.
- H3: Lunch & Learn Webinar: Using AI to Power Go-To-Market Growth
- P: A webinar on how AI is transforming go-to-market planning and execution, introducing the Glass-Box AI model.
- H3: Speaker at Outlook 2024: Strategic Foresight Initiative
- P: How AI acceleration, geopolitical fragmentation, and regional energy dynamics are reshaping commodity markets.
- H3: Keynote Speaker at Global Gasoline & COP28 Impact Analysis
- P: Connecting COP28 climate commitments to operational, financial, and risk implications across gasoline markets.
- H3: Keynote Speaker at Enterprise Information Due Diligence & Risk Strategy
- P: Reframing information governance as a board-level risk issue.
- H3: Speaker at The Green Hydrogen Roadmap
- P: Associated with ZE Power Engineering
- P: The capital, infrastructure, and execution required to scale a green hydrogen economy.
- H3: Downstream Information Optimization Program
- P: Refinery information orchestration that turns operational complexity into a competitive advantage.
- H3: Speaker at Downstream Digitalization & AI Integration (LATAM)
- P: An industrial AI framework moving downstream operators to real-time, decision-grade intelligence.
- H3: Speaker at NGL Infrastructure Visualization Project
- P: Uncovering bottlenecks and delivery constraints in the Permian Basin NGL market.
- H3: Speaker at Latin American Energy Infrastructure Reform
- P: Mexico's energy deregulation and related infrastructure risks during regulatory transition.
- H3: North American Market Transparency Initiative
- P: Translating complex federal energy regulation into actionable market insight.
- Button: ‹
- Button: ›

**Section 4 (`cta-h`)**
- H2: Bring Your Next Event into Focus
- P: Share your objectives, audience, and requirements. Let’s define the right format and planning support.
- Link: Discuss Your Event› → contact.html

### What We Do — what-we-do.html

**Section 1 (`wwd-h`)**
- H1: Event Management Built Around Your Business Objectives
- Link: Discuss Your Event› → contact.html

**Section 2 (`corporate-h`)**
- H2: Corporate & Business Events
- P: Bring employees, clients, and partners together around clear business priorities. ZECO coordinates the agenda, logistics, and participant experience for internal meetings and external engagements.
- P: Corporate meetings and strategic planning
- P: Structure discussions around priorities, decisions, and next steps.
- P: Leadership offsites and team building
- P: Create focused opportunities for collaboration and stronger working relationships.
- P: Employee and partner onboarding
- P: Introduce people to your organization, expectations, and ways of working.
- P: Product launches and demonstrations
- P: Present your offering to relevant audiences with coordinated messaging and delivery.

**Section 3 (`conferences-h`)**
- H2: Conferences & Learning Events
- P: Give your audience access to knowledge they can apply. ZECO helps structure programmes, coordinate speakers, and manage delivery around defined learning objectives.
- P: Conferences, summits, and conventions
- P: Connect industry perspectives through keynotes, panels, and focused sessions.
- P: Seminars and briefings
- P: Explore a specific topic or development with relevant experts.
- P: Workshops and training
- P: Support practical learning through exercises, discussion, and participation.

**Section 4 (`networking-h`)**
- H2: Networking & Community Events
- P: Bring together people with shared interests and complementary experience. ZECO shapes the format and flow to encourage introductions, relevant conversations, and continued engagement.
- P: Business mixers and industry meetups
- P: Connect professionals across organizations, sectors, and career stages.
- P: Executive and founder roundtables
- P: Facilitate focused peer discussions around shared business challenges.
- P: Facilitated networking
- P: Give participants a clear structure for meeting relevant contacts.
- P: ZECO Socials
- P: Combine an approachable social setting with conversations about business, technology, and entrepreneurship.

**Section 5 (`virtual-h`)**
- H2: Virtual & Hybrid Events
- P: Connect audiences across locations with coordinated digital delivery. Available across ZECO’s services, virtual and hybrid formats require dedicated planning for technology, presenters, and audience interaction.
- P: Virtual meetings and conferences
- P: Coordinate platforms, speaker preparation, session transitions, and technical delivery.
- P: Webinars and online learning
- P: Structure presentations, moderated questions, and interactive activities.
- P: Hybrid events
- P: Align the venue and online experience so both audiences can follow and contribute.
- P: Virtual networking
- P: Support introductions and smaller-group conversations through facilitated sessions.

**Section 6 (`cta-h`)**
- H2: Bring Your Next Event into Focus
- P: Share your objectives, audience, and requirements. Let’s define the right format and planning support.
- Link: Discuss Your Event› → contact.html

### Contact — contact.html

**Section 1 (`contact-hero-h`)**
- H1: Let’s Plan Your Next Event
- P: Share your objectives, audience, and requirements. We’ll help define the right format and planning support.
- H2: Alexa Marquez
- P: Marketing and Event Coordinator
- P: Connect with Alexa to discuss your event, explore ZECO’s services, and coordinate next steps.
- Link: Emailalexa@aepg.ca → mailto:alexa@aepg.ca
- Link: Alexa Marquez on LinkedIn → https://www.linkedin.com/in/alexa-marquez-mr/

**Section 2 (`enquiry-h`)**
- H2: Discuss Your Event Requirements
- P: Tell us what you’re planning, including any details already confirmed.
- Field: Name*
- Field: Email*
- Field: Organization*
- Field: Tell us about your event*
- Button: Discuss Your Event›
- P: Thank you.
- P: We’ve received your details and will be in touch shortly.

### Upcoming Events — upcoming-events.html

**Section 1 (`ue-h`)**
- H1: Upcoming Events
- P: Explore upcoming workshops, exhibitions, and gatherings for knowledge exchange and new connections.

**Section 2 (`events`)**
- H2: Transforming Cement
- P: TwoSuns, a Canadian software company, brings a North American perspective to New Cairo for an evening with cement industry leaders, from the plant to the boardroom. Explore the TwoSuns platform through a live demonstration, followed by dinner and conversation with industry peers.
- P: Private event. By invitation only.
- DT: Date
- DD: November 25, 2026
- DT: Location
- DD: Sky Executive Resort, New Cairo, Egypt
- H2: Fourco Exhibition
- P: An upcoming exhibition, with further details to follow.
- DD: To be confirmed

**Section 3 (`cta-h`)**
- H2: Bring Your Next Event into Focus
- P: Share your objectives, audience, and requirements. Let’s define the right format and planning support.
- Link: Discuss Your Event› → contact.html
