import HttpService from "./HttpService";

export default class FeedService extends HttpService {
    async loadPosts(idUsuario) {
        let url = '/feed';
        if (idUsuario) {
            url += `?id=${idUsuario}`;
        }
        return this.get(url);
    }

    async addComment(id, comentario){
        return this.put(`/comments?id=${id}`, {comentario});
    }

    async alterLike(id) {
        return this.put(`/likes?id=${id}`);
    }

    async fazerPublicacao(payload){
        return this.post('/publicacao', payload);
    }
}