import { api } from "./axiosConfig";

export const getAllProdutos = async () => {
  const route = `/produtos`;
  return await api
    .get(route)
    .then((res) => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
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

export const deleteProduct = async (productId) => {
  const route = `/produtos/${productId}`;
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

export const putProduct = async (body) => {
  const route = `/produtos/${body._id}`;
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

export const getProdutoFiltrado = async (filter) => {
  const route = `/produtos/filtrar?categoria=${filter.categoria}&ordenar=${filter.ordenar}`;
  return await api
    .get(route)
    .then((res) => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
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

export const postProduto = async (body) => {
  const route = `/produtos`;
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
