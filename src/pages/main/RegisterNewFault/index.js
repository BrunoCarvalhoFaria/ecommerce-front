import GeneralInput from "../../../components/GeneralInput";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./style.css";

export default function RegisterNewFault() {
  const itemListPago = ["Não", "Sim", "Parcial"];
  const itemListTipo = ["Divida", "Procura"];
  const itemListVendedor = ["Vendedor 1", "Vendedor 2", "Vendedor 3"];

  const handleChange = () => {};
  return (
    <>
      <Card className="p-2">
        <Card.Header as="h6">INSERIR FALTA/DIVIDA:</Card.Header>
        <Card.Body>
          <Row className="Row">
            <GeneralInput
              inputType="radio"
              label=""
              placeholder=""
              itemList={itemListTipo}
              id="procuraDivida"
              handleChange={handleChange}
            />
          </Row>
          <Row className="Row">
            <Col sm={3}>
              <GeneralInput
                inputType="number"
                label="Código de Barras"
                placeholder=""
                id="CodigoBarras"
                handleChange={handleChange}
              />
            </Col>
            <Col>
              <GeneralInput
                inputType="text"
                label="Nome do Produto"
                placeholder=""
                id="NomeProduto"
                handleChange={handleChange}
              />
            </Col>
            <Col sm={3}>
              <GeneralInput
                inputType="text"
                label="Laboratório"
                placeholder=""
                id="Laboratorio"
                handleChange={handleChange}
              />
            </Col>
            <Col sm={1}>
              <GeneralInput
                inputType="number"
                label="Qtd"
                placeholder=""
                id="Qtd"
                handleChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="Row">
            <Col>
              <GeneralInput
                inputType="text"
                label="Nome do Cliente"
                placeholder=""
                id="NomeCliente"
                handleChange={handleChange}
              />
            </Col>
            <Col sm={3}>
              <GeneralInput
                inputType="phone"
                label="Telefone"
                placeholder=""
                id="Telefone"
                handleChange={handleChange}
              />
            </Col>
            <Col sm={2}>
              <GeneralInput
                inputType="select"
                label="Pago?"
                placeholder=""
                itemList={itemListPago}
                id="Pago"
                handleChange={handleChange}
              />
            </Col>
            <Col sm={2}>
              <GeneralInput
                inputType="select"
                label="Vendedor"
                placeholder=""
                itemList={itemListVendedor}
                id="Vendedor"
                handleChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Button variant="primary">INSERIR</Button>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
