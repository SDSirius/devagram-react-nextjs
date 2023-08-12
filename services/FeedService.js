import HttpService from "./HttpService";

export default class FeedService extends HttpService {
    async loadPosts(idUser) {
        let url = '/feed';
        if (idUser) {
            url += `?id=${idUser}`;
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