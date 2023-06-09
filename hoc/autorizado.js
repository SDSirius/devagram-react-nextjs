import { useRouter } from "next/router";
import Cabecalho from "../componentes/layout/Cabecalho";
import Rodape from "../componentes/layout/Rodape";
import UsuarioService from "../services/UsuarioService"

const usuarioService = new UsuarioService();

export default function autorizado(Componente) {
    return (props) => {
        const router = useRouter();

        if (typeof window !== 'undefined'){
            if (!usuarioService.estaAuth()){
                router.replace('/');
                return null;
            }

            const usuarioOn = usuarioService.obterInfoUsuarioOn();

            return (
                <>
                    <Cabecalho usuarioOn={usuarioOn}/>
                    <Componente usuarioOn={usuarioOn} {...props} />
                    <Rodape usuarioOn={usuarioOn} />
                </>
            );
        }
        return null;
    }
}