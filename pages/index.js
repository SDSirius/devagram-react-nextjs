import { useRef, useState } from 'react'
import Avatar from '../Componentes/avatar'
import Botao from '../Componentes/botao'
import { UploadImagem } from '../Componentes/uploadimagen'


export default function Home() {
  const [imagem, setImagem] = useState(null);

  const referenciaInput = useRef(null);

  return (
    <>
      <h1> Olá Mundo!</h1>
      <button onClick={() => referenciaInput?.current?.click()}>Abrir seletor de arquivos.</button>

      <UploadImagem 
        setImagem={setImagem} 
        imagemPreview={imagem?.preview} 
        aoSetarAReferencia={(ref) => referenciaInput.current = ref}
      />


      <div style={{width:200}}>
        <Avatar/>
        <Botao texto={'Login'} cor='primaria' manipularClique={() => console.log('Botao Clicado')} />
      </div>
    </>
  )
}
