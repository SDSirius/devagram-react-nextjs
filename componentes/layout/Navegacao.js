import Image from 'next/image';

import imgHomeAtivo from '../../public/images/HomeAtivo.svg';
import imgHomeCinza from '../../public/images/HomeCinza.svg';
import imgPublicacaoAtivo from '../../public/images/publicacaoAtivo.svg';
import imgPublicacaoCinza from '../../public/images/publicacaoCinza.svg';
import imgUsuarioAtivo from '../../public/images/usuarioAtivo.svg';
import imgUsuarioCinza from '../../public/images/usuarioCinza.svg';


export default function Navegacao( {className}){
    return(
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li>
                    <Image 
                        src={imgHomeAtivo}
                        alt="Icone Home"
                        width={20}
                        height={20}
                    />
                </li>
                
                <li>
                    <Image 
                        src={imgPublicacaoCinza}
                        alt="Icone Publicação"
                        width={20}
                        height={20}
                    />
                </li>
                
                <li>
                    <Image 
                        src={imgUsuarioCinza}
                        alt="Icone Usuario"
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    );
}