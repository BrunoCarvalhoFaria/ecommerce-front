import GeneralInput from "../../../components/GeneralInput";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getProdutoFiltrado } from "../../../services/produtos";

export default function Filter({ setRows }) {
  const [filter, setFilter] = useState({ categoria: "", ordenar: "" });
  const itemListCategorias = [
    "Frios",
    "Laticínios",
    "Bebidas alcoólicas",
    "Pães",
  ];
  const itemListOrdenacoes = ["Maior preço", "Menor preço", "Nome"];

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filtrarProdutos = async (filter) => {
    const res = await getProdutoFiltrado(filter);
    if (res.success) {
      setRows(res.data);
    }
  };

  useEffect(() => {
    filtrarProdutos(filter);
  }, [filter]);

  return (
    <Card className="p-2">
      <Card.Header as="h6">Filtros:</Card.Header>
      <Card.Body>
        <Row style={{ minHeight: "100px" }}>
          <Col sm={6}>
            <GeneralInput
              inputType="select"
              label="Categoria"
              placeholder=""
              itemList={itemListCategorias}
              name="categoria"
              handleChange={handleChange}
            />
          </Col>
          <Col sm={6}>
            <GeneralInput
              inputType="select"
              label="Ordenar por:"
              placeholder=""
              itemList={itemListOrdenacoes}
              name="ordenar"
              handleChange={handleChange}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
