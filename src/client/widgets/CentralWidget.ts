import { Direction, QBoxLayout, QStackedWidget, QWidget } from "@nodegui/nodegui";
import { events } from "../globals";
import NavWidget from "./NavWidget";
import ColorSwitcherWidget from "./ColorSwitcherWidget";
import ColorWidget from "./ColorWidget";
import PeopleWidget from "./PeopleWidget";

export default class CentralWidget extends QWidget {
  private widgets = {
    navWidget: new NavWidget(),
    stackedWidget: new QStackedWidget()
  };

  private handlers = {
    onSetView: async (index: number) => {
      this.widgets.stackedWidget.setCurrentIndex(index);
    }
  };

  private layouts = {
    layout: new QBoxLayout(Direction.LeftToRight)
  };

  public constructor() {
    super();

    const { navWidget, stackedWidget } = this.widgets;
    const { onSetView } = this.handlers;
    const { layout } = this.layouts;

    stackedWidget.addWidget(new PeopleWidget());
    stackedWidget.addWidget(new ColorSwitcherWidget());
    stackedWidget.addWidget(new ColorWidget("green"));

    events.on("setView", onSetView);

    layout.addWidget(navWidget, 0);
    layout.addWidget(stackedWidget, 1);

    this.setLayout(layout);
  }
}
