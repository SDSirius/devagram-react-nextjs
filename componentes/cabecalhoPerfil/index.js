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
    user,
    isPersonalProfile
})  {

    const [following, setFollowing] = useState( false);
    const [followersAmount, setFollowersAmount] = useState(0);
    const router = useRouter();


    useEffect(() =>{
        if (!user){
            return;
        }
        setFollowing(user.followingThisUser);
        setFollowersAmount(user.followers);
    
    },[user])

    const getBtnText = () => {        
        if (isPersonalProfile){
            return "Editar Petrfil";
        }

        if ( following ) {
            return 'Deixar de Seguir';
        }

        return 'Seguir';
    }

    const getBtnColor = () => {
        if ( following || isPersonalProfile ) {
            return 'invertido';
        }

        return 'primaria';
    }

    const mainButton = async () => {
        if (isPersonalProfile){
            return router.push('/perfil/editar');
        }
        try{
            await usuarioService.alterFollow(user._id);
            setFollowersAmount(
                following 
                    ? (followersAmount - 1)
                    : (followersAmount + 1)

            );
            setFollowing(!following);
        }catch(error){
            alert(`Erro no Follow/Unfollow: ${error}`)
        }
        
    }

    const leftAxnOnClick = () => {
        router.back();
    }

    const logout = () =>{
        usuarioService.logout();
        router.replace('/');
    }
    
    const getRightElementOnHeader = () => {
        if (isPersonalProfile){
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
                iconeEsquerda={isPersonalProfile ? null : imgSetaEsquerda}
                leftAxnOnClick={leftAxnOnClick}
                titulo={user.nome}
                rightElement={getRightElementOnHeader()}
            />

            <hr className="linhaDivisoria" />

            <div className="statusPerfil">
                <Avatar src={user.avatar}/>
                <div className="informacoesPerfil">
                    <div className="statusContainer">

                        <div className="status">
                            <strong>{user.posts}</strong>
                            <span>Publicações</span>
                        </div>

                        <div className="status">
                            <strong>{followersAmount}</strong>
                            <span>Seguidores</span>
                        </div>

                        <div className="status">
                            <strong>{user.following}</strong>
                            <span>Seguindo</span>
                        </div>

                    </div>

                    <Botao 
                        texto={getBtnText()}
                        cor={getBtnColor()}
                        manipularClique={mainButton}
                    />

                </div>
            </div>
        </div>
    )
}