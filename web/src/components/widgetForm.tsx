import { CloseButton } from "./closeButton";

import BugImageUrl from "../assets/bug.svg";
import IdeaImageUrl from "../assets/idea.svg";
import OtherImageUrl from "../assets/thought.svg";
import { useState } from "react";

const feedbacktypes = {
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

type feebackTypeProps = keyof typeof feedbacktypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<feebackTypeProps | null>(
    null
  );

  return (
    <div
      className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg 
        w-[calc(100vw-2rem)] md:w-auto"
    >
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>

        <CloseButton />
      </header>

      {!feedbackType ? (
        <div className="flex py-8 gap-2 w-full">
          {Object.entries(feedbacktypes).map(([key, value]) => {
            return (
              <button
                key={key}
                className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                onClick={() => setFeedbackType(key as feebackTypeProps)}
                type="button"
              >
                <img src={value.image.source} alt={value.image.alt} />
                <span>{value.title}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <p>testando</p>
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
