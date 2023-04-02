import RegisterNewProduct from "../cadastro/RegisterNewProduct";
import EditProduct from "../cadastro/EditProduct";
import RemoveProduct from "../cadastro/RemoveProduct";
import Header from "../../components/Header";
import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAllProdutos } from "../../services/produtos";

export default function NewProductScreen() {
  const [productList, setProductList] = useState([]);
  const loadAllProducts = async () => {
    const res = await getAllProdutos();
    if (res.success) {
      setProductList(res.data);
    }
  };

  useEffect(() => {
    console.log("main");
    loadAllProducts();
  }, []);
  return (
    <>
      <Header />
      <Tabs
        defaultActiveKey="NovoProduto"
        id="justify-tab-example"
        className="mb-3"
        justify
        style={{ marginTop: "20px" }}
      >
        <Tab eventKey="NovoProduto" title="Novo Produto">
          <RegisterNewProduct
            productList={productList}
            setProductList={setProductList}
          />
        </Tab>
        <Tab eventKey="EditarProduto" title="Editar Produto">
          <EditProduct
            productList={productList}
            setProductList={setProductList}
          />
        </Tab>
        <Tab eventKey="ExcluirProduto" title="Excluir Produto">
          <RemoveProduct
            productList={productList}
            setProductList={setProductList}
          />
        </Tab>
      </Tabs>
    </>
  );
}
