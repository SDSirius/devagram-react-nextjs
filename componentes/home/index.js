import autorizado from "../../hoc/autorizado";
import Feed from "../feed";

function Home({usuarioOn}) {
    console.log("autenticação estabelecida");
    return (
        <Feed usuarioOn={usuarioOn}/>
    );
}

export default autorizado(Home);