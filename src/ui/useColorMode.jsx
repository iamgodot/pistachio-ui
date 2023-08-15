import { useEffect, useState } from "react";

const useColorMode = () => {
  //   const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');
  const [colorMode, setColorMode] = useState("dark");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
