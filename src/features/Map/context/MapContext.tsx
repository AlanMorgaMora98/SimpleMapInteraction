import { useContext } from "react";
import { MapContext } from "./MapProvider";

export const useMapContext = () => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("useMapContext is not allowed");
  return ctx;
};
