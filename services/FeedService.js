import HttpService from "./HttpService";

export default class FeedService extends HttpService {
    async loadPosts(idUser) {
        console.log("iniciando a função loadPost");
        let url = '/feed';
        console.log(`1 id user esta ${idUser} e url esta ${url}`);
        if (idUser) {
            url += `?id=${idUser}`;
            console.log(`2 id user esta ${idUser} e url esta ${url}`);
        }

        return this.get(url);

    }
}