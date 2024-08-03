"use client";

import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";

import clsx from "clsx"; // .prettierc – "tailwindFunctions": ["clsx"]
import { add, format, roundToNearestMinutes } from "date-fns";
import * as Switch from "@radix-ui/react-switch";
import { Reorder, useDragControls } from "framer-motion";
import { ToWords } from "to-words";

/* Utilities */

// enables Prettier plugin behavior outside of className attributes
// const tw = (strings: any, ...values: any) =>
//   String.raw({ raw: strings }, ...values);
// https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#sorting-classes-in-template-literals
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw#building_an_identity_tag

const toWords = new ToWords({ localeCode: "fr-FR" });

const toWordsing = (number: number) => {
  let words = toWords.convert(number);
  if (words.endsWith("Un")) words = words.slice(0, -2).concat("Une");
  words = words.toLocaleLowerCase();
  return words;
};

/* Presenting Data 
Devenir tech lead sur TekTIME. 
Développement de feature
Faire un formulaire indéniable pour TekTIME.

De mon point de vue, TekTIME a besoin de profiter de son statut de nouveau projet pour partir sur une stack des plus actuelles afin d'avoir non seulement une longueur d'avance sur la compétition, mais aussi d'être préparé pour l'avenir. C'est donc ce que je tiens à démontrer avec cet exercice. 

Réaliser la div d'une étape
S'assurer que chaque étape ait un format qui lui correspond, en l'occurrence en rapport avec le style de la création d'étape.
10 minutes

Implémenter le système de coulissement des étapes
Alors, ça c'est plus pour la fin mais, il s'agit d'utiliser Framer Motion et son composant Reorder pour pouvoir réorganiser les étapes, et même visiblement en changer l'ordre.
20 minutes

Finir de vérifier le formulaire
S'assurer que toutes les fonctionnalités marchent sans problèmes, avant une future phase de nettoyage de code et de mises en composants.
30 minutes
*/

/* Page */

