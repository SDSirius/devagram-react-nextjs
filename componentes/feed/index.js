import { useState, useEffect } from 'react';
import Postagem from './Postagem';
import FeedService from '../../services/FeedService';

const feedService = new FeedService();

export default function Feed ({usuarioLogado, usuarioPerfil}) {
    const [listaDePostagens, setListaPost] = useState([]);
    

    useEffect(() => {
        setListaPost([]);  
        const pegarFeed = async ()=> {
            const { data } = await feedService.carregarPostagens(usuarioPerfil?._id);
            
            if (data.length > 0) {
                const postagensFormatadas = data.map((postagem) => ({
                        id: postagem._id,
                        usuario: {
                            id: postagem.idUsuario,
                            nome: postagem?.usuario?.nome || usuarioPerfil?.nome,
                            avatar: postagem?.usuario?.avatar || usuarioPerfil?.avatar
                        },
                        fotoDoPost: postagem.foto,
                        descricao:postagem.descricao,
                        curtidas: postagem.likes,
                        comentarios: postagem.comentarios.map(c => ({
                            nome: c.nome,
                            mensagem: c.comentario
                        })),
                    }));
                    setListaPost(postagensFormatadas);
                } else{
                    setListaPost([]);
                }
            };
            pegarFeed();    
        },[usuarioLogado, usuarioPerfil]);
        if (!listaDePostagens.length){
            return null;
        }    
    return(
        <div className='feedContainer largura40pctDesktop'>
            {listaDePostagens.map((dadosPostagem) => (
                <Postagem 
                    key={dadosPostagem.id} 
                    {...dadosPostagem}
                    usuarioLogado={usuarioLogado}
                />
            ))
                        
        }
        </div>
    )
}