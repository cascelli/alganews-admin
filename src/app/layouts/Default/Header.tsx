import { Menu, Layout, Row, Avatar } from 'antd';
import logo from '../../../assets/logo.svg';

const { Header } = Layout; // Primeiro importa o Layout e depois desconstroi o Header do Layout

export default function DefaultLayoutHeader() {
  return (
    <Header className='header no-print'>
      {/*
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['2']}
      >
        <Menu.Item key='1'>nav 1</Menu.Item>
        <Menu.Item key='2'>nav 2</Menu.Item>
        <Menu.Item key='3'>nav 3</Menu.Item>
      </Menu>
      */}

      <Row
        justify={'space-between'}
        style={{
          height: '100%',
          maxWidth: 1190,
          margin: '0 auto',
        }}
        align='middle'
      >
        {/* <div style={{ color: '#fff' }}>logo</div> */}
        <img src={logo} alt='Alganews Admin'></img>
        <Avatar />
      </Row>
    </Header>
  );
}
