import { QAction, QMenu } from "@nodegui/nodegui";

export default class ExportAction extends QAction {
  public constructor() {
    super();

    const exportCSV = new QAction();
    exportCSV.setText("&CSV...");
    exportCSV.addEventListener("triggered", () => console.log("Export CSV"));

    const exportJSON = new QAction();
    exportJSON.setText("&JSON...");
    exportJSON.addEventListener("triggered", () => console.log("Export JSON"));

    const exportPDF = new QAction();
    exportPDF.setText("&PDF...");
    exportPDF.addEventListener("triggered", () => console.log("Export PDF"));

    const exportMenu = new QMenu();
    exportMenu.addAction(exportCSV);
    exportMenu.addAction(exportJSON);
    exportMenu.addAction(exportPDF);

    this.setText("&Export");
    this.setMenu(exportMenu);
  }
}
