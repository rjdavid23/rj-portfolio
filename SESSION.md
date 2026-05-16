# Session: About Page — Tool Stack & Logos

## Done
- Replaced hobbies text with TeamShowcase photo grid (staggered 3-col, grayscale→color hover, cross-highlight with name list)
- All sections aligned to same x-position (`max-width: 960px`)
- About page headers match hero font sizing (`clamp(40px, 6vw, 64px)`)
- Tool stack: transparent borderless 280×88 cards, flex-wrap row (3 per row), icon-left layout
- Tool hover matches project cards (`translateY(-6px) rotate(-0.4deg)` + matching shadows)
- Tool icons: Figma, OpenCode (dark logo), Dovetail, Claude Code, Codex (from `codex.svg`), Jira, Vercel, Maze — all in 64×64 rounded-square brand bgs with white 40×40 icons
- Hobby images: picsum.photos/seed/{hobby}
- Footer: LinkedIn, GitHub, email

## Files
- `about.html` — tool cards (~line 80), hobby grid (~line 140)
- `styles.css` — all styling
- `codex.svg`, `opencode-logo-dark.svg`, `opencode-logo-light.svg` — logo assets
