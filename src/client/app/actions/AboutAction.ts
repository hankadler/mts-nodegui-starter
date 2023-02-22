import { QAction } from "@nodegui/nodegui";
import AboutDialog from "../widgets/AboutDialog";

export default class AboutAction extends QAction {
  constructor() {
    super();
    this.setText("&About...");
    const aboutDialog = new AboutDialog();
    this.addEventListener("triggered", async () => aboutDialog.exec());
  }
}
