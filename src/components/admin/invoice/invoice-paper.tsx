"use client";

import { useEffect, useRef, useState } from "react";
import { invoiceTotals } from "@/lib/utils/invoice";
import { dmy, lkr } from "@/lib/utils/sales-format";
import type { InvoiceItem } from "@/types/database";
import styles from "@/components/admin/invoice/invoice-paper.module.css";

/** What the paper renders — the same shape for the live preview and the saved invoice. */
export interface PaperData {
  invoiceNo: string;
  invoiceDate: string;
  dueDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  items: InvoiceItem[];
  discount: number;
  taxPercent: number;
  paymentMethod: string;
  notes: string;
}

export interface PaperBusiness {
  businessName: string;
  address: string;
  phone: string;
  email: string;
  footer: string;
  bankDetails: string;
}

const PAPER_WIDTH = 794;
const PAPER_HEIGHT = 1123;

/** The A4 invoice itself. Plain `<img>` tags on purpose: they print reliably. */
export function InvoicePaper({ data, business }: { data: PaperData; business: PaperBusiness }) {
  const totals = invoiceTotals(data.items, data.discount, data.taxPercent);
  const contact = [business.phone, business.email].filter(Boolean).join(" • ");
  const customerContact = [data.customerPhone, data.customerEmail].filter(Boolean).join(" • ");
  const paymentInfo = business.bankDetails || data.paymentMethod;
  const rows = data.items.filter((i) => i.desc || i.unit_price);

  return (
    <section className={styles.paper}>
      <div className={styles.head}>
        <div className={styles.company}>
          <div className={styles.lockup}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.icon} src="/brand/icon-new.png" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.wordmark} src="/brand/logo-redesigned.png" alt={business.businessName} />
          </div>
          <div className={styles.addr}>
            <p>{business.address}</p>
            <p>{contact}</p>
          </div>
        </div>
        <div className={styles.title}>
          <h1>INVOICE</h1>
          <div className={styles.no}>{data.invoiceNo}</div>
          <div className={styles.meta}>Issued: {dmy(data.invoiceDate)}</div>
          <div className={styles.meta}>Due: {dmy(data.dueDate)}</div>
        </div>
      </div>

      <div className={styles.bill}>
        <div>
          <div className={styles.blockTitle}>Bill to</div>
          <p className={styles.name}>{data.customerName || "Customer Name"}</p>
          {data.customerAddress && <p>{data.customerAddress}</p>}
          {customerContact && <p>{customerContact}</p>}
        </div>
        <div>
          <div className={styles.blockTitle}>Payment</div>
          <p>{data.paymentMethod}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.empty}>
                No items added
              </td>
            </tr>
          ) : (
            rows.map((item, i) => (
              <tr key={i}>
                <td>{item.desc || "Item"}</td>
                <td>{item.qty}</td>
                <td>{lkr(item.unit_price)}</td>
                <td>{lkr(item.qty * item.unit_price)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className={styles.totals}>
        <div className={styles.trow}>
          <span>Subtotal</span>
          <strong>{lkr(totals.sub)}</strong>
        </div>
        <div className={styles.trow}>
          <span>Discount</span>
          <strong>{totals.dis ? "− " + lkr(totals.dis) : lkr(0)}</strong>
        </div>
        <div className={styles.trow}>
          <span>Tax / VAT</span>
          <strong>{lkr(totals.tax)}</strong>
        </div>
        <div className={`${styles.trow} ${styles.grand}`}>
          <span>Total</span>
          <strong>{lkr(totals.total)}</strong>
        </div>
      </div>

      <div className={styles.notes}>
        <div>
          <h4>Notes / Terms</h4>
          <p>{data.notes}</p>
        </div>
        <div>
          <h4>Payment information</h4>
          <p>{paymentInfo}</p>
        </div>
      </div>

      <div className={styles.grow} />
      <div className={styles.footer}>{business.footer}</div>
    </section>
  );
}

/**
 * Scales the 794px-wide paper down to fit its container (phones, the editor's
 * preview pane). In print the scale is reset so it comes out at true A4.
 */
export function ScaledPaper({ children, maxScale = 1 }: { children: React.ReactNode; maxScale?: number }) {
  const host = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(PAPER_HEIGHT);

  useEffect(() => {
    const hostEl = host.current;
    if (!hostEl) return;
    const measure = () => {
      setScale(Math.min(maxScale, hostEl.clientWidth / PAPER_WIDTH));
      setHeight(inner.current?.offsetHeight ?? PAPER_HEIGHT);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(hostEl);
    if (inner.current) observer.observe(inner.current);
    return () => observer.disconnect();
  }, [maxScale]);

  return (
    <div ref={host} className="w-full">
      <div className={styles.scaleBox} style={{ width: PAPER_WIDTH * scale, height: height * scale }}>
        <div ref={inner} className={styles.scaleInner} style={{ width: PAPER_WIDTH, transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
