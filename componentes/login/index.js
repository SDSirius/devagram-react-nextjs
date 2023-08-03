import InputPublico from "../inputPublico";
import Image from "next/image";
import Botao from '../botao'
import Link from "next/link";
import { useState } from "react";
import { validarEmail, validarSenha } from '../../utils/validadores';
import UsuarioService from "../../services/UsuarioService";

import imagemEnvelope from '../../public/images/envelope.svg';
import imagemSenha from '../../public/images/chave.svg';
import imagemLogo from '../../public/images/logo.svg';

const usuarioService = new UsuarioService();

export default function Login({afterAuth}) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ estaSubmetendo, setEstaSubmetendo] = useState(false);

  const validarFormulario = () =>{
    return (
      validarEmail(email)
      && validarSenha(senha)      
    );
  }

  const aoSubmeter = async (e) => {
    e.preventDefault();
    if(!validarFormulario()){
      return;
    }
    setEstaSubmetendo(true);
    try {
      await usuarioService.login({
        login:email,
        senha
      });

      if(afterAuth) {
        afterAuth();
      }

    } catch (error) {
      console.log(error);
      alert(
        "Erro ao realizar login: " + error?.response?.data?.erro
        );

    }

    setEstaSubmetendo(false);
  }
  
  return (
      <section className={'paginaLogin paginaPublica'} >
          <div className="logoContainer">
            <Image 
              src={imagemLogo}
              alt="Logotipo"
              layout="fill"
              className="logo"
              />
          </div>

          <div className="conteudoPaginaPublica">
              <form onSubmit={aoSubmeter}>
                <InputPublico 
                    imagem={imagemEnvelope}
                    texto="E-mail"
                    tipo="email"
                    aoAlterarValor={ e => setEmail(e.target.value)}
                    valor={email}
                    mensagemValidacao ="O endereço informado é invalido"
                    exibirMensagemValidacao={email && !validarEmail(email)}
                  />
                  <InputPublico 
                    imagem={imagemSenha}
                    texto="Senha"
                    tipo="password"
                    aoAlterarValor={ e => setSenha(e.target.value)}
                    valor={senha}
                    mensagemValidacao= "Senha precisa de pelo menos 3 carcteres."
                    exibirMensagemValidacao={senha && !validarSenha(senha)}
                  />

                  <Botao 
                    texto={"Login"}
                    tipo="submit"
                    desabilitado={!validarFormulario() || estaSubmetendo}
                    />
              </form>

              <div className="rodapePaginaPublica">
                <p>Não Possui uma conta?</p>
                <Link href="/cadastro">Faça seu cadastro gratis aqui!</Link>
              </div>
          </div>
      </section>
  );
}