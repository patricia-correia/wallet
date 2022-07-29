import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      handleDisabledButton: true,
    };
  }

  checkedInputs = () => {
    const { email, password } = this.state;
    const length = 6;
    const emailRegex = /\S+@\S+\.\S+/;
    if (password.length >= length && emailRegex.test(email)) {
      this.setState({
        handleDisabledButton: false,
      }, () => {});
    } else {
      this.setState({
        handleDisabledButton: true,
      });
    }
  }

  handleButtonSubmit = () => {
    const { addUserDispatch, history } = this.props;
    const { email } = this.state;
    addUserDispatch(email);
    history.push('/carteira');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.checkedInputs(); });
  }

  render() {
    const { email, password, handleDisabledButton } = this.state;

    return (
      <div>
        <h2>Login</h2>
        <form>
          <label htmlFor="email">
            Email:
            <input
              data-testid="email-input"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              name="password"
              id="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ handleDisabledButton }
            onClick={ this.handleButtonSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addUserDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  addUserDispatch: (payload) => dispatch(addUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
