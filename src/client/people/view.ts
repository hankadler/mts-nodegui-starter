import { Direction, QBoxLayout, QWidget } from "@nodegui/nodegui";
import Table from "./widgets/Table";
import ToolBar from "./widgets/ToolBar";

export default class PeopleWidget extends QWidget {
  private widgets = {
    peopleToolBar: new ToolBar(),
    peopleTable: new Table()
  };

  private layouts = {
    rootLayout: new QBoxLayout(Direction.TopToBottom)
  };

  public constructor() {
    super();

    const { peopleToolBar, peopleTable } = this.widgets;
    const { rootLayout } = this.layouts;

    rootLayout.addWidget(peopleToolBar);
    rootLayout.addWidget(peopleTable);

    this.setLayout(rootLayout);
  }
}
