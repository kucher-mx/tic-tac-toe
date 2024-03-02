import classNames from 'classnames';

// components
import { AppSidebar } from '../../components/header/header';

// styles
import styles from './profile.module.css';
import { useUserContext } from '../../providers/user/user.context';
import { useEffect, useState } from 'react';
import { UserSchemaType } from '../../providers/user/user.types';
import { DEFAULT_USER } from '../../providers/user/user.const';
import { useToasterContext } from '../../providers/toaster/toaster.context';

type Props = {};

export const ProfileScreen = ({}: Props) => {
  const { user, updateUser } = useUserContext();
  const { success } = useToasterContext();

  useEffect(() => {
    if (user) setEditableUser(user);
  }, [user]);

  const [editableUser, setEditableUser] = useState<UserSchemaType>(DEFAULT_USER);

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await updateUser(editableUser);
      console.log('update success');
      success('Ваш профіль було оновлено');
    } catch (error) {
      console.error('user update form error', { error });
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setEditableUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={classNames(styles['profile-page'])}>
      <AppSidebar />

      <div className={classNames(styles['profile-page-content'])}>
        <form onSubmit={handleUpdateUser}>
          <div className={classNames(styles.input, styles['user-name'])}>
            <label htmlFor="nickname">Ваш нікнейм</label>
            <input
              id="nickname"
              name="nickname"
              value={editableUser.nickname}
              onChange={handleNameChange}
              placeholder="..."
              required
            />
          </div>
          <div className={classNames(styles.input, styles['user-rating'])}>
            {editableUser.rating}
          </div>

          <button type="submit" className={classNames(styles['save-user'])}>
            Зберегти дані
          </button>
        </form>
      </div>
    </div>
  );
};
