"use client";

import Image from "next/image";

const navLinks = [
  { id: 1, label: "Discover" },
  { id: 2, label: "Connect" },
  { id: 3, label: "Community" },
  { id: 4, label: "Jobs" },
];

export default function ComplexFormPage() {
  return (
    <>
      <header className="flex w-screen justify-center border-b-2 border-blue-100 bg-white">
        <div className="flex w-full max-w-7xl items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4 text-xl">
            <PlayCircleIcon className="-ml-[2px] size-8 text-blue-500" />
            <span className="cursor-default font-black text-blue-950">
              Playback
            </span>
          </div>
          <ul className="flex gap-8 text-sm font-semibold">
            {navLinks.map((navLink) => (
              <li key={navLink.id} className="cursor-pointer text-blue-900">
                {navLink.label}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <EnvelopeIcon className="size-6 cursor-pointer text-blue-200" />
            <CloudArrowUpIcon className="size-6 cursor-pointer text-blue-200" />
            <div className="relative size-8 cursor-pointer overflow-clip rounded-full bg-neutral-500">
              <Image
                src={"/jamarl-styles.webp"}
                alt="Jamarl Styles"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // default for warning handling
              />
            </div>
          </div>
        </div>
      </header>
      <main className="flex w-screen flex-col items-center bg-white">
        <div className="min-h-screen w-full max-w-7xl px-8 pb-24 pt-8">
          <form
            action={(formData: FormData) => {
              console.log({
                emailaddress: formData.get("emailaddress"),
                language: formData.get("language"),
                country: formData.get("country"),
                firstname: formData.get("firstname"),
                lastname: formData.get("lastname"),
                username: formData.get("username"),
                aboutyou: formData.get("aboutyou"),
                plan: formData.get("plan"),
                notifications: formData.get("notifications"),
              });
            }}
            className="space-y-8"
          >
            <h1 className="text-lg font-bold">Account settings</h1>
            <div className="flex flex-col gap-2">
              <label htmlFor="email-address" className="font-medium">
                Email address
              </label>
              <input
                type="text"
                id="email-address"
                name="emailaddress"
                className="rounded border-2 px-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Password</p>
              <button
                type="button"
                className="w-fit rounded bg-neutral-700 px-4 py-2 text-neutral-200"
              >
                Change your password
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="language" className="font-medium">
                Language
              </label>
              <select
                className="rounded border-2 bg-white p-1"
                id="language"
                name="language"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose...
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="font-medium">
                Country
              </label>
              <select
                className="rounded border-2 bg-white p-1"
                id="country"
                name="country"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose...
                </option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="first-name" className="font-medium">
                  First name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="firstname"
                  className="rounded border-2 px-1"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="last-name" className="font-medium">
                  Last name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="lastname"
                  className="rounded border-2 px-1"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Picture</p>
              <button
                type="button"
                className="w-fit rounded bg-neutral-700 px-4 py-2 text-neutral-200"
              >
                Change picture
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="rounded border-2 px-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="about-you" className="font-medium">
                About you
              </label>
              <textarea
                id="about-you"
                name="aboutyou"
                className="rounded border-2 px-1"
                rows={4}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Change plan</p>
              <div className="space-x-2">
                <input
                  type="radio"
                  id="plan-basic"
                  name="plan"
                  value="basic"
                  defaultChecked
                />
                <label htmlFor="plan-basic">
                  Basic - 1 GB uploads ($5/mo){" "}
                </label>
              </div>
              <div className="space-x-2">
                <input
                  type="radio"
                  id="plan-essential"
                  name="plan"
                  value="essential"
                />
                <label htmlFor="plan-essential">
                  Essential - 5 GB uploads ($10/mo)
                </label>
              </div>
              <div className="space-x-2">
                <input type="radio" id="plan-pro" name="plan" value="pro" />
                <label htmlFor="plan-pro">
                  Pro - Unlimited uploads ($20/mo)
                </label>
              </div>
              <button
                type="button"
                className="w-fit rounded bg-red-500 px-4 py-2 text-white"
              >
                Cancel subscription
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Payment method</p>
              <p>Visa ending in 5555</p>
              <p>expires 1/2019</p>
              <button
                type="button"
                className="w-fit rounded bg-neutral-700 px-4 py-2 text-neutral-200"
              >
                Update
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Notifications</p>
              <div className="flex items-baseline gap-2">
                <input
                  type="checkbox"
                  id="notifications-account-activity"
                  name="notifications"
                  value="Account Activity"
                />
                <label
                  className="select-none"
                  htmlFor="notifications-account-activity"
                >
                  <p>Account Activity</p>
                  <p>
                    Get important notifications about you or activity you've
                    missed
                  </p>
                </label>
              </div>
              <div className="flex items-baseline gap-2">
                <input
                  type="checkbox"
                  id="notifications-new-for-you"
                  name="notifications"
                  value="New For You"
                />
                <label
                  className="select-none"
                  htmlFor="notifications-new-for-you"
                >
                  <p>New For You</p>
                  <p>
                    A weekly email featuring activity from people you follow
                  </p>
                </label>
              </div>
              <div className="flex items-baseline gap-2">
                <input
                  type="checkbox"
                  id="notifications-meetups-near-you"
                  name="notifications"
                  value="Meetups Near You"
                />
                <label
                  className="select-none"
                  htmlFor="notifications-meetups-near-you"
                >
                  <p>Meetups Near You</p>
                  <p>
                    Get an email when a meetup is posted close to your location
                  </p>
                </label>
              </div>
              <div className="flex items-baseline gap-2">
                <input
                  type="checkbox"
                  id="notifications-company-news"
                  name="notifications"
                  value="Company News"
                />
                <label
                  className="select-none"
                  htmlFor="notifications-company-news"
                >
                  <p>Company News</p>
                  <p>Get news, announcements, and product updates</p>
                </label>
              </div>
              <div className="flex items-baseline gap-2">
                <input
                  type="checkbox"
                  id="notifications-weekly-jobs"
                  name="notifications"
                  value="Weekly Jobs"
                />
                <label
                  className="select-none"
                  htmlFor="notifications-weekly-jobs"
                >
                  <p>Weekly Jobs</p>
                  <p>Weekly digest of design jobs</p>
                </label>
              </div>
            </div>
            <div className="flex gap-4">
              {/* matching border to for layout shift handling */}
              <button
                type="submit"
                className="w-fit rounded border border-blue-500 bg-blue-500 px-4 py-2 text-white"
              >
                Save Settings
              </button>
              <button
                type="button"
                className="w-fit rounded border border-blue-500 bg-white px-4 py-2 text-blue-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

function PlayCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ? className : "size-6"}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className ? className : "size-6"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

function CloudArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className ? className : "size-6"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
      />
    </svg>
  );
}
