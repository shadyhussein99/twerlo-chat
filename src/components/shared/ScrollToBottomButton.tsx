import { useState, useEffect } from "react";
import { scrollToBottom } from "../../utils";
import { zIndexes } from "../../constants/zIndexes";

interface IScrollToBottomButtonProps {
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

export const ScrollToBottomButton = ({
  scrollRef,
}: IScrollToBottomButtonProps) => {
  const [showBottom, setShowButton] = useState(false);

  // #region effects
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef?.current) {
        // For inner element scrolling
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
        setShowButton(distanceFromBottom > 200);
      } else {
        // For window scrolling
        const { scrollY, innerHeight } = window;
        const { scrollHeight } = document.documentElement;
        const distanceFromBottom = scrollHeight - (scrollY + innerHeight);
        setShowButton(distanceFromBottom > 200);
      }
    };

    const target = scrollRef?.current || window;
    target.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef]);

  return (
    <div>
      {showBottom && (
        <button
          onClick={() => scrollToBottom(scrollRef)}
          className={`cursor-pointer fixed bottom-18 right-[7%] z-${zIndexes.float} rounded-full bg-white px-3 text-primary text-2xl transition duration-300 hover:bg-primary-tint font-semibold`}
        >
          v
        </button>
      )}
    </div>
  );
};
