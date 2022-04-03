import { Button, Switch, Table, Tag } from 'antd';
import { User } from 'danielbonifacio-sdk';
import { format } from 'date-fns';
import { useEffect } from 'react';
import useUsers from '../../core/hooks/useUsers';
import {
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons';

export default function UserList() {
  // define uma constante para receber o hook useUsers
  const { users, fetchUsers } = useUsers();

  // Quando carregar esse componente na aplicacao chama o metodo useEffect
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // determina fetchUsers como uma dependencia desse metodo

  //return <div>ToDo: User List Component</div>;
  return (
    <>
      <Table<User.Summary>
        dataSource={users}
        columns={[
          {
            dataIndex: 'name',
            title: 'Nome',
          },
          {
            dataIndex: 'email',
            title: 'E-mail',
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
                new Date(createdAt),
                'dd/MM/yyyy'
              );
            },
          },
          {
            dataIndex: 'active',
            title: 'Ativo',
            align: 'center',
            render(active: boolean) {
              return <Switch defaultChecked={active} />;
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