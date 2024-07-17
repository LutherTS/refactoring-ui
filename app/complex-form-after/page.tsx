"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";

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
  { key: 1, label: "Discover" },
  { key: 2, label: "Connect" },
  { key: 3, label: "Community" },
  { key: 4, label: "Jobs" },
];

// Header Component

function Header() {
  return (
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
            <li key={navLink.key} className="cursor-pointer text-blue-900">
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// Header Supporting Components

function PlayCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className || "size-6"}
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
      className={className || "size-6"}
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
      className={className || "size-6"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
      />
    </svg>
  );
}

/* Main */

// Main Data

type SelectOption = {
  key: number;
  label: string;
  value: string;
};

const languageOptions: SelectOption[] = [
  { key: 1, label: "English", value: "English" },
  { key: 2, label: "French", value: "French" },
  { key: 3, label: "Spanish", value: "Spanish" },
  { key: 4, label: "Portuguese", value: "Portuguese" },
];

const countryOptions: SelectOption[] = [
  { key: 1, label: "England", value: "England" },
  { key: 2, label: "France", value: "France" },
  { key: 3, label: "Spain", value: "Spain" },
  { key: 4, label: "Portugal", value: "Portugal" },
];

type RadioOption = {
  key: number;
  id: string;
  value: string;
  label: string;
  uploads: string;
  pricing: number;
};

const radioOptions: RadioOption[] = [
  {
    key: 1,
    id: "plan-basic",
    value: "basic",
    label: "Basic",
    uploads: "1 GB",
    pricing: 5,
  },
  {
    key: 2,
    id: "plan-essential",
    value: "essential",
    label: "Essential",
    uploads: "5 GB",
    pricing: 10,
  },
  {
    key: 3,
    id: "plan-pro",
    value: "pro",
    label: "Pro",
    uploads: "15 GB", // was "Unlimited" but got lazily changed to "15 GB"
    pricing: 20,
  },
];

type CheckboxOption = {
  key: number;
  id: string;
  value: string;
  label: string;
  description: string;
};

const checkboxOptions: CheckboxOption[] = [
  {
    key: 1,
    id: "notifications-account-activity",
    value: "Account Activity",
    label: "Account Activity",
    description:
      "Get important notifications about you or activity you've missed",
  },
  {
    key: 2,
    id: "notifications-new-for-you",
    value: "New For You",
    label: "New For You",
    description: "A weekly email featuring activity from people you follow",
  },
  {
    key: 3,
    id: "notifications-meetups-near-you",
    value: "Meetups Near You",
    label: "Meetups Near You",
    description: "Get an email when a meetup is posted close to your location",
  },
  {
    key: 4,
    id: "notifications-company-news",
    value: "Company News",
    label: "Company News",
    description: "Get news, announcements, and product updates",
  },
  {
    key: 5,
    id: "notifications-weekly-jobs",
    value: "Weekly Jobs",
    label: "Weekly Jobs",
    description: "Weekly digest of design jobs",
  },
];

// Main Component

