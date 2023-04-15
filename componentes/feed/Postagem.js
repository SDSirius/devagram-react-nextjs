import Image from "next/image";
import Link from "next/link";
import Avatar from "../avatar";
import { useState } from "react";

import imgLike from '../../public/images/curtir.svg';
import imgLiked from '../../public/images/curtido.svg';
import imgComent from '../../public/images/comentarioCinza.svg';
import imgComentActicve from '../../public/images/comentarioAtivo.svg';
import { FazerComentario } from "./FazerComentario";

const descriptionLimitLength = 85;

export default function Postagem({
    usuario,
    fotoPost,
    descricao,
    comments,
    usuarioOn
}) {
    const [showInsertComment, setShowInsertComment]=useState(false);
    const [desclengthNow, setDesclengthNow] = useState(
        descriptionLimitLength
    );

    const showFullDesc = () =>{
        setDesclengthNow(Number.MAX_SAFE_INTEGER);
    }
    
    const legthBiggerLimit = () => {
        return descricao.length > desclengthNow;
    }

    const obterDescricao = () => {
        let mensagem = descricao.substring(0,desclengthNow);
        if (legthBiggerLimit()) {
            mensagem += "...";
        }
        return mensagem;
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
                <img 
                src={fotoPost}
                alt="Foto do Post"
                />
            </div>

            <div className="rodapePost">
                <div className="acoesPost">
                    <Image
                        src={imgLike}
                        alt="icone Curtir"
                        width={20}
                        height={20}
                        onClick={() => console.log('curtiu')}
                    />
                    <Image
                        src={imgComent}
                        alt="icone comentar"
                        width={20}
                        height={20}
                        onClick={() => setShowInsertComment(!showInsertComment)}
                    />
                    <span className="qtdLikes">
                        curtido por <strong> X pessoas</strong>
                    </span>

                </div>

                <div className="descricaoPost">
                    <strong className="nomeUsuario">{usuario.nome}</strong>
                    <p className='descricao'>
                        {obterDescricao()}
                        {legthBiggerLimit() &&(
                            <span 
                                onClick={showFullDesc}
                                className='showFullDesc' >
                                Mais
                            </span>
                        )}
                    </p>
                </div>

                <div className="comentsPost">
                    {comments.map((comment, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comment.nome}</strong>
                            <p className='descricao'>{comment.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>

            {showInsertComment &&
                <FazerComentario usuarioOn={usuarioOn} />
            }
        </div>
    );
}