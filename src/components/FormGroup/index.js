import PropTypes from 'prop-types';
import { Container } from './styles';

export default function FormGroup({ children, error, groupType }) {
  return (
    <Container groupType={groupType}>
      {children}
      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  groupType: PropTypes.string,
};

FormGroup.defaultProps = {
  error: null,
  groupType: null,
};
