import { useState, useEffect } from 'react';
import Postagem from './Postagem';
import FeedService from '../../services/FeedService';

const feedService = new FeedService();

export default function Feed ({usuarioOn}) {
    const [listaPost, setListaPost] = useState([]);
    useEffect(() => {
        const pegarFeed = async ()=> {
            setListaPost([]);  
            const { data } = await feedService.loadPosts();
                        
            if (data.length > 0) {
                const formatedPosts = data.map((postagem) => ({
                        id: postagem._id,
                        usuario: {
                            id: postagem.idUser,
                            nome: postagem.usuario.nome,
                            avatar: postagem.usuario.avatar
                        },
                        fotoPost: postagem.foto,
                        descricao:postagem.descricao,
                        curtidas: postagem.likes,
                        comment: postagem.comentarios.map(c => ({
                            nome: c.nome,
                            mensagem: c.comentario
                        })),
                    }));
                setListaPost(formatedPosts);    
            } else{
                setListaPost([]);
            }
        };
        pegarFeed();    
        },[usuarioOn]);
        if (!listaPost.length){
            return null;
        }    
    return(

        <div className='feedContainer largura40pctDesktop'>
            {listaPost.map((dataPost) => (
                <Postagem 
                    key={dataPost.id} 
                    {...dataPost}
                    usuarioOn={usuarioOn}
                />
            ))
        }
        </div>
    )
}