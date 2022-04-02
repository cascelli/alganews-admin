import { User, UserService } from 'danielbonifacio-sdk';
import { useCallback, useState } from 'react';

export default function useUsers() {
  // trabalha com estado local
  const [users, setUsers] = useState<User.Summary[]>([]);

  // Busca os dados
  const fetchUsers = useCallback(() => {
    UserService.getAllUsers().then(setUsers);
  }, []);

  return {
    fetchUsers,
    users,
  };
}
