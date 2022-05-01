import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Input,
  Row,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
  // Typography,
} from 'antd';
import { User } from 'danielbonifacio-sdk';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import useUsers from '../../core/hooks/useUsers';
import {
  EyeOutlined,
  EditOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
// import { toggleUserStatus } from '../../core/store/User.reducer';
// import { createKeybindingConfig } from '@ant-design/charts';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { ForbiddenError } from 'danielbonifacio-sdk/dist/errors';
import Forbidden from '../components/Forbidden';
// import { configureStore } from '@reduxjs/toolkit';

export default function UserList() {
  // define uma constante para receber o hook useUsers
  const { users, fetchUsers, toggleUserStatus, fetching } = useUsers();

  const [forbidden, setForbidden] = useState(false);

  // Quando carregar esse componente na aplicacao chama o metodo useEffect
  useEffect(() => {
    fetchUsers().catch((err) => {
      if (err?.data?.status === 403) {
        setForbidden(true);
        return;
      }

      throw err;
    });
  }, [fetchUsers]); // determina fetchUsers como uma dependencia desse metodo

  if (forbidden) return <Forbidden />;

  const getColumnSearchProps = (
    dataIndex: keyof User.Summary,
    displayName?: string
  ): ColumnProps<User.Summary> => ({
    filterDropdown: ({
      selectedKeys,
      setSelectedKeys,
      confirm,
      clearFilters,
    }) => (
      <Card>
        <Input
          style={{ marginBottom: 8, display: 'block' }}
          value={selectedKeys[0]}
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => confirm()}
        />
        <Space>
          <Button
            type={'primary'}
            size={'small'}
            style={{ width: 90 }}
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Buscar
          </Button>
          <Button onClick={clearFilters} size={'small'} style={{ width: 90 }}>
            Limpar
          </Button>
        </Space>
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#0099ff' : undefined }} />
    ),
    // @ts-ignore
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : '',
  });

  //return <div>ToDo: User List Component</div>;
  return (
    <>
      <Row justify='end'>
        <Button
          onClick={() => fetchUsers()}
          loading={fetching}
          icon={<ReloadOutlined />}
        >
          Atualizar
        </Button>
      </Row>
      <Table<User.Summary>
        loading={fetching}
        dataSource={users}
        //pagination={{ pageSize: 2 }}
        pagination={false}
        rowKey={'id'}
        columns={[
          {
            title: 'Usuários',
            responsive: ['xs'],
            render(user: User.Summary) {
              return (
                <Descriptions column={1} size={'small'}>
                  <Descriptions.Item label={'Nome'}>
                    {user.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Email'}>
                    {user.email}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Criação'}>
                    {format(new Date(user.createdAt), 'dd/MM/yyyy')}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Perfil'}>
                    <Tag color={user.role === 'MANAGER' ? 'red' : 'blue'}>
                      {user.role === 'EDITOR'
                        ? 'Editor'
                        : user.role === 'MANAGER'
                        ? 'Gerente'
                        : 'Assistente'}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label={'Ações'}>
                    <Button size='small' icon={<EyeOutlined />} />
                    <Button size='small' icon={<EditOutlined />} />
                  </Descriptions.Item>
                </Descriptions>
              );
            },
          },
          {
            dataIndex: 'avatarUrls',
            title: '',
            responsive: ['sm'],
            width: 48,
            fixed: 'left',
            render(avatarUrls: User.Summary['avatarUrls'], row) {
              return (
                <Avatar
                  size={'small'} // define o tamanho small para deixar o avatar menor ainda
                  src={avatarUrls.small} // define a imagem a partir da row
                />
              );
            },
          },
          {
            dataIndex: 'name',
            title: 'Nome',
            responsive: ['sm'],
            width: 160,
            ellipsis: true,
            ...getColumnSearchProps('name', 'Nome'),
          },
          {
            dataIndex: 'email',
            title: 'E-mail',
            responsive: ['md'],
            ellipsis: true, // limita o texto acrescentando ellipsis no final
            width: 160, // Define uma largura para a coluna
            ...getColumnSearchProps('email', 'E-mail'),
          },
          {
            dataIndex: 'role',
            title: 'Perfil',
            responsive: ['sm'],
            align: 'center',
            width: 100,
            sorter(a, b) {
              return a.role.localeCompare(b.role);
            },
            render(role) {
              return (
                <Tag color={role === 'MANAGER' ? 'red' : 'blue'}>
                  {role === 'EDITOR'
                    ? 'Editor'
                    : role === 'MANAGER'
                    ? 'Gerente'
                    : 'Assistente'}
                </Tag>
              );
            },
          },
          {
            dataIndex: 'createdAt',
            title: 'Criação',
            responsive: ['lg'],
            align: 'center',
            width: 120,
            sorter(a, b) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            },
            render(createdAt: string) {
              return format(
                // new Date(createdAt),
                parseISO(createdAt),
                'dd/MM/yyyy'
              );
            },
          },
          {
            dataIndex: 'active',
            title: 'Ativo',
            responsive: ['sm'],
            align: 'center',
            width: 100,
            render(active: boolean, user) {
              return (
                <Switch
                  disabled={
                    (active && !user.canBeDeactivated) ||
                    (!active && !user.canBeActivated)
                  }
                  onChange={() => {
                    toggleUserStatus(user);
                  }}
                  //defaultChecked={active}
                  checked={active}
                />
              );
            },
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            responsive: ['sm'],
            align: 'center',
            width: 100,
            render(id: number) {
              return (
                <>
                  <Tooltip title={'Visualizar usuário'} placement={'left'}>
                    <Link to={`/usuarios/${id}`}>
                      <Button size='small' icon={<EyeOutlined />} />
                    </Link>
                  </Tooltip>
                  <Tooltip title={'Editar usuário'} placement={'right'}>
                    <Link to={`/usuarios/edicao/${id}`}>
                      <Button size='small' icon={<EditOutlined />} />
                    </Link>
                  </Tooltip>
                </>
              );
            },
          },
        ]}
      />
    </>
  );
}