function Main() {
  return (
    <main className="flex w-screen flex-col items-center">
      <div className="min-h-screen w-full max-w-4xl px-8 pb-24 pt-8">
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
              notifications: formData.getAll("notifications"),
            });
          }}
          className="space-y-8"
        >
          <h1 className="text-xl font-bold">Account Settings</h1>
          <div className="h-px w-full bg-neutral-200"></div>
          {/* pb-1 making up for input (to be conditional in component) */}
          <section className="grid grid-cols-[1fr_2fr] gap-8 pb-1">
            <div className="-mb-4 space-y-4">
              <h2 className="text-lg font-semibold leading-none">General</h2>
              <p className="text-sm text-neutral-500">
                Having an up-to-date email address attached to your account is a
                great step toward improved account security.
              </p>
            </div>
            <div className="space-y-8">
              <InputText
                id="email-address"
                label="Email address"
                name="emailaddress"
              />
              <FieldFlex>
                <FieldLabel label="Password" isNotLabel />
                <Button
                  type="button"
                  variant="neutral"
                  onClick={() => {
                    console.log("Password changed.");
                  }}
                >
                  Change your password
                </Button>
              </FieldFlex>
              <SelectWithOptions
                id="language"
                label="Language"
                name="language"
                options={languageOptions}
              />
              <SelectWithOptions
                id="country"
                label="Country"
                name="country"
                options={countryOptions}
              />
            </div>
          </section>
          <div className="h-px w-full bg-neutral-200"></div>
          {/* pb-1 making up for input (to be conditional in component) */}
          <section className="grid grid-cols-[1fr_2fr] gap-8 pb-1">
            <div className="-mb-4 space-y-4">
              <h2 className="text-lg font-semibold leading-none">Profile</h2>
              <p className="text-sm text-neutral-500">
                This information will be shown publicly so be careful what
                information you provide.
              </p>
            </div>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <InputText
                  id="first-name"
                  label="First name"
                  name="firstname"
                />
                <InputText id="last-name" label="Last name" name="lastname" />
              </div>
              <FieldFlex>
                <FieldLabel label="Picture" isNotLabel />
                <Button
                  type="button"
                  variant="neutral"
                  onClick={() => console.log("Picture changed.")}
                >
                  Change picture
                </Button>
              </FieldFlex>
              <InputText id="username" label="Username" name="username" />
              <Textarea id="about-you" label="About you" name="aboutyou" />
            </div>
          </section>
          <div className="h-px w-full bg-neutral-200"></div>
          <section className="grid grid-cols-[1fr_2fr] gap-8 pb-1">
            <div className="-mb-4 space-y-4">
              <h2 className="text-lg font-semibold leading-none">Billing</h2>
              <p className="text-sm text-neutral-500">
                Manage your subscription as you see fit and please do make sure
                your payment method remains valid.
              </p>
            </div>
            <div className="space-y-8">
              <RadioGroup
                label="Change plan"
                options={radioOptions}
                name="plan"
              >
                <Button
                  type="button"
                  variant="destroy"
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to cancel your subscription?",
                      )
                    )
                      return console.log("Subscription canceled.");
                  }}
                >
                  Cancel subscription
                </Button>
              </RadioGroup>
              <FieldFlex>
                <FieldLabel label="Payment method" isNotLabel />
                <p>Visa ending in 5555</p>
                <p>expires 1/2019</p>
                <Button
                  type="button"
                  variant="neutral"
                  onClick={() => console.log("Payment method updated.")}
                >
                  Update
                </Button>
              </FieldFlex>
            </div>
          </section>
          <div className="h-px w-full bg-neutral-200"></div>
          <section className="grid grid-cols-[1fr_2fr] gap-8 pb-1">
            <div className="-mb-4 space-y-4">
              <h2 className="text-lg font-semibold leading-none">
                Notifications
              </h2>
              <p className="text-sm text-neutral-500">
                Get notified of activity going on with your account.
                Notifications will be sent to the email that you have provided.
              </p>
            </div>
            <div className="space-y-8">
              <CheckboxGroup options={checkboxOptions} name="notifications" />
              <div className="flex gap-4 pt-8">
                <Button type="submit" variant="confirm">
                  Save Settings
                </Button>
                <Button type="reset" variant="cancel">
                  Cancel
                </Button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}

// Main Supporting Components

function InputText({
  id,
  label,
  name,
}: {
  id: string;
  label: string;
  name: string;
}) {
  return (
    <FieldFlex>
      <FieldLabel id={id} label={label} />
      <input type="text" id={id} name={name} className="rounded border-2 p-2" />
    </FieldFlex>
  );
}

// It is more accessible to do it with Radix, but for the sake of learning, and for the sake of proof of concept, I will do it by hand with appearance-none on input in InputRadio.

function RadioGroup({
  label,
  options,
  name,
  children,
}: {
  label: string;
  options: RadioOption[];
  name: string;
  children?: React.ReactNode;
}) {
  return (
    <FieldFlex>
      <FieldLabel label={label} isNotLabel />
      {options.map((radioOption, index) => (
        <InputRadio
          key={radioOption.key}
          option={radioOption}
          name={name}
          defaultChecked={index === 0}
        />
      ))}
      {children}
    </FieldFlex>
  );
}

