import { FileMode, QFileDialog } from "@nodegui/nodegui";

const execFileDialog = (nameFilter: string): string[] => {
  const fileDialog = new QFileDialog();
  fileDialog.setFileMode(FileMode.ExistingFile);
  fileDialog.setNameFilter(nameFilter); // i.e. "Images (*.jpg *.png)"
  fileDialog.exec();

  return fileDialog.selectedFiles();
};

export default execFileDialog;
