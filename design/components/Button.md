# Button

Chunky, sticker-shadowed buttons for the few actions that matter on a restaurant site: order, call, get directions, see the menu.

**Consumer provides:** an `<a>` (navigates — order links, tel:, maps) or `<button>` (acts on the page) with class `pt-btn` plus one variant; an optional leading or trailing `pt-icon`; a 1–3 word label in sentence case.

| Variant | Use |
|---|---|
| `pt-btn--primary` | The ONE main action per view — usually "Order pickup". `chile` fill, `on-chile` label. |
| `pt-btn--queso` | Secondary money action — delivery. `queso` fill, `on-queso` label. |
| `pt-btn--ghost` | Everything else ("See the menu", "Directions"). |

- Do: put "Order" first; use `tel:` links for "Call us".
- Don't: put two primary buttons side by side, or use jamaica/nopal fills for buttons.
- Hover nudges the button 1px into its shadow; focus shows a 3px `focus` ring with 2px offset.
