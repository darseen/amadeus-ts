import { HOSTS, RECOGNIZED_OPTIONS } from "../../../constants";
import { Network } from "../../amadeus";

export type RecognizedOptionsArray = typeof RECOGNIZED_OPTIONS;
export type RecognizedOptionsItem = (typeof RECOGNIZED_OPTIONS)[number];
type Hosts = typeof HOSTS.test | typeof HOSTS.production;

export type Fallback =
  | "silent"
  | "test"
  | Hosts
  | number
  | boolean
  | Console
  | Network
  | undefined;
