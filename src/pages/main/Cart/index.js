import GeneralInput from "../../../components/GeneralInput";
import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button, Accordion, Form } from "react-bootstrap";
import GeneralTable from "../../../components/GeneralTable";

import { GiShoppingCart } from "@react-icons/all-files/gi/GiShoppingCart";

import {
  getCart,
  putProductCart,
  deleteCart,
} from "../../../services/carrinho";

import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";

export default function Cart({ cart, setCart }) {
  const [atualizar, setAtualizar] = useState(0);

  const PrecoItem = (row) => {
    if (row.preco) {
      return <span>{`R$ ${row.preco.toFixed(2)}`}</span>;
    }
    return null;
  };

  const QuantidadeItem = (row) => {
    const [rowQuantidade, setRowQuantidade] = useState(row.quantidade);

    const handleChange = async (e) => {
      if (e.target.value < 0) {
        return;
      }
      const index = cart.items.findIndex((item) => item.nome === row.nome);
      let _cart = cart;
      _cart.items[index].quantidade = e.target.value;

      const res = await putProductCart(_cart);
      if (res.success) {
        setRowQuantidade(e.target.value);
        let _atualizar = Number(atualizar) + 1;
        setAtualizar(_atualizar);
      }
    };

    return (
      <div style={{ display: "flex" }}>
        <Form.Group className="sm-1">
          <Form.Control
            size="sm"
            type="number"
            placeholder="Qtd."
            style={{ width: "50px" }}
            value={rowQuantidade}
            onChange={handleChange}
          />
        </Form.Group>
        <span style={{ marginLeft: "10px", width: "20px" }}>un</span>
      </div>
    );
  };

  const PrecoTotal = (row) => {
    if (row) {
      let precoTotal = row.preco * row.quantidade;
      return <span>{`R$ ${precoTotal.toFixed(2)}`}</span>;
    }
    return null;
  };

  const Excluir = (row) => {
    const excluirProduto = async () => {
      const res = await deleteCart(row.productId);
      if (res.success) {
        let _atualizar = Number(atualizar) + 1;
        setAtualizar(_atualizar);
      }
    };
    return (
      <MdDeleteForever
        onClick={excluirProduto}
        style={{ fontSize: "24px", color: "#0D6EFD", cursor: "pointer" }}
      />
    );
  };

  const columns = [
    { field: "nome", minWidth: 250 },
    { field: "Component", component: PrecoItem, width: 80 },
    { field: "Component", component: QuantidadeItem, width: 80 },
    { field: "Component", component: PrecoTotal, width: 100 },
    { field: "Component", component: Excluir, width: 100 },
  ];

  const loadCart = async () => {
    const res = await getCart();
    if (res.success) {
      setCart(res.data);
    }
  };

  useEffect(() => {
    loadCart();
    console.log("chegou aqui", cart);
  }, [atualizar]);

  return (
    <Card className="p-2">
      <Card.Header as="h6">Carrinho:</Card.Header>
      <Card.Body>
        <Row style={{ height: "100px" }}>
          <Col sm={12}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <GiShoppingCart
                    style={{
                      fontSize: "80px",
                      color: "#0D6EFD",
                      marginRight: "20px",
                    }}
                  />
                  <div>
                    <h5>Valor total:</h5>
                    {cart.total ? (
                      <h2>{`R$ ${cart.total.toFixed(2)}`}</h2>
                    ) : (
                      <h2>{`R$ 0,00`}</h2>
                    )}
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {cart.total !== 0 ? (
                    <GeneralTable
                      columns={columns}
                      rows={cart.items}
                      editRow={() => {}}
                    />
                  ) : null}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
