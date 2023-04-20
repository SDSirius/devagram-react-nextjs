import HttpService from "./HttpService";

export default class FeedService extends HttpService {
    async loadPosts(idUsuario) {
        let url = '/feed';
        if (idUsuario) {
            url += `?id=${idUsuario}`;
        }

        return this.get(url);
    }
}