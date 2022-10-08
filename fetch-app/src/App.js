import { Button, Input, Modal, Table, Tag, Space } from "antd";
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

  const handleOnClick = event => {
    console.log("ReFetching");
    useFetchUrl(url);
    event.preventDefault(); // 👈️ prevent page refresh
    //useUrl("");
  };

  const dataSource = [
    { name: data && data.name, isLoading: (isLoading && "TRUE") || "FALSE" }
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: data => <p>{data}</p>
    },

    {
      title: "Loading",
      key: "isLoading",
      dataIndex: "isLoading",
      render: isLoading => (
        <Tag color={isLoading === "TRUE" ? "green" : "red"} key={isLoading}>
          {isLoading}
        </Tag>
      )
    }
  ];

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
          onOk={() => {
            setOpen(false);
            abort && abort();
          }}
          onCancel={() => {
            setOpen(false);
            abort && abort();
          }}
          width={1000}
        >
          <Space>
            <Input
              id="url"
              type="text"
              name="url"
              style={{ width: "30rem" }}
              onChange={event => useUrl(event.target.value)}
              onPressEnter={event => useUrl(event.target.value)}
              placeholder={"Url to fetch"}
              value={url}
            />
            <Button type="primary" onClick={handleOnClick}>
              Fecth Url
            </Button>
            <Button type="danger" onClick={() => abort()}>
              Abort
            </Button>
          </Space>
          <Table
            className="Table"
            pagination={false}
            columns={columns}
            dataSource={dataSource}
          />
        </Modal>
      </main>
    </>
  );
};

export default App;
