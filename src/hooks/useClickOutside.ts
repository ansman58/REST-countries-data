import React from "react";

export function useClickOutside(searchTerm?: string) {
  const [isOpen, setIsOpen] = React.useState(false);
  let ref = React.useRef<any>();

  React.useEffect(() => {
    let clickHandler = (event: MouseEvent) => {
      if (!ref.current.contains(event)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [isOpen]);
  return { ref, isOpen, setIsOpen };
}
