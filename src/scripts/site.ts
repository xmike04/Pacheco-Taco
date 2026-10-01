// Small progressive enhancements. The site is fully usable without any of this.

const root = document.documentElement;

/* ------------------------------------------------------------------ theme -- */
const savedTheme = (): string | null => {
  try {
    return localStorage.getItem('pt-theme');
  } catch {
    return null;
  }
};
const isDark = () => root.getAttribute('data-theme') === 'dark';

function syncToggles() {
  document
    .querySelectorAll<HTMLElement>('[data-theme-toggle]')
    .forEach((b) => b.setAttribute('aria-pressed', String(isDark())));
}

function setTheme(theme: 'light' | 'dark') {
  root.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('pt-theme', theme);
  } catch {
    /* private mode etc. — the choice just won't persist */
  }
  syncToggles();
}

document.querySelectorAll('[data-theme-toggle]').forEach((b) => {
  b.addEventListener('click', () => setTheme(isDark() ? 'light' : 'dark'));
});
syncToggles();

// Follow the OS if the visitor never chose.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!savedTheme()) {
    root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    syncToggles();
  }
});

/* ------------------------------------------------------------ mobile sheet -- */
const sheet = document.getElementById('menu-sheet') as HTMLDialogElement | null;
document.querySelectorAll('[data-menu-open]').forEach((b) => b.addEventListener('click', () => sheet?.showModal()));
document.querySelectorAll('[data-menu-close]').forEach((b) => b.addEventListener('click', () => sheet?.close()));
// Following a link inside the sheet (including #anchors on this page) closes it.
sheet?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) sheet.close();
});
// Rotating a tablet / resizing past the breakpoint: the sheet has no purpose any more.
window.matchMedia('(min-width: 721px)').addEventListener('change', (e) => {
  if (e.matches) sheet?.close();
});

/* ------------------------------------------------------------- open status -- */
type HoursPayload = { tz: string; days: { d: number; o?: string; c?: string }[] };

const payloadEl = document.getElementById('pt-hours');
let payload: HoursPayload | null = null;
try {
  payload = payloadEl?.textContent ? (JSON.parse(payloadEl.textContent) as HoursPayload) : null;
} catch {
  payload = null;
}

const WEEKDAY: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const fmt = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  const h12 = h % 12 || 12;
  return `${h12}${m ? ':' + String(m).padStart(2, '0') : ''} ${h >= 12 ? 'PM' : 'AM'}`;
};

/** "Now" in the restaurant's time zone, whatever the visitor's clock says. */
function nowIn(tz: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  return { day: WEEKDAY[get('weekday')] ?? 0, min: (Number(get('hour')) % 24) * 60 + Number(get('minute')) };
}

function statusFor(p: HoursPayload) {
  const { day, min } = nowIn(p.tz);
  const byDay = new Map(p.days.map((x) => [x.d, x]));
  const today = byDay.get(day);
  if (today?.o && today.c) {
    if (min >= toMin(today.o) && min < toMin(today.c)) return { open: true, text: `Open now · until ${fmt(today.c)}` };
    if (min < toMin(today.o)) return { open: false, text: `Closed · opens today at ${fmt(today.o)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const next = byDay.get(d);
    if (next?.o) return { open: false, text: `Closed · opens ${i === 1 ? 'tomorrow' : SHORT[d]} at ${fmt(next.o)}` };
  }
  return { open: false, text: 'Closed' };
}

function renderStatus() {
  if (!payload) return;
  const s = statusFor(payload);
  document.querySelectorAll<HTMLElement>('[data-open-status]').forEach((el) => {
    el.hidden = false;
    el.dataset.state = s.open ? 'open' : 'closed';
    el.textContent = s.text;
  });
  const { day } = nowIn(payload.tz);
  document.querySelectorAll<HTMLElement>('tr[data-day]').forEach((row) => {
    const today = Number(row.dataset.day) === day;
    const tag = row.querySelector('.today-tag');
    if (today) {
      row.setAttribute('aria-current', 'date');
      if (!tag) {
        const el = document.createElement('span');
        el.className = 'today-tag';
        el.textContent = 'Today';
        row.querySelector('th')?.append(el);
      }
    } else {
      row.removeAttribute('aria-current');
      tag?.remove();
    }
  });
}

renderStatus();
window.setInterval(renderStatus, 60_000);
