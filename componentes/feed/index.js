import { useState, useEffect } from 'react';
import Postagem from './Postagem';
import FeedService from '../../services/FeedService';

const feedService = new FeedService();

export default function Feed ({usuarioOn}) {
    const [listaPost, setListaPost] = useState([]);
    const getFeed = async () =>{
        await feedService.loadPosts();
    }
    
    useEffect(() => {
        console.log(getFeed());
        console.log("iniciando o useEffect do feed Index");
        const { data } =  getFeed();
        console.log("capturando o data  usando o getFeed");
        console.log(data);
        setListaPost([]);
    },[usuarioOn]);
    
    return(

        <div className='feedContainer largura40pctDesktop'>
            {listaPost.map(dataPost => (
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