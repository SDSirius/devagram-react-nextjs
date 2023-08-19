import autorizado from "../../hoc/autorizado";
import Feed from "../../componentes/feed";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabecalhoPerfil from "../../componentes/cabecalhoPerfil";
import UsuarioService from "../../services/UsuarioService";

const usuarioService = new UsuarioService();

function Perfil( {usuarioLogado}) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();

    const getProfile = async (idUsuario) => {
        try{
            const { data } = await usuarioService.getProfile(
                estaNoPerfilPessoal()
                ? usuarioLogado.id
                : idUsuario
            );
            return data;
        }catch (erro){
            alert(`Erro ao obter perfil de usuario. Erro: ${erro}`)
        }
    };

    const estaNoPerfilPessoal = () => {
        return router.query.id === "eu";
    }

    useEffect(() => {
        if (!router.query.id){
            return;
        }
        const getProfileData = async () =>{
            const profileData = await getProfile(router.query.id);            
            setUsuario(profileData);
        }
        getProfileData();
    }, [usuarioLogado, router.query.id]);

    return (
        <div className="paginaPerfil">
            <CabecalhoPerfil
                usuarioLogado={usuarioLogado}
                usuario={usuario}
                estaNoPerfilPessoal={estaNoPerfilPessoal()}
            />
            <Feed 
                usuarioLogado={usuarioLogado}
                usuarioPerfil={usuario}
            />
        </div> 
    );
}

export default autorizado(Perfil);