import imgSetaEsquerda from "../../public/images/setaEsquerda.svg";
import imgLogout from "../../public/images/logout.svg";
import CabecalhoComAcoes from "../cabecalhoComAcoes";
import Avatar from "../avatar";
import Botao from "../botao";
import { useEffect, useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import { useRouter } from "next/router";
import Image from "next/image";

const usuarioService = new UsuarioService();

export default function CabecalhoPerfil({
    usuario,
    estaNoPerfilPessoal
})  {

    const [seguindo, setSeguindo] = useState( false);
    const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);
    const router = useRouter();


    useEffect(() =>{
        if (!usuario){
            return;
        }
        setSeguindo(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores);
    
    },[usuario])

    const obterTextoBotaoPrincipal = () => {        
        if (estaNoPerfilPessoal){
            return "Editar Petrfil";
        }

        if ( seguindo ) {
            return 'Deixar de Seguir';
        }

        return 'Seguir';
    }

    const obterCorDoBotaoPrincipal  = () => {
        if ( seguindo || estaNoPerfilPessoal ) {
            return 'invertido';
        }

        return 'primaria';
    }

    const manipularCliqueBotaoPrincipal  = async () => {
        if (estaNoPerfilPessoal){
            return router.push('/perfil/editar');
        }
        try{
            await usuarioService.alternarSeguir(usuario._id);
            setQuantidadeSeguidores(
                seguindo 
                    ? (quantidadeSeguidores - 1)
                    : (quantidadeSeguidores + 1)

            );
            setSeguindo(!seguindo);
        }catch(error){
            alert(`Erro no Follow/Unfollow: ${error}`)
        }
        
    }

    const aoClicarSetaEsquerda = () => {
        router.back();
    }

    const logout = () =>{
        usuarioService.logout();
        router.replace('/');
    }
    
    const obterElementoDireitaCabecalho = () => {
        if (estaNoPerfilPessoal){
            return (
                <Image 
                    src={imgLogout}
                    alt="icone direita cabeçalho ações"
                    onClick={logout}
                    width={23}
                    height={23}
                />                
            );
        }
        return null;
    }

    return (
        <div className="cabecalhoPerfil largura40pctDesktop">
            <CabecalhoComAcoes 
                iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
                aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
                titulo={usuario.nome}
                elementoDireita={obterElementoDireitaCabecalho()}
            />

            <hr className="linhaDivisoria" />

            <div className="statusPerfil">
                <Avatar src={usuario.avatar}/>
                <div className="informacoesPerfil">
                    <div className="statusContainer">

                        <div className="status">
                            <strong>{usuario.publicacoes}</strong>
                            <span>Publicações</span>
                        </div>

                        <div className="status">
                            <strong>{quantidadeSeguidores}</strong>
                            <span>Seguidores</span>
                        </div>

                        <div className="status">
                            <strong>{usuario.seguindo}</strong>
                            <span>Seguindo</span>
                        </div>

                    </div>

                    <Botao 
                        texto={obterTextoBotaoPrincipal()}
                        cor={obterCorDoBotaoPrincipal ()}
                        manipularClique={manipularCliqueBotaoPrincipal }
                    />

                </div>
            </div>
        </div>
    )
}