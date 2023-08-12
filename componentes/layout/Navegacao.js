import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import imgHomeAtivo from '../../public/images/HomeAtivo.svg';
import imgHomeCinza from '../../public/images/HomeCinza.svg';
import imgPublicacaoAtivo from '../../public/images/publicacaoAtivo.svg';
import imgPublicacaoCinza from '../../public/images/publicacaoCinza.svg';
import imgUsuarioAtivo from '../../public/images/usuarioAtivo.svg';
import imgUsuarioCinza from '../../public/images/usuarioCinza.svg';

const mapaRotas = {
    home:{
        imagemAtivo: imgHomeAtivo,
        rotasAtivacao: ['/'],
        imgPadrao: imgHomeCinza
    },
    publicacao:{
        imagemAtivo: imgPublicacaoAtivo,
        rotasAtivacao: ['/publicacao'],
        imgPadrao: imgPublicacaoCinza
    },
    perfil:{
        imagemAtivo: imgUsuarioAtivo,
        rotasAtivacao: ['/perfil/eu', '/perfil/editar'],
        imgPadrao: imgUsuarioCinza
    }
}

export default function Navegacao( {className}){
    const [rotaAtiva, setRotaAtiva] = useState('home');
    const router = useRouter();

    useEffect(() =>  {
        definirRotaAtiva();
    }, [router.asPath]);

    const definirRotaAtiva = () => {
        const chaveMapaRota = Object.keys(mapaRotas);
        const indiceAtivo = chaveMapaRota.findIndex(chave => {
            return mapaRotas[chave].rotasAtivacao.includes(
                window.location.pathname
            );
        });

        if(indiceAtivo === -1) {
            setRotaAtiva('home');
        } else {
            setRotaAtiva(chaveMapaRota[indiceAtivo]);
        }
    }

    const obterImagem = (nomeRota) => {
        const rotaAtivada = mapaRotas[nomeRota];

        if(rotaAtiva === nomeRota) {
            return rotaAtivada.imagemAtivo;
        }
        return rotaAtivada.imgPadrao;
    }

    const aoClicarIcone = (nomeRota) => {
        setRotaAtiva(nomeRota);
        router.push(mapaRotas[nomeRota].rotasAtivacao[0]);
    }

    return(
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li onClick={() => aoClicarIcone('home')}>
                    <Image 
                        src={obterImagem('home')}
                        alt="Icone Home"
                        width={20}
                        height={20}
                    />
                </li>
                
                <li onClick={() => aoClicarIcone('publicacao')}>
                    <Image 
                        src={obterImagem('publicacao')}
                        alt="Icone Publicação"
                        width={20}
                        height={20}
                    />
                </li>
                
                <li onClick={() => aoClicarIcone('perfil')}>
                    <Image 
                        src={obterImagem('perfil')}
                        alt="Icone Usuario"
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    );
}