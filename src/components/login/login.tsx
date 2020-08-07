import React, {PureComponent, createRef} from 'react';
import CityListItem from '../city-list-item/city-list-item';
import {connect} from 'react-redux';
import {getCity} from '../../reducer/catalog/selectors';
import {Operation} from '../../reducer/user/user';
import {getError} from '../../reducer/user/selectors';

type Props = {
  activeCity: string;
  validationError?: string;
  onFormSubmit: ({login, password}: {login: string; password: string}) => void;
}

class Login extends PureComponent<Props, {}> {
  props: Props;

  private loginRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleFormSubmit(evt: React.SyntheticEvent<HTMLFormElement>) {
    evt.preventDefault();

    const {onFormSubmit} = this.props;

    onFormSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const {activeCity, validationError} = this.props;

    return (
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {validationError && <p>{validationError}</p>}
            <form className="login__form form" action="#" method="post" onSubmit={this._handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required={true} ref={this.loginRef} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required={true} ref={this.passwordRef} />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <CityListItem city={activeCity} />
          </section>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCity: getCity(state),
  validationError: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(authData) {
    dispatch(Operation.login(authData));
  },
});

export {Login};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
