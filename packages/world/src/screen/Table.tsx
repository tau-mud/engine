import React, { PropsWithChildren, createContext } from "react";
import CLITable, {
  CellOptions,
  HorizontalAlignment,
  TableOptions,
  VerticalAlignment,
} from "cli-table3";
import { Box } from "./Box";
import { Text } from "./Text";

export interface IScreenTableProps {
  data: Array<any>;
  truncate?: string;
  colWidths?: Array<number | null>;
  rowHeights?: Array<number | null>;
  colAligns?: HorizontalAlignment[];
  rowAligns?: VerticalAlignment[];
  head?: string[];
  wordWrap?: boolean;
  wrapOnWordBoundary?: boolean;
}

/**
 * @private
 */
export const TableContext = createContext({});

export const Table = (props: IScreenTableProps) => {
  const { data, ...rest } = props;

  const table = new CLITable(rest);

  data.forEach((row: any) => {
    table.push(row);
  });

  return (
    <Box>
      <Text>{table.toString()}</Text>
    </Box>
  );
};
