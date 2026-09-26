# ColorsClean Website Specification

> Source of truth for design, content, architecture, responsiveness, maintenance and deployment decisions.
>
> Repository: `xavvierC/ColorsClean`
>
> Default branch: `main`
>
> Initial audit baseline: commit `2278132cc968b170e7115ecfd7195c4cf0a498cd`
>
> Initial SPEC created: 2026-09-24

---

## 1. Project purpose

ColorsClean is a professional cleaning and upholstery waterproofing website intended to:

- present the company with a trustworthy, established and professional appearance;
- explain services clearly without visual clutter;
- generate qualified WhatsApp conversations and quotation requests;
- work consistently across desktop, tablet and mobile;
- remain fast, maintainable and easy to evolve;
- avoid generic local-business templates and obvious AI-generated aesthetics.

The website is currently a single-page landing page.

User-facing content must remain in Brazilian Portuguese (PT-BR) unless explicitly approved otherwise.

Technical documentation, implementation notes, internal prompts, component names and code may use English when it improves precision.

---

## 2. Repository and current architecture

### 2.1 Current repository structure

```text
/
├── components/
│   └── ui/
│       └── interactive-hover-button.tsx
├── public/
│   ├── favicon.svg
│   ├── hero-colorsclean.png
│   └── logo.png
├── src/
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── PROMPT_REVISAO_COLORSCLEAN.md
├── README.md
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

### 2.2 Important architectural reality

The production website is currently rendered primarily from static HTML in `index.html`.

Although React and TypeScript are installed and a React application exists in `src/main.tsx`, the current `index.html` does not mount that React app. There is no active `#root` mount flow and no module script importing `/src/main.tsx`.

Therefore, until an architecture migration is explicitly approved:

- treat `index.html` + `src/styles.css` as the current production implementation;
- do not assume `src/main.tsx` controls the deployed page;
- do not edit the React version expecting production changes unless the runtime entry point is intentionally migrated;
- avoid maintaining two divergent versions of the same interface.

The `components/ui/interactive-hover-button.tsx` component is currently not part of the production render path.

---

## 3. Current technology stack

Current repository dependencies:

- Vite
- React
- React DOM
- TypeScript
- Lucide React
- plain CSS

Current deployed runtime behavior:

- Vite production build;
- static HTML/CSS/assets;
- inline vanilla JavaScript in `index.html`;
- no database;
- no backend API;
- no environment variables currently required;
- no application router;
- no server-side rendering.

### 3.1 Package manager, runtime and scripts

Canonical package manager:

- npm `11.19.0`
- `package-lock.json` lockfile version 3
- install command: `npm ci`

Runtime policy:

- Node.js `24.x`
- Vercel currently runs Node `24.x`
- the successful Phase 3 diagnostic build reported Node `v24.21.0`

Module policy:

- `package.json` declares `"type": "module"`;
- `vite.config.ts` uses native ESM syntax;
- repository code search found no CommonJS `require`, `module.exports` or `exports.*` usage before enabling ESM.

Current scripts:

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

A `typecheck` script was intentionally not added during Phase 3 because the disconnected React/TypeScript implementation does not currently include the React type packages needed for a clean typecheck, and this phase explicitly avoided adding dependencies.

There is still no dedicated:

- lint script;
- typecheck script;
- test script;
- end-to-end test suite;
- CI workflow.

---

## 4. Deployment

### 4.1 Vercel project

The repository is connected to Vercel.

Current Vercel project:

- Project name: `colors-clean`
- Project ID: `prj_mUiKeRC7q5O01JxVFiELAS6xVZEJ`
- Team: `XAC`
- Team ID: `team_XqmcUrtEq4kudqTsHeWNpcCq`
- Framework detected by Vercel: Vite
- Production branch: `main`

Current production aliases include:

- `colors-clean.vercel.app`
- `colors-clean-xac2.vercel.app`
- `colors-clean-git-main-xac2.vercel.app`

The initial audited production deployment was built from commit:

`2278132cc968b170e7115ecfd7195c4cf0a498cd`

### 4.2 Deployment workflow

For permanent approved changes:

1. inspect the latest `main` state before editing;
2. identify the exact production files involved;
3. make the minimum necessary change;
4. preserve unrelated working behavior;
5. commit directly to `main` unless explicitly requested otherwise;
6. allow the GitHub/Vercel integration to create a production deployment;
7. verify the resulting Vercel deployment state;
8. for interface changes, verify the deployed page when possible;
9. update this `SPEC.md` whenever an important permanent design, architecture, content or workflow decision is made.

### 4.3 Build and install expectations

The repository now defines a deterministic npm workflow.

Vercel install command:

```bash
npm ci
```

Build command:

```bash
npm run build
```

Vite output directory:

```text
dist/
```

Framework preset:

`vite`

Root directory:

repository root.

The repository-side `vercel.json` explicitly sets `installCommand` to `npm ci`; the Vercel project continues using the Vite framework preset and Node `24.x`.

The README was corrected during Phase 3 to match this real deployment flow.

---

## 5. Design direction

ColorsClean must feel like a real, established and trustworthy professional cleaning company.

The visual direction is:

- clean;
- sophisticated;
- modern;
- premium without appearing luxurious;
- highly readable;
- balanced;
- realistic;
- conversion-oriented;
- confident but not aggressive;
- visually restrained.

Avoid:

- excessive cards;
- unnecessary icons;
- random decorative shapes;
- random gradients;
- generic motivational phrases;
- decorative copy with no conversion or informational purpose;
- oversized typography without hierarchy;
- excessive effects;
- neon/glow aesthetics;
- excessive blur;
- visual clutter;
- inconsistent spacing;
- generic SaaS patterns;
- obvious AI-generated design language;
- layouts that only work on desktop.

Use negative space deliberately.

Every visual element should have a clear hierarchy or functional purpose.

---

## 6. Visual identity

### 6.1 Current color system

The existing stylesheet uses the following approximate core colors:

