import { User, UserService } from 'danielbonifacio-sdk';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
// import { getAllUsers } from '../store/User.reducer';
import * as UserActions from '../store/User.reducer';

export default function useUsers() {
  // // trabalha com estado local
  // const [users, setUsers] = useState<User.Summary[]>([]);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.list);

  const editors = useSelector((state: RootState) =>
    state.user.list.filter((user) => user.role === 'EDITOR')
  );

  const fetching = useSelector((state: RootState) => state.user.fetching);

  // Busca os dados
  // const fetchUsers = useCallback(() => {
  //   UserService.getAllUsers().then(setUsers);
  // }, []);
  const fetchUsers = useCallback(() => {
    dispatch(UserActions.getAllUsers());
  }, [dispatch]);

  const toggleUserStatus = useCallback(
    async (user: User.Detailed | User.Summary) => {
      await dispatch(UserActions.toggleUserStatus(user));
      // console.log('ihu');
      dispatch(UserActions.getAllUsers());
    },
    [dispatch]
  );

  return {
    fetchUsers,
    users,
    editors,
    fetching,
    toggleUserStatus,
  };
}
