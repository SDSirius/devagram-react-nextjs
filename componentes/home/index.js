import autorizado from "../../hoc/autorizado";
import Feed from "../feed";

function Home({usuarioOn}) {
    return (
        <Feed usuarioOn={usuarioOn}/>
    );
}

export default autorizado(Home);