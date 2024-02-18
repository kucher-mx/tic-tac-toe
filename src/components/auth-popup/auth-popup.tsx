import { useState } from 'react';
import classNames from 'classnames';

// context
import { useUserContext } from '../../providers/user/user.context';

// styles
import styles from './auth-popup.module.css';
import Modal from '../modal/modal';
import { Icon, avaliableIconsIds } from '../icon/icon';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const AuthPopup = ({ isOpen, handleClose }: Props) => {
  const { signInWithGoogle, signInWithCredentials, createUserWithCredentials } = useUserContext();

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCredentialsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isRegister) {
        await createUserWithCredentials(formData.email, formData.password);
      } else {
        await signInWithCredentials(formData.email, formData.password);
      }

      handleClose();
    } catch (error) {
      console.error('authorization error', { error });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={classNames(styles['auth-popup'])}>
      <div className={classNames(styles['auth-popup-body'])}>
        <div className={classNames(styles['title'])}>Вхід / Реєстрація</div>

        {/* Google sign in */}
        <button className={classNames(styles['auth-google-btn'])} onClick={signInWithGoogle}>
          <Icon id={avaliableIconsIds.GOOGLE_LOGO} /> Авторизуватись через Google
        </button>

        <div className={styles['or-label']}>
          <span>або</span>
        </div>

        <div className={classNames(styles['auth-body'])}>
          <div className={classNames(styles['auth-credentials-type-toggle'])}>
            <button disabled={isRegister} onClick={() => setIsRegister(true)}>
              Зареєструватись
            </button>
            <button disabled={!isRegister} onClick={() => setIsRegister(false)}>
              Увійти
            </button>
          </div>

          {/* Credentials sign in */}
          <form onSubmit={handleCredentialsSubmit}>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={onInputChange}
              placeholder="E-mail"
            />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={onInputChange}
              placeholder="Password"
            />
            <button type="submit">{isRegister ? 'Створити аккаунт' : 'Увійти'}</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};