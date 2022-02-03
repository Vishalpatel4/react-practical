import React, { useState } from "react";
import Nav from "../layout/Nav";
import App from "../layout/App";

const Index = () => {

  const [listData, setListData] = useState([]);

  const onSubmit = (e) => {
    const text = e.target.value
    text = document.getElementById("task_input").value
    console.log(text)
  }
  return (
    <>
      <Nav />
      <App />
    </>
  );
}

export default Index;
