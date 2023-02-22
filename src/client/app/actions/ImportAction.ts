import { QAction, QMenu } from "@nodegui/nodegui";
import { execFileDialog } from "../../utils";

export default class ImportAction extends QAction {
  public constructor() {
    super();

    const importCSV = new QAction();
    importCSV.setText("&CSV...");
    importCSV.addEventListener("triggered", () => {
      const [csvFile] = execFileDialog("Studies CSV (*.csv)");
      console.log(csvFile); // todo: handle import
    });

    const importJSON = new QAction();
    importJSON.setText("&JSON...");
    importJSON.addEventListener("triggered", () => {
      const [jsonFile] = execFileDialog("Studies JSON (*.json)");
      console.log(jsonFile); // todo: handle import
    });

    const importMenu = new QMenu();
    importMenu.addAction(importCSV);
    importMenu.addAction(importJSON);

    this.setText("&Import");
    this.setMenu(importMenu);
  }
}
