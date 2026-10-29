import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText, Plug, Smartphone, Wallet } from "lucide-react";
import { ChartLegend, IncomeDonut, MonthlyChart } from "@/components/admin/sales/dashboard-charts";
import { PageHead, Profit } from "@/components/admin/sales/shared";
import { YearSelect } from "@/components/admin/sales/year-select";
import { getDashboard, parsePeriod, periodRange, PERIODS } from "@/lib/db/sales";
import { colomboToday, niceDate, rs } from "@/lib/utils/sales-format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Sales Dashboard" };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function Card({ title, aside, children, className }: { title: string; aside?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl border border-ink/8 bg-paper p-4 sm:p-5", className)}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold">{title}</h2>
        {aside && <div className="text-xs text-ink/50">{aside}</div>}
      </div>
      {children}
    </section>
  );
}

function Kpi({ label, value, sub, highlight, negative }: { label: string; value: string; sub: string; highlight?: boolean; negative?: boolean }) {
  return (
    <div className={cn("rounded-2xl border p-4", highlight ? "border-ink bg-ink text-white" : "border-ink/8 bg-paper")}>
      <p className={cn("text-[11px] font-bold uppercase tracking-[0.08em]", highlight ? "text-white/70" : "text-ink/50")}>{label}</p>
      <p className={cn("mt-1.5 text-xl font-extrabold tabular-nums tracking-tight sm:text-[21px]", negative && "text-red-500")}>{value}</p>
      <p className={cn("mt-0.5 text-xs", highlight ? "text-white/55" : "text-ink/40")}>{sub}</p>
    </div>
  );
}

function QuickAction({ href, icon: Icon, title, hint, primary }: { href: string; icon: typeof Smartphone; title: string; hint: string; primary?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-h-14 items-center gap-3 rounded-2xl border p-3.5 text-left font-bold transition hover:border-ink",
        primary ? "border-ink bg-ink text-white" : "border-ink/8 bg-paper",
      )}
    >
      <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-[10px]", primary ? "bg-brand text-white" : "bg-ink/6")}>
        <Icon className="size-[19px]" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm">{title}</span>
        <span className={cn("hidden text-xs font-medium sm:block", primary ? "text-white/60" : "text-ink/50")}>{hint}</span>
      </span>
    </Link>
  );
}

