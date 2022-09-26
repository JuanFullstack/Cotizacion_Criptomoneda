import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
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




const Formulario = (  { setmonedas} ) => {
    const [cripto, setcripto] = useState([]);
    const [error, seterror] = useState(false);

    //los arrays destructuring la variable se define por la posicion ,
    // puedo usar otro nombre pero respetar orden state  = moneda //state = criptomoneda traido de useselectmodena

    const [moneda, SelectMonedas] = useSelectMonedas(' Elige tu moneda ', monedas);

    const [criptomoneda, Selectcriptomoneda] = useSelectMonedas(
        ' Elige tu criptomoneda ',
        cripto
    );

    useEffect(() => {
        const consultarAPI = async () => {
            const url =
                'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            const arrayCripto = resultado.Data.map((cripto) => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName,
                };

                return objeto;
            });

            setcripto(arrayCripto);
        };

        consultarAPI();
    }, []);


    const handlesubmit = (e) => {
        e.preventDefault();
        if ([moneda, criptomoneda].includes('')) {
          seterror (true)
            return
        }

        seterror (false)
        setmonedas ( { moneda , criptomoneda  } )
    };


    

    return (
      <>
        {error && <Error> Todos los Campos son obligatorios </Error> }
        <form 
        
        onSubmit={handlesubmit}
        
        >
            <SelectMonedas />

            <Selectcriptomoneda />

            <InputSubmit type='submit' value='cotizar' />
        </form>

     </>



    );
};

export default Formulario;
