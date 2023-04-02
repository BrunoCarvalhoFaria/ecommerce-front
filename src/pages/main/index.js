import Header from "../../components/Header";
import React from "react";
import TableProducts from "./TableProducts";
import Filter from "./Filter";
import Cart from "./Cart";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getCart, postCart } from "../../services/carrinho";
export default function MainScreen() {
  const [rows, setRows] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });

  const loadCart = async () => {
    const res = await getCart();
    if (res.success) {
      setCart(res.data);
    }
  };

  const startCart = async () => {
    await postCart();
  };

  useEffect(() => {
    loadCart();
    //startCart();
  }, []);

  return (
    <>
      <Header />
      <Row>
        <Col sm={6}>
          <Filter setRows={setRows} />
        </Col>
        <Col sm={6}>
          <Cart cart={cart} setCart={setCart} />
        </Col>
      </Row>
      <TableProducts
        setRows={setRows}
        rows={rows}
        cart={cart}
        setCart={setCart}
      />
    </>
  );
}