| Token | Current value | Intended role |
| --- | --- | --- |
| Deep Navy | `#071522` | Primary dark background |
| Dark Navy 2 | `#081927` / `#091d2d` | Section variation |
| Brand Blue | `#1598ee` / `#159bf1` | Brand accent, links, emphasis |
| Brand Orange | `#ff7b18` / `#ff7918` | Primary CTA accent |
| Primary Light | `#f3f7fc` | Main text on dark backgrounds |
| Muted Light | approximately `#afbdca`–`#b7c8d6` | Supporting copy |
| WhatsApp Green | `#20bd63` | Floating WhatsApp action only |

These values describe the current implementation, not a license to create additional arbitrary shades.

When future design work introduces permanent tokens, consolidate them into a single token system instead of adding new near-duplicate values.

### 6.2 Logo

Official repository asset:

`public/logo.png`

Rules:

- use the official asset;
- do not redraw it;
- do not recreate it using plain text;
- do not distort proportions;
- do not recolor without explicit approval;
- do not apply aggressive filters;
- keep it optically balanced rather than simply making it large;
- optimize the file format/weight only if visual fidelity is preserved.

### 6.3 Favicon

Current asset:

`public/favicon.svg`

Do not replace it without approval or a deliberate brand update.

---

## 7. Typography

Current CSS imports:

- DM Sans — body and general UI;
- Manrope — headings and brand/display usage.

Current source:

Google Fonts via CSS `@import`.

### Typography principles

- body copy must prioritize readability;
- headings should feel modern and editorial, not decorative;
- avoid exaggerated letter spacing;
- avoid excessively tight line-height on mobile;
- use fluid type scales where appropriate;
- avoid introducing extra font families without approval;
- typography changes must be reviewed at desktop, tablet and mobile widths.

The current type system is approved as a working baseline, but the font delivery method may be optimized later.

---

## 8. Spacing and layout rules

### 8.1 General principles

- use consistent horizontal containers;
- avoid arbitrary per-element margins;
- prefer a small spacing scale over many one-off values;
- preserve strong whitespace around headings and CTAs;
- keep text line lengths controlled;
- do not solve responsive problems with excessive absolute positioning;
- use Grid/Flexbox before positional hacks.

### 8.2 Existing responsive container behavior

The stylesheet currently uses fluid horizontal spacing patterns such as:

```css
padding-inline: clamp(24px, 8vw, 120px);
```

This general principle should be preserved.

### 8.3 Recommended working ranges

These are layout standards, not strict pixel locks:

Desktop:
- internal content max-width should remain visually controlled;
- large screens must not spread content indefinitely;
- primary section horizontal padding may scale approximately 48–120px.

Tablet:
- horizontal padding approximately 32–48px where space allows.

Mobile:
- horizontal padding approximately 20–24px.

Avoid horizontal overflow at every viewport.

---

## 9. Responsive behavior

Desktop, Tablet and Mobile are first-class experiences.

Never implement mobile as a simple scaled-down desktop.

### 9.1 Required validation widths

For major interface changes, review approximately:

- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px when the changed section is full-width or hero-oriented

### 9.2 Review checklist per breakpoint

Check:

- typography scaling;
- headline wrapping;
- section height;
- image crop;
- image focal point;
- navigation behavior;
- CTA sizing;
- CTA stacking;
- spacing rhythm;
- text line length;
- alignment;
- visual hierarchy;
- touch targets;
- hover-only dependencies;
- overflow;
- fixed-position controls;
- anchor offsets;
- content visibility.

### 9.3 Touch targets

Interactive controls on touch layouts should generally provide at least a 44px effective target.

### 9.4 Mobile navigation

A functional mobile navigation is required.

Current production behavior after the Phase 1 stabilization pass:

- desktop navigation remains unchanged above 850px;
- below 850px, the static production header exposes an accessible hamburger control;
- the control uses `aria-controls`, `aria-expanded` and a dynamic Portuguese accessible label;
- the menu closes after navigation, on `Escape`, when clicking outside the header, and when returning to the desktop breakpoint;
- the implementation remains native HTML/CSS/JavaScript and does not depend on React.

---

## 10. Current navigation structure

Current production navigation:

- Serviços → `#serviços`
- Diferenciais → `#diferenciais`
- Como funciona → `#como-funciona`
- Resultados → `#resultados`
- Falar no WhatsApp → external WhatsApp action

Current main section IDs include:

- `#inicio`
- `#serviços`
- `#diferenciais`
- `#como-funciona`
- `#resultados`

There is also a final conversation CTA and FAQ section.

Do not rename anchors casually because header links, direct links and future analytics may depend on them.

---

## 11. Current page sections

The deployed static page currently contains:

1. Header
2. Hero
3. Trust/service strip
4. Services
5. Differentials
6. How it works
7. Results / visual comparison
8. Final CTA
9. FAQ
10. Footer
11. Floating WhatsApp control
12. Back-to-top control

This describes the current production structure. It does not mean every section or every piece of copy is permanently approved.

---

## 12. Hero standard

The Hero is the primary visual and conversion area.

Current approved direction from project discussions:

- dark/navy framing;
- realistic residential photography;
- blue sofa as a strong visual subject;
- blue/orange brand relationship;
- restrained copy area;
- strong contrast;
- large but controlled heading;
- clear CTAs;
- responsive crop and positioning;
- no excessive decorations.

Current hero image asset:

`public/hero-colorsclean.png`

The image must not be stretched.

Future Hero work must intentionally define image crop/position for:

- desktop;
- tablet;
- mobile.

Do not use one universal crop if it weakens the composition on another breakpoint.

User-facing Hero content must remain real HTML, not baked into a screenshot.

---

## 13. Approved UI patterns

The following patterns are approved as general working directions:

- dark navy surfaces with restrained blue highlights;
- orange as the primary conversion accent;
- white/light text with controlled muted supporting copy;
- simple section eyebrows;
- clear H1/H2 hierarchy;
- compact CTAs;
- subtle hover movement;
- restrained borders;
- minimal, deliberate shadows;
- responsive image-first compositions;
- floating WhatsApp access when it does not obstruct content;
- native FAQ `details/summary` pattern;
- subtle reveal animations when accessibility and performance are preserved.

