import { Table } from 'antd';
import { User } from 'danielbonifacio-sdk';
import { useEffect } from 'react';
import useUsers from '../../core/hooks/useUsers';

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
          },
          {
            dataIndex: 'createdAt',
            title: 'Criação',
          },
          {
            dataIndex: 'active',
            title: 'Ativo',
          },
          {
            dataIndex: 'id',
            title: 'Ações',
          },
        ]}
      />
    </>
  );
}
