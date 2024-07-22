"use client";

import { differenceInDays } from "date-fns";

import Image from "next/image";

console.log(differenceInDays(new Date("08/17/18"), new Date("08/17/18")));

/* Utilities */

const numberFormatFromCents = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "never",
  }).format(number / 100);
};

const numberFormatFromCentsWithoutCents = (number: number) =>
  numberFormatFromCents(number).slice(0, -3);

const dueDateToString = (differenceInDays: number) => {
  if (differenceInDays === -1) return "Due tomorrow";
  if (differenceInDays === 1) return "Due yesterday";

  let string: string;
  let days = Math.abs(differenceInDays);

  differenceInDays < 0
    ? (string = `Due in ${days} days`)
    : differenceInDays > 0
      ? (string = `Due ${days} days ago`)
      : (string = "Due today");

  return string;
}; // https://date-fns.org/v3.6.0/docs/differenceInDays

export default function ComplexFormPage() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

/* Header */

// Header Data

const navLinks = [
  { key: 1, label: "Dashboard" },
  { key: 2, label: "Invoices" },
  { key: 3, label: "Clients" },
  { key: 4, label: "Expenses" },
];

// Header Component

function Header() {
  return (
    <header className="flex w-screen justify-center bg-white">
      <div className="relative flex w-full max-w-7xl items-center justify-between px-8 py-4">
        <div className="flex size-10 overflow-clip rounded-full lg:z-10">
          <div className="w-5 bg-sky-500"></div>
          <div className="w-5 bg-sky-900"></div>
        </div>
        {/* Medium screens */}
        <ul className="hidden gap-8 text-sm font-semibold md:flex lg:hidden">
          {navLinks.map((navLink) => (
            <li key={navLink.key} className="cursor-pointer text-sky-900">
              {navLink.label}
            </li>
          ))}
        </ul>
        {/* Large screens */}
        <div className="absolute inset-x-0 hidden justify-center lg:flex">
          <ul className="flex gap-8 text-sm font-semibold">
            {navLinks.map((navLink) => (
              <li key={navLink.key} className="cursor-pointer text-sky-900">
                {navLink.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-6 lg:z-10">
          <button
            type="button"
            onClick={() => {
              console.log("Creating new invoice.");
            }}
            className="flex items-center gap-x-1 rounded-full bg-sky-900 px-4 py-2 text-sm font-semibold text-white"
          >
            <PlusIconMicro className="size-5" />
            <span>New Invoice</span>
          </button>
          <div className="relative size-10 cursor-pointer overflow-clip rounded-full bg-neutral-500">
            <Image
              src={"/danny-jackson.jpg"}
              alt="Danny Jackson"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// Header Supporting Components

function PlusIconMicro({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className || "size-4"}
    >
      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </svg>
  );
}

/* Main */

// Main Data

// We're going with the likely false assumption (likely false based on the incrementing id numbers) that the invoices below are all of the invoices registered in the database.
const invoicesInput = [
  {
    id: 45,
    client: "Maria Schmidt",
    issuedDate: "08/10/18",
    dueDate: "08/17/18",
    amountInCents: 340000,
    currency: "USD",
    isPaid: false,
  },
  {
    id: 44,
    client: "Diane White",
    issuedDate: "08/07/18",
    dueDate: "08/14/18",
    amountInCents: 50000,
    currency: "USD",
    isPaid: false,
  },
  {
    id: 43,
    client: "Stephanie Kelley",
    issuedDate: "07/23/18",
    dueDate: "07/30/18",
    amountInCents: 520000,
    currency: "USD",
    isPaid: true,
  },
  {
    id: 42,
    client: "Mildred Guerrero",
    issuedDate: "07/13/18",
    dueDate: "07/20/18",
    amountInCents: 240000,
    currency: "USD",
    isPaid: true,
  },
  {
    id: 41,
    client: "Larry Diaz",
    issuedDate: "07/09/18",
    dueDate: "07/16/18",
    amountInCents: 100000,
    currency: "USD",
    isPaid: true,
  },
  {
    id: 40,
    client: "Arthur Banks",
    issuedDate: "07/06/18",
    dueDate: "07/13/18",
    amountInCents: 100000,
    currency: "USD",
    isPaid: true,
  },
];

// Simulating a today to logically infer pending and overdue invoices
const today = "08/15/18";

const todayToString = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
}).format(new Date(today));

type Invoice = {
  idToString: string;
  amountWithoutCents: string;
  status: "paid" | "overdue" | "pending";
  differenceInDays: number;
  id: number;
  client: string;
  issuedDate: string;
  dueDate: string;
  amountInCents: number;
  currency: string;
  isPaid: boolean;
};

const invoicesOutput: Invoice[] = invoicesInput.map((invoiceInput) => {
  return {
    ...invoiceInput,
    idToString: invoiceInput.id.toString().padStart(6, "0"),
    amountWithoutCents: numberFormatFromCentsWithoutCents(
      invoiceInput.amountInCents,
    ),
    status: invoiceInput.isPaid
      ? "paid"
      : Date.parse(today) - Date.parse(invoiceInput.dueDate) > 86400000 - 1
        ? "overdue"
        : "pending",
    differenceInDays: differenceInDays(
      new Date(today),
      new Date(invoiceInput.dueDate),
    ),
  };
});
invoicesOutput.sort((a, b) => b.id - a.id);

let allOverdueInvoices = invoicesOutput.filter((e) => e.status === "overdue");
let totalOverdueAmountInCents = allOverdueInvoices.reduce(
  (acc, curr) => acc + curr.amountInCents,
  0,
);

let allPendingInvoices = invoicesOutput.filter((e) => e.status === "pending");
let totalPendingAmountInCents = allPendingInvoices.reduce(
  (acc, curr) => acc + curr.amountInCents,
  0,
);

let allOverdueAndPendingInvoices =
  allOverdueInvoices.concat(allPendingInvoices);
let totalOutstandingAmountInCents =
  totalOverdueAmountInCents + totalPendingAmountInCents;

const topDataInput = [
  {
    key: 1,
    label: "overdue", // previously "Overdue"
    amountInCents: totalOverdueAmountInCents,
  },
  {
    key: 2,
    label: "pending", // previously "In Draft"
    amountInCents: totalPendingAmountInCents,
  },
  {
    key: 3,
    label: "outstanding",
    amountInCents: totalOutstandingAmountInCents,
  },
];

type TopDatum = {
  amountWithCents: string;
  key: number;
  label: string;
  amountInCents: number;
};

const topDataOutput: TopDatum[] = topDataInput.map((topDatumInput) => {
  return {
    ...topDatumInput,
    amountWithCents: numberFormatFromCents(topDatumInput.amountInCents),
  };
});

const invoicesData: {
  [key: string]: Invoice[];
} = {
  overdue: allOverdueInvoices,
  pending: allPendingInvoices,
  outstanding: allOverdueAndPendingInvoices,
};

const invoiceTableHeaders = [
  { key: 1, label: "Invoice #" },
  { key: 2, label: "Client" },
  { key: 3, label: "Issued Date" },
  { key: 4, label: "Due Date" },
  { key: 5, label: "Amount" },
  { key: 6, label: "Currency" },
  { key: 7, label: "Status" },
  { key: 8, label: "" },
];

// Main Component

function Main() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center bg-white pb-12 md:pb-24">
      <PageTitle title="Dashboard" />
      <Overview />
      <Today />
      <RecentInvoices />
      <AllInvoices />
    </main>
  );
}

// Main Classname Variables

const invoiceTableRowClasses =
  "col-span-8 grid grid-cols-subgrid gap-4 lg:gap-8 px-4";

// Main Supporting Components

function PageTitle({ title }: { title: string }) {
  return <h1 className="sr-only">{title}</h1>;
}

function Section({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex w-full flex-col items-center py-4 ${className}`}>
      <div className="w-full max-w-7xl px-8">
        <section className="flex flex-col gap-4">
          {title && <h2 className="text-xl">{title}</h2>}
          {children}
        </section>
      </div>
    </div>
  );
}

function Today() {
  return (
    <Section className="pt-8 font-serif">
      Today is fictitiously {todayToString}.
    </Section>
  );
}

function Overview() {
  return (
    <Section className="bg-gradient-to-br from-sky-700 to-sky-900">
      <div className="grid grid-cols-3 gap-4 lg:gap-8">
        {topDataOutput.map((topDatumOutput) => (
          <OverviewCard
            topDatumOutput={topDatumOutput}
            key={topDatumOutput.key}
          />
        ))}
      </div>
    </Section>
  );
}

function OverviewCard({ topDatumOutput }: { topDatumOutput: TopDatum }) {
  return (
    <div className="flex flex-col gap-4 p-4 text-white">
      <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
        Total {topDatumOutput.label}
      </p>
      <p className="text-3xl tracking-wide">{topDatumOutput.amountWithCents}</p>
      <button
        type="button"
        onClick={() => {
          console.log(
            `Viewing all ${topDatumOutput.label} invoices.`,
            invoicesData[topDatumOutput.label],
          );
        }}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-black/20 py-1 pl-3 pr-2 text-sm font-semibold text-sky-100"
      >
        <p>View all</p>
        <div className="flex size-4 items-center justify-center rounded-full bg-black/40">
          <ChevronRightMicro className="size-[14px] text-white" />
        </div>
      </button>
    </div>
  );
}

function ChevronRightMicro({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className || "size-4"}
    >
      <path
        fillRule="evenodd"
        d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function RecentInvoices() {
  return (
    <Section title="Recent Invoices">
      <div className="grid grid-cols-3 gap-4 bg-white lg:gap-8">
        {invoicesOutput.slice(0, 3).map((invoiceOutput) => (
          <RecentInvoicesCard
            invoiceOutput={invoiceOutput}
            key={invoiceOutput.id}
          />
        ))}
      </div>
    </Section>
  );
}

function RecentInvoicesCard({ invoiceOutput }: { invoiceOutput: Invoice }) {
  const className = {
    pending: "bg-yellow-500",
    overdue: "bg-red-500",
    paid: "bg-green-500",
  };

  return (
    <div className="flex flex-col rounded-md border pt-4">
      <div className="grid grid-cols-2 px-4 pb-4">
        <div className="flex flex-col">
          <div className="space-y-2">
            <p className="font-semibold capitalize">{invoiceOutput.client}</p>
            <p className="text-2xl font-semibold capitalize tracking-wide">
              {invoiceOutput.amountWithoutCents}
            </p>
            <p className="text-sm text-neutral-500">
              {dueDateToString(invoiceOutput.differenceInDays)}
            </p>
          </div>
        </div>
        <div className="flex">
          <p
            className={`-mt-0.5 ml-auto h-fit w-fit rounded-full bg-opacity-20 px-2.5 py-0.5 text-sm font-semibold capitalize text-black/80 ${className[invoiceOutput.status]}`}
          >
            {invoiceOutput.status}
          </p>
        </div>
      </div>
      <div className="mt-auto flex justify-center bg-neutral-200 p-3 capitalize">
        <button
          type="button"
          onClick={() => {
            console.log(
              `Viewing ${invoiceOutput.client}'s invoice.`,
              invoiceOutput,
            );
          }}
          className="flex w-fit items-center gap-2 text-sm text-sky-900"
        >
          <span>View Invoice</span>
          <div className="relative h-full">
            <ChevronRightMicro className="absolute top-[3px] size-4" />
          </div>
        </button>
      </div>
    </div>
  );
}

