import { ChatTeardropDots } from "phosphor-react";
import { Popover } from "@headlessui/react";

export function Widget() {
  const css = {
    div: "absolute bottom-5 right-5",
    button:
      "bg-brand-500 rounded-full px-3 h-12 text-white  flex items-center group",
    iconChatTeardropDots: "w-6 h-6",
    span: "max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear ",
  };

  return (
    <Popover className={css.div}>
      <Popover.Panel>hello word</Popover.Panel>
      <Popover.Button className={css.button}>
        <ChatTeardropDots className={css.iconChatTeardropDots} />
        <span className={css.span}>
          <span className="pl-2"></span>
          feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}
