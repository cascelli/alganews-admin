import { Layout } from 'antd';

import Breadcrumb from './Breadcrumb';
import DefaultLayoutHeader from './Header';
import DefaultLayoutSidebar from './Sidebar';
import DefaultLayoutContent from './Content';

// Desnecessario importar o React aqui porque tem o proprio namespace
//import React from "react"
interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout(
  props: DefaultLayoutProps
) {
  return (
    <Layout>
      <DefaultLayoutHeader />
      <Layout id={'PageLayout'}>
        <DefaultLayoutSidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb />
          <DefaultLayoutContent>
            {props.children}
          </DefaultLayoutContent>
        </Layout>
      </Layout>
    </Layout>
  );
}
