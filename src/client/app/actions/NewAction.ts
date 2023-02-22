import { QAction, QKeySequence } from "@nodegui/nodegui";

export default class NewAction extends QAction {
  constructor() {
    super();
    this.setText("&New");
    this.setShortcut(new QKeySequence("Ctrl+N"));
    this.addEventListener("triggered", async () => console.log("New..."));
  }
}
