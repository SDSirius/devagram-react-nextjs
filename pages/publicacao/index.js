import { useState } from "react";
import { useRouter } from "next/router";
import autorizado from "../../hoc/autorizado";
import FeedService from "../../services/FeedService";
import CabecalhoComAcoes from "../../componentes/cabecalhoComAcoes";
import UploadImagem from "../../componentes/uploadimagen";
import Botao from "../../componentes/botao";
import imagePublicacao from "../../public/images/imagemPublicacao.svg";
import ImgSetaEsquerda from "../../public/images/setaEsquerda.svg";

const descriptionLimit = 255;
const descriptionMin = 3;
const feedService = new FeedService();

function Publicacao(){ 
    const [imagem, setImagem] = useState();
    const [inputImage, setInputImage] = useState();
    const [etapaAtual, setEtapaAtual] = useState(1);
    const [descricao, setDescricao] = useState('');
    const router = useRouter();

    const isFirstStep = () => etapaAtual === 1;

    const getLeftTextHeader = () => {
        if (isFirstStep() && imagem){
            return "Cancelar";
        }

        return "";
    }

    const getRightTextHeader = () => {
        if (!imagem){
            return '';
        }
        if (isFirstStep() && imagem){
            return "Avançar";
        }

        return "Compartilhar";
    }

    const onLeftAxnClick = () => {
        if (isFirstStep()){
            inputImage.value = null;
            setImagem(null);
            return;
        }
        
        setEtapaAtual(1);
    }

    const onRightAxnClick = () => {
        if (isFirstStep()){
            setEtapaAtual(2);
            return;
        }
        publicar();
    }

    const descriptionWrite = (e) => {
        const currentValue = e.target.value;
        if (currentValue.length >= descriptionLimit){
            return;
        }

        setDescricao(currentValue);
    }

    const getClassNameHeader = ()=> {
        if (isFirstStep()){
            return "etapa1";
        }

        return "etapa2";
    }

    const publicar = async () => {
        try {
            if (!validarFormulario()){
                alert( "Publicação Invalida! descrição deve ter entre 3 e 255 caracteres.")
                return;
            }

            const publicacaoPayload = new FormData();
            publicacaoPayload.append('descricao', descricao);
            publicacaoPayload.append('file', imagem.arquivo);

            await feedService.fazerPublicacao(publicacaoPayload);
            router.push('/');

        } catch (error) {
            alert(`Erro ao salvar Publicação: ${error}`);
        }
    }

    const validarFormulario = () => {
        return (
            descricao.length >= descriptionMin
            && imagem?.arquivo
        );
    }

    return (
        <div className="paginaPublicacao largura40pctDesktop">
            <CabecalhoComAcoes
                className={getClassNameHeader()}
                iconeEsquerda={isFirstStep() ? null : ImgSetaEsquerda}
                textoEsquerda={getLeftTextHeader()}
                leftAxnOnClick={onLeftAxnClick}
                rightElement={getRightTextHeader()}
                btnRightAxn={onRightAxnClick}
                titulo='Nova Publicação'
            />

            <hr className="linhaDivisoria" />

            <div className="conteudoPublicacao">
                {isFirstStep() 
                ? (
                    <div className="etapa1">
                        <UploadImagem 
                            setImagem={setImagem}
                            aoSetarAReferencia={setInputImage}
                            imagemPreviewClassName= {!imagem ? 'previewImagemPublicacao': "previewImagemSelecionada"}
                            imagemPreview={imagem?.preview || imagePublicacao.src}
                        />

                        <span className="desktop textoDragAndDrop"> Arraste sua foto aqui!</span>

                        <Botao 
                            texto='Selecionar imagem.'
                            manipularClique={() => inputImage?.click()}
                        />
                    </div>
                ) : ( 
                    <>
                        <div className="etapa2">
                            <UploadImagem
                                setImagem={setImagem}
                                imagemPreview={imagem?.preview}                            
                                />

                            <textarea 
                                rows={5}
                                value={descricao}
                                placeholder="Escreva aqui sua Legenda..."
                                onChange={descriptionWrite}
                                ></textarea>

                        </div>
                        
                        <hr className="linhaDivisoria" />
                    </>
                )}

            </div>
            
        </div>
    )
}

export default autorizado(Publicacao);