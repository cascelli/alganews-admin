import {
  Avatar,
  Button,
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
                    style={{ maxWidth: 180 }}
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
