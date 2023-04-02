import GeneralInput from "../../../components/GeneralInput";
import React, { useState } from "react";
import { Col, Toast, ToastContainer, Row, Card, Button } from "react-bootstrap";
import "./style.css";
import { postProduto, getAllProdutos } from "../../../services/produtos";

export default function ({ setProductList }) {
  const [dadosProduto, setDadosProduto] = useState({
    codigoBarras: "",
    nome: "",
    fabricante: "",
    categoria: "",
    preco: null,
    imagem: "",
    descricao: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showWarningDados, setShowWarningDados] = useState(false);

  const itemListCategorias = [
    "Frios",
    "Laticínios",
    "Bebidas alcoólicas",
    "Pães",
  ];

  const cadastrarProduto = async () => {
    setLoading(true);
    if (
      dadosProduto.codigoBarras &&
      dadosProduto.categoria &&
      dadosProduto.descricao &&
      dadosProduto.fabricante &&
      dadosProduto.imagem &&
      dadosProduto.nome &&
      dadosProduto.nome
    ) {
      const res = await postProduto(dadosProduto);
      if (res.success) {
        setShowSuccess(true);
        setDadosProduto({
          codigoBarras: "",
          nome: "",
          fabricante: "",
          categoria: "",
          preco: null,
          imagem: "",
          descricao: "",
        });
        const res = await getAllProdutos();
        if (res.success) {
          setProductList(res.data);
        }
      } else {
        setShowWarning(true);
      }
    } else {
      setShowWarningDados(true);
    }

    setLoading(false);
  };

  const formatReal = (number) => {
    let moeda = number.replace(/\D/g, "");
    moeda = moeda.padStart(3, "0");
    moeda = moeda = moeda.slice(0, -2) + "." + moeda.slice(-2);
    return moeda;
  };

  const handleChange = (e) => {
    if (e.target.name === "codigoBarras") {
      setDadosProduto({
        ...dadosProduto,
        [e.target.name]: e.target.value.replace(/\D/g, ""),
      });
    } else if (e.target.name === "preco") {
      setDadosProduto({
        ...dadosProduto,
        [e.target.name]: parseFloat(formatReal(e.target.value)).toFixed(2),
      });
    } else {
      setDadosProduto({ ...dadosProduto, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <Card className="p-2">
        <Card.Header as="h6">CADASTRAR NOVO PRODUTO:</Card.Header>
        <Card.Body>
          {loading ? null : (
            <>
              <Row className="Row">
                <Col sm={3}>
                  <GeneralInput
                    inputType="number"
                    label="Código de Barras"
                    value={dadosProduto.codigoBarras}
                    name="codigoBarras"
                    handleChange={handleChange}
                  />
                </Col>
                <Col>
                  <GeneralInput
                    inputType="text"
                    label="Nome do Produto"
                    value={dadosProduto.nome}
                    name="nome"
                    handleChange={handleChange}
                  />
                </Col>
                <Col sm={3}>
                  <GeneralInput
                    inputType="text"
                    label="Fabricante"
                    value={dadosProduto.fabricante}
                    name="fabricante"
                    handleChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="Row">
                <Col sm={2}>
                  <GeneralInput
                    inputType="select"
                    label="Categoria"
                    value={dadosProduto.categoria}
                    itemList={itemListCategorias}
                    name="categoria"
                    handleChange={handleChange}
                  />
                </Col>
                <Col sm={2}>
                  <GeneralInput
                    inputType="number"
                    label="Preço"
                    value={dadosProduto.preco}
                    name="preco"
                    handleChange={handleChange}
                  />
                </Col>
                <Col>
                  <GeneralInput
                    inputType="text"
                    label="Imagem URL"
                    value={dadosProduto.imagem}
                    name="imagem"
                    handleChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <GeneralInput
                    inputType="text"
                    label="Descrição"
                    value={dadosProduto.descricao}
                    name="descricao"
                    handleChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Button variant="primary" onClick={cadastrarProduto}>
                  Cadastrar
                </Button>
              </Row>
            </>
          )}
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
            Produto cadastrado com sucesso!
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
          <Toast.Body>Um erro ocorreu ao cadastrar o produto.</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer position={"top-center"}>
        <Toast
          onClose={() => setShowWarningDados(false)}
          show={showWarningDados}
          delay={2000}
          autohide
          bg="warning"
        >
          <Toast.Header>
            <strong className="me-auto">Atençao!</strong>
          </Toast.Header>
          <Toast.Body>Todos os campos devem estar preenchidos.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
