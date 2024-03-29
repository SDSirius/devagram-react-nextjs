import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { validarNome } from "../../utils/validadores";
import UploadImagem from "../../componentes/uploadimagen";
import CabecalhoComAcoes from "../../componentes/cabecalhoComAcoes";
import autorizado from "../../hoc/autorizado";
import imgAvatar from "../../public/images/avatar.svg";
import imgLimpar from "../../public/images/limpar.svg";
import UsuarioService from "../../services/UsuarioService";

function EditarPerfil({ usuarioLogado }) {
    const [avatar, setAvatar] = useState();
    const [inputAvatar, setInputAvatar] = useState('');
    const [nome, setNome] = useState();
    const router = useRouter();

    const usuarioService = new UsuarioService();

    useEffect( () => {
        if (!usuarioLogado){
            return;
        }
        setNome(usuarioLogado.nome);
        setAvatar({
            preview: usuarioLogado.avatar
        });
    },[])

    const profileUpdate = async () =>{
        try {
            if (!validarNome(nome)){
                alert('nome inválido, minimo 2 Caracteres obrigatório!')
                return;
            }

            const payload = new FormData();
            payload.append('nome', nome);
        

            if (avatar.arquivo) {
                
                payload.append('file', avatar.arquivo);
                
            }
            await usuarioService.atualizarPerfil(payload);
            localStorage.setItem("nome", nome);

            if (avatar.arquivo) {
                localStorage.setItem('avatar', avatar.preview);
            }

            router.push('/perfil/eu');
        } catch (error) {
            alert(`Erro ao atualizar o perfil: ${error}`);
        }
    }

    const onCancelEdit = () => {
        router.push('/perfil/eu');
    }

    const openFileSelector = () => {
        inputAvatar?.click()
    }

    return (
        <div className="paginaEditarPerfil largura40pctDesktop">
            <div className="conteudoPaginaEditarPerfil">
                <CabecalhoComAcoes
                    titulo={"Editar perfil"}
                    aoClicarAcaoEsquerda={onCancelEdit}
                    textoEsquerda="Cancelar"
                    elementoDireita={"Concluir"}
                    aoClicarElementoDireita={profileUpdate}
                />

                <hr className="linhaDivisoria" />

                <div className="edicaoAvatar">
                    <UploadImagem 
                        setImagem={setAvatar}
                        imagemPreview={avatar?.preview || imgAvatar.src}
                        imagemPreviewClassName= 'avatar'
                        aoSetarAReferencia={setInputAvatar}
                    />

                    <span onClick={openFileSelector}>Alterar foto do perfil</span>
                </div>

                <hr className="linhaDivisoria" />
                    
                <div className="edicaoNome">
                    <label>Nome: </label>
                    <input 
                        type='text'
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <Image 
                        src={imgLimpar}
                        alt="Icone Limpar"
                        width={16}
                        height={16}
                        onClick={() => setNome('')}
                    />
                </div>
                
                <hr className="linhaDivisoria" />

            </div>

        </div>
    );
}

export default autorizado(EditarPerfil);