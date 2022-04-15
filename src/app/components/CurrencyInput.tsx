/*
import React from 'react';
import { useCallback, useState } from 'react';

type CurrencyInputProps =
  // Omite a propriedade onChange deste elemento
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onchange'
  > & {
    // concatena com nova propriedade onChange personalizada
    onChange: (
      event: React.ChangeEvent<HTMLInputElement>,
      reals: number
    ) => any;
  };

export default function CurrencyInput(
  props: CurrencyInputProps
) {
  const [inputValue, setInputValue] = useState('R$ 0,00');
  const convertValueToBrl = useCallback((value: number) => {
    return value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }, []);
  return (
    <input
      className={'ant-input'}
      {...props}
      value={inputValue}
      onChange={(e) => {
        const { value } = e.currentTarget;
        //console.log(value)
        const cents = value.replace(/[^(0-9)]/gi, '');
        //console.log(cents)
        const reals = Number(cents) / 100;
        //console.log(reals)
        setInputValue(convertValueToBrl(reals));
        props.onChange && // Verifica se a propriedade existe
          props.onChange(e, reals); // passa os reais para cima
      }}
    />
  );
}
*/
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

// Cria um tipo para sobrescrever a propriedade onChange
// Omite a propriedade onChange
type CurrencyInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  // Redefine a propriedae onChange
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    reals: number
  ) => any;
};
export default function CurrencyInput(
  props: CurrencyInputProps
) {
  const [inputValue, setInputValue] = useState('R$ 0,00');

  const convertValueToBrl = useCallback((value: number) => {
    return value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }, []);

  return (
    <input
      className={'ant-input'}
      {...props}
      value={inputValue}
      onChange={(e) => {
        const { value } = e.currentTarget;

        const cents = value.replace(/[^(0-9)]/gi, '');

        const reals = Number(cents) / 100;

        setInputValue(convertValueToBrl(reals));
        props.onChange && props.onChange(e, reals);
      }}
    />
  );
}