Avoid converting every content group into a card.

---

## 14. CTA rules

Primary conversion action:

- WhatsApp conversation / quotation request.

Existing visible CTA labels include:

- Falar no WhatsApp
- Solicitar orçamento
- Quero meu orçamento
- Fale com a equipe

### CTA principles

- primary CTA uses brand orange;
- secondary actions should remain visually subordinate;
- CTAs must remain easy to find but not repeated excessively;
- CTA text must be direct;
- no fake urgency;
- no invented discounts;
- no invented availability claims;
- no misleading badges;
- no fake counters;
- no artificial social proof.

### Current WhatsApp configuration

The repository currently uses:

`https://wa.me/5511914368178`

Some links include the prefilled message:

`Olá! Quero solicitar um orçamento.`

Treat this as current production configuration.

Do not change the number or message permanently without confirmation.

When future refactoring is approved, centralize this contact configuration to avoid duplicate hard-coded URLs.

---

## 15. Content rules

Never invent or imply unverified company facts.

Do not create unsupported:

- testimonials;
- review counts;
- years of experience;
- customer counts;
- satisfaction percentages;
- guarantees;
- certifications;
- awards;
- service coverage;
- response times;
- pricing;
- statistics;
- team size;
- business history;
- material/product safety claims;
- technical performance claims.

If a requested section requires factual business information that does not exist in the repository or conversation, request the missing fact before publishing it.

### 15.1 Existing copy is not automatically verified truth

The current code contains service descriptions and claims such as:

- "Equipe especializada"
- "Qualidade comprovada"
- "Produtos seguros"
- "Atendimento em São Paulo"
- "São Paulo e região"

These are currently present in production, but they must not be expanded, quantified or used as evidence for new claims without verification.

When revising content, distinguish:

- existing copy;
- explicitly verified business facts;
- new copy requiring approval.

---

## 16. Image usage

### Current assets

- `public/logo.png`
- `public/hero-colorsclean.png`
- `public/favicon.svg`

### Rules

- prioritize realistic imagery;
- avoid random stock photography;
- avoid visibly synthetic AI artifacts;
- maintain subject consistency;
- preserve focal points on mobile;
- use appropriate alt text for meaningful images;
- decorative images should not create accessibility noise;
- optimize asset weight without degrading visible quality.

Current asset weights are high:

- `hero-colorsclean.png`: approximately 1.54 MB
- `logo.png`: approximately 1.09 MB

Asset optimization is a known performance opportunity.

---

## 17. Motion and interaction

### 17.1 Phase 2 pre-cleanup animation audit — 2026-09-24

Production animation/event ownership before cleanup:

| System | Targets / state | Behavior | Conflict status |
| --- | --- | --- | --- |
| IntersectionObserver A | `section,.strip,.service,.feature,.step,.result-visual,footer>div` | Adds `reveal`, then one-time `is-visible`; root margin `0 0 -10% 0`, threshold `0.08` | Conflicts with Observer B on every main section and `.strip` |
| IntersectionObserver B | `main>section,.strip,footer` | Adds `reveal` and toggles `is-visible` on enter/exit; root margin `-10% 0 -10% 0`, threshold `0.06` | Overlaps Observer A on sections/strip and can hide/replay them after A has permanently revealed them |
| Trust cleanup script | `.trust span` | Removes `reveal`, forces `is-visible` | No current production target; the static production Hero has no `.trust` block |
| Hero pointer interaction | `.hero` | Updates `--mouse-x` / `--mouse-y` on pointer movement via `requestAnimationFrame` | Unique owner |
| Header scroll listener | `header.scrolled` | Toggles header compact state above 24px scroll | Unique state |
| Back-to-top scroll listener | `.back-top.visible` | Toggles visibility above 700px scroll | Unique state; separate from header state |
| Mobile breakpoint listener | mobile menu | Closes the menu when returning above 850px | Navigation-only, not an animation owner |
| CSS Hero entrance | `.hero`, `.hero-copy`, `.hero:after` | Keyframe entrance animation | Hero is also targeted by both reveal observers, creating compounded initial opacity/transform behavior |

No JavaScript `resize` listeners exist.

Primary defects identified before editing:

- two observers control `is-visible` on the same sections and strip;
- Observer B can remove `is-visible` after Observer A has already treated the same element as permanently revealed;
- sections can replay on scroll because Observer B continuously toggles visibility;
- the Hero has both its own CSS entrance animation and observer-based reveal ownership;
- the obsolete `.trust span` script performs no production work;
- reveal classes are applied before observer setup is proven healthy, so an observer/setup failure can theoretically leave content hidden.

### 17.2 Final Phase 2 animation architecture

Phase 2 stabilization completed in commit `f5b803ff04ebae5c4c2734703d34a3be2b115cf1`.

#### Reveal owner: `setupOneShotReveal`

The production page now has one reusable IntersectionObserver helper with two intentionally separate reveal families.

**Section reveal family**

Targets:

- `main > section`, excluding `.hero`;
- `.strip`;
- `footer`.

Behavior:

- one-time reveal only;
- root margin: `-10% 0px -10% 0px`;
- threshold: `0.06`;
- existing section delay cadence is preserved;
- elements are unobserved after the first successful reveal, so minor reverse scrolling does not hide/replay them.

**Detail reveal family**

Targets:

- `.service`;
- `.feature`;
- `.step`;
- `.result-visual`;
- `footer > div`.

Behavior:

- one-time reveal only;
- root margin: `0px 0px -10% 0px`;
- threshold: `0.08`;
- legacy per-element delay cadence is preserved.

The two families use the same helper but retain different thresholds, root margins, targets and timing.

#### Hero animation owner

The Hero is no longer controlled by an IntersectionObserver.

Its entrance remains owned by the existing CSS Hero keyframes, while the pointer-driven light effect remains owned by the unique `pointermove` handler using `requestAnimationFrame`.

This removes compounded observer + CSS opacity/transform control from the above-the-fold Hero.

