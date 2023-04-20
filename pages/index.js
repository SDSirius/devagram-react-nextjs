import { useEffect, useState } from "react";
import Home from "../componentes/home";
import Login from "../componentes/login";
import UsuarioService from "../services/UsuarioService";

const usuarioService = new UsuarioService();
export default function Index() {
  const [estaAuth, setEstaAuth] = useState(null);

  useEffect(() => {
    setEstaAuth(
      usuarioService.estaAuth()
    );
    console.log("useEffect do pages/index");
  }, []);

  if (estaAuth === null) {
    return null;
  } 
  
  if(estaAuth){
    return <Home />;
  }

  return <Login afterAuth={ () => setEstaAuth(true)} /> ;
}
