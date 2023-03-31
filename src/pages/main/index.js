import Header from "../../components/Header";
import RegisterNewFault from "./RegisterNewFault";
import React from "react";
import TableFalta from "./TableFalta";
import Filter from "./Filter";
export default function FaltasScreen() {
  return (
    <>
      <Header />
      <RegisterNewFault />
      <Filter />
      <TableFalta />
    </>
  );
}
