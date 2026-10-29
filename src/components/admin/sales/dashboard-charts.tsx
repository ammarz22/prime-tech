import { MONTH_LABELS, rs } from "@/lib/utils/sales-format";
import type { Dashboard } from "@/lib/db/sales";

const PHONE_COLOUR = "#111827";
const ACCESSORY_COLOUR = "#E10600";
const NET_COLOUR = "#15803D";

/** A friendly axis step (1, 2, 2.5, 5 × 10ⁿ) for roughly `target` ticks across `range`. */
function niceStep(range: number, target = 4) {
  if (range <= 0) return 1;
  const raw = range / target;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const frac = raw / pow;
  const mult = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 2.5 ? 2.5 : frac <= 5 ? 5 : 10;
  return mult * pow;
}

function axisLabel(v: number) {
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return `${(v / 1_000_000).toLocaleString("en-LK", { maximumFractionDigits: 1 })}M`;
  if (abs >= 1000) return `${(v / 1000).toLocaleString("en-LK", { maximumFractionDigits: 1 })}k`;
  return String(v);
}

/**
 * Profit by month for one year: stacked bars (phone + accessory profit) with a
 * net-profit line (profit minus expenses). Plain SVG, rendered on the server.
 */
export function MonthlyChart({ monthly, year }: { monthly: Dashboard["monthly"]; year: number }) {
  const W = 640;
  const H = 280;
  const m = { top: 14, right: 10, bottom: 30, left: 50 };
  const innerW = W - m.left - m.right;
  const innerH = H - m.top - m.bottom;

  const rows = Array.from({ length: 12 }, (_, i) => {
    const found = monthly.find((x) => x.month === i + 1);
    const phone = found?.phoneProfit ?? 0;
    const acc = found?.accProfit ?? 0;
    const net = phone + acc - (found?.expenses ?? 0);
    return { phone, acc, net };
  });

  const posTop = rows.map((r) => Math.max(0, r.phone) + Math.max(0, r.acc));
  const negBottom = rows.map((r) => Math.min(0, r.phone) + Math.min(0, r.acc));
  let max = Math.max(1, ...posTop, ...rows.map((r) => r.net));
  let min = Math.min(0, ...negBottom, ...rows.map((r) => r.net));
  const step = niceStep(max - min);
  max = Math.ceil(max / step) * step;
  min = Math.floor(min / step) * step;

  const y = (v: number) => m.top + ((max - v) / (max - min || 1)) * innerH;
  const slot = innerW / 12;
  const barW = Math.min(34, slot * 0.58);
  const ticks: number[] = [];
  for (let t = min; t <= max + step / 2; t += step) ticks.push(Math.round(t * 100) / 100);

  const netPoints = rows.map((r, i) => `${(m.left + slot * i + slot / 2).toFixed(1)},${y(r.net).toFixed(1)}`).join(" ");
  const hasData = rows.some((r) => r.phone || r.acc || r.net);

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Monthly profit chart for ${year}`}
        className="h-auto w-full min-w-[520px]"
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={m.left} x2={W - m.right} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#9CA3AF" : "#EEF0F3"} strokeWidth={t === 0 ? 1.2 : 1} />
            <text x={m.left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#6B7280">
              {axisLabel(t)}
            </text>
          </g>
        ))}

        {rows.map((r, i) => {
          const x = m.left + slot * i + (slot - barW) / 2;
          // Stack upwards from the zero line for gains, downwards for losses.
          let up = 0;
          let down = 0;
          const segments = [
            { v: r.phone, colour: PHONE_COLOUR, label: "Phone profit" },
            { v: r.acc, colour: ACCESSORY_COLOUR, label: "Accessory profit" },
          ].map((s) => {
            let from: number;
            let to: number;
            if (s.v >= 0) {
              from = up;
              up += s.v;
              to = up;
            } else {
              from = down;
              down += s.v;
              to = down;
            }
            return { ...s, top: y(Math.max(from, to)), height: Math.abs(y(from) - y(to)) };
          });
          return (
            <g key={i}>
              {segments.map(
                (s) =>
                  s.v !== 0 && (
                    <rect key={s.label} x={x} y={s.top} width={barW} height={Math.max(s.height, 0.5)} rx={3} fill={s.colour}>
                      <title>{`${MONTH_LABELS[i]} — ${s.label}: ${rs(s.v)}`}</title>
                    </rect>
                  ),
              )}
              <text x={m.left + slot * i + slot / 2} y={H - 10} textAnchor="middle" fontSize="11" fill="#6B7280">
                {MONTH_LABELS[i]}
              </text>
            </g>
          );
        })}

        {hasData && <polyline points={netPoints} fill="none" stroke={NET_COLOUR} strokeWidth={2} strokeLinejoin="round" />}
        {hasData &&
          rows.map((r, i) => (
            <circle key={i} cx={m.left + slot * i + slot / 2} cy={y(r.net)} r={3.2} fill={NET_COLOUR}>
              <title>{`${MONTH_LABELS[i]} — net profit: ${rs(r.net)}`}</title>
            </circle>
          ))}
      </svg>
    </div>
  );
}

export function ChartLegend() {
  return (
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/70">
      <span className="inline-flex items-center gap-1.5">
        <i className="inline-block size-2.5 rounded-[3px]" style={{ background: PHONE_COLOUR }} />
        Phone profit
      </span>
      <span className="inline-flex items-center gap-1.5">
        <i className="inline-block size-2.5 rounded-[3px]" style={{ background: ACCESSORY_COLOUR }} />
        Accessory profit
      </span>
      <span className="inline-flex items-center gap-1.5">
        <i className="inline-block h-[3px] w-3 rounded-sm" style={{ background: NET_COLOUR }} />
        Net profit
      </span>
    </div>
  );
}

/** Phones vs accessories share of income. */
export function IncomeDonut({ phones, accessories }: { phones: number; accessories: number }) {
  const total = phones + accessories;
  const r = 70;
  const c = 2 * Math.PI * r;
  const phoneLen = total ? (phones / total) * c : 0;
  const accLen = total ? (accessories / total) * c : 0;
  const pct = (v: number) => (total ? Math.round((v / total) * 100) : 0);

  return (
    <div>
      <svg viewBox="0 0 200 200" role="img" aria-label="Income split chart" className="mx-auto h-44 w-44">
        <g transform="rotate(-90 100 100)" fill="none" strokeWidth={30}>
          <circle cx="100" cy="100" r={r} stroke="#EEF0F3" />
          <circle cx="100" cy="100" r={r} stroke={PHONE_COLOUR} strokeDasharray={`${phoneLen} ${c - phoneLen}`}>
            <title>{`Phones: ${rs(phones)} (${pct(phones)}%)`}</title>
          </circle>
          <circle cx="100" cy="100" r={r} stroke={ACCESSORY_COLOUR} strokeDasharray={`${accLen} ${c - accLen}`} strokeDashoffset={-phoneLen}>
            <title>{`Accessories: ${rs(accessories)} (${pct(accessories)}%)`}</title>
          </circle>
        </g>
      </svg>
      <table className="mt-3 w-full text-sm">
        <tbody>
          <tr>
            <td className="py-1.5">
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block size-2.5 rounded-[3px]" style={{ background: PHONE_COLOUR }} />
                Phones <span className="text-xs text-ink/45">{pct(phones)}%</span>
              </span>
            </td>
            <td className="py-1.5 text-right font-semibold tabular-nums">{rs(phones)}</td>
          </tr>
          <tr>
            <td className="py-1.5">
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block size-2.5 rounded-[3px]" style={{ background: ACCESSORY_COLOUR }} />
                Accessories <span className="text-xs text-ink/45">{pct(accessories)}%</span>
              </span>
            </td>
            <td className="py-1.5 text-right font-semibold tabular-nums">{rs(accessories)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