export default function ComplexFormPage() {
  return (
    <>
      <Main />
    </>
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

type ExchangeOption = {
  key: number;
  label: string;
  value: string;
};

const exchangeOptions: ExchangeOption[] = [
  { key: 1, label: "Atelier", value: "Atelier" },
  { key: 2, label: "Comité", value: "Comité" },
  { key: 3, label: "Conférence", value: "Conférence" },
  { key: 4, label: "Entretien individuel", value: "Entretien individuel" },
  { key: 5, label: "Embauche", value: "Embauche" },
  { key: 6, label: "Pomodoro", value: "Pomodoro" },
  { key: 7, label: "Intégration", value: "Intégration" },
  { key: 8, label: "Partage d'informations", value: "Partage d'informations" },
  { key: 9, label: "Présentation", value: "Présentation" },
  { key: 10, label: "Réseautage", value: "Réseautage" },
  { key: 11, label: "Rituel agile", value: "Rituel agile" },
  { key: 12, label: "Résolution de problème", value: "Résolution de problème" },
  { key: 13, label: "Rendez-vous client", value: "Rendez-vous client" },
  { key: 14, label: "Réunion commerciale", value: "Réunion commerciale" },
  { key: 15, label: "Suivi de projet", value: "Suivi de projet" },
  { key: 16, label: "Séminaire", value: "Séminaire" },
  { key: 17, label: "Suivi d'accompagnement", value: "Suivi d'accompagnement" },
];

type Step = { id: number; intitule: string; details: string; duree: string };

// Main Component

function Main() {
  // InputSwitch unfortunately has to be controlled for resetting
  // ...InputDatetimeLocal will also have to be controlled
  // Therefore, a comment distinction for controlled inputs will be needed.
  let [indispensable, setIndispensable] = useState(false);
  // Transform stepIsVisible into an enum, with pretty much "visible", "notVisible", "updating".
  let [stepVisible, setStepVisible] = useState<
    "create" | "creating" | "updating"
  >("creating");
  let [steps, setSteps] = useState<Step[]>([]);

  let [counterStepId, setCounterStepId] = useState(0);
  let [currentStepId, setCurrentStepId] = useState(0);

  let currentStep = steps.find((step) => step.id === currentStepId);

  // datetime-local input is now controlled.
  let [momentDate, setMomentDate] = useState(
    format(nowRoundedUpTenMinutes, "yyyy-MM-dd'T'HH:mm"),
  );
  let momentDateAsDate = new Date(momentDate);

  let overallAddingTime = steps.reduce((acc, curr) => acc + +curr.duree, 0);
  let overallAddingTimeInFlooredHours = Math.floor(overallAddingTime / 60);
  let overallAddingTimeInRemainingMinutes = overallAddingTime % 60;

  let [activitySelect, setActivitySelect] = useState(false);

  // console.log(stepIsVisible);
  // console.log(steps);
  // console.log({ currentStep });
  // console.log({ counterStepId });
  // console.log({ currentStepId });
  // console.log({ momentDate });
  // console.log(momentDateAsDate);

  return (
    <main className="flex w-screen flex-col items-center">
      <div className="min-h-screen w-full max-w-4xl overflow-clip px-8 pb-12 pt-8 md:pb-24">
        <form
          id="step-form-creating"
          action={(formData: FormData) => {
            // console.log({ formData });
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
            // console.log("step-form-updating submitting.");
            // console.log({ formData });
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
              destination: formData.get("destination"),
              activite: formData.get("activite"),
              objectif: formData.get("objectif"),
              indispensable,
              contexte: formData.get("contexte"),
              dateetheure: momentDate,
              etapes: steps,
            });
            setIndispensable(false);
            setMomentDate(format(nowRoundedUpTenMinutes, "yyyy-MM-dd'T'HH:mm"));
            setSteps([]);
            setStepVisible("creating");
          }}
          onReset={(event) => {
            if (
              confirm(
                "Êtes-vous sûr que vous voulez réinitialiser le formulaire ?",
              )
            ) {
              setIndispensable(false);
              setMomentDate(
                format(nowRoundedUpTenMinutes, "yyyy-MM-dd'T'HH:mm"),
              );
              setSteps([]);
              setStepVisible("creating");
            } else event.preventDefault();
          }}
          className="space-y-8"
        >
          <PageTitle title="Créez un moment" />
          <Divider />
          <Section
            title="Votre moment"
            description="Définissez votre moment de collaboration dans ses moindres détails, de la manière la plus précise que vous pouvez."
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
            {!activitySelect && (
              <InputText
                label="Activité"
                description="Définissez le type d'activité qui va correspondre à votre problématique."
                addendum="Ou choissisez parmi une sélection prédéfinie via le bouton ci-dessus."
                name="activite"
                fieldFlexIsNotLabel
              >
                {/* What if, this is not a button, but rather, directly, a dropdown? As in the actual select? */}
                <Button
                  type="button"
                  variant="destroy"
                  onClick={() => setActivitySelect(true)}
                >
                  Choisir l&apos;activité
                </Button>
              </InputText>
            )}
            {activitySelect && (
              <SelectWithOptions
                label="Activité"
                description="Choisissez le type d'activité qui va correspondre à votre problématique."
                addendum="Ou définissez le vous-même via le bouton ci-dessus."
                name="activite"
                placeholder="Choisissez..."
                options={exchangeOptions}
                fieldFlexIsNotLabel
              >
                <Button
                  type="button"
                  variant="destroy"
                  onClick={() => setActivitySelect(false)}
                >
                  Définir l&apos;activité
                </Button>
              </SelectWithOptions>
            )}
            <InputText
              label="Objectif"
              name="objectif"
              description="Indiquez en une phrase le résultat que vous souhaiterez obtenir quand ce moment touchera à sa fin."
            />
            <InputSwitchControlled
              label="Indispensable"
              name="indispensable"
              description="Activez l'interrupteur si ce moment est d'une importance incontournable."
              definedValue={indispensable}
              definedOnValueChange={setIndispensable}
            />
            <Textarea
              label="Contexte"
              name="contexte"
              description="Expliquez ce qui a motivé ce moment et pourquoi il est nécessaire."
              rows={6}
            />
            <InputDatetimeLocalControlled
              label="Date et heure"
              name="dateetheure"
              description="Déterminez la date et l'heure auxquelles ce moment doit débuter."
              definedValue={momentDate}
              definedOnValueChange={setMomentDate}
              min={format(now, "yyyy-MM-dd'T'HH:mm")}
            />
          </Section>
          <Divider />
          <Section
            title="Ses étapes"
            description="Établissez une par une les étapes du déroulé de votre moment, de la manière la plus segmentée que vous désirez."
            // addendum={`(Vous pouvez réorganiser les étapes par cliquer-déposer en sélectionnant Étape Une, Étape Deux...)`}
            // showAddendum={steps.length >= 1}
          >
            {steps.length > 0 && (
              // I might have to make two lists.
              <Reorder.Group
                axis="y"
                values={steps}
                onReorder={setSteps}
                as="ol"
              >
                {steps.map((step, index) => {
                  const addingTime =
                    index === 0
                      ? 0
                      : steps
                          .slice(0, index)
                          .reduce((acc, curr) => acc + +curr.duree, 0);

                  let dureeInFlooredHours = Math.floor(+step.duree / 60);
                  let dureeInRemainingMinutes = +step.duree % 60;

                  return (
                    <ReorderItem
                      step={step}
                      index={index}
                      steps={steps}
                      stepVisible={stepVisible}
                      currentStepId={currentStepId}
                      setCurrentStepId={setCurrentStepId}
                      setStepVisible={setStepVisible}
                      dureeInFlooredHours={dureeInFlooredHours}
                      dureeInRemainingMinutes={dureeInRemainingMinutes}
                      momentDateAsDate={momentDateAsDate}
                      addingTime={addingTime}
                      currentStep={currentStep}
                      setSteps={setSteps}
                      key={step.id}
                    />
                  );
                })}
              </Reorder.Group>
            )}
            {steps.length > 0 && (
              <>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold uppercase leading-none tracking-[0.08em] text-neutral-500">
                    Récapitulatifs
                  </p>
                </div>
                <div className="grid grid-cols-[2fr_1fr] gap-4 md:grid-cols-[3fr_1fr]">
                  <div className="space-y-2">
                    <p className="font-medium text-blue-950">Durée totale</p>
                    <p className="font-semibold">
                      {overallAddingTime < 60 && (
                        <>
                          <span className="font-medium text-neutral-800">
                            de
                          </span>{" "}
                          {overallAddingTime}{" "}
                          {overallAddingTime === 1 ? <>minute</> : <>minutes</>}
                        </>
                      )}
                      {overallAddingTime >= 60 && (
                        <>
                          <span className="font-medium text-neutral-800">
                            de
                          </span>{" "}
                          {overallAddingTimeInFlooredHours}{" "}
                          {overallAddingTimeInFlooredHours === 1 ? (
                            <>heure</>
                          ) : (
                            <>heures</>
                          )}{" "}
                          {overallAddingTimeInRemainingMinutes !== 0 && (
                            <>
                              et {overallAddingTimeInRemainingMinutes}{" "}
                              {overallAddingTimeInRemainingMinutes === 1 ? (
                                <>minute</>
                              ) : (
                                <>minutes</>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-blue-950">Fin attendue</p>
                    <p className="font-semibold">
                      <span className="font-medium text-neutral-800">à</span>{" "}
                      {format(
                        add(momentDateAsDate, {
                          minutes: overallAddingTime,
                        }),
                        "HH:mm",
                      )}
                    </p>
                  </div>
                </div>
              </>
            )}
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
                    variant="destroy-step"
                  >
                    Réinitialiser l&apos;étape
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
                  defaultValue="10"
                  // step="10"
                  min="5"
                />
                <div className="flex">
                  {/* Mobile */}
                  <div className="flex w-full flex-col gap-4 md:hidden">
                    <Button
                      form="step-form-creating"
                      type="submit"
                      variant="confirm-step"
                    >
                      Confirmer l&apos;étape
                    </Button>
                    <Button
                      form="step-form-creating"
                      type="button"
                      onClick={() => setStepVisible("create")}
                      disabled={steps.length === 0}
                      variant="cancel-step"
                    >
                      Annuler l&apos;étape
                    </Button>
                  </div>
                  {/* Desktop */}
                  {/* There's a slight py issue here handled by hand */}
                  <div className="hidden pt-1.5 md:ml-auto md:grid md:w-fit md:grow md:grid-cols-2 md:gap-4">
                    <Button
                      form="step-form-creating"
                      type="button"
                      onClick={() => setStepVisible("create")}
                      disabled={steps.length === 0}
                      variant="cancel-step"
                    >
                      Annuler l&apos;étape
                    </Button>
                    <Button
                      form="step-form-creating"
                      type="submit"
                      variant="confirm-step"
                    >
                      Confirmer l&apos;étape
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
                <Button
                  type="submit"
                  variant="confirm"
                  disabled={steps.length === 0}
                >
                  Confirmer le moment
                </Button>
                <Button type="reset" variant="cancel">
                  Réinitialiser le moment
                </Button>
              </div>
              {/* Desktop */}
              <div className="hidden pt-1.5 md:ml-auto md:grid md:w-fit md:grow md:grid-cols-2 md:gap-4">
                <Button type="reset" variant="cancel">
                  Réinitialiser le moment
                </Button>
                <Button
                  type="submit"
                  variant="confirm"
                  disabled={steps.length === 0}
                >
                  Confirmer le moment
                </Button>
              </div>
            </div>
          </Section>
        </form>
      </div>
    </main>
  );
}

// Main Leading Components

function ReorderItem({
  step,
  index,
  steps,
  stepVisible,
  currentStepId,
  setCurrentStepId,
  setStepVisible,
  dureeInFlooredHours,
  dureeInRemainingMinutes,
  momentDateAsDate,
  addingTime,
  currentStep,
  setSteps,
}: {
  step: Step;
  index: number;
  steps: Step[];
  stepVisible: "create" | "creating" | "updating";
  currentStepId: number;
  setCurrentStepId: Dispatch<SetStateAction<number>>;
  setStepVisible: Dispatch<SetStateAction<"create" | "creating" | "updating">>;
  dureeInFlooredHours: number;
  dureeInRemainingMinutes: number;
  momentDateAsDate: Date;
  addingTime: number;
  currentStep: Step | undefined;
  setSteps: Dispatch<SetStateAction<Step[]>>;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={step}
      dragListener={false}
      dragControls={controls}
      transition={{ layout: { duration: 0 } }}
      dragTransition={{
        bounceStiffness: 900,
        bounceDamping: 30,
      }}
    >
      <div
        className={clsx(
          "flex flex-col gap-y-8",
          index !== steps.length - 1 && "pb-8",
        )}
      >
        <div className="flex select-none items-baseline justify-between">
          <p
            className="text-sm font-semibold uppercase leading-none tracking-[0.08em] text-neutral-500"
            onPointerDown={(event) => controls.start(event)}
            style={{ touchAction: "none" }}
          >
            Étape <span>{toWordsing(index + 1)}</span>
          </p>{" "}
          {!(stepVisible === "updating" && currentStepId === step.id) && (
            <Button
              variant="destroy-step"
              type="button"
              onClick={() => {
                setCurrentStepId(step.id);
                setStepVisible("updating");
              }}
            >
              Modifier cette étape
            </Button>
          )}
          {stepVisible === "updating" && currentStepId === step.id && (
            <Button
              form="step-form-updating"
              type="button"
              variant="destroy-step"
              onClick={() => setStepVisible("create")}
            >
              Restaurer l&apos;étape
            </Button>
          )}
        </div>
        {!(stepVisible === "updating" && currentStepId === step.id) && (
          <>
            {/* manually fixing that padding... */}
            <div className="-mt-1.5 space-y-2">
              <p className="font-medium text-blue-950">{step.intitule}</p>
              <p>
                {+step.duree < 60 ? (
                  <>{step.duree} minutes </>
                ) : (
                  <>
                    {dureeInFlooredHours}{" "}
                    {dureeInFlooredHours === 1 ? <>heure</> : <>heures</>}{" "}
                    {dureeInRemainingMinutes !== 0 && (
                      <>et {dureeInRemainingMinutes} minutes </>
                    )}
                  </>
                )}
                {+step.duree >= 60 && <></>}•{" "}
                <span
                  className={clsx(
                    index === 0 && "font-semibold text-neutral-800",
                  )}
                >
                  {format(
                    add(momentDateAsDate, {
                      minutes: addingTime,
                    }),
                    "HH:mm",
                  )}
                </span>
              </p>
              <p className="text-sm text-neutral-500">{step.details}</p>
            </div>
          </>
        )}
        {stepVisible === "updating" && currentStepId === step.id && (
          <div className="flex flex-col gap-y-8">
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
              // step="10"
              min="5"
            />
            <div className="flex">
              {/* Mobile */}
              <div className="flex w-full flex-col gap-4 md:hidden">
                <Button
                  form="step-form-updating"
                  type="submit"
                  variant="confirm-step"
                >
                  Actualiser l&apos;étape
                </Button>
                <Button
                  form="step-form-updating"
                  type="submit"
                  formAction={() => {
                    let newSteps = steps.filter(
                      (step) => step.id !== currentStepId,
                    );
                    setSteps(newSteps);
                    if (newSteps.length === 0) setStepVisible("creating");
                    else setStepVisible("create");
                  }}
                  variant="cancel-step"
                >
                  Effacer l&apos;étape
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
                    if (newSteps.length === 0) setStepVisible("creating");
                    else setStepVisible("create");
                  }}
                  variant="cancel-step"
                >
                  Effacer l&apos;étape
                </Button>
                <Button
                  form="step-form-updating"
                  type="submit"
                  variant="confirm-step"
                >
                  Actualiser l&apos;étape
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Reorder.Item>
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

const textareaPadding = clsx("px-3 py-3");

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
  showDescription = true,
  addendum,
  showAddendum = true,
  children,
}: {
  title?: string;
  description?: string;
  showDescription?: boolean;
  addendum?: string;
  showAddendum?: boolean;
  children: React.ReactNode;
}) {
  return (
    // pb-1 making up for input padding inconsistencies
    <section className="grid gap-8 pb-1 md:grid-cols-[1fr_2fr]">
      <div
        className={clsx(
          !(title && description) && "hidden md:block",
          description && showDescription && "gap-y-4 md:flex md:flex-col",
        )}
      >
        {title && (
          <>
            <h2 className="text-lg font-semibold leading-none text-blue-950">
              {title}
            </h2>
            {description && showDescription && (
              // Last handmade padding fix...
              <p className="-mt-1 max-w-prose text-sm text-neutral-500">
                {description}
              </p>
            )}
            {addendum && showAddendum && (
              <p className="-mt-1 max-w-prose text-sm text-neutral-500">
                {addendum}
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
  addendum,
  name,
  defaultValue,
  tekTime,
  children,
  fieldFlexIsNotLabel,
  required = true,
}: {
  form?: string;
  label: string;
  description?: string;
  addendum?: string;
  name: string;
  defaultValue?: string;
  tekTime?: boolean;
  children?: React.ReactNode;
  fieldFlexIsNotLabel?: boolean;
  required?: boolean;
}) {
  return (
    <FieldFlex isLabel={!fieldFlexIsNotLabel}>
      <div className="flex justify-between">
        <FieldTitle title={label} />
        {children}
      </div>
      {description && (
        <div className="flex flex-col gap-1">
          <p className="select-none text-sm text-neutral-500">{description}</p>
          {addendum && (
            <p className="select-none text-sm text-neutral-500">({addendum})</p>
          )}
        </div>
      )}
      {!tekTime ? (
        <input
          type="text"
          form={form}
          name={name}
          defaultValue={defaultValue}
          required={required}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.preventDefault();
          }}
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
            form={form}
            name={name}
            defaultValue={defaultValue}
            required={required}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.preventDefault();
            }}
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
  );
}

function SelectWithOptions({
  id,
  label,
  description,
  addendum,
  name,
  placeholder = "Choose...",
  options,
  children,
  fieldFlexIsNotLabel,
  required = true,
}: {
  id?: string;
  label: string;
  description?: string;
  addendum?: string;
  name: string;
  placeholder?: string;
  options: ExchangeOption[];
  children?: React.ReactNode;
  fieldFlexIsNotLabel?: boolean;
  required?: boolean;
}) {
  return (
    <FieldFlex isLabel={!fieldFlexIsNotLabel}>
      <div className="flex justify-between">
        <FieldTitle title={label} />
        {children}
      </div>
      {description && (
        <div className="flex flex-col gap-1">
          <p className="select-none text-sm text-neutral-500">{description}</p>
          {addendum && (
            <p className="select-none text-sm text-neutral-500">({addendum})</p>
          )}
        </div>
      )}
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
          required={required}
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

function Textarea({
  form,
  label,
  description,
  name,
  defaultValue,
  rows = 4,
  required = true,
}: {
  form?: string;
  label: string;
  description?: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
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
        required={required}
        // No line breaks.
        onKeyDown={(event) => {
          if (event.key === "Enter") event.preventDefault();
        }}
        rows={rows}
        className={clsx(
          "resize-none",
          baseInputTexts,
          textareaPadding,
          focusVisibleTexts,
        )}
      />
    </FieldFlex>
  );
}

// Modified from Advanced Radix UI's Animated Switch
function InputSwitchControlled({
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
          checked={definedValue}
          onCheckedChange={definedOnValueChange}
          className={clsx(
            "w-12 rounded-full bg-blue-500 p-[2px] shadow-inner shadow-black/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:bg-blue-400 data-[state=checked]:bg-cyan-500 data-[state=checked]:focus-visible:outline-cyan-400 data-[state=checked]:active:bg-cyan-400",
          )}
        >
          <Switch.Thumb
            className={clsx(
              "block size-6 rounded-[calc(1.5rem/2)] bg-gray-100 shadow-sm transition duration-150 data-[state=checked]:bg-white",
              "data-[state=checked]:translate-x-5",
            )}
          />
        </Switch.Root>
      </div>
      {description && (
        <p className="select-none text-sm text-neutral-500">{description}</p>
      )}
    </FieldFlex>
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
  max,
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
          onKeyDown={(event) => {
            if (event.key === "Enter") event.preventDefault();
          }}
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

function InputDatetimeLocalControlled({
  label,
  name,
  description,
  definedValue,
  definedOnValueChange = () => {},
  min,
  max,
}: {
  label: string;
  name: string;
  description?: string;
  definedValue: string;
  definedOnValueChange: Dispatch<SetStateAction<string>>;
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
        value={definedValue}
        onChange={(event) => definedOnValueChange(event.currentTarget.value)}
        min={min}
        max={max}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.preventDefault();
        }}
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
  disabled,
  formAction,
  onClick,
  children,
}: {
  form?: string;
  type?: "button" | "submit" | "reset";
  variant:
    | "destroy"
    | "destroy-step"
    | "neutral"
    | "confirm"
    | "cancel"
    | "destroy-step"
    | "confirm-step"
    | "cancel-step";
  disabled?: boolean;
  formAction?: string | ((formData: FormData) => void);
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  const destroy =
    "w-fit px-1 text-sm text-blue-500 hover:text-blue-600 focus-visible:rounded focus-visible:outline-blue-500 active:text-blue-400";
  const destroyStep =
    "w-fit px-1 text-sm text-cyan-500 hover:text-cyan-600 focus-visible:rounded focus-visible:outline-cyan-500 active:text-cyan-400";
  const notDestroy = "w-full rounded border py-2";
  const neutral =
    "border-[#e5e7eb] bg-neutral-100 px-3 text-neutral-900 hover:!bg-neutral-200 hover:!text-neutral-950 focus-visible:outline-neutral-900 group-hover/field:bg-neutral-50 group-hover/field:text-neutral-800";
  const confirm =
    "border-blue-500 bg-blue-500 px-6 text-white hover:border-blue-600 hover:bg-blue-600 focus-visible:outline-blue-500 active:border-blue-400 active:bg-blue-400 disabled:border-neutral-800 disabled:bg-neutral-800";
  const cancel =
    "border-blue-500 bg-white px-6 text-blue-500 hover:border-blue-600 hover:text-blue-600 focus-visible:outline-blue-500 active:border-blue-400 active:text-blue-400";
  const confirmStep =
    "border-cyan-500 bg-cyan-500 px-6 text-white hover:border-cyan-600 hover:bg-cyan-600 focus-visible:outline-cyan-500 active:border-cyan-400 active:bg-cyan-400";
  const cancelStep =
    "border-cyan-500 bg-white px-6 text-cyan-500 hover:border-cyan-600 hover:text-cyan-600 focus-visible:outline-cyan-500 active:border-cyan-400 active:text-cyan-400 disabled:border-neutral-500 disabled:text-neutral-500";

  return (
    <button
      form={form}
      type={type}
      disabled={disabled}
      className={clsx(
        "font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:duration-0",
        variant === "destroy" && clsx(destroy),
        variant === "destroy-step" && clsx(destroyStep),
        variant === "neutral" && clsx(notDestroy, neutral, "md:w-fit"),
        variant === "confirm" && clsx(notDestroy, confirm),
        variant === "cancel" && clsx(notDestroy, cancel),
        variant === "confirm-step" && clsx(notDestroy, confirmStep),
        variant === "cancel-step" && clsx(notDestroy, cancelStep),
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
Keeping it here if I even allow only one minute.
{overallAddingTime >= 60 && (
  <>
    de {Math.floor(overallAddingTime / 60)} h{" "}
    {overallAddingTime % 60 !== 0 && (
      <>
        et {overallAddingTime % 60}{" "}
        {overallAddingTime % 60 === 1 ? (
          <>minute</>
        ) : (
          <>minutes</>
        )}
      </>
    )}
  </>
)}
Shifting inputs on Destination will have to wait when the full flow of creating a moment will be made.
No longer in use since submitting on Enter is not prevented all around:
// forcing with "!" because AFAIK there will always be a form.
// event.currentTarget.form!.requestSubmit();
*/
