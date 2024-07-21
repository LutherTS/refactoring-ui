"use client";

import Image from "next/image";

const navLinks = [
  { key: 1, label: "Dashboard" },
  { key: 2, label: "Invoices" },
  { key: 3, label: "Clients" },
  { key: 4, label: "Expenses" },
];

// Je finis d'abord le contenu du header et après j'imagine pour le milieu.

export default function ComplexFormPage() {
  return (
    <>
      <header className="flex w-screen justify-center bg-sky-900">
        <div className="flex w-full max-w-7xl items-center justify-between px-8 py-4">
          {/* empty square as placeholder for background */}
          <div className="flex size-8 overflow-clip rounded-full">
            <div className="h-8 w-4 bg-white"></div>
            <div className="h-8 w-4 bg-sky-500"></div>
          </div>
          <ul className="hidden gap-8 text-sm font-semibold md:flex">
            {navLinks.map((navLink) => (
              <li key={navLink.key} className="cursor-pointer text-sky-50">
                {navLink.label}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => {
                console.log("New invoice created.");
              }}
              className="flex items-center gap-x-1 rounded bg-white px-4 py-2 text-sm font-medium text-sky-900"
            >
              <PlusIconMicro className="size-5" />
              <span>New Invoice</span>
            </button>
            <div className="relative size-8 cursor-pointer overflow-clip rounded-full bg-neutral-500">
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
    </>
  );
}

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
