import { Menu, Layout, Row, Avatar, Dropdown, Card, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import logo from '../../../assets/logo.svg';
import useAuth from '../../../core/hooks/useAuth';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout; // Primeiro importa o Layout e depois desconstroi o Header do Layout

export default function DefaultLayoutHeader() {
  const { user } = useAuth();

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
        <Dropdown
          placement={'bottomRight'}
          overlay={
            <Card style={{ width: 220 }}>
              <Card bordered={false}>
                <Meta
                  //avatar={<Avatar src={user?.avatarUrls.small} />}
                  title={user?.name}
                  description={
                    <Tag color={user?.role === 'MANAGER' ? 'red' : 'blue'}>
                      {user?.role === 'EDITOR'
                        ? 'Editor'
                        : user?.role === 'MANAGER'
                        ? 'Gerente'
                        : 'Assistente'}
                    </Tag>
                  }
                />
              </Card>
              <Menu>
                <Menu.Item icon={<UserOutlined />}>Meu perfil</Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} danger>
                  Fazer logout
                </Menu.Item>
              </Menu>
            </Card>
          }
        >
          <Avatar src={user?.avatarUrls.small} />
        </Dropdown>
      </Row>
    </Header>
  );
}
