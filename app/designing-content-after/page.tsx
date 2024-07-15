"use client";

import Image from "next/image";

export default function DesigningContentAfterPage() {
  return (
    <>
      <div className="h-4 w-full bg-teal-50"></div>
      <main className="flex items-center justify-center bg-gradient-to-b from-white via-white via-50% to-teal-50">
        <div className="max-w-7xl px-12 pb-32 pt-16">
          <div className="max-w-prose space-y-8">
            <div className="flex gap-2">
              <CubeIcon className="size-6 text-teal-500" />
              <span className="font-extrabold">FutureWeb</span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-[17ch] text-4xl font-light leading-snug">
                Let’s explore the future of the web together.
              </h1>
              <div className="flex flex-col gap-1 text-base font-semibold md:flex-row md:gap-2 md:text-xl">
                <span>June 17 and 18, 2019</span>
                <span className="hidden md:inline">•</span>
                <span>San Jose MacEnery Convention Center</span>
              </div>
            </div>
            <div className="space-y-4 hyphens-auto text-justify text-base leading-relaxed text-teal-950/65">
              <p>
                FutureWeb is a conference that explores some of the new ideas
                tools, and technologies that are happening in web design. This
                two-day event features amazing workshops and sessions led by the
                best in the business covering topics including HTML/CSS,
                Javascript, UI/UX Design, and much, much more.
              </p>
              <p>
                Our speakers are handpicked to bring you a diverse range of
                expertise. Sessions run back-to-back on a single track which
                means you won't miss a thing. And if that's too much action for
                one day, you'll be happy to know that every session is recorded
                for attendees so you can watch them again later.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl">Who is this conference for?</h2>
              <ul className="space-y-4 hyphens-auto text-justify text-base text-teal-950/65">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="size-6 text-teal-500" />
                  Designers who want to learn about the latest tools and
                  techniques
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="size-6 text-teal-500" />
                  Frontend developers who want to learn about the latest
                  technologies
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="size-6 text-teal-500" />
                  Anyone interested in web design and development
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="relative mt-4 font-serif italic">
                <span className="absolute -left-8 -top-5 text-9xl text-teal-500/15">
                  “
                </span>
                <blockquote className="hyphens-auto text-justify text-xl leading-relaxed text-teal-950/95">
                  This conference offers valuable insights from accomplished and
                  rising stars in the web design industry. If you're looking for
                  creative challenges, in-depth workshops, energizing social
                  events, and networking opportunities, this conference might be
                  for you.
                </blockquote>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative size-16 overflow-clip rounded-full bg-neutral-500">
                  <Image
                    src={"/molly-sanders.jpg"}
                    alt="Molly Sanders"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // default for warning handling
                  />
                </div>
                <p className="flex flex-col text-base text-teal-950/65">
                  <span className="font-semibold text-teal-500">
                    Molly Sanders
                  </span>{" "}
                  <span>Award-winning Frontend Developer</span>
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-base font-bold leading-relaxed">
                Sign up to get updates on speakers and when early birds tickets
                are available.
              </p>
              <form
                className="flex flex-col gap-y-4 md:flex-row md:justify-between md:overflow-clip md:rounded md:shadow-md"
                action={(formData: FormData) => {
                  console.log({ signup: formData.get("signup") });
                }}
              >
                <label htmlFor="sign-up" className="sr-only">
                  Sign up
                </label>
                <input
                  type="text"
                  name="signup"
                  id="sign-up"
                  // accepting focus-visible as it is right now
                  className="grow rounded border-0 px-4 py-2 text-center text-base font-light shadow-md placeholder:text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 md:rounded-none md:py-4 md:text-start md:shadow-none md:placeholder:text-start md:focus-visible:outline-0"
                  placeholder="Enter your email address"
                />
                <button
                  type="submit"
                  className="rounded bg-teal-500 px-8 py-2 text-base font-light text-white shadow-inner transition-colors hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:bg-teal-600 md:rounded-none md:py-0 md:shadow-none md:focus-visible:outline-0"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function CubeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ? className : "size-6"}
    >
      <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className ? className : "size-5"}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
