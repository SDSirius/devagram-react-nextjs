import InputPublico from "../../componentes/inputPublico/";
import Image from "next/image";
import Botao from '../../componentes/botao'
import Link from "next/link";
import { useState } from "react";
import UploadImagem from '../../componentes/uploadimagen';

import imagemUsuario from '../../public/images/usuarioAtivo.svg';
import imagemEnvelope from '../../public/images/envelope.svg';
import imagemChave from '../../public/images/chave.svg';
import imagemLogo from '../../public/images/logo.svg';
import imagemAvatar from '../../public/images/avatar.svg';


export default function Cadastro() {

    const [imagem, setImagem] = useState(null);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [nome, setNome] = useState("");

    return (
        <section className={`paginaCadastro paginaPublica`}>
            <div className="logoContainer desktop">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form>
                    <UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={imagem?.preview || imagemAvatar.src}
                        setImagem={setImagem}
                    />

                    <InputPublico
                        imagem={imagemUsuario}
                        texto="Nome Completo"
                        tipo="text"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao="O nome precisa de pelo menos 2 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />

                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="O e-mail informado é inválido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                        mensagemValidacao="Precisa de pelo menos 3 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Confirmar Senha"
                        tipo="password"
                        aoAlterarValor={e => setConfirmaSenha(e.target.value)}
                        valor={confirmaSenha}
                        mensagemValidacao="As senhas precisam ser iguais"
                        exibirMensagemValidacao={confirmaSenha && !validarConfirmaSenha(senha, confirmaSenha)}
                    />

                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        //desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <Link href="/">Faça login aqui!</Link>
                </div>
            </div>
        </section>
    );
}