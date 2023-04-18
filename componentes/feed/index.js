import { useState, useEffect } from 'react';
import Postagem from './Postagem';
import FeedService from '../../services/FeedService';

const feedService = new FeedService();

export function Feed ({usuarioOn}) {
    const [listaPost, setListaPost] = useState([]);

    useEffect(async () => {
        const { data } = await feedService.loadPosts();
        console.log(data);
        setListaPost([
            {
            id:"1",
            usuario :{
                id:"2",
                nome:"Supreme Demon Slayer That Is Also A Demon"  + ":",
                avatar:""
            },
            fotoPost:'https://i.ytimg.com/vi/r2RC1nOJJNQ/maxresdefault.jpg',
            descricao:'Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá Blá blá ',
            likes:[],
            comments: [{
                nome:"Beltrado" + ":",
                mensagem:"Bãããão"
            },
            {
                nome:"juquinha" + ":",
                mensagem:"Fod@@!"
            },
            {
                nome:"joaozinho" + ":",
                mensagem:"Fod@@!2"
            }]
        },
        {
            id:"2",
            usuario :{
                id:"2",
                nome:"Sérgio Daniel Farina" + ":",
                avatar:null
            },
            fotoPost:"data:image/jpeg;base64,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",
            descricao:' * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood | * Tanjiro Kamado On Demon Blood |',
            likes:[],
            comments: [{
                nome:"juquinha" + ":",
                mensagem:"Fod@@!"
            },
            {
                nome:"joaozinho" + ":",
                mensagem:"Fod@@!2"
            }]
        },
        ]);
    },[usuarioOn]);
    
    return(
        <div className='feedContainer largura40pctDesktop'>
            {listaPost.map(dataPost => (
                <Postagem 
                    key={dataPost.id} 
                    {...dataPost}
                    usuarioOn={usuarioOn}
                />
            ))}
        </div>
    )
}