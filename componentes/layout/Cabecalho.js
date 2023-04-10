import Image from 'next/image';
import { useState } from 'react';
import logoHorizontalImg from '../../public/images/logoHorizontal.svg';
import imagemLupa from '../../public/images/Lupa.svg';
import Navegacao from './Navegacao';
import ResultadoPesquisa from './ResultadoPesquisa';

export default function Cabecalho() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState([]);

    const aoPesquisar = (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);

        if (termoPesquisado.length < 3) {
            return;
        }
        
        setResultadoPesquisa([
            {
                avatar:"",
                nome:"Sérgio",
                email:"sergiod398@gmail.com",
                _id: "12345"
            },
            {
                avatar:"",
                nome:"Rubens",
                email:"Rubao@gmail.com",
                _id: "12346"
            },
            {
                avatar:"",
                nome:"Sabrina",
                email:"Sassa@gmail.com",
                _id: "12347"
            }
        ])
    }

    const aoclicarResutadoPesquisa = (id)=> {
        console.log('aoclicarResutadoPesquisa', {id});
    }

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
                        value={termoPesquisado}
                        onChange={aoPesquisar}
                    />
                </div>
                
                <Navegacao className='desktop' />
            </div>
            {resultadoPesquisa.length >0 &&(
                <div className='resultadoPesquisaContainer'>
                    {resultadoPesquisa.map(r => (
                        <ResultadoPesquisa
                            avatar={r.avatar}
                            nome={r.nome}
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoclicarResutadoPesquisa}
                        />
                    ))}
                </div>
            )}
        </header>
    );
}