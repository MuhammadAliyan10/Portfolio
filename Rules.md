- **Void (Background):** `#050505` (Not pure black. A deep, infinite ink).
- **Concrete (Surface):** `#1A1A1A` (Used for cards or overlays).
- **Mist (Text Secondary):** `#888888` (For sub-text, metadata).
- **Flash (Text Primary):** `#E1E1E1` (Almost white, but easier on the eyes. Like old paper).
- **Voltage (Accent):** `#5D3FD3` (A deep, electric Indigo/Purple). _Why?_ It honors the Real Madrid away kit aesthetic and the "Cursed Energy" vibe of JJK. It pops violently against the black.

#### 2. The Typography (The "Dual Engine")

- **Family A (Soul):** `Syne`.
- Usage: Headings, Massive Titles, Numbers.
- Rule: Always `font-weight: 700` or `800`. Tight letter spacing (`-0.02em`).

- **Family B (Brain):** `Space Grotesk`.
- Usage: Body text, buttons, code snippets, dates.
- Rule: `font-weight: 400` or `500`. Normal spacing.

#### 3. The Grid & Spacing (The "Rhythm")

- **Container:** Max-width `1400px` (We want wide, cinematic layouts).
- **Padding:** We work in explicit steps.
- `Section`: `py-24` or `py-32` (Huge vertical breathing room).
- `Element`: `p-6` or `p-8`.

- **Border Radius:** `0px` or `4px`.
- _Rule:_ We are not doing "cute" rounded corners. Toji uses sharp weapons. Your UI should feel sharp.

#### 4. The Components

- **Buttons:** No background fill by default. Heavy borders. Hover fills the button.
- _Style:_ `border-1 border-white/20 hover:bg-white hover:text-black`.

- **Glass:** We will use a very subtle "noise" texture overlay to make the black feel alive (like film grain).

---
