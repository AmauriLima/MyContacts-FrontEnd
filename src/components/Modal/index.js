import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Overlay, Container, Footer } from './styles';

import Button from '../Button';

export default function Modal(props) {
  const {
    danger,
    title,
    children,
    cancelLabel,
    confirmLabel,
    onCancel,
    onConfirm,
    visible,
    isLoading,
  } = props;

  if (!visible) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>

        <div className="modal-body">
          {children}
        </div>

        <Footer>
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>

          <Button
            type="button"
            danger={danger}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,

    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoading: true,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
