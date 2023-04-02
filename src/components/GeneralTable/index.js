import { Table } from "react-bootstrap";
import React from "react";

export default function GeneralTable({
  columns = [],
  rows = [],
  noHeader = false,
  intercalado = false,
  bordas = false,
}) {
  let keys = columns.map((col) => col.field);

  return (
    <Table striped={intercalado} bordered={bordas} hover responsive>
      {noHeader ? null : (
        <thead>
          <tr>
            {columns.map((item) => (
              <th
                className={item.field}
                style={{ width: item.width, minWidth: item.minWidth }}
                key={item.field}
              >
                {item.headerName}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, rowIndex) => {
          return (
            <tr key={row.id}>
              {keys.map((key, index) => {
                if (key === "Component") {
                  return (
                    <td key={`${row.id} ${key}`}>
                      {React.createElement(columns[index].component, row)}
                    </td>
                  );
                }
                return <td key={`${row.id} ${key}`}>{row[key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
