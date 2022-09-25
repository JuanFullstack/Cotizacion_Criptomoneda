import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;




const Formulario = () => {
 
  //la variable se define por indice  puedo usar otro nombre pero respetar orden state  = moneda 
  const [ state , SelectMonedas] = useSelectMonedas(' Elige tu moneda ' , monedas );
  
  useEffect(() => {

    const consultarAPI = async () =>{
     
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      const respuesta = await fetch (url)
      const resultado = await respuesta.json()
      console.log (resultado)

    }
   
    consultarAPI()
    
  }, [])
  




  return (
    <form>
      <SelectMonedas />
      {state}

      <InputSubmit type='submit' value='cotizar' />
    </form>
  );
};

export default Formulario;
