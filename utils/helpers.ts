import { Hotels } from "./types";

export function formatStringDataToArray(data: string) : Hotels {
    const formattedResults : Array<string> = [...data.slice(0, -7)];
    formattedResults.push("]");
    return JSON.parse(formattedResults.join(""));
  }
  