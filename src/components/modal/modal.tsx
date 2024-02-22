import PureModal from 'react-pure-modal';

// styles
import 'react-pure-modal/dist/react-pure-modal.min.css';

export type PropsBaseModal = {
  portal?: boolean;
  children: JSX.Element;
  isOpen?: boolean;
  onClose?: () => void;
  width?: string;
  className?: string;
  scrollable?: boolean;
};

function Modal(props: PropsBaseModal): JSX.Element | null {
  const {
    portal = false,
    children,
    isOpen = false,
    onClose,
    width,
    className = '',
    ...attrs
  } = props;

  return (
    <PureModal
      portal
      isOpen={isOpen}
      onClose={onClose}
      width={width}
      className={className}
      {...attrs}
    >
      {children}
    </PureModal>
  );
}

export default Modal;
