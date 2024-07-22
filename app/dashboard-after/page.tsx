"use client";

import Image from "next/image";

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
    <header className="flex w-screen justify-center bg-sky-900">
      <div className="relative flex w-full max-w-7xl items-center justify-between px-8 py-4">
        <div className="flex size-10 overflow-clip rounded-full lg:z-10">
          <div className="w-5 bg-white"></div>
          <div className="w-5 bg-sky-500"></div>
        </div>
        {/* Medium screens */}
        <ul className="hidden gap-8 text-sm font-semibold md:flex lg:hidden">
          {navLinks.map((navLink) => (
            <li key={navLink.key} className="cursor-pointer text-sky-50">
              {navLink.label}
            </li>
          ))}
        </ul>
        {/* Large screens */}
        <div className="absolute inset-x-0 hidden justify-center lg:flex">
          <ul className="flex gap-8 text-sm font-semibold">
            {navLinks.map((navLink) => (
              <li key={navLink.key} className="cursor-pointer text-sky-50">
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
            className="flex items-center gap-x-1 rounded bg-white px-4 py-2 text-sm font-semibold text-sky-900"
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
const today = "08/16/18";

const todayToString = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
}).format(new Date(today));

type Invoice = {
  idToString: string;
  amountWithoutCents: string;
  status: "paid" | "overdue" | "pending";
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
    <main className="flex w-screen flex-col items-center bg-white">
      <div className="min-h-screen w-full max-w-7xl px-8 pb-12 pt-8 md:pb-24">
        <PageTitle title="Dashboard" />
        <div className="space-y-8">
          <p>Today is fictitiously {todayToString}.</p>
          <Overview />
          <RecentInvoices />
          <AllInvoices />
        </div>
      </div>
    </main>
  );
}

// Main Classname Variables

const invoiceTableRowClasses =
  "col-span-8 grid grid-cols-subgrid gap-2 lg:gap-4";

// Main Supporting Components

function PageTitle({ title }: { title: string }) {
  return <h1 className="sr-only">{title}</h1>;
}

function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      {title && <h2 className="text-xl">{title}</h2>}
      {children}
    </section>
  );
}

function Overview() {
  return (
    <Section>
      <div className="grid grid-cols-3 gap-4">
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
    <div className="flex flex-col gap-2 rounded-md border-2 bg-white p-4">
      <p className="text-xl font-medium capitalize">
        Total {topDatumOutput.label}
      </p>
      <p>{topDatumOutput.amountWithCents}</p>
      <button
        type="button"
        onClick={() => {
          console.log(
            `Viewing all ${topDatumOutput.label} invoices.`,
            invoicesData[topDatumOutput.label],
          );
        }}
        className="w-fit rounded bg-sky-900 px-4 py-2 text-sky-50"
      >
        View all
      </button>
    </div>
  );
}

function RecentInvoices() {
  return (
    <Section title="Recent Invoices">
      <div className="grid grid-cols-3 gap-4 bg-white">
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
  return (
    <div className="flex flex-col divide-y-2 rounded-md border-2">
      <p className="p-4 capitalize">
        <span className="font-semibold">Client:</span> {invoiceOutput.client}
      </p>
      <p className="p-4 capitalize">
        <span className="font-semibold">Amount:</span>{" "}
        {invoiceOutput.amountWithoutCents}
      </p>
      <p className="p-4 capitalize">
        <span className="font-semibold">Due Date:</span> {invoiceOutput.dueDate}
      </p>
      <p className="p-4 capitalize">
        <span className="font-semibold">Status:</span> {invoiceOutput.status}
      </p>
      <p className="p-4 capitalize">
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
          View Invoice
        </button>
      </p>
    </div>
  );
}

function AllInvoices() {
  return (
    <Section title="All Invoices">
      <div className="grid grid-cols-[repeat(8)] gap-x-4 divide-y border-y bg-white">
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
  return (
    <div className={`${invoiceTableRowClasses} border-b-2 font-semibold`}>
      {invoiceTableHeaders.map((invoiceTableHeader) => (
        <InvoiceTableCell key={invoiceTableHeader.key}>
          {invoiceTableHeader.label}
        </InvoiceTableCell>
      ))}
    </div>
  );
}

function InvoiceTableRow({ invoiceOutput }: { invoiceOutput: Invoice }) {
  return (
    <div className={`${invoiceTableRowClasses}`}>
      <InvoiceTableCell>{invoiceOutput.idToString}</InvoiceTableCell>
      <InvoiceTableCell>{invoiceOutput.client}</InvoiceTableCell>
      <InvoiceTableCell>{invoiceOutput.issuedDate}</InvoiceTableCell>
      <InvoiceTableCell>{invoiceOutput.dueDate}</InvoiceTableCell>
      <InvoiceTableCell>{invoiceOutput.amountWithoutCents}</InvoiceTableCell>
      <InvoiceTableCell>{invoiceOutput.currency}</InvoiceTableCell>
      <InvoiceTableCell>{invoiceOutput.status}</InvoiceTableCell>
      <InvoiceTableCell>
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

function InvoiceTableCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center py-4">
      <p className="text-center capitalize">{children}</p>
    </div>
  );
}

/* Notes
grid-cols-8 is equidistant, grid-cols-[repeat(8)] adapted to the contents
*/
