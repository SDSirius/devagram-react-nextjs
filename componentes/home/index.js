import autorizado from "../../hoc/autorizado";
import Feed from "../feed";

function Home({usuarioLogado}) {
    return (
        <Feed usuarioLogado={usuarioLogado}/>
    );
}

export default autorizado(Home);