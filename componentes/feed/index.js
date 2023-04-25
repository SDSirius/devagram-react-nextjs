import { useState, useEffect } from 'react';
import Postagem from './Postagem';
import FeedService from '../../services/FeedService';

const feedService = new FeedService();

export default function Feed ({usuarioOn}) {
    const [listaPost, setListaPost] = useState([]);
    const [data, setData] = useState([]);

    async function fetchData() {
        const getFeed = await feedService.loadPosts();
        console.log(getFeed);
        setData(getFeed.data);
    }
    
    useEffect(() => {
        setListaPost([]);
        fetchData();
        console.log("iniciando o useEffect do feed Index");
        const { data } =  setData;
        console.log("capturando o data  usando o getFeed");
        console.log({data});
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