#### Reduced-motion and fail-open behavior

When `prefers-reduced-motion: reduce` is enabled:

- reveal classes are not added by JavaScript;
- page content remains visible;
- pointer-driven Hero motion is not bound;
- existing reduced-motion CSS continues to suppress Hero and interaction animations.

If `IntersectionObserver` is unavailable, reveal classes are not added.

If observer setup throws, the helper disconnects the observer and removes reveal state and inline delays from its targets. The page therefore remains readable instead of leaving content at `opacity: 0`.

#### Other event owners intentionally kept separate

- Header scroll listener → owns only `header.scrolled` at the 24px threshold.
- Back-to-top scroll listener → owns only `.back-top.visible` at the 700px threshold.
- Mobile breakpoint listener → navigation state only; not part of the reveal animation system.

These listeners calculate different states and were not merged solely to reduce listener count.

#### Animation-related technical debt intentionally left for later

- `src/styles.css` still contains layered historical Hero/keyframe declarations and animation overrides. Consolidating those rules belongs to the conservative CSS maintenance phase because changing cascade order can alter the current visuals.
- Header scroll compaction changes header height as an existing interaction. It was not redesigned during animation cleanup.
- CTA busy-state text replacement remains existing interaction behavior and was not changed in this phase.
- No animation library was added.

Motion must remain subtle and functional.

Allowed:

- opacity;
- transform;
- restrained hover elevation;
- short CTA transitions;
- subtle reveal-on-scroll.

Avoid:

- typewriter effects;
- bounce;
- blinking;
- aggressive zoom;
- heavy parallax;
- permanent floating motion;
- layout-changing animation;
- animation that changes font-size, line-height or letter-spacing.

Respect:

`prefers-reduced-motion: reduce`

Do not add a large animation dependency for effects that can be implemented with CSS or small native JavaScript.

---

## 18. Accessibility

Maintain or improve:

- semantic HTML;
- heading hierarchy;
- keyboard navigation;
- focus-visible states;
- sufficient contrast;
- meaningful alt text;
- correct labels for icon-only controls;
- native element semantics;
- touch target sizing;
- reduced motion behavior.

Do not add `role="button"` to native interactive elements unless a specific accessibility reason exists.

No essential information or interaction may depend solely on hover.

---

## 19. Performance

Performance is a product requirement.

Priorities:

1. Hero/LCP image optimization.
2. Font loading.
3. Avoiding unnecessary JavaScript.
4. Avoiding large third-party libraries.
5. Avoiding layout shifts.
6. Correct asset sizing by viewport.
7. Maintaining fast Vite builds and static delivery.

The current production build reports approximately:

- Hero image: 1.54 MB
- Logo image: 1.09 MB
- CSS: approximately 25 KB before gzip

The project should avoid sending desktop-scale imagery unnecessarily to smaller devices when future asset work allows responsive variants.

---

## 20. Technical conventions

### 20.1 Before editing

Always:

- inspect latest `main`;
- inspect the production entry path;
- identify exact affected files;
- verify whether a similar component/style already exists;
- avoid duplicating implementation.

### 20.2 While editing

Prefer:

- semantic HTML;
- reusable constants;
- CSS variables/tokens;
- Grid/Flexbox;
- `clamp()`;
- minimal selectors;
- clear breakpoint intent;
- small, reversible commits when practical.

Avoid:

- append-only CSS patches;
- uncontrolled `!important`;
- duplicated scripts;
- duplicate component versions;
- magic numbers scattered throughout the code;
- unnecessary libraries;
- working around architecture problems without documenting them.

### 20.3 After editing

When applicable:

- run/build the project;
- check syntax;
- check console/runtime errors;
- verify internal links;
- verify WhatsApp links;
- verify responsive behavior;
- verify deployment;
- update `SPEC.md` for permanent decisions.

---

## 21. Current components and implementation pieces

### Production-active

- Static header in `index.html`
- Accessible static mobile navigation controller in `index.html`
- Static Hero in `index.html`
- Static sections in `index.html`
- FAQ via `details/summary`
- Inline IntersectionObserver logic
- Inline result comparator logic
- Inline sticky-header behavior
- Inline back-to-top behavior
- `src/styles.css`

### Present but currently inactive / disconnected

- `src/main.tsx`
- React mobile menu
- React Lucide icon implementation
- `components/ui/interactive-hover-button.tsx`

Do not assume these inactive components are production-ready just because they exist.

---

## 22. Known technical and structural issues

Priority levels indicate maintenance importance, not authorization to refactor automatically.

### P0 / Critical architecture clarity

#### 22.1 Two competing implementations

The repository contains:

- a complete static HTML implementation in `index.html`;
- a separate React implementation in `src/main.tsx`.

Only the static implementation is currently rendered in production.

This creates divergence risk.

A future explicit decision is required:

- remain intentionally static and remove dead React code/dependencies; or
- migrate the live page cleanly to React and remove duplicated static logic.

Do not perform this migration without approval.

### P1 / High

#### 22.2 Phase 1 production stabilization — resolved 2026-09-24

Resolved in commit `00651f5b82c7bed4366020f04b56268bb4a858c2`:

- added the missing accessible mobile navigation control;
- preserved the desktop navigation;
- moved all inline scripts inside the valid HTML document structure;
- removed the stray `+` artifact;
- rewrote the affected first inline script so it parses correctly;
- validated all inline script syntax and internal navigation fragments before committing;
- production deployment completed successfully on Vercel.

These items are no longer active defects.

#### 22.5 Repeated reveal/animation logic

There are overlapping IntersectionObserver scripts targeting related elements.

This increases complexity and can create conflicting animation state.

#### 22.6 CSS override accumulation

`src/styles.css` contains many repeated definitions of:

- `.hero`
- `.hero:after`
- `.primary`
- responsive media queries
- motion rules

There are multiple late-stage overrides and `!important` declarations.

The current visual result should be preserved, but future maintenance should progressively consolidate touched areas rather than adding another override layer.

### P2 / Medium

#### 22.7 Phase 3 build reproducibility — resolved 2026-09-24

