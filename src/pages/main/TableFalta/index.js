import * as React from "react";
import { useState, useEffect } from "react";
import GeneralTable from "../../../components/GeneralTable";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function TableFalta() {
  const [showModalDelete, setShowModalDelete] = useState(false);

  const columns = [
    { field: "DataCriacao", headerName: "Data Criação", width: 1 },
    { field: "CodigoBarras", headerName: "Código de Barras", width: 2 },
    { field: "NomeProduto", headerName: "Nome do Produto" },
    { field: "Laboratorio", headerName: "Laboratório", width: 1 },
    { field: "Qtd", headerName: "Qtd.", width: 1 },
    { field: "NomeCliente", headerName: "Nome do Cliente", width: 2 },
    { field: "Telefone", headerName: "Telefone", width: 1 },
    { field: "Pago", headerName: "Pago?", width: 1 },
    { field: "Vendedor", headerName: "Vendedor", width: 1 },
    { field: "Status", headerName: "Status", width: 1 },
    { field: "Component", headerName: "", width: 1 },
  ];

  const rows = [
    {
      id: 1,
      DataCriacao: "02/02/2021",
      CodigoBarras: 78936502018,
      NomeProduto: "Lamotrigina 50mg c/30 cpr",
      Laboratorio: "Medley",
      Qtd: 5,
      NomeCliente: "Maria Aparecida",
      Telefone: "98104-6565",
      Pago: "Sim",
      Vendedor: "Ricardo",
      ProcuraDivida: "Procura",
      Status: "Aguarde",
    },
    {
      id: 2,
      DataCriacao: "02/02/2021",
      CodigoBarras: 78936502018,
      NomeProduto: "Lamotrigina 50mg c/30 cpr",
      Laboratorio: "Medley",
      Qtd: 5,
      NomeCliente: "Maria Aparecida",
      Telefone: "98104-6565",
      Pago: "Sim",
      Vendedor: "Ricardo",
      ProcuraDivida: "Procura",
      Status: "Aguarde",
    },
    {
      id: 3,
      DataCriacao: "02/02/2021",
      CodigoBarras: 78936502018,
      NomeProduto: "Lamotrigina 50mg c/30 cpr",
      Laboratorio: "Medley",
      Qtd: 5,
      NomeCliente: "Maria Aparecida",
      Telefone: "98104-6565",
      Pago: "Sim",
      Vendedor: "Ricardo",
      ProcuraDivida: "Procura",
      Status: "Aguarde",
    },
    {
      id: 4,
      DataCriacao: "02/02/2021",
      CodigoBarras: 78936502018,
      NomeProduto: "Lamotrigina 50mg c/30 cpr",
      Laboratorio: "Medley",
      Qtd: 5,
      NomeCliente: "Maria Aparecida",
      Telefone: "98104-6565",
      Pago: "Sim",
      Vendedor: "Ricardo",
      ProcuraDivida: "Divida",
      Status: "Aguarde",
    },
    {
      id: 5,
      DataCriacao: "02/02/2021",
      CodigoBarras: 78936502018,
      NomeProduto: "Lamotrigina 50mg c/30 cpr",
      Laboratorio: "Medley",
      Qtd: 5,
      NomeCliente: "Maria Aparecida",
      Telefone: "98104-6565",
      Pago: "Sim",
      Vendedor: "Ricardo",
      ProcuraDivida: "Divida",
      Status: "Aguarde",
    },
  ];

  const ProcuraDivida = ({ row }) => {
    let variant = "";
    if (row.ProcuraDivida === "Divida") {
      variant = "danger";
    } else {
      variant = "primary";
    }
    return (
      <Dropdown>
        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip id={`tooltip-${row.id}`}>{row.ProcuraDivida}</Tooltip>
          }
        >
          <Dropdown.Toggle
            variant={variant}
            id="dropdown-basic"
          ></Dropdown.Toggle>
        </OverlayTrigger>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleCloseModalDelete(row.id)}>
            Editar
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleDeleteRow(row.id)}>
            Excluir
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const handleDeleteRow = (rowId) => {
    setShowModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  return (
    <>
      <GeneralTable
        columns={columns}
        rows={rows}
        editRow={() => {}}
        deleteRow={handleDeleteRow}
        Component={ProcuraDivida}
      />
      <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Falta</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja exluir a falta?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModalDelete}>
            Não
          </Button>
          <Button variant="danger" onClick={handleCloseModalDelete}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
