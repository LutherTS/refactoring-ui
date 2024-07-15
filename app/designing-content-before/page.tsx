"use client";

export default function Home() {
  return (
    <main className="p-8">
      <div className="max-w-prose space-y-4">
        <div className="flex gap-2">
          <CubeIcon className="size-6 text-cyan-500" />
          <span className="font-extrabold">FutureWeb</span>
        </div>
        <h1 className="text-4xl font-medium">
          Let's explore the future of the web together.
        </h1>
        <div className="flex flex-col gap-2 text-lg">
          <span>June 17 and 18, 2019</span>
          <span>San Jose MacEnery Convention Center</span>
        </div>
        <div className="space-y-2 hyphens-auto text-justify text-sm">
          <p>
            FutureWeb is a conference that explores some of the new ideas tools,
            and technologies that are happening in web design. This two-day
            event features amazing workshops and sessions led by the best in the
            business covering topics including HTML/CSS, Javascript, UI/UX
            Design, and much, much more.
          </p>
          <p>
            Our speakers are handpicked to bring you a diverse range of
            expertise. Sessions run back-to-back on a single track which means
            you won't miss a thing. And if that's too much action for one day,
            you'll be happy to know that every session is recorded for attendees
            so you can watch them again later.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg">Who is this conference for?</h2>
          <ul className="list-inside list-disc space-y-2 text-sm">
            <li>
              Designers who want to learn about the latest tools and techniques
            </li>
            <li>
              Frontend developers who want to learn about the latest
              technologies
            </li>
            <li>Anyone interested in web design and development</li>
          </ul>
        </div>
        <div className="flex flex-col gap-y-2">
          <blockquote className="hyphens-auto text-justify">
            "This conference offers valuable insights from accomplished and
            rising stars in the web design industry. If you're looking for
            creative challenges, in-depth workshops, energizing social events,
            and networking opportunities, this conference might be for you."
          </blockquote>
          <p className="text-sm text-neutral-500">
            – Molly Sanders{" "}
            <span className="italic">Award-winning Frontend Developer</span>
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-lg">
            Sign up to get updates on speakers and when early birds tickets are
            available.
          </p>
          <form
            className="flex justify-between overflow-clip rounded border border-s"
            action={(formData: FormData) => {
              console.log({ signup: formData.get("signup") });
            }}
          >
            <input
              type="text"
              name="signup"
              id="sign-up"
              className="grow border-0 px-2 py-1 text-sm"
            />
            <button
              type="submit"
              className="bg-teal-500 px-2 py-1 text-sm text-white"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </main>
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
