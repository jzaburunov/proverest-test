import React from "react";
import { Grid, TableRowInterface } from "./Grid";

// TODO Use Cookie storage to store table
export const App: React.FC = () => {
  // 1) Use react-modal
  // 2) Use react-virtualized for a table
  // 3) Use cookies for buttons
  // 4) Use hooks
  const rowGetter = ({ index }: { index: number }): TableRowInterface => {
    return {
      _id: "foo",
      name: "name",
      phone: "999",
      email: "vaisya@gamil.com",
    };
  };

  return (
    <div>
      {/* TODO Pass handler to open modal cleared */}
      <div id="header">
        <button>Add Record</button>
      </div>
      {/* TODO Pass here records */}
      {/* TODO Pass handler to open modal with specific data */}
      <Grid rowGetter={rowGetter} length={2} />
      <div id="modal" />
    </div>
  );
};
