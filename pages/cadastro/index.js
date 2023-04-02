import InputPublico from "../../componentes/inputPublico/";
import Image from "next/image";
import Botao from '../../componentes/botao'
import Link from "next/link";
import { useState } from "react";
import UploadImagem from '../../componentes/uploadimagen';
import { validarConfirmaSenha, validarEmail, validarNome, validarSenha } from '../../utils/validadores';
import UsuarioService from '../../services/UsuarioService';

import imagemUsuario from '../../public/images/usuarioAtivo.svg';
import imagemEnvelope from '../../public/images/envelope.svg';
import imagemChave from '../../public/images/chave.svg';
import imagemLogo from '../../public/images/logo.svg';
import imagemAvatar from '../../public/images/avatar.svg';

const usuarioService = new UsuarioService();

export default function Cadastro() {

    const [imagem, setImagem] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [ estaSubmetendo, setEstaSubmetendo] = useState(false);

    const validarFormulario = () => {
        return(
            validarNome(nome)
            && validarEmail(email)
            && validarSenha(senha)
            && validarConfirmaSenha(senha, confirmaSenha)

        );
    }

    const aoSubmeter = async (e) => {
        console.log('entrou na função submeter');
        e.preventDefault();
        if (!validarFormulario()) {
            return;
        }

        setEstaSubmetendo(true);
        console.log('ativou esta submetendo para true');

        try{
            const corpoReqCadastro = new FormData();
            console.log("Iniciou o form data do cadastro");
            corpoReqCadastro.append("nome", nome);
            console.log("Catalogou o nome");
            corpoReqCadastro.append("email", email);
            console.log("Catalogou o email");
            corpoReqCadastro.append("senha", senha);
            console.log("Catalogou a senha");

            if(imagem?.arquivo) {
                corpoReqCadastro.append("file", imagem.arquivo);
                console.log('adicionou a img pro [] do corpoCadastro');
            }

            await usuarioService.cadastro(corpoReqCadastro);
            alert("Sucesso!");
            console.log("Sucesso! enviou o form pro db");

        } catch(error) {
            console.log("Não enviou o form pro db");
            alert(
                "Erro ao cadastrar usuario." + error?.response?.data?.erro
            )
        }

        setEstaSubmetendo(false);
        console.log('voltou pra false o esta submetendo');
    }

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
                <form onSubmit={aoSubmeter}>
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
                        desabilitado={!validarFormulario() || estaSubmetendo}
                        onClick = {console.log("Clicou para enviar")}
                        onSubmit = {console.log('submeteu')}
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