// hooks
import { HOST_API } from '../config';
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={`${HOST_API}${user?.avatar||'uploads/images/avatar.png'}`}
      alt={user?.displayName}
      color={'default'}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
