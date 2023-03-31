import GeneralInput from "../../../components/GeneralInput";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const handleChange = () => {};

export default function Filter() {
  const itemListCategorias = [
    "Frios",
    "Laticínios",
    "Bebidas alcoólicas",
    "Pães",
  ];
  const itemListOrdenacoes = ["Maior preço", "Menor preço", "Nome"];
  return (
    <Card className="p-2">
      <Card.Header as="h6">Filtros:</Card.Header>
      <Card.Body>
        <Row className="Row">
          <Col sm={6}>
            <GeneralInput
              inputType="select"
              label="Categoria"
              placeholder=""
              itemList={itemListCategorias}
              id="Vendedor"
              handleChange={handleChange}
            />
          </Col>
          <Col sm={6}>
            <GeneralInput
              inputType="select"
              label="Ordenar por:"
              placeholder=""
              itemList={itemListOrdenacoes}
              id="Vendedor"
              handleChange={handleChange}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
