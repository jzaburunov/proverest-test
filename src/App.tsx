import React, { useState } from "react";
import { Grid, TableRowInterface } from "./Grid";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-tabs";

// TODO Use Cookie storage to store table
export const App: React.FC = () => {
  // 1) Use react-modal
  // 2) Use react-virtualized for a table
  // 3) Use cookies for buttons
  // 4) Use hooks

  const [rows, setRows] = useState([
    {
      _id: "foo",
      name: "name",
      phone: "999",
      email: "vaisya@gamil.com",
    },
  ]);
  const rowGetter = ({ index }: { index: number }): TableRowInterface => {
    return rows[index];
  };

  const [showModal, setModal] = useState(false);
  const toggleModal = () => setModal(!showModal);

  return (
    <div>
      {/* TODO Pass handler to open modal cleared */}
      <div id="header">
        <button onClick={toggleModal}>Add Record</button>
      </div>
      {/* TODO Pass here records */}
      {/* TODO Pass handler to open modal with specific data */}
      <Grid rowGetter={rowGetter} length={rows.length} />
      <Modal isOpen={showModal} toggle={toggleModal} className="modal-lg">
        <ModalBody>
          {/* TODO Add form */}
          <form>
            <Tabs>
              <div
                id="title-section"
                className="sub-tabs d-flex justify-content-center"
              >
                <TabList>
                  <Tab>Name</Tab>
                  <Tab>Email</Tab>
                  <Tab>Phone</Tab>
                </TabList>
              </div>
              <div id="form-container">
                <TabPanel>
                  <input name="name" value="name" />
                </TabPanel>
                <TabPanel>
                  <input name="email" value="email" />
                </TabPanel>
                <TabPanel>
                  <input name="phone" value="phone" />
                </TabPanel>
              </div>
            </Tabs>
          </form>
        </ModalBody>
        <ModalFooter>
          {/* TODO Add handler */}
          <Button>Add Record</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
