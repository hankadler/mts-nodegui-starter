import { Direction, QBoxLayout, QPushButton, QStackedWidget, QWidget } from "@nodegui/nodegui";
import ColorWidget from "./ColorWidget";

export default class ColorSwitcherWidget extends QWidget {
  private state = {
    index: 0
  };

  private widgets = {
    stackedWidget: new QStackedWidget(),
    redWidget: new ColorWidget("red"),
    blueWidget: new ColorWidget("blue"),
    button: new QPushButton()
  };

  private handlers = {
    onClick: async () => {
      let { index } = this.state;
      if (index === 0) {
        index = 1;
      } else if (index === 1) {
        index = 0;
      }
      this.state.index = index;
      this.widgets.stackedWidget.setCurrentIndex(index);
    }
  };

  private layouts = {
    layout: new QBoxLayout(Direction.TopToBottom)
  };

  public constructor() {
    super();

    const { stackedWidget, redWidget, blueWidget, button } = this.widgets;
    const { layout } = this.layouts;
    const { onClick } = this.handlers;

    button.setText("Click");
    button.addEventListener("clicked", onClick);

    stackedWidget.addWidget(redWidget);
    stackedWidget.addWidget(blueWidget);

    layout.addWidget(stackedWidget);
    layout.addWidget(button);

    this.setLayout(layout);
  }
}
