# Session: About Page Work + Fixes

## Done
- Hobbies: TeamShowcase photo grid (staggered 3-col, grayscale→color hover, cross-highlight)
- All sections `max-width: 960px`, headers `clamp(40px, 6vw, 64px)`
- Tool stack: transparent borderless 280×88 cards, 3/row, icon-left with 64×64 brand bgs + white 40×40 icons
- Tools: Figma, OpenCode (dark logo), Dovetail, Claude, Codex, Jira, Vercel, Maze
- Logo assets: `codex.svg`, `opencode-logo-dark.svg`, `opencode-logo-light.svg`
- Fixed: `scroll-margin-top: 100px` on `.section` + `.about-section` — header no longer covers label on nav click
- "Curated Work" label moved into `.container`, `text-align: center`
- Footer: LinkedIn, GitHub, email

## Files
- `about.html` — tool cards (~L80), hobby grid (~L140)
- `index.html` — work section label fix
- `styles.css` — scroll offset, centering
- `codex.svg`, `opencode-logo-dark.svg`, `opencode-logo-light.svg`
