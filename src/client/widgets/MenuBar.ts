import { QMenu, QMenuBar } from "@nodegui/nodegui";
import NewAction from "../actions/NewAction";
import ImportAction from "../actions/ImportAction";
import ExportAction from "../actions/ExportAction";
import AboutAction from "../actions/AboutAction";

export default class MenuBar extends QMenuBar {
  private menus = {
    fileMenu: new QMenu(),
    helpMenu: new QMenu()
  };

  private actions = {
    // file
    newAction: new NewAction(),
    importAction: new ImportAction(),
    exportAction: new ExportAction(),

    // help
    aboutAction: new AboutAction()
  };

  public constructor() {
    super();

    const { fileMenu, helpMenu } = this.menus;
    const { newAction, importAction, exportAction, aboutAction } = this.actions;

    fileMenu.setTitle("&File");
    fileMenu.addAction(newAction);
    fileMenu.addSeparator();
    fileMenu.addAction(importAction);
    fileMenu.addAction(exportAction);

    helpMenu.setTitle("&Help");
    helpMenu.addAction(aboutAction);

    this.addMenu(fileMenu);
    this.addMenu(helpMenu);
  }
}
