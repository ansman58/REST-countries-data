import React from "react";

export function useClickOutside({
  value,
  setValue,
  isSearch = false,
}: {
  value: string;
  setValue?: React.Dispatch<React.SetStateAction<boolean>>;
  isSearch?: boolean;
}) {
  const ref = React.useRef<any>(null);
  React.useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      if (e.target !== ref.current) {
        if (isSearch) {
          ref.current!.style.display = "none";
        }
        setValue?.(false);
      }
    };

    window.addEventListener("click", onOutsideClick);

    return () => {
      window.removeEventListener("click", onOutsideClick);
    };
  }, [value]);

  return ref;
}
