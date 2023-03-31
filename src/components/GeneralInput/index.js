import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import React from "react";

export default function GeneralInput({
  id,
  inputType,
  label,
  placeholder,
  itemList,
  value,
  required,
  handleChange = () => {},
  validationFunction = () => {},
}) {
  switch (inputType) {
    case "password":
      return (
        <>
          <Form.Group className="mx-2" controlId={id} key={id}>
            <Form.Label className="mt-2">{label}</Form.Label>
            <Form.Control
              type="password"
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              isValid={validationFunction}
              required={required}
            />
          </Form.Group>
        </>
      );
      break;
    case "text":
      return (
        <>
          <Form.Group className="mx-2" controlId={id} key={id}>
            <Form.Label className="mt-2">{label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              isValid={validationFunction}
              required={required}
            />
          </Form.Group>
        </>
      );
      break;
    // case "date":
    //   return;
    //   break;
    case "number":
      return (
        <>
          <Form.Group className="mx-2" controlId={id}>
            <Form.Label className="mt-2">{label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              isValid={validationFunction}
              required={required}
            />
          </Form.Group>
        </>
      );
      break;
    case "phone":
      return (
        <>
          <Form.Group className="mx-2" controlId={id}>
            <Form.Label className="mt-2">{label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              isValid={validationFunction}
              required={required}
            />
          </Form.Group>
        </>
      );
      break;
    case "select":
      return (
        <>
          <Form.Group className="mx-2" controlId={id}>
            <Form.Label className="mt-2">{label}</Form.Label>
            <Form.Select aria-label="Default select example">
              <option open>Selecione...</option>
              {itemList.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </>
      );
      break;
    case "radio":
      return (
        <div key={`inline-radio`} className="mb-3">
          {itemList.map((item) => {
            return (
              <Form.Check
                inline
                label={item}
                name={id}
                type="radio"
                id={item}
                key={item}
              />
            );
          })}
        </div>
      );
      break;
    default:
      return <p>INPUT NÃO ENCONTRADO</p>;
      break;
  }
}
