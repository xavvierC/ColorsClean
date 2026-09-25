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

### 3.1 Current scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

There is currently no dedicated:

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

### 4.3 Build expectations

Vercel currently runs:

```bash
npm run build
```

and Vite outputs the production build to:

```text
dist/
```

The existing README deployment instructions are outdated because they describe the project as a generic static deployment with no build command and output directory `.`.

Do not rely on those README deployment instructions until they are corrected.

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

#### 22.7 Non-deterministic dependency versions

`package.json` uses `"latest"` for all dependencies and there is no lockfile in the repository.

Build results may change over time without source changes.

A future maintenance task should pin versions and commit a lockfile.

#### 22.8 Vite ESM configuration warning

Production build logs report that `vite.config.ts` uses ESM syntax while the package is loaded as CommonJS.

Potential correction:

- declare `"type": "module"` in `package.json`; or
- use an explicitly compatible config extension/setup.

Do not change this blindly; validate the build after any adjustment.

#### 22.9 README deployment instructions are outdated

README says:

- Framework: Other / Static
- no build command
- output directory `.`

Actual Vercel project is Vite and runs `npm run build` to create `dist`.

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
10. Add lint/typecheck/tests and define the minimum quality gate.
11. Pin dependency versions and add a lockfile.
12. Correct README deployment documentation.

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