Resolved in commit `0269c61268cf8f4b5854848c2c2881470808f67a`:

- replaced every top-level `"latest"` dependency specifier with the exact version that was resolving successfully in the existing Vercel environment;
- committed `package-lock.json` (lockfile version 3);
- established npm as the canonical package manager;
- established `npm ci` as the deterministic install command;
- declared `"type": "module"`, removing the known Vite ESM/CommonJS warning;
- established Node `24.x` as the repository runtime policy to match Vercel;
- updated the deployment documentation.

Pinned top-level versions:

- `@vitejs/plugin-react@6.1.1`
- `vite@8.3.0`
- `typescript@7.0.2`
- `react@19.3.0`
- `react-dom@19.3.0`
- `lucide-react@1.46.0`

The final Vercel validation used `npm ci`, found zero reported npm vulnerabilities, built successfully with Vite `8.3.0`, and no longer emitted the previous ESM warning.

#### 22.10 Heavy image assets

The Hero and logo PNGs are unnecessarily large for web delivery.

#### 22.11 No lint/typecheck/test pipeline

There is currently no repository-level automated quality gate.

#### 22.12 Component outside TypeScript include path

`components/ui/interactive-hover-button.tsx` is outside the current `tsconfig.json` include list, which only contains `src`.

#### 22.13 Header selector inconsistency

Some later CSS rules target `header .logo`, while the production header image is inside `.brand` without a `.logo` class.

This can make expected scroll-state sizing rules inconsistent.

### P3 / Product/content quality

#### 22.14 Placeholder service visuals

Service cards currently rely on emoji/symbol placeholders instead of a coherent professional image/icon system.

#### 22.15 Results comparison is a visual placeholder

The current before/after comparator uses generated CSS gradients instead of verified real project imagery.

Do not invent results photography.

#### 22.16 Basic SEO metadata

Current document metadata is minimal.

A future SEO pass may consider:

- meta description;
- canonical;
- Open Graph;
- social preview;
- structured data where factual information is available.

No business schema values should be invented.

---

## 23. Things that must not change without approval

Do not change without explicit approval:

- official ColorsClean logo;
- company name;
- WhatsApp number;
- business claims;
- testimonials/reviews;
- pricing;
- service coverage claims;
- core service list;
- official brand colors as a whole;
- domain configuration;
- production branch;
- repository ownership;
- migration from static HTML to React;
- removal of major page sections;
- introduction of a CMS/backend;
- analytics/tracking;
- third-party integrations;
- form data collection;
- legal/privacy content.

Small implementation improvements that preserve the approved visual result may be made directly when requested.

---

## 24. Pending decisions

The following decisions are intentionally open:

1. Keep the project static or migrate fully to React.
2. Establish a normalized design-token system.
3. Consolidate the accumulated CSS override layers.
4. Optimize/replace image assets with web-appropriate formats.
5. Confirm which existing marketing claims are officially approved business facts.
6. Confirm whether real before/after photography will be supplied.
7. Decide whether the current FAQ content is final.
8. Decide whether SEO metadata and structured data should be implemented.
9. Decide whether a custom production domain will replace the Vercel alias.
10. Add lint/typecheck/tests and define the minimum quality gate. A typecheck currently requires a separate decision about the disconnected React source and its missing React type packages.
11. Decide whether inactive React dependencies should remain installed while the static architecture stays authoritative.

---

## 25. Maintenance rule for future sessions

This file is the persistent project specification.

For every meaningful permanent change:

- inspect this file;
- inspect latest `main`;
- implement only the requested scope;
- preserve established decisions;
- update this file if the decision changes the project's long-term design, architecture, content, responsiveness or deployment behavior.

When repository code and this SPEC disagree because of a newer approved change, update the SPEC in the same work cycle so the divergence does not persist.

## 26. Phase 4 CSS maintenance

### 26.1 Phase 4A audit baseline — 2026-09-24

Production stylesheet audited from commit `472eac1ff8a14ea1eb7d7222d6007e8cc3b2dea7`.

Baseline metrics:

- stylesheet: `src/styles.css`
- physical lines: 54
- parsed style rules: 327
- repeated selector groups: 61
- `!important` occurrences: 53
- repeated `@media (max-width: 850px)` blocks: 12
- repeated `@media (max-width: 500px)` blocks: 2
- repeated `@media (prefers-reduced-motion: reduce)` blocks: 9
- `@media (hover: none)` blocks: 1
- keyframes present: `heroIn`, `motionReveal`, `heroImageIn`, `dropPulse`, `heroSceneIn`, `heroCopyIn`, `heroOverlayIn`, `heroSceneInMobile`

#### SAFE

The audit found declarations that are provably shadowed by later declarations with the exact same selector and media context. These are safe candidates because removing the earlier declaration does not change the final cascade result.

Examples outside the Hero include:

- obsolete header height/background/border/backdrop values overridden later by the final header block;
- obsolete mobile `nav.show` top/background/padding values overridden by the Phase 1 navigation block;
- earlier focus-ring values overridden by the final CTA focus rule;
- earlier service hover transform/shadow values overridden by the later service interaction rule while preserving the still-active border color;
- earlier FAQ paragraph margin overridden by the later closed-state rule;
- earlier feature background/border/min-height and hover values overridden by the final feature styling;
- duplicate `.final { position: relative }`;
- duplicate `.step-grid:before { z-index: 0 }`;
- repeated mobile logo width/height values identical to the base logo rule.

Any cleanup must remove only the shadowed property/rule and preserve declarations from the earlier block that still contribute to the computed style.

#### RISKY

The following are intentionally protected and must not be consolidated without browser-level visual verification:

- `.hero`: 20 rule occurrences across base and responsive contexts;
- `.hero:after`: 14 rule occurrences;
- `.hero-copy`: 7 rule occurrences;
- Hero animation history including `heroIn`, `heroImageIn`, `motionReveal`, `heroSceneIn`, `heroCopyIn`, `heroOverlayIn` and `heroSceneInMobile`;
- final Hero background, overlay and animation behavior relies on source order and multiple `!important` declarations;
- responsive Hero positioning differs intentionally between base and `max-width: 850px`;
- step decoration history contains disabled pseudo-elements and `!important` cleanup rules; these are visually sensitive enough to keep unless the exact inactive declaration is proven redundant;
- header scroll-state sizing uses `!important` and remains an active dynamic state.