export default async function SalesDashboardPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const period = parsePeriod(first(params.period));
  const currentYear = Number(colomboToday().slice(0, 4));
  const requestedYear = Number(first(params.year));
  const year = Number.isInteger(requestedYear) && requestedYear > 2000 && requestedYear < 2100 ? requestedYear : currentYear;

  const data = await getDashboard(period, year);
  const range = periodRange(period);

  if (!data) {
    return (
      <div className="space-y-5">
        <PageHead title="Sales Dashboard" />
        <p className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">
          The dashboard couldn&apos;t load. Check that the sales tracker migration has been applied, then refresh.
        </p>
      </div>
    );
  }

  const maxCategory = Math.max(1, ...data.expenseCategories.map((c) => c.total));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Image src="/brand/icon-new.png" alt="Prime Tech" width={48} height={48} className="size-12 rounded-xl" priority />
          <div>
            <Image src="/brand/logo-redesigned.png" alt="Prime Tech" width={482} height={97} className="h-5 w-auto" priority />
            <h1 className="mt-1.5 text-2xl font-semibold tracking-tight">Sales Dashboard</h1>
            <p className="text-sm text-ink/55">{range.label} · figures update as you add sales</p>
          </div>
        </div>
        <nav aria-label="Period" className="flex rounded-xl border border-ink/10 bg-paper p-1">
          {PERIODS.map((p) => (
            <Link
              key={p.key}
              href={`/admin/sales?period=${p.key}&year=${year}`}
              aria-current={p.key === period ? "page" : undefined}
              className={cn(
                "flex min-h-10 items-center rounded-lg px-3 text-[13px] font-semibold sm:min-h-8",
                p.key === period ? "bg-ink text-white" : "text-ink/55 hover:text-ink",
              )}
            >
              {p.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <QuickAction href="/admin/sales/phones?new=1" icon={Smartphone} title="Add phone sale" hint="Model, customer, profit" primary />
        <QuickAction href="/admin/sales/accessories?new=1" icon={Plug} title="Add accessory" hint="Cases, chargers…" />
        <QuickAction href="/admin/sales/expenses?new=1" icon={Wallet} title="Add expense" hint="Rent, ads, transport" />
        <QuickAction href="/admin/invoices/new" icon={FileText} title="New invoice" hint="Without a sale" />
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Total income" value={rs(data.income)} sub="Phones + accessories" />
        <Kpi label="Gross profit" value={rs(data.gross)} sub="Sales minus stock cost" negative={data.gross < 0} />
        <Kpi label="Expenses" value={rs(data.expenseTotal)} sub={`${data.expenseCount} ${data.expenseCount === 1 ? "entry" : "entries"}`} />
        <Kpi label="Net profit" value={rs(data.net)} sub="What you keep" highlight negative={data.net < 0} />
        <Kpi
          label="Phones sold"
          value={String(data.phoneCount)}
          sub={data.phoneCount ? `Avg profit ${rs(data.phoneProfit / data.phoneCount)}` : "—"}
        />
        <Kpi label="Accessories sold" value={String(data.accQty)} sub={`${rs(data.accProfit)} profit`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card title="Profit by month" aside={<YearSelect years={data.years} value={year} period={period} />}>
          <MonthlyChart monthly={data.monthly} year={year} />
          <ChartLegend />
        </Card>
        <Card title="Where income comes from" aside={range.label}>
          {data.income ? (
            <IncomeDonut phones={data.phoneIncome} accessories={data.accIncome} />
          ) : (
            <p className="py-8 text-center text-sm text-ink/50">No sales in this period yet.</p>
          )}
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card
          title="Recent sales"
          aside={
            <Link href="/admin/sales/phones" className="font-medium underline-offset-2 hover:underline">
              View all
            </Link>
          }
        >
          {data.recent.length ? (
            <ul className="divide-y divide-ink/6">
              {data.recent.map((r) => (
                <li key={`${r.kind}-${r.id}`} className="flex justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{r.title || (r.kind === "phone" ? "Phone" : "Accessory")}</p>
                    <p className="truncate text-xs text-ink/50">
                      {niceDate(r.date)}
                      {r.who ? ` · ${r.who}` : ""}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold tabular-nums">{rs(r.amount)}</p>
                    <Profit value={r.profit} signed className="text-xs" />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-sm text-ink/50">Your sales will show up here.</p>
          )}
        </Card>

        <Card title="Top phone models" aside={range.label}>
          {data.topModels.length ? (
            <ul className="divide-y divide-ink/6">
              {data.topModels.map((m) => (
                <li key={m.model} className="flex justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{m.model}</p>
                    <p className="text-xs text-ink/50">{m.n} sold</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <Profit value={m.profit} className="text-sm" />
                    <p className="text-xs text-ink/50">profit</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-sm text-ink/50">No phones sold in this period.</p>
          )}
        </Card>

        <Card title="Suppliers" aside="Stock bought" className="md:col-span-2 xl:col-span-1">
          {data.suppliers.length ? (
            <ul className="divide-y divide-ink/6">
              {data.suppliers.map((s) => (
                <li key={s.supplier} className="flex justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{s.supplier}</p>
                    <p className="text-xs">
                      <Profit value={s.profit} className="text-xs font-medium" /> <span className="text-ink/50">profit</span>
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold tabular-nums">{rs(s.spent)}</p>
                    <p className="text-xs text-ink/50">spent</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-sm text-ink/50">No supplier data in this period.</p>
          )}
        </Card>
      </div>

      <Card title="Expenses by category" aside={`${range.label} · ${rs(data.expenseTotal)}`}>
        {data.expenseCategories.length ? (
          <ul className="space-y-3">
            {data.expenseCategories.map((c) => (
              <li key={c.category}>
                <div className="mb-1.5 flex justify-between text-[13px]">
                  <span>{c.category}</span>
                  <b className="tabular-nums">{rs(c.total)}</b>
                </div>
                <div className="h-[7px] overflow-hidden rounded-full bg-ink/6">
                  <div className="h-full rounded-full bg-ink" style={{ width: `${((c.total / maxCategory) * 100).toFixed(1)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm text-ink/50">No expenses in this period.</p>
        )}
      </Card>
    </div>
  );
}
