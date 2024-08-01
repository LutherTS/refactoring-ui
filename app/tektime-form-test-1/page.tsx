"use client";

import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import Image from "next/image";

import clsx from "clsx"; // .prettierc – "tailwindFunctions": ["clsx"]
import {
  add,
  compareAsc,
  endOfMonth,
  format,
  roundToNearestMinutes,
} from "date-fns";
import * as Switch from "@radix-ui/react-switch";
import { motion } from "framer-motion";
import { ToWords } from "to-words";

/* Tests */

const toWords = new ToWords({ localeCode: "fr-FR" });

const twoWordsing = (number: number) => {
  let words = toWords.convert(number);
  if (words.endsWith("Un")) words = words.slice(0, -2).concat("Une");
  words = words.toLocaleLowerCase();
  return words;
};

// let words = toWords.convert(141);

// if (words.endsWith("Un"))
//   words = words.slice(0, -2).concat("Une").toLocaleLowerCase();

// Still need to weigh in on whether to use this on numbers like #1.
// console.log(words);

/* Utilities */

// enables Prettier plugin behavior outside of className attributes
// const tw = (strings: any, ...values: any) =>
//   String.raw({ raw: strings }, ...values);
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
          "z-40 flex w-screen justify-center border-b-2 border-blue-100 bg-white",
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
            <div className="relative size-8 cursor-pointer overflow-clip rounded-full bg-neutral-500 text-neutral-500">
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

const now = new Date();

// roundToNearestMinutes are nested to create a clamp method, meaning:
// - the time shown will always be a minimum of 10 minutes later
// (e.g. if it's 10:59, 11:10 will be shown)
// - the time shown will always be a maximum of 20 minutes later
// (e.g. if it's 11:01, 11:20 will be shown)
// This is to account for the time it will take to fill the form, especially to fill all the steps of the moment at hand.
const nowRoundedUpTenMinutes = roundToNearestMinutes(
  add(
    roundToNearestMinutes(now, {
      roundingMethod: "ceil",
      nearestTo: 10,
    }),
    { seconds: 1 },
  ),
  {
    roundingMethod: "ceil",
    nearestTo: 10,
  },
);