Because screenshots/DevTools are unavailable in this environment, historical Hero cascade layers are preserved even where some earlier declarations appear shadowed.

#### DEAD IN CURRENT PRODUCTION

The static production HTML and active JavaScript do not currently create the following classes:

- `.hero-card`
- `.orb`
- `.trust`
- `.feature-icon`
- `.steps`
- `.interactive-hover-button`
- `.interactive-hover-button__label`
- `.interactive-hover-button__hover`

However, these classes are still referenced by the disconnected React source (`src/main.tsx`) or the inactive reusable component (`components/ui/interactive-hover-button.tsx`).

Therefore they are dead in the current production DOM but are intentionally retained during Phase 4 so CSS maintenance does not silently break the dormant React implementation.

#### KEEP

Repeated rules that differ by breakpoint/state or still contribute unique properties remain intentionally separate.

Examples:

- `footer` grid changes at 850px and 500px;
- `.service-grid` 4 → 2 → 1 column progression;
- `.features,.step-grid` responsive grid rules;
- reduced-motion overrides;
- `.scrolled` desktop/mobile states;
- `.waterproof-accent` desktop/mobile/reduced-motion states;
- `.final-orbit` responsive/reduced-motion states;
- mobile navigation rules added in Phase 1;
- the two reveal families established in Phase 2.

### 26.2 CSS ownership rule

The static production page (`index.html` + `src/styles.css`) remains the CSS source of truth. Phase 4 cleanup may remove only declarations proven redundant by exact cascade analysis or selectors proven unused by both production markup and active JavaScript.

Hero and responsive cascade history is preserved when visual equivalence cannot be proven structurally.

---


### 26.3 Phase 4 safe cleanup result

Phase 4 cleanup was intentionally conservative because browser screenshots and DevTools are not available in this environment.

Code commits:

- `5f30d437004bb8befe564876e4257134616fd4b8` — removed only declarations proven shadowed by later declarations with the same selector/media ownership;
- `a24582deb526988ebac7b416f577cf532ca1f348` — removed the obsolete CTA arrow pseudo-element cascade after proving the final production state intentionally rendered text-only CTAs.

Baseline → final stylesheet metrics:

- characters: 28,986 → 27,431 (−1,555);
- physical lines: 54 → 54 (the stylesheet is intentionally compact/minified in places, so safe cleanup reduced declarations rather than newline count);
- parsed rules: 327 → 309 (−18);
- parsed declarations: 853 → 797 (−56);
- repeated selector groups: 42 → 35 (−7);
- `!important` occurrences: 53 → 46 (−7).

No Hero cascade block, Hero keyframe family or responsive Hero positioning rule was consolidated.

### 26.4 Breakpoint and cascade ownership

The current production breakpoint strategy remains unchanged:

- base/desktop rules;
- `@media (max-width: 850px)` for tablet/mobile structural adaptation and navigation;
- `@media (max-width: 500px)` for narrow mobile refinements;
- `@media (prefers-reduced-motion: reduce)` for motion suppression.

Phase 4 deliberately did not merge repeated media-query blocks. Source order remains part of the current cascade contract.

Current ownership expectations:

- Header base layout is defined early; the later header refinement block owns final height/background/backdrop values.
- Phase 1 mobile navigation block owns the final mobile menu visual/state overrides.
- Phase 2 JavaScript owns reveal-class lifecycle; CSS owns reveal presentation.
- Service/feature interaction styling is distributed across base structural rules and later interaction refinement rules.
- Hero final appearance is owned by the late Hero cleanup/refinement blocks and depends on source order plus selected `!important` declarations.

### 26.5 Important cascade dependencies intentionally preserved

The remaining `!important` declarations are not considered globally approved style practice; they are preserved because removing them cannot be proven visually safe without a browser-computed-style comparison.

The most sensitive remaining groups are:

- Hero background image, position, overlay geometry and responsive overrides;
- Hero child animation suppression used by the final scene animation system;
- Hero reduced-motion fallbacks;
- scroll-state header/logo sizing;
- step background/border cleanup and disabled decorative step pseudo-elements;
- reveal reduced-motion transform reset;
- dormant React-only logo/trust styling.

Do not remove these merely to reduce the `!important` count.

### 26.6 Known CSS debt intentionally preserved

The following debt remains by design:

- historical Hero declarations and keyframes that appear partially shadowed but participate in a visually sensitive cascade history;
- repeated `max-width: 850px` and reduced-motion blocks with different ownership/timing;
- production-dead selectors still referenced by the disconnected React implementation;
- step-decoration rules that are later disabled with `!important`;
- dormant interactive-hover-button styles associated with the inactive reusable React component;
- compact one-line rule formatting, which limits meaningful physical line-count reduction.

Until browser-level visual regression tooling is available, prefer retaining this debt over speculative consolidation.

### 26.7 Phase 4 validation limitation

Structural validation covers:

- valid CSS brace structure;
- valid inline JavaScript parsing;
- internal anchor integrity;
- Phase 1 mobile menu markup;
- Phase 2 single-observer architecture;
- Vite production build;
- Vercel production deployment and HTTP response.

It does not constitute pixel-perfect visual equivalence at 1440px, 768px or 390px because no browser screenshot/DevTools runner is available.


## 27. Phase 5 performance stabilization

### 27.1 Phase 5A production performance audit — 2026-09-24

Audit baseline started from production commit `e6a041e40b4907f2182155708d63188b7ee524e7`.

A temporary build-only diagnostic was added in commits `2f637c5d5555fabfe418eedb259a9dc70de97eea` and `39df11cb70685c77c72b5037642b6ca8c9b2c8a6` to read the actual source image metadata and benchmark image formats on the same Vercel build environment. It does not alter the rendered site.

