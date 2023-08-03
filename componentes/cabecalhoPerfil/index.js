import CabecalhoComAcoes from "../cabecalhoComAcoes";
import imgSetaEsquerda from "../../public/images/setaEsquerda.svg";
import Avatar from "../avatar";
import Botao from "../botao";

export default function CabecalhoPerfil({
    usuarioOn,
    user,
})  {
    return (
        <div className="cabecalhoPerfil largura40pctDesktop">
            <CabecalhoComAcoes 
                iconeEsquerda={imgSetaEsquerda}
                titulo={user.nome}
            />

            <div className="statusPerfil">
                <Avatar src={user.avatar}/>
                <div className="informacoesPerfil">
                    <div className="statusContainer">
                        <div className="status">
                            <strong>15</strong>
                            <span>Publicações</span>
                        </div>
                        <div className="status">
                            <strong>120</strong>
                            <span>Seguidores</span>
                        </div>
                        <div className="status">
                            <strong>1549</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>
                    <Botao 
                        texto={"Seguir"}
                        cor='primaria'
                    />
                </div>
            </div>
        </div>
    )
}