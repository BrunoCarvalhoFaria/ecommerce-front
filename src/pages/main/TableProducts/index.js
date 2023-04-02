import * as React from "react";
import { useState, useEffect } from "react";
import GeneralTable from "../../../components/GeneralTable";
import {
  Button,
  Modal,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Form,
  Row,
  Col,
  Image,
  ModalFooter,
} from "react-bootstrap";

import { getAllProdutos } from "../../../services/produtos";
import { putProductCart, getCart } from "../../../services/carrinho";

import { GiMagnifyingGlass } from "@react-icons/all-files/gi/GiMagnifyingGlass";

export default function TableProducts({ setRows, rows, cart, setCart }) {
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [rowDetail, setRowDetail] = useState({});
  const [atualizar, setAtualizar] = useState(0);

  const QuantidadeProdutos = (row) => {
    const [rowQuantidade, setRowQuantidade] = useState(0);

    const handleChange = async (e) => {
      if (e.target.value < 0) {
        return;
      }
      const index = rows.findIndex((item) => item.nome === row.nome);
      let _cart = cart;
      let cartItem = {
        productId: rows[index]._id,
        quantidade: Number(e.target.value),
        nome: rows[index].nome,
        preco: rows[index].preco,
        precoTotalItem: Number(
          Number(e.target.value * rows[index].preco).toFixed(2)
        ),
      };

      let cartIndex = _cart.items.findIndex(
        (item) => item.productId === cartItem.productId
      );
      if (cartIndex !== -1) {
        _cart.items[cartIndex] = cartItem;
      } else {
        _cart.items.push(cartItem);
      }
      const res = await putProductCart(_cart);
      if (res.success) {
        setRowQuantidade(e.target.value);
        let _atualizar = Number(atualizar) + 1;
        console.log("chegou aqui 2", _atualizar);
        setAtualizar(_atualizar);
      }
    };

    useEffect(() => {
      if (cart) {
        let _cartItem = cart.items.filter((item) => item.productId === row._id);
        if (_cartItem.length) {
          setRowQuantidade(_cartItem[0].quantidade);
        }
      }
    }, []);

    return (
      <>
        <Form.Group className="sm-1" style={{ width: "100%" }}>
          <Form.Control
            size="sm"
            type="number"
            placeholder="Qtd."
            value={rowQuantidade}
            onChange={handleChange}
          />
        </Form.Group>
      </>
    );
  };

  const PrecoTotal = (row) => {
    let index = cart.items.findIndex((item) => item.productId === row._id);
    if (index !== -1) {
      return <span>{`R$ ${cart.items[index].precoTotalItem}`}</span>;
    }
    return null;
  };

  const NomeProduto = (row) => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "10px", cursor: "pointer" }}>
          <GiMagnifyingGlass
            onClick={() => {
              setRowDetail(row);
              setShowModalDetail(true);
            }}
            style={{ color: "#0D6EFD" }}
          />
        </div>
        <div>{row.nome}</div>
      </div>
    );
  };

  const PrecoUnitario = (row) => {
    return <span>{`R$ ${Number(row.preco).toFixed(2)}`}</span>;
  };

  const columns = [
    { field: "codigoBarras", headerName: "Código de Barras", width: 150 },
    {
      field: "Component",
      headerName: "Nome do Produto",
      component: NomeProduto,
      minWidth: 250,
    },
    { field: "fabricante", headerName: "Fabricante", width: 150 },
    { field: "categoria", headerName: "Categoria", width: 150 },
    {
      field: "Component",
      headerName: "Qtd.",
      width: 100,
      component: QuantidadeProdutos,
    },
    {
      field: "Component",
      headerName: "Preço un.",
      component: PrecoUnitario,
      width: 100,
    },
    {
      field: "Component",
      headerName: "Preço total",
      width: 100,
      component: PrecoTotal,
    },
  ];

  const ModalDetail = () => {
    return (
      <Modal
        show={showModalDetail}
        onHide={() => setShowModalDetail(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{rowDetail.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Image
                style={{ height: "400px", width: "auto" }}
                src={rowDetail.imagem}
              />
            </Col>
            <Col sm={6}>{rowDetail.descricao}</Col>
          </Row>
        </Modal.Body>
        <ModalFooter>
          <h5>Preço: {rowDetail.preco}</h5>
        </ModalFooter>
      </Modal>
    );
  };

  const loadAllProducts = async () => {
    const res = await getAllProdutos();
    if (res.success) {
      setRows(res.data);
    }
  };
  const loadCart = async () => {
    const res = await getCart();
    if (res.success) {
      setCart(res.data);
    }
  };

  useEffect(() => {
    loadAllProducts();
    loadCart();
    console.log("chegou aqui", cart);
  }, [atualizar]);

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <>
      <div key={atualizar}>
        <GeneralTable
          columns={columns}
          rows={rows}
          Component={QuantidadeProdutos}
          intercalado={true}
          bordas={true}
        />
      </div>

      <ModalDetail />
    </>
  );
}
