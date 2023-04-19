import { useState, useEffect } from 'react';
import Postagem from './Postagem';
import FeedService from '../../services/FeedService';

const feedService = new FeedService();

export function Feed ({usuarioOn}) {
    const [listaPost, setListaPost] = useState([]);

    const getFeed = async () =>
        await feedService.loadPosts();
    
    useEffect(() => {
        const { data } = getFeed();
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
            ))}
        </div>
    );
}