function InputRadio({
  option,
  name,
  defaultChecked,
}: {
  option: RadioOption;
  name: string;
  defaultChecked: boolean;
}) {
  return (
    <div className="space-x-2">
      <input
        type="radio"
        id={option.id}
        name={name}
        value={option.value}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={option.id}>
        {option.label} - {option.uploads} uploads (${option.pricing}/mo)
      </label>
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
  name,
  children,
}: {
  label?: string;
  options: CheckboxOption[];
  name: string;
  children?: React.ReactNode;
}) {
  return (
    <FieldFlex>
      {label && <FieldLabel label={label} isNotLabel />}
      {options.map((checkboxOption) => (
        <InputCheckbox
          key={checkboxOption.key}
          option={checkboxOption}
          name={name}
        />
      ))}
      {children}
    </FieldFlex>
  );
}

function InputCheckbox({
  option,
  name,
}: {
  option: CheckboxOption;
  name: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <input type="checkbox" id={option.id} name={name} value={option.value} />
      <label className="select-none" htmlFor={option.id}>
        <p>{option.label}</p>
        <p>{option.description}</p>
      </label>
    </div>
  );
}

function SelectWithOptions({
  id,
  label,
  name,
  options,
}: {
  id: string;
  label: string;
  name: string;
  options: SelectOption[];
}) {
  return (
    <FieldFlex>
      <FieldLabel id={id} label={label} />
      <div className="grid">
        <select
          className="col-start-1 row-start-1 appearance-none rounded border-2 bg-white p-2"
          id={id}
          name={name}
          defaultValue=""
        >
          <option value="" disabled>
            Choose...
          </option>
          {options.map((option) => (
            <option key={option.key} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="col-start-1 row-start-1 my-auto ml-auto pr-2">
          <ChevronDownIcon className="pointer-events-none size-5" />
        </div>
      </div>
    </FieldFlex>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className || "size-5"}
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Textarea({
  id,
  label,
  name,
}: {
  id: string;
  label: string;
  name: string;
}) {
  return (
    <FieldFlex>
      <FieldLabel id={id} label={label} />
      <textarea id={id} name={name} className="rounded border-2 p-2" rows={4} />
    </FieldFlex>
  );
}

function FieldFlex({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

function FieldLabel({
  id,
  label,
  isNotLabel,
}: {
  id?: string;
  label: string;
  isNotLabel?: boolean;
}) {
  return (
    <>
      {!isNotLabel ? (
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
      ) : (
        <p className="font-medium">{label}</p>
      )}
    </>
  );
}

function Button({
  type,
  variant,
  formAction,
  onClick,
  children,
}: {
  type?: "button" | "submit" | "reset";
  variant: "neutral" | "destroy" | "confirm" | "cancel";
  formAction?: string | ((formData: FormData) => void);
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  const classes = {
    // neutral: "border-neutral-500 bg-neutral-500 text-neutral-100",
    neutral: "bg-neutral-100 text-neutral-900",
    // destroy: "border-red-500 bg-red-500 text-white",
    destroy: "text-blue-500",
    confirm: "border-blue-500 bg-blue-500 text-white",
    cancel: "border-blue-500 bg-white text-blue-500",
  };

  return (
    <button
      type={type}
      className={`w-fit font-medium ${variant !== "destroy" ? "rounded border px-4 py-2" : "pt-2 text-sm"} ${classes[variant]}`}
      formAction={formAction}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/* Notes
Borders used all around in buttons for layout shift handling.
Sizes on Image copypasted as a default for warning handling: https://nextjs.org/docs/pages/api-reference/components/image#sizes.
For some reason, button type submit with formAction submits, and thus resets, the whole form, unlike presented in the React docs: https://react.dev/reference/react-dom/components/form#handling-multiple-submission-types.
Copied the code into /react-docs, and the same code does not work in my project. It's a bug. So I'll revert to using onClick for now, since I don't currently need more.
The demo on the React docs run on React 18 canary. 
Here's the issue on GitHub: https://github.com/facebook/react/issues/29034. 
It's when a design is validated that I go ahead and turn it into components for maintainability.
*/
