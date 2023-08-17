import { useEffect, useState } from "react";

const useColorMode = () => {
  //   const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');
  const [colorMode, setColorMode] = useState(() => {
    const value = localStorage.getItem("color-theme", "dark");
    return value;
  });

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
    localStorage.setItem("color-theme", colorMode);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
