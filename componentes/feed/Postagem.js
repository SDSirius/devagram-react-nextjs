import Image from "next/image";
import Link from "next/link";
import Avatar from "../avatar";
import { useState } from "react";

import imgLike from '../../public/images/curtir.svg';
import imgLiked from '../../public/images/curtido.svg';
import imgComent from '../../public/images/comentarioCinza.svg';
import imgComentActicve from '../../public/images/comentarioAtivo.svg';
import { FazerComentario } from "./FazerComentario";
import FeedService from '../../services/FeedService';

const descriptionLimitLength = 85;
const feedService = new FeedService();

export default function Postagem({
    id,
    usuario,
    fotoPost,
    descricao,
    comment,
    usuarioOn,
    curtidas
}) {
    const [likesPost, setLikesPost] = useState (curtidas);
    const [commentsPosts, setCommentsPosts] = useState(comment);
    const [showInsertComment, setShowInsertComment]=useState(false);
    const [desclengthNow, setDesclengthNow] = useState(
        descriptionLimitLength
    );

    const lengthBiggerLimit = () => {
        return descricao.length > desclengthNow;
    }
    
    const showFullDesc = () =>{
        setDesclengthNow(Number.MAX_SAFE_INTEGER);
    }
    
    const obterDescricao = () => {
        let mensagem = descricao.substring(0,desclengthNow);
        if (lengthBiggerLimit()) {
            mensagem += "...";
        }
        return mensagem;
    }
    const getImgComent = () =>{
        return showInsertComment
        ?imgComentActicve
        :imgComent;
    }

    const comentar = async (comentario) => {
        try {
            await feedService.addComment(id, comentario);
            setShowInsertComment(false);
            setCommentsPosts([
                ...commentsPosts,
                {
                    nome: usuarioOn.nome,
                    mensagem:comentario
                }
            ]);
        }catch (e){
            alert(`erro ao fazer comentario! ${e?.response?.data?.erro}`);
        }

        return Promise.resolve(true);
    }
    
    const loggedUserLiked = () => {
        return likesPost.includes(usuarioOn.id);
    }

    const alterLike = async () => {
        try{
            await feedService.alterLike(id);
            if (loggedUserLiked()) {
                setLikesPost(
                    likesPost.filter(idusersLiked => idusersLiked !== usuarioOn.id)
                );
            }else{
                setLikesPost([
                    ...likesPost,
                    usuarioOn.id
                ])
            }

        }catch (e) {
            alert(`erro ao curtir! ${e?.response?.data?.erro}`);
        }
    }

    const getImgLike = () =>{
        return loggedUserLiked()
        ?imgLiked
        :imgLike;
    }

    
    return (
        <div className="postagem">
            <Link href={`/perfil/${usuario.id}`}>
                <section className="cabecalhoPost">
                    <Avatar src={usuario.avatar}/>
                    <strong>{usuario.nome}</strong>
                </section>
            </Link>

            <div className="fotoPost">
                <img src={fotoPost} alt="Foto do Post"/>
            </div>

            <div className="rodapePost">
                <div className="acoesPost">
                    <Image
                        src={getImgLike()}
                        alt="icone Curtir"
                        width={20}
                        height={20}
                        onClick={alterLike}
                    />
                    <Image
                        src={getImgComent()}
                        alt="icone comentar"
                        width={20}
                        height={20}
                        onClick={() => setShowInsertComment(!showInsertComment)}
                    />

                    <span className="qtdLikes">
                        Curtido por <strong> {likesPost.length} pessoas</strong>
                    </span>

                </div>

                <div className="descricaoPost">
                    <strong className="nomeUsuario">{usuario.nome}</strong>
                    <p className='descricao'>
                        {obterDescricao()}
                        {lengthBiggerLimit() &&(
                            <span 
                                onClick={showFullDesc}
                                className='showFullDesc' >
                                Mais
                            </span>
                        )}
                    </p>
                </div>

                <div className="comentsPost">
                    {commentsPosts.map((comments, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comments.nome}</strong>
                            <p className='descricao'>{comments.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>

            {showInsertComment &&
                <FazerComentario comentar={comentar} usuarioOn={usuarioOn} />
            }
        </div>
    );
}