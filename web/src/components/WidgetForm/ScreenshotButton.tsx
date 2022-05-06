import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  onScreenshotTook: (screenshot: string | null) => void;
  screenShot: string | null;
}

export function ScreenshotButton({
  onScreenshotTook,
  screenShot,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function headleTakeScreenshot() {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");

    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenShot) {
    return (
      <button
        onClick={() => onScreenshotTook(null)}
        type="button"
        className="p1- w-10 h-10 rounded-[4px] flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{
          backgroundImage: `url(${screenShot})`,
          backgroundPosition: "rigth bottom",
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      onClick={headleTakeScreenshot}
      type="button"
      className="p-2 bg-zinc-800 rounded-[4px] border-transparent hover:bg-zinc-700 transition-colors 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 "
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera weight="bold" className="w-4 h-4" />
      )}
    </button>
  );
}
