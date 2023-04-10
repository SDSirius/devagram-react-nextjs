import { useEffect, useState } from "react";
import Home from "../componentes/home";
import Login from "../componentes/login";
import UsuarioService from "../services/UsuarioService";

const usuarioService = new UsuarioService();
export default function Index() {
  const [estaAuth, setEstaAuth] = useState(false);

  useEffect(() => {
    setEstaAuth(
      usuarioService.estaAuth()
    );
  }, [])

  if(estaAuth){
    return <Home />;
  }

  return <Login afterAuth={ () => setEstaAuth(true)} /> ;
}
