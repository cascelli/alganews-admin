import {
  Avatar,
  Button,
  Card,
  Input,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from 'antd';
import { User } from 'danielbonifacio-sdk';
import { format, parseISO } from 'date-fns';
import { useEffect } from 'react';
import useUsers from '../../core/hooks/useUsers';
import {
  EyeOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
// import { toggleUserStatus } from '../../core/store/User.reducer';
// import { createKeybindingConfig } from '@ant-design/charts';
import { ColumnProps } from 'antd/lib/table';
// import { configureStore } from '@reduxjs/toolkit';

export default function UserList() {
  // define uma constante para receber o hook useUsers
  const { users, fetchUsers, toggleUserStatus, fetching } =
    useUsers();

  // Quando carregar esse componente na aplicacao chama o metodo useEffect
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // determina fetchUsers como uma dependencia desse metodo

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
            setSelectedKeys(
              e.target.value ? [e.target.value] : []
            );
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
          <Button
            onClick={clearFilters}
            size={'small'}
            style={{ width: 90 }}
          >
            Limpar
          </Button>
        </Space>
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? '#0099ff' : undefined }}
      />
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
      <Table<User.Summary>
        loading={fetching}
        dataSource={users}
        columns={[
          {
            dataIndex: 'name',
            title: 'Nome',
            ...getColumnSearchProps('name', 'Nome'),
            width: 160,
            render(name: string, row) {
              // passando a propriedade (name) e o objeto inteiro (row) da linha
              return (
                <Space>
                  <Avatar
                    size={'small'} // define o tamanho small para deixar o avatar menor ainda
                    src={row.avatarUrls.small} // define a imagem a partir da row
                  />
                  <Typography.Text
                    ellipsis // define o tamanho maximo do texto e acrescenta ellipsis no final
                    style={{ maxWidth: 120 }}
                  >
                    {name}
                  </Typography.Text>
                </Space>
              );
            },
          },
          {
            dataIndex: 'email',
            title: 'E-mail',
            ellipsis: true, // limita o texto acrescentando ellipsis no final
            width: 160, // Define uma largura para a coluna
            ...getColumnSearchProps('email', 'E-mail'),
          },
          {
            dataIndex: 'role',
            title: 'Perfil',
            align: 'center',
            render(role) {
              return (
                <Tag
                  color={
                    role === 'MANAGER' ? 'red' : 'blue'
                  }
                >
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
            align: 'center',
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
            align: 'center',
            render(active: boolean, user) {
              return (
                <Switch
                  onChange={() => {
                    toggleUserStatus(user);
                  }}
                  defaultChecked={active}
                />
              );
            },
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'center',
            render() {
              return (
                <>
                  <Button
                    size='small'
                    icon={<EyeOutlined />}
                  />
                  <Button
                    size='small'
                    icon={<EditOutlined />}
                  />
                </>
              );
            },
          },
        ]}
      />
    </>
  );
}
