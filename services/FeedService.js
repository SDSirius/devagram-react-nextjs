import HttpService from "./HttpService";

export default class FeedService extends HttpService {
    async carregarPostagens(idUsuario) {
        let url = '/feed';
        if (idUsuario) {
            url += `?id=${idUsuario}`;
        }
        return this.get(url);
    }

    async adicionarComentario(idPostagem, comentario){
        return this.put(`/comments?id=${idPostagem}`, {comentario});
    }

    async alterarCurtida(idPostagem) {
        return this.put(`/likes?id=${idPostagem}`);
    }

    async fazerPublicacao(dadosPublicacao){
        return this.post('/publicacao', dadosPublicacao);
    }
}