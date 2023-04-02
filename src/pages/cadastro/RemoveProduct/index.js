import GeneralInput from "../../../components/GeneralInput";
import React, { useEffect, useState } from "react";
import { Col, Toast, ToastContainer, Row, Card, Button } from "react-bootstrap";

import "./style.css";
import { postProduto, deleteProduct } from "../../../services/produtos";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getAllProdutos, putProduct } from "../../../services/produtos";
import { confirmDialog } from "../../../components/SweetAlerts";

export default function ({ productList, setProductList }) {
  const [productSelected, setProductSelected] = useState({
    codigoBarras: "",
    nome: "",
    fabricante: "",
    categoria: "",
    preco: null,
    imagem: "",
    descricao: "",
  });

  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const itemListCategorias = [
    "Frios",
    "Laticínios",
    "Bebidas alcoólicas",
    "Pães",
  ];

  const handleChange = (e) => {
    if (e.target.name === "codigoBarras") {
      setProductSelected({
        ...productSelected,
        [e.target.name]: e.target.value.replace(/\D/g, ""),
      });
    } else if (e.target.name === "preco") {
      setProductSelected({
        ...productSelected,
        [e.target.name]: Number(
          e.target.value.replace(/\D/g, "").replace(/(\d{1,2})$/, ".$1")
        ),
      });
    } else {
      setProductSelected({
        ...productSelected,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSelect = (e) => {
    let _productSelected = productList.filter(
      (item) => item.nome === e.target.value
    );
    if (_productSelected[0]) {
      setProductSelected(_productSelected[0]);
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  const RemoveProductConfirm = async () => {
    confirmDialog(
      "Atenção",
      "Tem certeza que deseja excluir o produto?",
      async () => {
        const res = await deleteProduct(productSelected._id);
        if (res.success) {
          await loadAllProducts();
          setShowSuccess(true);
          setProductSelected({
            codigoBarras: "",
            nome: "",
            fabricante: "",
            categoria: "",
            preco: null,
            imagem: "",
            descricao: "",
          });
          setSelected(false);
        } else {
          setShowWarning(true);
        }
      },
      () => {}
    );
  };

  const loadAllProducts = async () => {
    const res = await getAllProdutos();
    if (res.success) {
      setProductList(res.data);
      let _options = res.data.map((item) => item.nome);
      setOptions(_options);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, [selected]);
  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <>
      <Card className="p-2">
        <Card.Header as="h6">EDITAR PRODUTO:</Card.Header>
        <Card.Body>
          <>
            <Autocomplete
              name="nome"
              noOptionsText="Nenhum resultado encontrado."
              onInputChange={(e, value) => {
                if (value === "") {
                  setSelected(false);
                }
              }}
              freeSolo
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Nome do Produto" />
              )}
              onSelect={handleSelect}
            />
            {loading || !selected ? null : (
              <>
                <Row className="Row">
                  <Col sm={3}>
                    <GeneralInput
                      inputType="number"
                      label="Código de Barras"
                      value={productSelected.codigoBarras}
                      name="codigoBarras"
                      handleChange={handleChange}
                      disabled
                    />
                  </Col>
                  <Col>
                    <GeneralInput
                      inputType="text"
                      label="Nome do Produto"
                      value={productSelected.nome}
                      name="nome"
                      handleChange={handleChange}
                      disabled
                    />
                  </Col>
                  <Col sm={3}>
                    <GeneralInput
                      inputType="text"
                      label="Fabricante"
                      value={productSelected.fabricante}
                      name="fabricante"
                      handleChange={handleChange}
                      disabled
                    />
                  </Col>
                </Row>
                <Row className="Row">
                  <Col sm={2}>
                    <GeneralInput
                      inputType="select"
                      label="Categoria"
                      value={productSelected.categoria}
                      itemList={itemListCategorias}
                      name="categoria"
                      handleChange={handleChange}
                      disabled
                    />
                  </Col>
                  <Col sm={2}>
                    <GeneralInput
                      inputType="number"
                      label="Preço"
                      value={productSelected.preco}
                      name="preco"
                      handleChange={handleChange}
                      disabled
                    />
                  </Col>
                  <Col>
                    <GeneralInput
                      inputType="text"
                      label="Imagem URL"
                      value={productSelected.imagem}
                      name="imagem"
                      handleChange={handleChange}
                      disabled
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <GeneralInput
                      inputType="text"
                      label="Descrição"
                      value={productSelected.descricao}
                      name="descricao"
                      handleChange={handleChange}
                      disabled
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Button variant="primary" onClick={RemoveProductConfirm}>
                    Excluir
                  </Button>
                </Row>
              </>
            )}
          </>
        </Card.Body>
      </Card>
      <ToastContainer position={"top-center"}>
        <Toast
          onClose={() => setShowSuccess(false)}
          show={showSuccess}
          delay={2000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Sucesso!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Produto excluído com sucesso!
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer position={"top-center"}>
        <Toast
          onClose={() => setShowWarning(false)}
          show={showWarning}
          delay={2000}
          autohide
          bg="warning"
        >
          <Toast.Header>
            <strong className="me-auto">Atençao!</strong>
          </Toast.Header>
          <Toast.Body>Um erro ocorreu ao excluir o produto.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
