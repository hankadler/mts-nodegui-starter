import { QIcon, QMainWindow, QStatusBar } from "@nodegui/nodegui";
import { createPixmap, loadStyle } from "../helpers";
import MenuBar from "./MenuBar";
import CentralWidget from "./CentralWidget";

const faviconPixmap = createPixmap("favicon.png");

export default class MainWindow extends QMainWindow {
  public constructor() {
    super();
    this.setMinimumWidth(1200);
    this.setWindowIcon(new QIcon(faviconPixmap));
    this.setWindowTitle("Quantitative Reflux");
    this.setStyleSheet(loadStyle("index.qss"));
    this.setMenuBar(new MenuBar());
    this.setCentralWidget(new CentralWidget());
    this.setStatusBar(new QStatusBar());
    this.showMaximized();
  }
}