function AllInvoices() {
  return (
    <Section title="All Invoices">
      <div className="grid grid-cols-[repeat(8)] gap-x-4 divide-y rounded-md border bg-white">
        <InvoiceTableHead />
        {invoicesOutput.map((invoiceOutput) => (
          <InvoiceTableRow
            key={invoiceOutput.id}
            invoiceOutput={invoiceOutput}
          />
        ))}
      </div>
    </Section>
  );
}

function InvoiceTableHead() {
  const startIndices = new Set([0, 1, 5, 6, 7]);
  const endIndices = new Set([2, 3, 4]);

  return (
    <div className={`${invoiceTableRowClasses} border-b-2 font-semibold`}>
      {invoiceTableHeaders.map((invoiceTableHeader, index) => {
        let justify: "start" | "center" | "end" = "start";

        if (startIndices.has(index)) justify = "start";
        if (endIndices.has(index)) justify = "end";

        return (
          <InvoiceTableCell justify={justify} key={invoiceTableHeader.key}>
            {invoiceTableHeader.label}
          </InvoiceTableCell>
        );
      })}
    </div>
  );
}

function InvoiceTableRow({ invoiceOutput }: { invoiceOutput: Invoice }) {
  return (
    <div className={`${invoiceTableRowClasses}`}>
      <InvoiceTableCell justify="start">
        {invoiceOutput.idToString}
      </InvoiceTableCell>
      <InvoiceTableCell justify="start">
        {invoiceOutput.client}
      </InvoiceTableCell>
      <InvoiceTableCell justify="end">
        {invoiceOutput.issuedDate}
      </InvoiceTableCell>
      <InvoiceTableCell justify="end">{invoiceOutput.dueDate}</InvoiceTableCell>
      <InvoiceTableCell justify="end">
        {invoiceOutput.amountWithoutCents}
      </InvoiceTableCell>
      <InvoiceTableCell justify="start">
        {invoiceOutput.currency}
      </InvoiceTableCell>
      <InvoiceTableCell justify="start">
        {invoiceOutput.status}
      </InvoiceTableCell>
      <InvoiceTableCell justify="start">
        <button
          type="button"
          onClick={() => {
            console.log(
              `Viewing ${invoiceOutput.client}'s invoice.`,
              invoiceOutput,
            );
          }}
          className="w-fit text-sky-900"
        >
          View
        </button>
      </InvoiceTableCell>
    </div>
  );
}

function InvoiceTableCell({
  justify,
  children,
}: {
  justify: "start" | "center" | "end";
  children: React.ReactNode;
}) {
  const className = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };

  return (
    <div className={`flex justify-start py-4 ${className[justify]}`}>
      <p className="text-center capitalize">{children}</p>
    </div>
  );
}

/* Notes
grid-cols-8 is equidistant, grid-cols-[repeat(8)] adapted to the contents
*/