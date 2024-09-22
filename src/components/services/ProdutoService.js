import http from '../common/http-common';
const API_URL = "produto/";

const getAllProdutos = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const getById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

const ProdutoService = {
    getAllProdutos,
    getById,
}

export default ProdutoService;