import React, { useState, useEffect } from "react";
import "./Calculator.css";

export default function Calculator() {

    //const [formValues, setFormValue] = useState({});
    const [catetoA, setCatetoA] = useState('');
    const [catetoO, setCatetoB] = useState('');
    const [hipotenusa, setHipotenusa] = useState('');
    const [resultado, setResultado] = useState('');
    const [area, setArea] = useState('');

    const handleInputChange = (e) => {
        const target = e.target;

        if (target.name === 'catetoA' && target.value > 0) {
            setCatetoA(target.value);
        }

        if (target.name === 'catetoO' && target.value > 0) {
            setCatetoB(target.value);
        }

        if (target.name === 'hipotenusa' && target.value > 0) {
            setHipotenusa(target.value);
        }
    };

    const calculate = (e) => {
        e.preventDefault();
        if (catetoA > 0 && catetoO > 0 && (hipotenusa == null || hipotenusa == 0)) { // Calcula Hipotenusa
            const h = Math.hypot(catetoA, catetoO);
            const area = catetoA * catetoO / 2;
            setHipotenusa(h)
            setResultado(`Hipotenusa = ${h.toFixed(2)}`);
            setArea(`Sua area é  de ${area.toFixed(2)}`);

        } else if (hipotenusa > catetoA && hipotenusa > catetoO) {
            

            if (hipotenusa > 0 && catetoO > 0 && (catetoA == null || catetoA == 0)) { // Calcula Cateto Adjacente
                const cA = Math.sqrt((Math.pow(hipotenusa, 2) - Math.pow(catetoO, 2)))
                const area = cA * catetoO / 2;
                setCatetoA(cA)
                setResultado(`Cateto Adjacente = ${cA.toFixed(2)}`)
                setArea(`Sua area é de ${area.toFixed(2)}`)

            } else if (hipotenusa > 0 && catetoA > 0 && (catetoO == null || catetoO == 0)) { // Calcula Cateto Oposto
                const cO = Math.sqrt((Math.pow(hipotenusa, 2) - Math.pow(catetoA, 2)))
                const area = catetoA * cO / 2;
                setCatetoB(cO)
                setResultado(`Cateto Oposto = ${cO.toFixed(2)}`)
                setArea(`Sua area é de ${area.toFixed(2)}`)

            } else {
                setResultado(`Você precisa digitar 2 valores`)
            }
        } else {
            setResultado('Hipotenusa tem que ser maior que os Catetos')
        }
    };


    const clean = (c) => {
        c.preventDefault();

        setCatetoA('');
        setCatetoB('');
        setHipotenusa('');
        setArea('');
        setResultado('');
    }

    return (
        <div className="template">
            <p>Calculadora de Pitágoras</p>

            <form >
                <label>
                    Cateto Adjacente
                    <input type="number" name='catetoA' onChange={handleInputChange} value={catetoA} />
                </label>

                <label>
                    Cateto Oposto
                    <input type="number" name="catetoO" onChange={handleInputChange} value={catetoO} />
                </label>

                <label>
                    Hipotenusa
                    <input type="number" name="hipotenusa" onChange={handleInputChange} value={hipotenusa} min='0' />
                </label>

                <button onClick={calculate}>Calcular</button>
                <button onClick={clean}>Limpar</button>


            </form>

            <span>
                {resultado}
            </span>
            <span>
                {area}
            </span>
        </div>

    );
}
