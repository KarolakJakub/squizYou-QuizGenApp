import React from "react";
import results from "../data/results.json";

export const ResultContext = React.createContext(results);

export const ResultProvider = ResultContext.Provider;
export const ResultConsumer = ResultContext.Consumer;
