import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type ButtonProps = {
  label: string;
  title: string;
  icon: IconDefinition;
  onClick: () => void;
  disabled?: boolean;
};

export const Button = ({
  label,
  title,
  icon,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      title={title}
      disabled={disabled}
      onClick={onClick}
      className="disabled:opacity-50 disabled:cursor-not-allowed relative w-full cursor-pointer touch-manipulation rounded-[5px] border-[3px] p-[0.4em] font-sans text-sm font-bold uppercase tracking-[1px] text-offblack bg-offwhite shadow-[1px_1px_0_0,2px_2px_0_0,3px_3px_0_0] active:top-1.25 active:left-1.25 active:shadow-none sm:w-auto sm:px-[0.5em] sm:py-[0.25em]"
    >
      {label} <FontAwesomeIcon icon={icon} />
    </button>
  );
};
