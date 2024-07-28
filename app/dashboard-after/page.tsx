"use client";

import { differenceInDays, format } from "date-fns";

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

const dueDateToString = (differenceInDays: number) => {
  if (differenceInDays === -1)
    return {
      recentInvoicesString: "Due tomorrow",
      allInvoicesString: "Tomorrow",
    };
  if (differenceInDays === 1)
    return {
      recentInvoicesString: "Due yesterday",
      allInvoicesString: "Yesterday",
    };

  let recentInvoicesString: string;
  let allInvoicesString: string;
  let days = Math.abs(differenceInDays);

  differenceInDays < 0
    ? ((recentInvoicesString = `Due in ${days} days`),
      (allInvoicesString = `In ${days} days`))
    : differenceInDays > 0
      ? ((recentInvoicesString = `Due ${days} days ago`),
        (allInvoicesString = `${days} days ago`))
      : ((recentInvoicesString = "Due today"), (allInvoicesString = "Today"));

  differenceInDays < -28
    ? ((recentInvoicesString = `Due in over than a month`),
      (allInvoicesString = `In over a month`))
    : differenceInDays > 28
      ? ((recentInvoicesString = `Due over a month ago`),
        (allInvoicesString = `Over a month ago`))
      : null;

  return { recentInvoicesString, allInvoicesString };
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
            className={`flex items-center gap-x-1 rounded-full bg-sky-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700 ${focusVisible}`}
          >
            <PlusIconMicro className="-ml-1.5 size-5" />
            <span>New Invoice</span>
          </button>
          <div className="relative size-10 cursor-pointer overflow-clip rounded-full bg-neutral-500 text-neutral-500">
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

// Switching all of that into a JSON or JSON-like object

let dataInput: {
  today: string;
  todayToString: string;
  invoicesInput: {
    [key: number]: {
      id: number;
      client: string;
      issuedDate: string;
      dueDate: string;
      amountInCents: number;
      currency: string;
      isPaid: boolean;
    };
  };
} = {
  today,
  todayToString,
  invoicesInput,
};

console.log(dataInput);

type Status = "paid" | "overdue" | "pending";

type Invoice = {
  idToString: string;
  amountWithoutCents: string;
  status: Status;
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
  { key: 1, label: "" },
  { key: 2, label: "Client" },
  { key: 3, label: "Issued Date" },
  { key: 4, label: "Due Date" },
  { key: 5, label: "Amount" },
  { key: 6, label: "Status" },
  { key: 7, label: "" },
];

// Main Component

function Main() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center pb-12 text-[hsl(200,25%,25%)] md:pb-24">
      <PageTitle title="Dashboard" />
      <Overview />
      <Today />
      <RecentInvoices />
      <AllInvoices />
    </main>
  );
}

// Main Classname Variables

// gap-2 md:gap-4 lg:gap-8

const invoiceTableRowClasses =
  "col-span-3 md:col-span-7 grid grid-cols-subgrid px-4";

const statusBadgeClassNames = {
  pending: "bg-yellow-500",
  overdue: "bg-red-500",
  paid: "bg-green-500",
};

