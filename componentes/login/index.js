import InputPublico from "../inputPublico";
import imagemEnvelope from '../../public/images/envelope.svg';
import imagemSenha from '../../public/images/chave.svg';
import imagemLogo from '../../public/images/logo.svg';
import Image from "next/image";
import Botao from '../botao'
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

    return (
        <section className={'loginSection paginaPublica'} >
            <div className="logoContainer">
              <Image 
                src={imagemLogo}
                alt="Logotipo"
                layout="fill"
                className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form>
                <InputPublico 
                    className="input"
                    imagem={imagemEnvelope}
                    textos="E-mail"
                    tipo="email"
                    aoAlterarValor={ e => setEmail(e.target.value)}
                    valor={email}
                  />
                  <InputPublico 
                    imagem={imagemSenha}
                    textos="Senha"
                    tipo="password"
                    aoAlterarValor={ e => setSenha(e.target.value)}
                    valor={senha}
                  />

                  <Botao 
                    texto={"Login"}
                    tipo="submit"
                    desabilitado={false}
                  />
                </form>

                <div className="rodapeRotaPublica">
                  <p>Não Possui uma conta?</p>
                  <Link href="/cadastro">Faça seu cadastro gratis aqui!</Link>
                </div>
            </div>
        </section>
    );
}