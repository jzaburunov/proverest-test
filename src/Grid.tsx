import React, { CSSProperties } from "react";
import { AutoSizer, Table, Column, TableCellProps } from "react-virtualized";

export const planeFormatter: React.FC<TableCellProps> = ({ cellData }) => (
  <span>{cellData}</span>
);

export interface TableRowInterface {
  _id: string;
  phone: string;
  email: string;
  name: string;
}

interface GridInterface extends React.HTMLAttributes<HTMLDivElement> {
  rowGetter({ index }: { index: number }): TableRowInterface;
  editHandler(data: TableRowInterface): void;
  length: number;
}

export const Grid: React.FC<GridInterface> = (props) => {
  const { rowGetter, length, editHandler } = props;

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          headerHeight={50}
          height={1000}
          autoHeight
          rowGetter={rowGetter}
          rowHeight={100}
          rowCount={length}
          width={width}
          headerStyle={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: "none",
          }}
          rowStyle={({ index }): CSSProperties => {
            let styles: CSSProperties = {
              fontWeight: "normal",
              borderBottom: "1px solid #e2ebf5",
            };
            return styles;
          }}
        >
          <Column
            label="Name"
            dataKey="name"
            cellRenderer={planeFormatter}
            width={240}
            flexGrow={1}
          />
          <Column
            label="Email"
            dataKey="email"
            cellRenderer={planeFormatter}
            width={210}
          />
          <Column
            label="Phone"
            dataKey="phone"
            cellRenderer={planeFormatter}
            width={240}
          />
          <Column
            label=""
            dataKey="delete"
            cellRenderer={({ rowData }) => (
              <>
                <button onClick={() => editHandler(rowData)}>Edit</button>
                <button>Remove</button>
              </>
            )}
            width={300}
            disableSort
          />
        </Table>
      )}
    </AutoSizer>
  );
};