const focusVisible =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

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
    <div
      // just so there isn't an empty space in some class names in the DOM
      className={`flex w-full flex-col items-center py-4${className ? ` ${className}` : ""}`}
    >
      <div className="w-full max-w-5xl px-8">
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
      <div className="grid gap-4 md:grid-cols-3 lg:gap-8">
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
    <div className="flex flex-col gap-4 px-0 py-4 text-white md:p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
        Total {topDatumOutput.label}
      </p>
      <div className="flex items-center justify-between gap-4 md:flex-col md:items-start">
        <p className="text-3xl tracking-wide">
          {topDatumOutput.amountWithCents}
        </p>
        <button
          type="button"
          onClick={() => {
            console.log(
              `Viewing all ${topDatumOutput.label} invoices.`,
              invoicesData[topDatumOutput.label],
            );
          }}
          className={`inline-flex w-fit items-center gap-2 rounded-full border border-transparent bg-black/20 py-0.5 pl-3 pr-2 text-sm font-semibold text-sky-100 transition-colors hover:border-black/20 hover:bg-sky-800 md:py-1 ${focusVisible} active:translate-y-[1px]`}
        >
          <p>View all</p>
          <div className="flex size-4 items-center justify-center rounded-full bg-black/40">
            <ChevronRightMicro className="size-[14px] text-white" />
          </div>
        </button>
      </div>
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
      <div className="grid gap-4 md:grid-cols-3 lg:gap-8">
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
    <button
      className={`flex flex-col overflow-clip rounded-md border bg-white pt-4 md:border-0 md:shadow-md ${focusVisible} group active:translate-y-[1px]`}
      type="button"
      onClick={() => {
        console.log(
          `Viewing ${invoiceOutput.client}'s invoice.`,
          invoiceOutput,
        );
      }}
    >
      <div className="grid grid-cols-2 px-4 pb-4">
        <div className="flex flex-col items-start gap-y-2 text-left">
          <p className="font-semibold capitalize">{invoiceOutput.client}</p>
          <p className="text-2xl font-semibold capitalize tracking-wide text-sky-900">
            {invoiceOutput.amountWithoutCents}
          </p>
          <p className="text-sm text-neutral-500">
            {
              dueDateToString(invoiceOutput.differenceInDays)
                .recentInvoicesString
            }
          </p>
        </div>
        <div className="flex">
          <StatusBadge status={invoiceOutput.status} />
        </div>
      </div>
      <div className="mt-auto flex justify-center bg-sky-50 p-3 capitalize transition-colors hover:!bg-sky-800 group-hover:bg-sky-700 md:group-hover:bg-sky-900">
        <div className="flex w-fit items-center gap-2 text-sm text-sky-900 transition-colors group-hover:text-sky-50">
          <span>View Invoice</span>
          <div className="relative h-full">
            <ChevronRightMicro className="absolute top-[3px] size-4" />
          </div>
        </div>
      </div>
    </button>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <p
      className={`-mt-0.5 ml-auto h-fit w-fit rounded-full bg-opacity-20 px-2.5 py-0.5 text-sm font-semibold capitalize text-black/80 ${statusBadgeClassNames[status]}`}
    >
      {status}
    </p>
  );
}

function AllInvoices() {
  return (
    <Section title="All Invoices">
      <div className="max-w-[100vw] overflow-x-scroll rounded-md md:shadow-md">
        <InvoiceTable>
          <InvoiceTableHead />
          {invoicesOutput.map((invoiceOutput, index) => {
            return (
              <InvoiceTableRow
                key={invoiceOutput.id}
                invoiceOutput={invoiceOutput}
                odd={index % 2 === 1}
              />
            );
          })}
        </InvoiceTable>
      </div>
    </Section>
  );
}

// removing min-w-[768px] md:min-w-0
// for grid switching from -y-scroll to minimal

function InvoiceTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(3)] gap-x-2 overflow-clip rounded-md border bg-white md:grid-cols-[repeat(7)] md:gap-x-4 md:rounded-none md:border-0 lg:gap-x-8">
      {children}
    </div>
  );
}

function InvoiceTableHead() {
  const startIndices = new Set([1, 2, 3, 5]);
  const centerIndices = new Set([0, 6]);
  const endIndices = new Set([4]);

  return (
    <div
      className={`${invoiceTableRowClasses} bg-neutral-100 text-sm font-semibold uppercase tracking-wider text-neutral-600`}
    >
      {invoiceTableHeaders.map((invoiceTableHeader, index) => {
        let justify: "start" | "center" | "end" = "start";

        if (startIndices.has(index)) justify = "start";
        if (centerIndices.has(index)) justify = "center";
        if (endIndices.has(index)) justify = "end";

        return (
          <InvoiceTableCell
            justify={justify}
            key={invoiceTableHeader.key}
            isHeader
            index={index}
          >
            {invoiceTableHeader.label}
          </InvoiceTableCell>
        );
      })}
    </div>
  );
}

