import { useEffect } from "react";

export const useEvent = (event, handler, passive = false) => {
  useEffect(() => {
    window.addEventListener(event, handler, passive);

    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
};

export const getColors = (num) => {
  switch (num) {
    case 2:
      return '#eee4da';
    case 4:
      return '#ede0c8';
    case 8:
      return '#f2b179';
    case 16:
      return '#f59563';
    case 32:
      return '#f67c5f';
    case 64:
      return '#f65e3b';
    case 128:
      return '#edcf72';
    case 256:
      return '#edcc61';
    case 512:
      return '#5f9ea0';
    case 1024:
      return '#5f70a0';
    case 2048:
      return '#a05f85';
    default:
      return '#eee4da59';
  };
};
