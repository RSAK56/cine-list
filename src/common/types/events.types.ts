//  Search
import { FormEvent, KeyboardEvent } from "react";

// Type union for the events
export type TSearchEvent =
  | FormEvent<HTMLFormElement>
  | KeyboardEvent<HTMLInputElement>;
