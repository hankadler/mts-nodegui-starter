import fs from "fs";

const parseOperations = (operationsFilePath: string): Record<string, string> => {
  const operationsArray = fs.readFileSync(operationsFilePath, "utf-8").split("\n\n");
  const operationsObject: Record<string, string> = {};

  operationsArray.forEach((operation) => {
    if (operation) {
      const name = operation.match(/^(?:query|mutation)\s+(\w*)/)![1];
      operationsObject[name] = operation;
    }
  });

  return operationsObject;
};

export default parseOperations;
