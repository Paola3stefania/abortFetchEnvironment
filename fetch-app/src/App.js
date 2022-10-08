import { Button, Modal } from "antd";
import React, { useState } from "react";
import useFetch from "react-fetch-hook";
import "./App.css";

const App = () => {
  const [open, setOpen] = useState(false);
  const fetchUrl = "https://swapi.dev/api/people/1";
  const { isLoading, data, error, abort } = useFetch(fetchUrl, {
    abortController: true
  });
  return (
    <>
      <main className="App">
        <Button
          type="primary"
          onClick={() => setOpen(true)}
          className="MainButton"
        >
          View Example
        </Button>
        <Modal
          title="View Example"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <p>isLoading: {(isLoading && "true") || "false"}</p>
          <p>Name: {data && data.name}</p>
          <Button type="danger" onClick={() => abort()}>
            Abort
          </Button>
        </Modal>
      </main>
    </>
  );
};

export default App;
