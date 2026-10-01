# MenuItem

One dish on the menu page: name, dotted leader, price, description, optional tags — set like a menu board card with a sticker shadow.

**Consumer provides:** `name` (as printed on the menu — keep their spelling, e.g. "Pollo Chingon"), `price` (from the current POS; delivery apps mark up), a one-line `description` listing ingredients in the order they appear on the menu, and 0–2 `Tag`s.

- Wrap a section's items in `pt-menu` (auto-fill grid, 260px min).
- Prices are `price` style in `chile`. Never round — $13.80 stays $13.80.
- Group by: Burgers, Tacos, Loaded (fries & nachos), Sandwiches, Aguas frescas, Sides & salsas.
