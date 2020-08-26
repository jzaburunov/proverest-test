import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button, Form } from "reactstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-tabs";
import UUID from "node-uuid";
import { Grid, TableRowInterface } from "./Grid";
import { useCookieRows } from "./useCookie";

export const App: React.FC = () => {
  const [rows, setRows] = useCookieRows([
    {
      _id: "foo",
      name: "name",
      phone: "999",
      email: "vaisya@gamil.com",
    },
  ]) as [TableRowInterface[], Function];
  const rowGetter = ({ index }: { index: number }): TableRowInterface => {
    return rows[index];
  };

  const [showModal, setModal] = useState(false);
  const toggleModal = () => setModal(!showModal);
  const [name, setName] = useState("name");
  const [phone, setPhone] = useState("phone");
  const [email, setEmail] = useState("email");
  const [id, setId] = useState("id");

  const addRow = (name: string, email: string, phone: string) => {
    rows.push({
      _id: UUID.v4(),
      name,
      email,
      phone,
    });
    setRows(rows.slice());
  };

  const updateRow = (
    name: string,
    email: string,
    phone: string,
    id: string
  ) => {
    const row = rows.find((f) => f._id === id);
    if (row) {
      row.email = email;
      row.name = name;
      row.phone = phone;
    }
    setRows(rows.slice());
  };

  const cleanTheForm = () => {
    setName("");
    setId("");
    setPhone("");
    setEmail("");
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    if (!id) {
      addRow(name, email, phone);
    } else {
      updateRow(name, email, phone, id);
    }

    cleanTheForm();
    toggleModal();
  };

  const openModalClear = () => {
    cleanTheForm();
    toggleModal();
  };

  const editHandler = ({ _id }: TableRowInterface) => {
    setId(_id);
    const row = rows.find((f) => f._id === _id);
    if (row) {
      setEmail(row.email);
      setName(row.name);
      setPhone(row.phone);
    }
    toggleModal();
  };

  const removeHandler = ({ _id }: TableRowInterface) => {
    const rowFiltered = rows.filter((f) => f._id !== _id);
    setRows(rowFiltered);
    cleanTheForm();
  };

  return (
    <div>
      <div id="header">
        <button onClick={openModalClear}>Add Record</button>
      </div>
      <Grid
        rowGetter={rowGetter}
        length={rows.length}
        editHandler={editHandler}
        removeHandler={removeHandler}
      />
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
                    name="id"
                    hidden
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
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
