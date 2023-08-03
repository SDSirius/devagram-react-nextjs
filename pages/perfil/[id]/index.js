import autorizado from "../../../hoc/autorizado";
import Feed from "../../../componentes/feed";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabecalhoPerfil from "../../../componentes/cabecalhoPerfil";

function Perfil( {usuarioOn}) {
    const [user, setUser ] = useState({});
    const router = useRouter();

    useEffect(() => {
        setUser({
            nome: "Sérgio Daniel"
        });
        console.log('chegou aqui')
    }, [router.query.id]);

    return (
        <div className="paginaPerfil">
            <CabecalhoPerfil
                usuarioOn={usuarioOn}
                user={user}
            />
            <Feed usuarioOn={usuarioOn}/>
        </div> 
    );
}

export default autorizado(Perfil);