const endOfMonthNow = endOfMonth(now);

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
  // InputSwitch unfortunately has to be controlled for resetting
  // ...InputDatetimeLocal will also have to be controlled
  // Therefore, a comment distinction for controlled inputs will be needed.
  let [indispendable, setIndispensable] = useState(false);
  // Transform stepIsVisible into an enum, with pretty much "visible", "notVisible", "updating".
  let [stepVisible, setStepVisible] = useState<
    "create" | "creating" | "updating"
  >("creating");
  let [steps, setSteps] = useState<
    { id: number; intitule: string; details: string; duree: string }[]
  >([]);

  let [counterStepId, setCounterStepId] = useState(0);
  let [currentStepId, setCurrentStepId] = useState(0);

  let currentStep = steps.find((step) => step.id === currentStepId);

  // console.log(stepIsVisible);
  console.log(steps);
  console.log({ currentStep });
  console.log({ counterStepId });
  console.log({ currentStepId });

  return (
    <main className="flex w-screen flex-col items-center">
      <div className="min-h-screen w-full max-w-4xl overflow-clip px-8 pb-12 pt-8 md:pb-24">
        <form
          id="step-form-creating"
          action={(formData: FormData) => {
            console.log({ formData });
            let intitule = formData.get("intituledeleetape");
            let details = formData.get("detailsdeleetape");
            let duree = formData.get("dureedeletape");
            if (
              typeof intitule !== "string" ||
              typeof details !== "string" ||
              typeof duree !== "string"
            )
              return console.error(
                "Le formulaire de l'étape n'a pas été correctement renseigné.",
              );
            const step = {
              id: currentStepId,
              intitule,
              details,
              duree,
            };
            setSteps([...steps, step]);
            setStepVisible("create");
          }}
        ></form>
        <form
          id="step-form-updating"
          action={(formData: FormData) => {
            console.log("step-form-updating submitting.");
            console.log({ formData });
            let intitule = formData.get("intituledeleetape");
            let details = formData.get("detailsdeleetape");
            let duree = formData.get("dureedeletape");
            if (
              typeof intitule !== "string" ||
              typeof details !== "string" ||
              typeof duree !== "string"
            )
              return console.error(
                "Le formulaire de l'étape n'a pas été correctement renseigné.",
              );
            const step = {
              id: currentStepId,
              intitule,
              details,
              duree,
            };
            let newSteps = steps.filter((step) => step.id !== currentStepId);
            newSteps.push(step);
            newSteps.sort((a, b) => a.id - b.id);
            setSteps(newSteps);
            setStepVisible("create");
          }}
        ></form>
        <form
          action={(formData: FormData) => {
            console.log({
              emailaddress: formData.get("emailaddress"),
              language: formData.get("language"),
              country: formData.get("country"),
              firstname: formData.get("firstname"),
              lastname: formData.get("lastname"),
              username: formData.get("username"),
              age: formData.get("age"),
              aboutyou: formData.get("aboutyou"),
              plan: formData.get("plan"),
              preferredbillingtime: formData.get("preferredbillingtime"),
              notifications: formData.getAll("notifications"),
              suspendallemails: !!formData.get("suspendallemails"),
            });
            setIndispensable(false);
          }}
          onReset={(event) => {
            if (
              confirm(
                "Êtes-vous sûr que vous voulez réinitialiser le formulaire ?",
              )
            )
              setIndispensable(false);
            else event.preventDefault();
          }}
          className="space-y-8"
        >
          <Section
            title="Votre moment"
            // description="Définissez votre moment de collaboration dans ses moindres détails, de la manière la plus précise que vous pouvez."
          >
            {/* fixing some padding towards the section title */}
            <div className="-mt-0.5">
              <InputText
                label="Destination"
                name="destination"
                description="Votre projet vise à atteindre quel idéal ?"
                tekTime
              />
            </div>
            <InputText
              label="Activité"
              name="activite"
              description="Définissez le type d'activité qui va correspondre à votre problématique."
            />
            <Textarea
              label="Objectif"
              name="objectif"
              description="Indiquez en une phrase le résultat que vous souhaiterez obtenir quand ce moment touchera à sa fin."
              rows={2}
            />
            <InputSwitch
              label="Indispensable"
              name="indispensable"
              description="Activez l'interrupteur si ce moment est d'une importance incontournable."
              definedValue={indispendable}
              definedOnValueChange={setIndispensable}
            />
            <Textarea
              label="Contexte"
              name="contexte"
              description="Expliquez ce qui a motivé ce moment et pourquoi il est nécessaire."
              rows={4}
            />
            <InputDatetimeLocal
              label="Date et heure"
              name="dateetheure"
              description="Déterminez la date et l'heure auxquelles ce moment doit débuter."
              defaultValue={format(
                nowRoundedUpTenMinutes,
                "yyyy-MM-dd'T'HH:mm",
              )}
              min={format(now, "yyyy-MM-dd'T'HH:mm")}
            />
          </Section>
          <Divider />
          <Section
            title="Ses étapes"
            // description="Établissez une par une les étapes du déroulé de votre moment, de la manière la plus segmentée que vous désirez."
          >
            {steps.map((step, index) => (
              <div className="flex flex-col gap-y-8" key={index}>
                {!(stepVisible === "updating" && currentStepId === step.id) && (
                  <>
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-semibold uppercase leading-none tracking-[0.08em] text-neutral-500">
                        Étape <span>{twoWordsing(index + 1)}</span>
                      </p>{" "}
                      <Button
                        variant="destroy"
                        type="button"
                        onClick={() => {
                          setCurrentStepId(step.id);
                          setStepVisible("updating");
                        }}
                      >
                        Modifier cette étape
                      </Button>
                    </div>
                    {/* manually fixing that padding... */}
                    <div className="-mt-1.5 space-y-2">
                      <p className="font-medium text-blue-950">
                        {step.intitule}
                      </p>
                      <p>{step.duree} minutes</p>
                      <p className="text-sm text-neutral-500">{step.details}</p>
                    </div>
                  </>
                )}
                {stepVisible === "updating" && currentStepId === step.id && (
                  <div className="flex flex-col gap-y-8">
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-semibold uppercase leading-none tracking-[0.08em] text-neutral-500">
                        Étape <span>{twoWordsing(index + 1)}</span>
                      </p>{" "}
                      <Button
                        form="step-form-updating"
                        type="button"
                        variant="destroy"
                        onClick={() => setStepVisible("create")}
                      >
                        Restaurer l'étape
                      </Button>
                    </div>
                    {/* manually fixing that padding... */}
                    <div className="-mt-1.5">
                      <InputText
                        form="step-form-updating"
                        label="Intitulé de l'étape"
                        name="intituledeleetape"
                        defaultValue={currentStep?.intitule}
                        description="Définissez simplement le sujet de l'étape."
                      />
                    </div>
                    <Textarea
                      form="step-form-updating"
                      label="Détails de l'étape"
                      name="detailsdeleetape"
                      defaultValue={currentStep?.details}
                      description="Expliquez en détails le déroulé de l'étape."
                      rows={4}
                    />
                    <InputNumber
                      form="step-form-updating"
                      label="Durée de l'étape"
                      name="dureedeletape"
                      defaultValue={currentStep?.duree}
                      description="Renseignez en minutes la longueur de l'étape."
                      step="10"
                      min="0"
                    />
                    <div className="flex">
                      {/* Mobile */}
                      <div className="flex w-full flex-col gap-4 md:hidden">
                        <Button
                          form="step-form-updating"
                          type="submit"
                          variant="confirm-step"
                        >
                          Actualiser l'étape
                        </Button>
                        <Button
                          form="step-form-updating"
                          type="submit"
                          formAction={() => {
                            let newSteps = steps.filter(
                              (step) => step.id !== currentStepId,
                            );
                            setSteps(newSteps);
                            setStepVisible("create");
                          }}
                          variant="cancel-step"
                        >
                          Effacer l'étape
                        </Button>
                      </div>
                      {/* Desktop */}
                      {/* There's a slight py issue here handled by hand */}
                      <div className="hidden pt-1.5 md:ml-auto md:grid md:w-fit md:grow md:grid-cols-2 md:gap-4">
                        <Button
                          form="step-form-updating"
                          type="submit"
                          formAction={() => {
                            let newSteps = steps.filter(
                              (step) => step.id !== currentStepId,
                            );
                            setSteps(newSteps);
                            setStepVisible("create");
                          }}
                          variant="cancel-step"
                        >
                          Effacer l'étape
                        </Button>
                        <Button
                          form="step-form-updating"
                          type="submit"
                          variant="confirm-step"
                        >
                          Actualiser l'étape
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {stepVisible === "creating" && (
              // was a form, but forms can't be nested
              <div className="flex flex-col gap-y-8">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold uppercase leading-none tracking-[0.08em] text-neutral-500">
                    Ajouter une étape
                  </p>{" "}
                  <Button
                    form="step-form-creating"
                    type="reset"
                    variant="destroy"
                  >
                    Réinitialiser l'étape
                  </Button>
                </div>
                {/* manually fixing that padding... */}
                <div className="-mt-1.5">
                  <InputText
                    form="step-form-creating"
                    label="Intitulé de l'étape"
                    name="intituledeleetape"
                    description="Définissez simplement le sujet de l'étape."
                  />
                </div>
                <Textarea
                  form="step-form-creating"
                  label="Détails de l'étape"
                  name="detailsdeleetape"
                  description="Expliquez en détails le déroulé de l'étape."
                  rows={4}
                />
                <InputNumber
                  form="step-form-creating"
                  label="Durée de l'étape"
                  name="dureedeletape"
                  description="Renseignez en minutes la longueur de l'étape."
                  step="10"
                  min="0"
                />
                <div className="flex">
                  {/* Mobile */}
                  <div className="flex w-full flex-col gap-4 md:hidden">
                    <Button
                      form="step-form-creating"
                      type="submit"
                      variant="confirm-step"
                    >
                      Confirmer l'étape
                    </Button>
                    <Button
                      form="step-form-creating"
                      type="submit"
                      formAction={() => setStepVisible("create")}
                      variant="cancel-step"
                    >
                      Annuler l'étape
                    </Button>
                  </div>
                  {/* Desktop */}
                  {/* There's a slight py issue here handled by hand */}
                  <div className="hidden pt-1.5 md:ml-auto md:grid md:w-fit md:grow md:grid-cols-2 md:gap-4">
                    <Button
                      form="step-form-creating"
                      type="submit"
                      formAction={() => setStepVisible("create")}
                      variant="cancel-step"
                    >
                      Annuler l'étape
                    </Button>
                    <Button
                      form="step-form-creating"
                      type="submit"
                      variant="confirm-step"
                    >
                      Confirmer l'étape
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {stepVisible === "create" && (
              <Button
                type="button"
                variant="neutral"
                onClick={() => {
                  let newCounterStepId = counterStepId + 1;
                  setCounterStepId(newCounterStepId);
                  setCurrentStepId(newCounterStepId);
                  setStepVisible("creating");
                }}
              >
                Ajouter une étape
              </Button>
            )}
          </Section>
          <Divider />
          <Section>
            {/* Doubling up instead of reverse for accessibility */}
            <div className="flex">
              {/* Mobile */}
              <div className="flex w-full flex-col gap-4 md:hidden">
                <Button type="submit" variant="confirm">
                  Confirmer
                </Button>
                <Button type="reset" variant="cancel">
                  Annuler
                </Button>
              </div>
              {/* Desktop */}
              <div className="hidden md:ml-auto md:flex md:w-fit md:gap-4">
                <Button type="reset" variant="cancel">
                  Annuler
                </Button>
                <Button type="submit" variant="confirm">
                  Confirmer
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

// border-[#e5e7eb] is the browser's default for border color if needed
const baseInputTexts = clsx(
  "rounded border-2 border-[#e5e7eb] bg-white transition-colors duration-0 hover:border-neutral-100 hover:duration-150",
);

const notDatetimeLocalPadding = clsx("px-3 py-2");

const focusVisibleTexts = clsx(
  "focus-visible:border-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500",
);

// Main Supporting Components

function PageTitle({ title }: { title: string }) {
  return <h1 className="text-xl font-bold text-blue-950">{title}</h1>;
}

function Divider() {
  return (
    <div className="h-px w-full origin-center scale-x-150 bg-neutral-200 md:scale-100"></div>
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
          description && "gap-y-4 md:flex md:flex-col",
        )}
      >
        {title && (
          <>
            <h2 className="text-lg font-semibold leading-none text-blue-950">
              {title}
            </h2>
            {description && (
              // Last handmade padding fix
              <p className="-mt-1 max-w-prose text-sm text-neutral-500">
                {description}
              </p>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col gap-y-8">{children}</div>
    </section>
  );
}

function InputText({
  form,
  label,
  description,
  name,
  defaultValue,
  tekTime,
  children,
}: {
  form?: string;
  label: string;
  description?: string;
  name: string;
  defaultValue?: string;
  tekTime?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <>
      <FieldFlex isLabel>
        <div className="flex justify-between">
          <FieldTitle title={label} />
          {children}
        </div>
        {description && (
          <p className="select-none text-sm text-neutral-500">{description}</p>
        )}
        {!tekTime ? (
          <input
            type="text"
            form={form}
            name={name}
            defaultValue={defaultValue}
            className={clsx(
              baseInputTexts,
              notDatetimeLocalPadding,
              focusVisibleTexts,
            )}
          />
        ) : (
          <div className="relative">
            <input
              type="text"
              name={name}
              className={clsx(
                "peer relative z-30 w-full rounded border-2 border-transparent bg-white bg-clip-padding",
                notDatetimeLocalPadding,
                "outline-none",
              )}
            />
            {/* gradient border */}
            {/* from-blue-500 original #5882f2 to-cyan-500 original #0fb8cb */}
            <div className="absolute inset-0 z-20 rounded bg-gradient-to-b from-[#5882f2] to-[#0fb8cb]"></div>
            {/* background merging foundation */}
            {/* [calc(100%+4px)] adds the original outline-offset-2 */}
            {/* -ml-[2px] -mt-[2px] make up for it in positioning */}
            <div className="absolute inset-0 z-10 -ml-[2px] -mt-[2px] size-[calc(100%+4px)] rounded-md bg-teal-50"></div>
            {/* gradient focus-visible */}
            {/* [calc(100%+8px)] adds the original outline-2 */}
            {/* -ml-[4px] -mt-[4px] make up for it in positioning */}
            <div className="invisible absolute inset-0 z-0 -ml-[4px] -mt-[4px] size-[calc(100%+8px)] rounded-lg bg-gradient-to-b from-[#5882f2] to-[#0fb8cb] peer-focus-visible:visible"></div>
            {/* outline's rounded is more pronounced, lg is the exact fit */}
          </div>
        )}
      </FieldFlex>
    </>
  );
}

// IMPORTANT: input type number as a browser default does not show an error when the form fails to submit on mobile, so do remember the importance of server-side validations.
// (Same for input datetime-local.)
function InputNumber({
  form,
  label,
  description,
  name,
  defaultValue = "0",
  step,
  min = "0",
  max = "120",
}: {
  form?: string;
  label: string;
  name: string;
  description?: string;
  defaultValue?: string;
  step?: string;
  min?: string;
  max?: string;
}) {
  return (
    <FieldFlex isLabel>
      <FieldTitle title={label} />
      {description && (
        <p className="select-none text-sm text-neutral-500">{description}</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        <input
          form={form}
          type="number"
          name={name}
          defaultValue={defaultValue}
          step={step}
          min={min}
          max={max}
          className={clsx(
            baseInputTexts,
            notDatetimeLocalPadding,
            focusVisibleTexts,
          )}
        />
        <div className="flex items-center">
          <p>minutes</p>
        </div>
      </div>
    </FieldFlex>
  );
}

// Modified from Advanced Radix UI's Animated Switch
function InputSwitch({
  label,
  name,
  description,
  definedValue = false,
  definedOnValueChange = () => {},
}: {
  label: string;
  name: string;
  description?: string;
  definedValue?: boolean;
  definedOnValueChange?: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <FieldFlex isLabel>
      <div className="flex select-none items-center gap-4">
        <FieldTitle title={label} />
        <Switch.Root
          name={name}
          // reset and submit are not correctly resetting this input with defaultChecked, so it has to be controlled
          // defaultChecked={false}
          checked={definedValue}
          onCheckedChange={definedOnValueChange}
          className="flex w-12 rounded-full bg-blue-500 p-[2px] shadow-inner shadow-black/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:bg-blue-400 data-[state=unchecked]:flex-row data-[state=checked]:flex-row-reverse data-[state=checked]:bg-cyan-500 data-[state=checked]:focus-visible:outline-cyan-400 data-[state=checked]:active:bg-cyan-400"
        >
          <Switch.Thumb asChild>
            <motion.span
              layout
              transition={{ duration: 0.15 }}
              className="block size-6 rounded-[calc(1.5rem/2)] bg-gray-100 shadow-sm transition-colors data-[state=checked]:bg-white"
            ></motion.span>
          </Switch.Thumb>
        </Switch.Root>
      </div>
      {description && (
        <p className="select-none text-sm text-neutral-500">{description}</p>
      )}
    </FieldFlex>
  );
}

function SelectWithOptions({
  id,
  label,
  name,
  placeholder = "Choose...",
  options,
}: {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  options: SelectOption[];
}) {
  return (
    <FieldFlex isLabel>
      <FieldTitle title={label} />
      <div className="relative grid">
        <select
          className={clsx(
            "col-start-1 row-start-1 appearance-none",
            baseInputTexts,
            notDatetimeLocalPadding,
            focusVisibleTexts,
          )}
          id={id}
          name={name}
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.key} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2.5 col-start-1 row-start-1 flex flex-col justify-center">
          <ChevronDownIcon className="size-5" />
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
  form,
  label,
  description,
  name,
  defaultValue,
  rows = 4,
}: {
  form?: string;
  label: string;
  description?: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <FieldFlex isLabel>
      <FieldTitle title={label} />
      {description && (
        <p className="select-none text-sm text-neutral-500">{description}</p>
      )}
      <textarea
        form={form}
        name={name}
        defaultValue={defaultValue}
        // No line breaks.
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            // forced with "!" because afaik there will always be a form.
            event.currentTarget.form!.requestSubmit();
          }
        }}
        className={clsx(
          "resize-none",
          baseInputTexts,
          notDatetimeLocalPadding,
          focusVisibleTexts,
        )}
        rows={rows}
      />
    </FieldFlex>
  );
}

function InputDatetimeLocal({
  label,
  name,
  description,
  defaultValue = format(now, "yyyy-MM-dd'T'HH:mm"),
  min,
  max,
}: {
  label: string;
  name: string;
  description?: string;
  defaultValue?: string;
  min?: string;
  max?: string;
}) {
  return (
    <FieldFlex isLabel>
      <FieldTitle title={label} />
      {description && (
        <p className="select-none text-sm text-neutral-500">{description}</p>
      )}
      <input
        // because it is so impossible to deeply modify the input datetime-local defaults, I'm forced to adapt all of my other inputs to its some of its defaults (like their padding)
        type="datetime-local"
        name={name}
        defaultValue={defaultValue}
        min={min}
        max={max}
        className={clsx("p-2", baseInputTexts, focusVisibleTexts)}
      />
    </FieldFlex>
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
  form,
  type,
  variant,
  formAction,
  onClick,
  children,
}: {
  form?: string;
  type?: "button" | "submit" | "reset";
  variant:
    | "destroy"
    | "neutral"
    | "confirm"
    | "cancel"
    | "destroy-step"
    | "confirm-step"
    | "cancel-step";
  formAction?: string | ((formData: FormData) => void);
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  const destroy =
    "w-fit px-1 text-sm text-blue-500 hover:text-blue-600 focus-visible:rounded focus-visible:outline-blue-500 active:text-blue-400";
  const notDestroy = "w-full rounded border py-2";
  const neutral =
    "border-[#e5e7eb] bg-neutral-100 px-3 text-neutral-900 hover:!bg-neutral-200 hover:!text-neutral-950 focus-visible:outline-neutral-900 group-hover/field:bg-neutral-50 group-hover/field:text-neutral-800";
  const confirm =
    "border-blue-500 bg-blue-500 px-6 text-white hover:border-blue-600 hover:bg-blue-600 focus-visible:outline-blue-500 active:border-blue-400 active:bg-blue-400";
  const cancel =
    "border-blue-500 bg-white px-6 text-blue-500 hover:border-blue-600 hover:text-blue-600 focus-visible:outline-blue-500 active:border-blue-400 active:text-blue-400";

  return (
    <button
      form={form}
      type={type}
      className={clsx(
        "font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:duration-0",
        variant === "destroy" && clsx(destroy),
        variant === "neutral" && clsx(notDestroy, neutral, "md:w-fit"),
        variant === "confirm" && clsx(notDestroy, confirm, "md:w-fit"),
        variant === "cancel" && clsx(notDestroy, cancel, "md:w-fit"),
        variant === "confirm-step" && clsx(notDestroy, confirm),
        variant === "cancel-step" && clsx(notDestroy, cancel),
      )}
      formAction={formAction}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/* Notes
Based out of /complex-form-after.
Sincerely, for now, my work is on this file and not on the former, as if they are two different projets altogether. It's only once I'm sufficiently done here that I shall adapt the advancements made here on complex-form-after.
The flow is not competely stable. I'll work on it tomorrow. 
*/
