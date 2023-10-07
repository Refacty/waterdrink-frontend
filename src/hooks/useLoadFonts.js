import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Lato_900Black, Lato_100Thin } from '@expo-google-fonts/lato';

const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFontsAsync = async () => {
    await Promise.all([
      Lato_900Black.loadAsync(),
      Lato_100Thin.loadAsync(),
    ]);
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFontsAsync();
  }, []); // Chamado uma vez ao montar o componente

  return { fontsLoaded };
}

export default useLoadFonts;
