import { api } from "./axiosConfig";

export const putProductCart = async (body) => {
  const route = `/carrinho/produto/${body._id}`;
  return await api
    .put(route, body)
    .then((res) => {
      if (res.status === 200) {
        return {
          success: true,
          message: res.data.message,
        };
      } else {
        return {
          success: false,
          message: "Ocorreu um erro ao editar o produto",
        };
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error.message,
      };
    });
};

export const postCart = async () => {
  const body = {
    items: [
      {
        productId: "6428061f187c1542408f9c03",
        quantidade: 0,
        nome: "Leite Longa Vida Camponesa Integral 1L",
        preco: 4.51,
        precoTotalItem: 0,
      },
    ],
    total: 0,
  };
  const route = `/carrinho`;
  return await api
    .post(route, body)
    .then((res) => {
      if (res.status === 200) {
        return {
          success: true,
          message: res.data.message,
        };
      } else {
        return {
          success: false,
          message: "Ocorreu um erro ao cadastrar o produto.",
        };
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error.message,
      };
    });
};

export const getCart = async () => {
  const route = `/carrinho`;
  return await api
    .get(route)
    .then((res) => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data[0],
        };
      } else {
        return {
          success: false,
          message: "Ocorreu um erro ao buscar os produtos",
        };
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error.message,
      };
    });
};

export const deleteCart = async (Id) => {
  const route = `/carrinho/produto/${Id}`;
  return await api
    .delete(route)
    .then((res) => {
      if (res.status === 200) {
        return {
          success: true,
          message: res.data.message,
        };
      } else {
        return {
          success: false,
          message: "Ocorreu um erro ao editar o produto",
        };
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error.message,
      };
    });
};
