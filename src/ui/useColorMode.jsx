import { useEffect, useState } from "react";
import { getFromLocalStorage, setFromLocalStorage } from "../utils";

const useColorMode = () => {
  const [colorMode, setColorMode] = useState(() => {
    const value = getFromLocalStorage("color-theme", "light");
    return value;
  });

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
    setFromLocalStorage("color-theme", colorMode);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
