import { useState } from "react";
import { useRouter } from "next/router";
import autorizado from "../../hoc/autorizado";
import FeedService from "../../services/FeedService";
import CabecalhoComAcoes from "../../componentes/cabecalhoComAcoes";
import UploadImagem from "../../componentes/uploadimagen";
import Botao from "../../componentes/botao";
import imagePublicacao from "../../public/images/imagemPublicacao.svg";
import ImgSetaEsquerda from "../../public/images/setaEsquerda.svg";

const limiteDaDescricao = 255;
const descricaoMinima = 3;
const feedService = new FeedService();

function Publicacao(){ 
    const [imagem, setImagem] = useState();
    const [descricao, setDescricao] = useState('');
    const [inputImage, setInputImage] = useState();
    const [etapaAtual, setEtapaAtual] = useState(1);
    const router = useRouter();

    const estaNaEtapaUm = () => etapaAtual === 1;

    const obterTextoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm() && imagem){
            return "Cancelar";
        }

        return "";
    }

    const obterTextoDireitaCabecalho = () => {
        if (!imagem){
            return '';
        }
        if (estaNaEtapaUm() && imagem){
            return "Avançar";
        }

        return "Compartilhar";
    }

    const aoClicarAcaoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm()){
            inputImage.value = null;
            setImagem(null);
            return;
        }
        
        setEtapaAtual(1);
    }

    const aoClicarAcaoDireitaCabecalho = () => {
        if (estaNaEtapaUm()){
            setEtapaAtual(2);
            return;
        }
        publicar();
    }

    const escreverDescricao = (e) => {
        const currentValue = e.target.value;
        if (currentValue.length >= limiteDaDescricao){
            return;
        }

        setDescricao(currentValue);
    }

    const obterClassNameCabecalho = ()=> {
        if (estaNaEtapaUm()){
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

            const corpoPublicacao = new FormData();
            corpoPublicacao.append('descricao', descricao);
            corpoPublicacao.append('file', imagem.arquivo);

            await feedService.fazerPublicacao(corpoPublicacao);
            router.push('/');

        } catch (error) {
            alert(`Erro ao salvar Publicação: ${error}`);
        }
    }

    const validarFormulario = () => {
        return (
            descricao.length >= descricaoMinima
            && imagem?.arquivo
        );
    }

    return (
        <div className="paginaPublicacao largura40pctDesktop">
            <CabecalhoComAcoes
                className={obterClassNameCabecalho()}
                iconeEsquerda={estaNaEtapaUm() ? null : ImgSetaEsquerda}
                textoEsquerda={obterTextoEsquerdaCabecalho()}
                aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
                elementoDireita={obterTextoDireitaCabecalho()}
                aoClicarElementoDireita={aoClicarAcaoDireitaCabecalho}
                titulo='Nova Publicação'
            />

            <hr className="linhaDivisoria" />

            <div className="conteudoPublicacao">
                {estaNaEtapaUm() 
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
                                onChange={escreverDescricao}
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