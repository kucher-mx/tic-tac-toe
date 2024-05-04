import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

// components
import { GamesSlider } from './components/games-slider/games-slider';
import { Plural } from '../../components/plural/plural';

// context
import { useUserContext } from '../../providers/user/user.context';
import { useToasterContext } from '../../providers/toaster/toaster.context';

// types
import { UserSchemaType } from '../../providers/user/user.types';

// consts
import { DEFAULT_USER } from '../../providers/user/user.const';

// helpers
import { getUserPlaceFromFirestore } from '../../providers/user/helpers/getUserRatingPlace';

// styles
import styles from './profile.module.css';
import { Loader } from '../../components/loader/loader';

export const ProfileScreen = () => {
  const { user, updateUser } = useUserContext();
  const { success } = useToasterContext();

  const [editableUser, setEditableUser] = useState<UserSchemaType>(DEFAULT_USER);
  const [userPlace, setUserPlace] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        setIsLoading(true);
        if (user) {
          const place = await getUserPlaceFromFirestore(user.id);

          setEditableUser(user);
          setUserPlace(place);
        }
      } catch (error) {
        console.error('get user data error', { error });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await updateUser(editableUser);
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

  const isSaveUserDisabled = useMemo(() => {
    return !user || editableUser.nickname === user?.nickname;
  }, [editableUser.nickname, user]);

  return (
    <div className={classNames(styles['profile-page'])}>
      <div
        className={classNames(styles['loader-wrapper'], {
          [styles['active']]: isLoading,
        })}
      >
        <Loader />
      </div>

      <form onSubmit={handleUpdateUser} className={classNames(styles['user-data-form'])}>
        <div className={classNames(styles.input, styles['user-name'])}>
          <label htmlFor="nickname">Нікнейм</label>
          <input
            id="nickname"
            name="nickname"
            value={editableUser.nickname}
            onChange={handleNameChange}
            placeholder="..."
            required
          />
        </div>
        <div className={classNames(styles['rating'])}>
          Рейтинг:{' '}
          <b>
            {editableUser.rating}&#8239;
            <Plural count={editableUser.rating} many="очок" one="очко" other="очок" few="очки" />
          </b>
        </div>
        <div className={classNames(styles['placement'])}>
          Місце у рейтингу: <b>#{userPlace}</b>
        </div>

        <button
          type="submit"
          className={classNames(styles['save-user-btn'])}
          disabled={isSaveUserDisabled}
        >
          Зберегти дані
        </button>
      </form>

      <div className={classNames(styles['games-history-title'])}>Історія ігор</div>
      <GamesSlider />
    </div>
  );
};
