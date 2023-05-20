import './Modal.scss';

interface IModal {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
