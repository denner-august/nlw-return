import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { feedbacktypes, FeedbackType } from "..";
import { CloseButton } from "../../closeButton";
import { ScreenshotButton } from "../ScreenshotButton";
import { api } from "../../../services/api";
import { Loading } from "../../Loading";

interface feedbackContentStepProps {
  feedbacktype: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onfeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbacktype,
  onFeedbackRestartRequested,
  onfeedbackSent,
}: feedbackContentStepProps) {
  const feedbackTypeInfo = feedbacktypes[feedbacktype];

  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendLoading, setIsSendLoading] = useState(false);

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSendLoading(true);

    await api.post("/feedback", {
      type: feedbacktype,
      comment,
      screenshot,
    });

    setIsSendLoading(false);
    onfeedbackSent();
  }

  return (
    <>
      <header>
        <button
          onClick={onFeedbackRestartRequested}
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          className="min-w-[394px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 
          bg-transparent  rounded-md p-2 focus:border-brand-500 focus:outline-none focus:ring-offset-brand-500 focus:ring-1 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin "
          placeholder="Conte em detalhes o que está acontecendo..."
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            onScreenshotTook={setScreenshot}
            screenShot={screenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0 || isSendLoading}
            className="p-2 bg-brand-500 rounded-[4px] border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
            disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendLoading ? <Loading /> : " Enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