#### Production image inventory

| Asset | Source dimensions | Source size | Production use | Fold | Current loading behavior |
| --- | ---: | ---: | --- | --- | --- |
| `public/hero-colorsclean.png` | 1672 × 941 | 1,542,330 B | CSS Hero background | Above fold / LCP candidate | Discovered after CSS; no preload; no responsive variant |
| `public/logo.png` | 2172 × 724 | 1,094,248 B | Header logo + footer logo | Header above fold; footer below fold | Same file referenced twice; no width/height HTML attributes; no lazy attribute |
| `public/favicon.svg` | viewBox 64 × 64 | 282 B | Browser favicon | Head | Standard favicon load |

The service visuals and result comparator are currently CSS/emoji-based and do not introduce additional bitmap image requests.

The two logo elements resolve to the same built URL, so a normal browser cache prevents a second full network download for the footer instance. The footer element itself is still below the fold and lacks explicit loading/decoding hints.

#### Oversized source findings

- The logo source is 2172 × 724 while the production CSS constrains its box to approximately 190 × 48. The source is materially oversized for its rendered use.
- The Hero source is 1672 × 941. Its dimensions are reasonable for the desktop composition, but PNG encoding makes the transfer size unnecessarily large.
- The mobile Hero uses `background-size: cover` in a tall viewport. Because cover geometry still needs a wide source to preserve the current crop, aggressively reducing source dimensions by viewport width alone can reduce sharpness. Format compression is therefore the first safe optimization.

#### PNG metadata findings

The build audit measured:

- Hero ancillary metadata: 21,856 B;
- Logo ancillary metadata: 23,629 B.

Metadata stripping alone would not solve the performance problem; most payload is pixel data.

#### Image conversion benchmark

Vercel's current build image includes ImageMagick 6.9 with WebP, AVIF/HEIC and compare support. No new npm dependency is required for benchmarking.

Full-resolution Hero WebP candidates:

- quality 92: 114,852 B; PSNR ≈ 41.88 dB;
- quality 90: 96,438 B; PSNR ≈ 41.53 dB;
- quality 88: 80,018 B; PSNR ≈ 41.10 dB.

A 1440 px-wide quality-90 Hero candidate measured 74,310 B.

A 768 × 256 lossless WebP logo candidate measured 133,326 B.

For final production, favor the higher-quality Hero candidate unless a smaller version can be proven visually equivalent.

#### Font loading

Current Google Fonts request:

- DM Sans: 400, 500, 600, 700;
- Manrope: 600, 700, 800;
- `display=swap` is already enabled.

The production stylesheet explicitly uses weights 600, 700 and 800 in different rule families, while default body text uses the regular face. Some requested weights may exist primarily for dormant/inactive React styling. Because Google Fonts only downloads font files that are actually selected by rendered text and browser-level request inspection is unavailable, Phase 5 will not remove font weights unless the production benefit can be proven without typography risk.

#### CSS and JavaScript delivery

- Production uses one Vite-generated stylesheet.
- CSS is render-blocking by design because it is required for the initial layout.
- Production contains no external JavaScript bundle; the active JavaScript is inline at the end of `body`.
- The disconnected React application is not mounted and no React bundle is requested by the current production HTML.
- No image preload currently exists.
- External inline scripts do not require `defer` because there are no external script tags and the scripts already execute after the document markup.

#### Public directory duplication

Vite currently copies the original files from `public/` to root output paths, while references processed from HTML/CSS can also produce hashed asset copies. The source PNGs are therefore accessible in the deployed output even when not needed by the initial page request.

A final optimization may keep canonical originals in the repository while moving them outside the deployable `public/` directory, provided all active and dormant references are updated safely.

#### Phase 5A conclusion

The dominant safe performance opportunity is image delivery:

1. replace the loaded Hero PNG with a high-quality WebP equivalent while preserving identical dimensions/crop;
2. serve a properly sized transparent WebP logo;
3. preload only the actual Hero asset;
4. add stable image dimensions and below-the-fold lazy loading where useful;
5. avoid shipping original heavy source PNGs in deployable `public/` when they are retained only as canonical source assets.

No Lighthouse score is available because a real browser/Lighthouse profiler is not exposed in this environment.

---


### 27.2 Final Phase 5 production policy

Phase 5 production optimization was implemented in commit `4e1a294d349b11001a6eee189970b95812a59d8c`, followed by source/deployment cleanup in `7b17377024c8e6b72601fa71fbfe33230d81d6cb`.

#### Production image format policy

Production raster imagery should use WebP when it materially reduces transfer size while preserving the approved visual result.

Canonical original artwork must not be destroyed to obtain a smaller production asset.

Current canonical source archive:

- `source-assets/hero-colorsclean.png` — 1672 × 941, 1,542,330 B;
- `source-assets/logo.png` — 2172 × 724, 1,094,248 B.

These source PNG files are retained in the repository but intentionally live outside `public/`, so Vite does not copy them into the deployed static output.

Current production assets:

- `public/hero-colorsclean.webp` — 1672 × 941, 114,852 B;
- `public/logo-optimized.webp` — 768 × 256, 133,326 B;
- `public/favicon.svg` — 282 B.

#### Hero asset policy

The Hero production WebP:

- preserves the original 1672 × 941 dimensions;
- uses the same source image and the existing CSS crop/positioning;
- was encoded at WebP quality 92;
- measured approximately 41.88 dB PSNR against the source during the Vercel build benchmark;
- is preloaded from `index.html` with `as="image"`, `type="image/webp"` and `fetchpriority="high"`;
- remains a CSS background so the established Hero composition, overlays and animation cascade are not restructured.

No smaller mobile/tablet Hero variant is currently used. The existing mobile composition relies on `background-size: cover` in a tall viewport, which still requires substantial horizontal source resolution. Without screenshot-based regression testing, reducing Hero dimensions per breakpoint was judged a greater sharpness/crop risk than the modest additional transfer saving after WebP compression.

#### Logo asset policy

The official logo source remains archived unchanged.

