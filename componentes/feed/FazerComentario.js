import { useState } from "react";
import Avatar from "../avatar";

export function FazerComentario({usuarioOn, comentar}){

    const [rows, setRows] = useState(1);
    const [comentario, setComentario ] = useState('');

    const onTyping = (e) => {
        const inputValue = e.target.value;
        setComentario(inputValue);
        setRows(inputValue.length > 0 ? 2 : 1);
    }

    const onKey = (e) => {
        if (e.key === 'Enter'){
            commentHandle()
        }    
    }

    const commentHandle = () => {
        if (comentario.trim().length === 0 || !comentar){
            return;
        }
        comentar(comentario);
    }

    

    return(
        <div className="containerFazerComentario">
            <Avatar src={usuarioOn.avatar}/>
            <textarea 
                rows={rows}
                onChange={onTyping}
                onKeyDown={onKey}
                value={comentario}
                placeholder="Adicionar Comentário">
            </textarea>

            <button
                type="button"
                className="btnPublicacao desktop"
                onClick={commentHandle}
            >
                Publicar
            </button>
        </div>
    )
}