import { Layout } from 'antd';

const { Content } = Layout; // Primeiro importa o Layout e depois desconstroi o Content do Layout

// Desnecessario importar o React aqui porque tem o proprio namespace
//import React from "react"
interface DefaultLayoutContentProps {
  children: React.ReactNode;
}

export default function DefaultLayoutContent(props: DefaultLayoutContentProps) {
  return (
    <Content
      className='site-layout-background'
      style={{
        margin: 0,
        minHeight: 280,
      }}
    >
      {props.children}
    </Content>
  );
}
