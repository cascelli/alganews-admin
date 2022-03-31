import { Menu, Layout } from 'antd';

import {
  UserOutlined,
  LaptopOutlined,
  DiffOutlined,
  HomeOutlined,
  TableOutlined,
  PlusCircleOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';

import { useHistory } from 'react-router-dom';

const { Sider } = Layout; // Primeiro importa o Layout e depois desconstroi o Sider do Layout
const { SubMenu } = Menu; // Primeiro importa o Menu e depois desconstroi o SubMenu do Menu

export default function DefaultLayoutSidebar() {
  const history = useHistory();
  return (
    <Sider
      width={200}
      className='site-layout-background'
      breakpoint='lg'
      collapsedWidth='0'
    >
      <Menu
        mode='inline'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item
          key={'/'}
          onClick={() => history.push('/')}
          icon={<HomeOutlined />}
        >
          Home
        </Menu.Item>
        <SubMenu
          key='sub1'
          icon={<UserOutlined />}
          title='usuários'
        >
          <Menu.Item
            key='/usuarios'
            onClick={() => history.push('/usuarios')}
            icon={<TableOutlined />}
          >
            Consulta
          </Menu.Item>
          <Menu.Item
            key='/usuarios/cadastro'
            onClick={() =>
              history.push('/usuarios/cadastro')
            }
            icon={<PlusCircleOutlined />}
          >
            Cadastro
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          icon={<LaptopOutlined />}
          title='Pagamentos'
        >
          <Menu.Item
            key='/pagamentos'
            onClick={() => history.push('/pagamentos')}
            icon={<TableOutlined />}
          >
            Consulta
          </Menu.Item>
          <Menu.Item
            key='/pagamentos/cadastro'
            onClick={() =>
              history.push('/pagamentos/cadastro')
            }
            icon={<PlusCircleOutlined />}
          >
            Cadastro
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub3'
          icon={<DiffOutlined />}
          title='Fluxo de caixa'
        >
          <Menu.Item
            key='/fluxo-de-caixa/despesas'
            onClick={() =>
              history.push('/fluxo-de-caixa/despesas')
            }
            icon={<FallOutlined />}
          >
            Despesa
          </Menu.Item>
          <Menu.Item
            key='/fluxo-de-caixa/receitas'
            onClick={() =>
              history.push('/fluxo-de-caixa/receitas')
            }
            icon={<RiseOutlined />}
          >
            Receita
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
