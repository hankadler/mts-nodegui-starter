import { Direction, QBoxLayout, QWidget } from "@nodegui/nodegui";
import PeopleTable from "./PeopleTable";
import PeopleToolBar from "./PeopleToolBar";

export default class PeopleWidget extends QWidget {
  private widgets = {
    peopleToolBar: new PeopleToolBar(),
    peopleTable: new PeopleTable()
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
