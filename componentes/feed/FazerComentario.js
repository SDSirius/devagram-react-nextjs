import Avatar from "../avatar";

export function FazerComentario({usuarioOn}){
    return(
        <div className="containerFazerComentario">
            <Avatar src={usuarioOn.avatar}/>
            <textarea 
                rows={1}
                placeholder="Adicionar Comentário">
            </textarea>

            <button
                type="button"
                className="btnPublicacao desktop"
            >
                Publicar
            </button>
        </div>
    )
}