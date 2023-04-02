import HttpService from "./HttpService";

export default class UsuarioService extends HttpService {
    async login(usuario, senha) {

    }
    async cadastro() {
        return this.post('/cadastro', dados);
    }
}