import React, { useState } from "react";
import { Grid, TableRowInterface } from "./Grid";
import { Modal, ModalBody, ModalFooter, Button, Form } from "reactstrap";
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
  const [name, setName] = useState("name");
  const [phone, setPhone] = useState("phone");
  const [email, setEmail] = useState("email");

  const submitForm = (e: any) => {
    e.preventDefault();
    console.log("here", name, email, phone);
    // TODO Add / Edit row
  };

  const openModalClear = () => {
    setName("");
    setPhone("");
    setEmail("");
    toggleModal();
  };

  return (
    <div>
      {/* TODO Pass handler to open modal cleared */}
      <div id="header">
        <button onClick={openModalClear}>Add Record</button>
      </div>
      {/* TODO Pass handler to open modal with specific data */}
      <Grid rowGetter={rowGetter} length={rows.length} />
      <Modal isOpen={showModal} toggle={toggleModal} className="modal-lg">
        <Form onSubmit={submitForm}>
          <ModalBody>
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
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </TabPanel>
                <TabPanel>
                  <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </TabPanel>
                <TabPanel>
                  <input
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </TabPanel>
              </div>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button>Add Record</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};
