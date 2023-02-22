import EventEmitter from "events";
import MainWindow from "./view";

export const events = new EventEmitter();

export const windows = {
  main: new MainWindow()
};
