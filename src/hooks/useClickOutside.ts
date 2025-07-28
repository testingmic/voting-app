import { useEffect, useRef } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>(handler: Handler) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      
      // If the click is inside the ref element, do nothing
      if (!ref.current || ref.current.contains(target)) {
        return;
      }

      // Check if the click was on a link or button
      let element = target as HTMLElement;
      while (element) {
        if (element.tagName === 'A' || element.tagName === 'BUTTON') {
          // Let the click event propagate for links and buttons
          return;
        }
        element = element.parentElement as HTMLElement;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);

  return ref;
} 