import Image from "next/image";


export default function CabecalhoComAcoes({
    className,
    iconeEsquerda,
    textoEsquerda = null,
    leftAxnOnClick,
    titulo,
    elementoDireita
}) {
    return (
        <div className={`cabecalhoComAcoes ${className} `}>
        {iconeEsquerda ?(
            <Image 
                src={iconeEsquerda}
                alt="icone esquerda cabeçalho ações"
                onClick={leftAxnOnClick}
                width={25}
                height={25}
            />
        ) :(
            textoEsquerda !== null && (
                <span className="cabecalhoComAcoesTextoEsquerda" onClick={leftAxnOnClick}>
                    {textoEsquerda}
                </span>
            )
        )}

        <h3>{titulo}</h3>

        {elementoDireita &&(
            <button
                type='button'

            >
                {elementoDireita}
            </button>
        )}
        </div>
    )
}