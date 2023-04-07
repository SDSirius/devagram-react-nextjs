import { useEffect, useRef } from "react";

export default function UploadImagem({
    className = '',
    setImagem,
    imagemPreview,
    imagemPreviewClassName= '',
    aoSetarAReferencia
}) {

    const referenciaInput = useRef(null);

    useEffect(() => {
        if (!aoSetarAReferencia){
            return;
        }

        aoSetarAReferencia(referenciaInput?.current);
    }, [referenciaInput?.current]);

    const abrirSeletorArquivos = () => {
        referenciaInput?.current?.click();
    }

    const aoAlterarImagem = () =>{
        console.log('alterar')

        if(!referenciaInput?.current?.files?.length ){
           return;
        }

        const arquivo = referenciaInput?.current?.files[0];

        const leitorDoc = new FileReader();
        leitorDoc.readAsDataURL(arquivo);
        leitorDoc.onloadend =() => {
            setImagem({
                preview: leitorDoc.result,
                arquivo
            });
        }
    }

    return (
        <div className={`uploadImagemContainer ${className}`} 
        onClick={abrirSeletorArquivos}>
            {imagemPreview && (
                <div className="imagemPreviewContainer">
                    <img 
                        src={imagemPreview}
                        alt='imagem Preview'
                        className={imagemPreviewClassName}
                        />
                </div>
            )}

            <input 
                type='file' 
                className="oculto" 
                accept="image/*"
                ref={referenciaInput}
                onChange={aoAlterarImagem}
            />
        </div>
    );
}