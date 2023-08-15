import autorizado from "../../hoc/autorizado";
import Feed from "../../componentes/feed";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabecalhoPerfil from "../../componentes/cabecalhoPerfil";
import UsuarioService from "../../services/UsuarioService";

const usuarioService = new UsuarioService();

function Perfil( {usuarioOn}) {
    const [user, setUser ] = useState({});
    const router = useRouter();

    const getProfile = async (usuario) => {
        try{
            const { data } = await usuarioService.getProfile(
                isPersonalProfile()
                ? usuarioOn.id
                : usuario
            );
            return data;
        }catch (erro){
            alert(`Erro ao obter perfil de usuario. Erro: ${erro}`)
        }
    };

    const isPersonalProfile = () => {
        return router.query.id === "eu";
    }

    useEffect(() => {
        if (!router.query.id){
            return;
        }
        const getProfileData = async () =>{
            const profileData = await getProfile(router.query.id);

            setUser(profileData);
        }
        getProfileData();
    }, [usuarioOn, router.query.id]);

    return (
        <div className="paginaPerfil">
            <CabecalhoPerfil
                usuarioOn={usuarioOn}
                user={user}
                isPersonalProfile={isPersonalProfile()}
            />
            <Feed 
                usuarioOn={usuarioOn}
                idUser={user?._id}
            />
        </div> 
    );
}

export default autorizado(Perfil);