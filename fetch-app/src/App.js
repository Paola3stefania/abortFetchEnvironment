import { Button, Modal } from "antd";
import React, { useState } from "react";
import useFetch from "react-fetch-hook";
import "./App.css";

const App = () => {
  const [open, setOpen] = useState(false);
  const defaultUrl = "https://swapi.dev/api/people/1";
  const [url, useUrl] = useState(defaultUrl);
  const [fetchUrl, useFetchUrl] = useState(defaultUrl);

  const { isLoading, data, abort } = useFetch(fetchUrl, {
    abortController: true
  });

  const onSubmit = event => {
    console.log("Submitting...");
    useFetchUrl(event.target.url.value);

    event.preventDefault(); // 👈️ prevent page refresh
    // 👇️ clear all input values in the form
    useUrl("");
  };
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
          <form onSubmit={onSubmit}>
            <label htmlFor="url">URL to fetch:</label>
            <input
              id="url"
              type="text"
              name="url"
              onChange={event => useUrl(event.target.value)}
              placeholder={"Url to fetch"}
              value={url}
            />
            <button type="submit">Fecth Url</button>
          </form>
          <Button type="danger" onClick={() => abort()}>
            Abort
          </Button>
          <p>isLoading: {(isLoading && "true") || "false"}</p>
          <p>Name: {data && data.name}</p>
        </Modal>
      </main>
    </>
  );
};

export default App;