function InvoiceTableRow({
  invoiceOutput,
  odd,
}: {
  invoiceOutput: Invoice;
  odd: boolean;
}) {
  const imageUrl = `/${invoiceOutput.client.toLowerCase().replaceAll(" ", "-")}.jpg`;

  return (
    <div
      className={`${invoiceTableRowClasses} ${odd ? "bg-neutral-100" : "bg-transparent"}`}
    >
      <InvoiceTableCell justify="center" index={0}>
        <div className="relative size-10 overflow-clip rounded-full bg-neutral-500 text-neutral-500">
          <Image
            src={imageUrl}
            alt={invoiceOutput.client}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </InvoiceTableCell>
      <InvoiceTableCell justify="start" index={1}>
        <div className="flex flex-col items-start">
          <span className="w-fit">{invoiceOutput.client}</span>
          <span className="w-fit text-sm text-neutral-500">
            {invoiceOutput.idToString}
          </span>
        </div>
      </InvoiceTableCell>
      <InvoiceTableCell justify="start" index={2}>
        {format(new Date(invoiceOutput.issuedDate), "LLL. d, yyyy")}
      </InvoiceTableCell>
      <InvoiceTableCell justify="start" index={3}>
        {dueDateToString(invoiceOutput.differenceInDays).allInvoicesString}
      </InvoiceTableCell>
      <InvoiceTableCell justify="end" index={4}>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            {invoiceOutput.status === "pending" && (
              <div className="size-3 rounded-full bg-yellow-500/50 md:hidden"></div>
            )}
            {invoiceOutput.status === "overdue" && (
              <div className="size-3 rounded-full bg-red-500/50 md:hidden"></div>
            )}
            <span className="w-fit">{invoiceOutput.amountWithoutCents}</span>
          </div>
          <span className="w-fit text-sm text-neutral-500">
            {invoiceOutput.currency}
          </span>
        </div>
      </InvoiceTableCell>
      <InvoiceTableCell justify="start" index={5}>
        <StatusBadge status={invoiceOutput.status} />
      </InvoiceTableCell>
      <InvoiceTableCell justify="center" index={6}>
        <button
          type="button"
          onClick={() => {
            console.log(
              `Viewing ${invoiceOutput.client}'s invoice.`,
              invoiceOutput,
            );
          }}
          className={`w-fit rounded-full px-1 text-sky-900 transition-colors hover:text-sky-700 ${focusVisible} ${odd ? "hover:text-sky-600" : "hover:text-cyan-600"}`}
        >
          {/* Mobile */}
          <span className="hidden md:inline">View</span>
          {/* Desktop */}
          <ChevronRightMicro className="size-6 text-neutral-500 md:hidden" />
        </button>
      </InvoiceTableCell>
    </div>
  );
}

function InvoiceTableCell({
  justify,
  isHeader,
  index,
  children,
}: {
  justify: "start" | "center" | "end";
  isHeader?: boolean;
  index: number;
  children: React.ReactNode;
}) {
  const justifyClassName = {
    start: "justify-start",
    center: "justify-end md:justify-center",
    end: "justify-end",
  };

  const textClassName = {
    start: "text-left",
    center: "text-center",
    end: "text-right",
  };

  const mobileIndices = new Set([1, 4, 6]);

  return (
    <div
      className={`${mobileIndices.has(index) ? "flex" : "hidden md:flex"} ${justifyClassName[justify]} ${isHeader ? "py-4" : "py-8"}`}
    >
      <div className={`flex items-center ${textClassName[justify]}`}>
        {children}
      </div>
    </div>
  );
}

/* Notes
grid-cols-8 is equidistant, grid-cols-[repeat(8)] adapted to the contents
*/
