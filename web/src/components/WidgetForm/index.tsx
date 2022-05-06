import { useState } from "react";

import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";

import BugImageUrl from "../../assets/bug.svg";
import IdeaImageUrl from "../../assets/idea.svg";
import OtherImageUrl from "../../assets/thought.svg";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./steps/FeedbackSucessStep";

export const feedbacktypes = {
  Bug: {
    title: "Problema",
    image: {
      source: BugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  Idea: {
    title: "Ideia",
    image: {
      source: IdeaImageUrl,
      alt: "Imagem de uma lâmpada",
    },
  },
  Other: {
    title: "Outro",
    image: {
      source: OtherImageUrl,
      alt: "imagem de uma nuvem de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedbacktypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeddbackSent] = useState(false);

  function headRestartFeedback() {
    setFeddbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div
      className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg 
        w-[calc(100vw-2rem)] md:w-auto"
    >
      {feedbackSent ? (
        <FeedbackSucessStep onFeedbackRestartRequested={headRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbacktype={feedbackType}
              onFeedbackRestartRequested={headRestartFeedback}
              onfeedbackSent={() => setFeddbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pelo{" "}
        <a
          target={`_blank`}
          className="underline underline-offset-2"
          href="https://www.linkedin.com/in/denner-bernardes/"
        >
          Denner Augusto
        </a>
      </footer>
    </div>
  );
}
