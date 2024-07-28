"use client";

import { MouseEventHandler } from "react";
import Image from "next/image";

import clsx from "clsx"; // .prettierc – "tailwindFunctions": ["clsx"]

/* Utilities */

// enables Prettier plugin behavior outside of className attributes
const tw = (strings: any, ...values: any) =>
  String.raw({ raw: strings }, ...values);
// https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#sorting-classes-in-template-literals
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw#building_an_identity_tag

/* Page */

export default function ComplexFormPage() {
  return (
    <>
      <Header isFixed />
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

function Header({ isFixed }: { isFixed?: boolean }) {
  return (
    <header>
      <RecursiveHeader isFixed={isFixed} />
    </header>
  );
}

// Header Supporting Components

function RecursiveHeader({
  isFixed,
  isInvisible,
}: {
  isFixed?: boolean;
  isInvisible?: boolean;
}) {
  return (
    <>
      <div
        className={clsx(
          isFixed && "fixed",
          isInvisible && "invisible",
          "z-10 flex w-screen justify-center border-b-2 border-blue-100 bg-white",
        )}
      >
        <div className="flex w-full max-w-7xl items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4 text-xl">
            <PlayCircleIcon className="-ml-[2px] size-8 text-blue-500" />
            <span className="cursor-default font-black text-blue-950">
              Playback
            </span>
          </div>
          <ul className="hidden gap-8 text-sm font-semibold md:flex">
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
      </div>
      {isFixed && <RecursiveHeader isInvisible />}
    </>
  );
}

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
  uploads: number;
  pricing: number;
};

const radioOptions: RadioOption[] = [
  {
    key: 1,
    id: "plan-basic",
    value: "basic",
    label: "Basic",
    uploads: 1,
    pricing: 5,
  },
  {
    key: 2,
    id: "plan-essential",
    value: "essential",
    label: "Essential",
    uploads: 5,
    pricing: 10,
  },
  {
    key: 3,
    id: "plan-pro",
    value: "pro",
    label: "Pro",
    uploads: 15, // was "Unlimited" but got lazily changed to "15 GB"
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
      <div className="min-h-screen w-full max-w-4xl overflow-clip px-8 pb-12 pt-8 md:pb-24">
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
          <PageTitle title="Account Settings" />
          <Divider />
          <Section
            title="General"
            description="Having an up-to-date email address attached to your account is a great step toward improved account security."
          >
            <InputText
              id="email-address"
              label="Email address"
              name="emailaddress"
            />
            <FieldFlex>
              <FieldTitle title="Password" />
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
          </Section>
          <Divider />
          <Section
            title="Profile"
            description="This information will be shown publicly so be careful what information you provide."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <InputText id="first-name" label="First name" name="firstname" />
              <InputText id="last-name" label="Last name" name="lastname" />
            </div>
            <FieldFlex>
              <FieldTitle title="Picture" />
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
          </Section>
          <Divider />
          <Section
            title="Billing"
            description="Manage your subscription as you see fit and please do make sure your payment method remains valid."
          >
            <RadioGroup
              title="Change plan"
              options={radioOptions}
              name="plan"
              cols={3}
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
              <FieldTitle title="Payment method" />
              <div className="flex flex-col gap-4 rounded border-2 bg-neutral-100 p-4 transition-colors group-hover/field:border-neutral-100 md:flex-row md:justify-between">
                <div className="flex flex-col">
                  <p>Visa ending in 5555</p>
                  <p className="text-sm text-neutral-500">expires 1/2019</p>
                </div>
                <Button
                  type="button"
                  variant="neutral"
                  onClick={() => console.log("Payment method updated.")}
                >
                  Update
                </Button>
              </div>
            </FieldFlex>
          </Section>
          <Divider />
          <Section
            title="Notifications"
            description="Get notified of activity going on with your account. Notifications will be sent to the email that you have provided."
          >
            <CheckboxGroup options={checkboxOptions} name="notifications" />
          </Section>
          <Divider />
          <Section>
            {/* Doubling up instead of reverse for accessibility */}
            <div className="flex">
              {/* Mobile */}
              <div className="flex w-full flex-col gap-4 md:hidden">
                <Button type="submit" variant="confirm">
                  Save Settings
                </Button>
                <Button type="reset" variant="cancel">
                  Cancel
                </Button>
              </div>
              {/* Mobile */}
              <div className="hidden md:ml-auto md:flex md:w-fit md:gap-4">
                <Button type="reset" variant="cancel">
                  Cancel
                </Button>
                <Button type="submit" variant="confirm">
                  Save Settings
                </Button>
              </div>
            </div>
          </Section>
        </form>
      </div>
    </main>
  );
}

// Main Classname Variables
// temporarily change variable name to className for Intellisense
// (or add it to "tailwindCSS.classAttributes" in VSCode settings)
// wrap variable string with clsx() for Prettier sorting
// or in a tw template literal // .prettierrc – "tailwindFunctions": ["tw"]

const focusVisibleTexts =
  "focus-visible:border-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500";

const focusVisibleRadio =
  "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-900 has-[:focus-visible]:duration-0";

const focusVisibleCheckbox =
  "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-500";

// Main Supporting Components

function PageTitle({ title }: { title: string }) {
  return <h1 className="text-xl font-bold text-blue-950">{title}</h1>;
}

function Divider() {
  return (
    <div className="h-px w-full origin-center scale-x-150 bg-neutral-200"></div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    // pb-1 making up for input padding inconsistencies
    <section className="grid gap-8 pb-1 md:grid-cols-[1fr_2fr]">
      <div
        className={clsx(
          !(title && description) && "hidden md:block",
          description && "space-y-4",
        )}
      >
        {title && (
          <>
            <h2 className="text-lg font-semibold leading-none text-blue-950">
              {title}
            </h2>
            {description && (
              <p className="max-w-prose text-sm text-neutral-500">
                {description}
              </p>
            )}
          </>
        )}
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

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
    <FieldFlex isLabel>
      <FieldTitle title={label} />
      <input
        type="text"
        id={id}
        name={name}
        className={clsx(
          "rounded border-2 p-2 transition-colors duration-0 hover:border-neutral-100 hover:duration-150",
          focusVisibleTexts,
        )}
      />
    </FieldFlex>
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
    <FieldFlex isLabel>
      <FieldTitle title={label} />
      <div className="relative grid">
        <select
          className={clsx(
            "col-start-1 row-start-1 appearance-none rounded border-2 bg-white p-2 transition-colors duration-0 hover:border-neutral-100 hover:duration-150",
            focusVisibleTexts,
          )}
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
        <div className="pointer-events-none absolute inset-y-0 right-2 col-start-1 row-start-1 flex flex-col justify-center">
          <ChevronDownIcon className="size-5" />
        </div>
      </div>
    </FieldFlex>
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
    <FieldFlex isLabel>
      <FieldTitle title={label} />
      <textarea
        id={id}
        name={name}
        className={clsx(
          "resize-none rounded border-2 p-2 transition-colors duration-0 hover:border-neutral-100 hover:duration-150 focus-visible:border-neutral-100",
          focusVisibleTexts,
        )}
        rows={4}
      />
    </FieldFlex>
  );
}

function RadioGroup({
  title,
  options,
  name,
  cols,
  children,
}: {
  title: string;
  options: RadioOption[];
  name: string;
  cols: 1 | 2 | 3;
  children?: React.ReactNode;
}) {
  return (
    <FieldFlex>
      {/* pr-1 with Button px-1 */}
      <div className="flex items-baseline justify-between pb-2 pr-1">
        <FieldTitle title={title} />
        {/* slot used here for Cancel subscription button */}
        {children}
      </div>
      <div
        className={clsx(
          "grid gap-4",
          cols === 1 && "md:grid-cols-1", // -[repeat(1,_minmax(0,_1fr))]
          cols === 2 && "md:grid-cols-2", // -[repeat(2,_minmax(0,_1fr))]
          cols === 3 && "md:grid-cols-3", // -[repeat(3,_minmax(0,_1fr))]
        )}
      >
        {options.map((radioOption, index) => (
          <InputRadio
            key={radioOption.key}
            option={radioOption}
            name={name}
            defaultChecked={index === 0}
          />
        ))}
      </div>
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
    <div
      className={clsx(
        "group relative h-fit w-full rounded-lg bg-white outline-2 *:text-neutral-500 *:transition-colors *:hover:text-teal-500 has-[:checked]:bg-opacity-50 *:has-[:checked]:text-teal-500",
        focusVisibleRadio,
      )}
    >
      <input
        type="radio"
        id={option.id}
        name={name}
        value={option.value}
        defaultChecked={defaultChecked}
        className="peer absolute inset-0 appearance-none rounded-lg border-2 outline-none checked:border-teal-500 group-hover:border-teal-500"
      />
      <CheckCircleIcon className="absolute right-2 top-2 hidden size-6 peer-[:checked]:block" />
      <div className="flex size-full flex-col justify-between gap-4 p-4 font-semibold">
        <p className="text-sm uppercase leading-none tracking-[0.08em]">
          {option.label}
        </p>
        <div className="flex justify-between gap-2 md:flex-col">
          <p className="flex flex-col gap-1 font-semibold leading-none">
            <span className="text-black group-has-[:checked]:text-teal-900">
              <span className="text-3xl font-extrabold leading-none">
                {option.uploads}
              </span>{" "}
              GB{" "}
              <span className="inline text-neutral-500 group-has-[:checked]:text-teal-500 md:hidden">
                uploads
              </span>
            </span>{" "}
            <span className="hidden md:inline">uploads</span>
          </p>
          <p className="self-end pb-[2px] text-sm leading-none md:self-auto md:pb-0">
            $
            <span className="font-bold text-black group-has-[:checked]:text-teal-900">
              {option.pricing}
            </span>{" "}
            / mo
          </p>
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className || "size-6"}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckboxGroup({
  title,
  options,
  name,
  children,
}: {
  title?: string;
  options: CheckboxOption[];
  name: string;
  children?: React.ReactNode;
}) {
  return (
    <FieldFlex>
      {/* currently unused, since the checkbox group in use does not incorporate a title */}
      {title && <FieldTitle title={title} />}
      <div className="-mb-2">
        {options.map((checkboxOption) => (
          <InputCheckbox
            key={checkboxOption.key}
            option={checkboxOption}
            name={name}
          />
        ))}
      </div>
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
    <label htmlFor={option.id} className="group flex items-baseline gap-4 pb-2">
      <div
        className={clsx(
          "flex overflow-clip rounded border group-hover:border-teal-500 has-[:checked]:border-teal-500",
          focusVisibleCheckbox,
        )}
      >
        <input
          type="checkbox"
          id={option.id}
          name={name}
          value={option.value}
          className="peer appearance-none"
        />
        <div className="flex size-5 items-center justify-center bg-white *:invisible peer-[:checked]:bg-teal-500 *:peer-[:checked]:visible *:peer-[:checked]:text-white">
          <CheckIcon className="size-4" />
        </div>
      </div>
      <div className="select-none">
        <p className="group-hover:text-teal-700 group-has-[:focus-visible]:text-teal-500">
          {option.label}
        </p>
        <p className="text-sm text-neutral-500">{option.description}</p>
      </div>
    </label>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className || "size-6"}
    >
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
      />
    </svg>
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

function FieldFlex({
  isLabel,
  children,
}: {
  isLabel?: boolean;
  children: React.ReactNode;
}) {
  const className = "flex flex-col gap-2";

  return (
    <>
      {isLabel ? (
        <label className={className}>{children}</label>
      ) : (
        <div className={clsx(className && className, "group/field")}>
          {children}
        </div>
      )}
    </>
  );
}

function FieldTitle({ title }: { title: string }) {
  return <p className="font-medium text-blue-950">{title}</p>;
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
  return (
    <button
      type={type}
      className={clsx(
        "font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:duration-0",
        variant !== "destroy" && "w-full rounded border px-4 py-2 md:w-fit",
        variant === "destroy" && "w-fit text-sm",
        variant === "neutral" &&
          "bg-neutral-100 text-neutral-900 hover:!bg-neutral-200 hover:!text-neutral-950 focus-visible:outline-neutral-900 group-hover/field:bg-neutral-50 group-hover/field:text-neutral-800",
        variant === "destroy" &&
          "px-1 text-blue-500 hover:text-blue-600 focus-visible:rounded focus-visible:outline-blue-500 active:text-blue-400",
        variant === "confirm" &&
          "border-blue-500 bg-blue-500 text-white hover:border-blue-600 hover:bg-blue-600 focus-visible:outline-blue-500 active:border-blue-400 active:bg-blue-400",
        variant === "cancel" &&
          "border-blue-500 bg-white text-blue-500 hover:border-blue-600 hover:text-blue-600 focus-visible:outline-blue-500 active:border-blue-400 active:text-blue-400",
      )}
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
Error: input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.
*/
