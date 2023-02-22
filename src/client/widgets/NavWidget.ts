import { Direction, QBoxLayout, QPushButton, QWidget } from "@nodegui/nodegui";
import { events } from "../globals";

export default class NavWidget extends QWidget {
  private widgets = {
    peopleNavButton: new QPushButton(),
    colorSwitcherNavButton: new QPushButton(),
    simpleColorNavButton: new QPushButton()
  };

  private handlers = {
    onClickPeopleNav: async () => {
      events.emit("setView", 0);
    },

    onClickColorSwitcherNav: async () => {
      events.emit("setView", 1);
    },

    onClickSimpleColorNav: async () => {
      events.emit("setView", 2);
    }
  };

  private layouts = {
    rootLayout: new QBoxLayout(Direction.TopToBottom)
  };

  public constructor() {
    super();

    const { peopleNavButton, colorSwitcherNavButton, simpleColorNavButton } = this.widgets;
    const { onClickPeopleNav, onClickColorSwitcherNav, onClickSimpleColorNav } = this.handlers;
    const { rootLayout } = this.layouts;

    peopleNavButton.setText("People");
    peopleNavButton.addEventListener("clicked", onClickPeopleNav);

    colorSwitcherNavButton.setText("Color Switcher");
    colorSwitcherNavButton.addEventListener("clicked", onClickColorSwitcherNav);

    simpleColorNavButton.setText("Simple Color");
    simpleColorNavButton.addEventListener("clicked", onClickSimpleColorNav);

    rootLayout.addWidget(peopleNavButton);
    rootLayout.addWidget(colorSwitcherNavButton);
    rootLayout.addWidget(simpleColorNavButton);
    rootLayout.addStretch(1);

    this.setLayout(rootLayout);
  }
}