Production uses a 768 × 256 transparent lossless WebP derivative. This retains the source 3:1 aspect ratio and provides substantial pixel density above the approximately 190 × 48 CSS image box.

Both production logo elements include explicit `width="190"` and `height="48"` attributes to establish a stable layout box.

Header logo:

- not lazy-loaded;
- available during the initial viewport.

Footer logo:

- `loading="lazy"`;
- `decoding="async"`;
- references the same optimized logo asset, so normal browser caching avoids a second full transfer after the header use.

#### Responsive image strategy

Current strategy is deliberately small and maintainable:

- Hero: one full-resolution compressed WebP because the visual crop is highly sensitive and the post-compression transfer is already small;
- Logo: one appropriately downscaled lossless WebP because the same logo is rendered at a consistent small size;
- Favicon: existing SVG;
- no unnecessary variant matrix;
- no generated/AI replacement imagery.

If real photographic below-the-fold content is added later, use responsive `srcset`/`sizes` and lazy loading where the image dimensions and layout make that useful.

#### Lazy-loading policy

Do not lazy-load:

- Hero/LCP imagery;
- critical above-the-fold brand imagery when delaying it would create visible pop-in.

Use `loading="lazy"` and `decoding="async"` for genuine below-the-fold `<img>` elements when they are not already required by above-the-fold content.

CSS backgrounds cannot use native `loading="lazy"`; do not convert established layouts solely for that attribute.

#### Preload policy

Only preload resources known to be critical to the initial viewport.

Current explicit image preload:

- production Hero WebP.

Do not preload the footer logo, decorative imagery or future below-the-fold content.

#### Font policy after Phase 5

The Google Fonts family selection and weights remain unchanged.

`display=swap` was already present.

Some declared/requested font weights may be associated with inactive React styling, but browser-level request tracing is unavailable and changing typography carries visual risk. No font family or weight was removed during stabilization without proof of a real production transfer benefit.

#### JavaScript/CSS delivery after Phase 5

- active production JavaScript remains inline at the end of `body`;
- there is no external React bundle request;
- the disconnected React source remains in the repository but is not mounted;
- the single Vite stylesheet remains render-blocking because it defines the initial layout;
- manual minification was not introduced; Vite continues to own production optimization.

#### Phase 5 measured result

Initial production image transfer set:

- Hero PNG: 1,542,330 B;
- Logo PNG: 1,094,248 B;
- favicon SVG: 282 B;
- total: 2,636,860 B.

Final production image transfer set:

- Hero WebP: 114,852 B;
- Logo WebP: 133,326 B;
- favicon SVG: 282 B;
- total: 248,460 B.

Measured reduction:

- 2,388,400 B;
- approximately 90.58%.

The number of distinct initial image resources remains three: favicon, Hero and logo. The optimization reduces their payload rather than introducing extra requests.

#### Performance validation limitations

Validated structurally and through the production build/deployment:

- `npm ci`;
- `npm run build`;
- no Vite build warning/error introduced;
- optimized WebP files exist in final deployed output;
- removed source PNG paths return 404 in production;
- Hero preload resolves to the same hashed WebP emitted by Vite;
- internal anchors remain valid;
- mobile menu remains present;
- Phase 2 single-observer architecture remains intact;
- production returns HTTP 200.

No Lighthouse score, browser network waterfall, DevTools trace or pixel-by-pixel screenshot comparison is claimed because those browser tools are not available in this environment.

---

## 28. Services section — approved editorial rebuild

Implemented in commit `7fa93784034ba5a589b1345134713ee99044b264`.

The production `#serviços` section now follows a light editorial composition inspired by premium residential-service websites while preserving the ColorsClean palette and static/Vite architecture.

### 28.1 Structure

Approved production hierarchy:

1. Eyebrow: `Nossos serviços`;
2. Main heading: `Cuidado completo para o seu ambiente.`;
3. `seu ambiente.` highlighted with ColorsClean blue;
4. Supporting paragraph on the right;
5. Small optional micro-detail: `Cuidado em cada detalhe`;
6. Four photographic service cards:
   - Limpeza de Estofados;
   - Limpeza de Colchões;
   - Limpeza de Tapetes;
   - Impermeabilização.

The existing `#serviços` anchor must remain stable.

### 28.2 Visual ownership

The section uses unique production classes beginning with:

- `.services-showcase`
- `.services-intro`
- `.services-cards`
- `.service-card`

This avoids coupling the new production section to the historical `.service` rules still used by the disconnected React source.

Approved visual characteristics:

- clean light background;
- dark editorial typography;
- ColorsClean blue only for the main phrase highlight and selected interaction accents;
- restrained orange detail line;
- four real-photography cards on desktop;
- dark bottom image overlay for text contrast;
- line-style inline SVG icons;
- small `Saiba mais` CTA with circular arrow detail;
- no fake 3D, glow, oversized icons or decorative clutter.

### 28.3 Responsive behavior

Current section breakpoints:

- Desktop: four cards in one row.
- Up to 1080px: two-column card grid and simplified intro; micro-detail hidden.
- Up to 700px: single-column card stack, 20px section side padding and mobile-specific type scale.

Do not force four columns into tablet widths.

### 28.4 Service image delivery

The four service photographs are below-the-fold content and therefore use:

- real photographic imagery;
- explicit `width` / `height` attributes to reserve aspect ratio;
- `loading="lazy"`;
- `decoding="async"`;
- responsive `srcset` variants;
- `sizes` matched to 1-column / 2-column / 4-column layouts.

Current service photography is served from fixed Unsplash image asset IDs through the Unsplash image CDN. These are editorial/service visuals, not official ColorsClean brand assets.

Brand assets (Hero, logo and favicon) remain local and governed by the Phase 5 performance policy.

Do not replace the service photography with AI-generated imagery without explicit approval.

### 28.5 Motion ownership

The Phase 2 detail reveal helper now includes `.service-card`.

The service cards therefore preserve the existing one-shot reveal behavior while retaining their own restrained hover/image-scale interaction.

Reduced-motion users receive no service-card hover transform animation.

---

