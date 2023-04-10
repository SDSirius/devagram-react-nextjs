import Image from 'next/image';
import logoHorizontalImg from '../../public/images/logoHorizontal.svg';
import imagemLupa from '../../public/images/Lupa.svg';
import Navegacao from './Navegacao';

export default function Cabecalho() {
    return(
        <header className='cabecalhoPrincipal'>
            <div className='conteudoCabecalhoPrincipal'>
                <div className='logoCabecalhoPricipal'>
                    <Image 
                    src={logoHorizontalImg}
                    alt='logo Devagram'
                    layout='fill'
                    />
                </div>
                <div className='barraPesquisa'>
                    <div className='containerImagemLupa'>
                        <Image 
                            src={imagemLupa}
                            alt='Icone da Lupa'
                            layout='fill'
                        />
                    </div>

                    <input 
                        type='text'
                        placeholder='Pesquisar'
                        value={''}
                        onChange={() => console.log('Pesquisando.')}
                    />
                </div>
                <Navegacao className='desktop' />
            </div>


        </header>
    );
}