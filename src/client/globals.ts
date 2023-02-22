import EventEmitter from "events";
import MainWindow from "./widgets/MainWindow";
import { Person } from "../schema/Person/types";

export const events = new EventEmitter();

export const windows = {
  main: new MainWindow()
};

export const store = {
  people: [] as Person[]
};
