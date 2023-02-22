import { AlignmentFlag, Direction, QBoxLayout, QDialog, QGridLayout, QIcon, QLabel, QWidget, WindowType } from "@nodegui/nodegui";
import { APP } from "../../../../config";
import { createPixmap } from "../../utils";

const caduceusSmallPixmap = createPixmap("caduceus-32x32.png");
const caduceusLargePixmap = createPixmap("caduceus-256x256.png");

export default class AboutDialog extends QDialog {
  constructor() {
    super();

    this.setWindowIcon(new QIcon(caduceusSmallPixmap));
    this.setWindowTitle("About");
    this.setWindowFlag(WindowType.WindowContextHelpButtonHint, false);

    // image
    const imageLabel = new QLabel();
    imageLabel.setPixmap(caduceusLargePixmap);

    // info
    const appLabel = new QLabel();
    appLabel.setText(APP.name);
    appLabel.setStyleSheet(`
      font-size: 18pt;
      font-weight: bold;
    `);

    const versionLabel = new QLabel();
    versionLabel.setText(`v${APP.version}`);
    versionLabel.setStyleSheet("color: rgba(0, 0, 0, 0.5);");

    const authorLabel = new QLabel();
    authorLabel.setText(`Author: <a href="${APP.author.url}">${APP.author.name}</a>`);
    authorLabel.setOpenExternalLinks(true);
    authorLabel.setStyleSheet("color: rgba(0, 0, 0, 0.5);");

    const infoLayout = new QBoxLayout(Direction.TopToBottom);
    infoLayout.addStretch(2);
    infoLayout.addWidget(appLabel);
    infoLayout.addWidget(versionLabel);
    infoLayout.addStretch(10);
    infoLayout.addWidget(authorLabel);
    infoLayout.addStretch(14);
    const infoWidget = new QWidget();
    infoWidget.setLayout(infoLayout);

    // copyright
    const copyrightLabel = new QLabel();
    copyrightLabel.setText(`Professional Hospital Guaynabo (C) ${new Date().getFullYear()}`);
    copyrightLabel.setAlignment(AlignmentFlag.AlignHCenter);
    copyrightLabel.setStyleSheet("color: rgba(0, 0, 0, 0.5);");

    const dialogLayout = new QGridLayout();
    dialogLayout.addWidget(imageLabel, 0, 0);
    dialogLayout.addWidget(infoWidget, 0, 1);
    dialogLayout.addWidget(copyrightLabel, 1, 0, 1, 2);
    this.setLayout(dialogLayout);
  }
}
