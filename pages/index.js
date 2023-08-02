import { useState, useEffect } from "react";
import Home from "../componentes/home";
import Login from "../componentes/login";
import UsuarioService from "../services/UsuarioService";

const usuarioService = new UsuarioService();
export default function Index() {
  const [estaAuth, setEstaAuth] = useState(null);

  useEffect(() => {
    console.log("useEffect do pages/index");
    setEstaAuth(
      usuarioService.estaAuth()
    );
  }, []);

  if (estaAuth === null) {
    console.log("autenticação falhou")
    return null;
  } 
  
  if(estaAuth){
    return <Home />;
  }

  return <Login afterAuth={ () => setEstaAuth(true)} /> ;
}
