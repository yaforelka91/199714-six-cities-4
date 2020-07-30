import {reducer, ActionCreator, ActionType, AuthorizationStatus, Operation} from './user.js';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';

const api = createAPI(() => {});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      userData: {},
      errorType: ``,
    });
  });

  it(`Reducer should change authorizationStatus by a given value`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });
  });

  it(`Reducer should set userData by a given value`, () => {
    expect(reducer({
      userData: {}
    }, {
      type: ActionType.SET_USER_DATA,
      payload: {
        email: `test@test.com`,
        picture: `pic.jpg`,
      },
    })).toEqual({
      userData: {
        email: `test@test.com`,
        picture: `pic.jpg`,
      },
    });

    expect(reducer({
      userData: {
        email: `test@test.com`,
        picture: `pic.jpg`,
      },
    }, {
      type: ActionType.SET_USER_DATA,
      payload: {
        email: ``,
        pic: ``,
      },
    })).toEqual({
      userData: {
        email: ``,
        pic: ``,
      }
    });

    expect(reducer({
      userData: {
        email: `test@test.com`,
        picture: `pic.jpg`,
      },
    }, {
      type: ActionType.SET_USER_DATA,
      payload: {
        email: `test2@test.com`,
        picture: `pic2.jpg`,
      },
    })).toEqual({
      userData: {
        email: `test2@test.com`,
        picture: `pic2.jpg`,
      }
    });

    expect(reducer({
      userData: {
        email: ``,
        pic: ``,
      }
    }, {
      type: ActionType.SET_USER_DATA,
      payload: {
        email: ``,
        pic: ``,
      },
    })).toEqual({
      userData: {
        email: ``,
        pic: ``,
      }
    });
  });

  it(`Reducer should set error`, () => {
    expect(reducer({
      errorType: ``,
    }, {
      type: ActionType.CATCH_ERROR,
      payload: `Some error`,
    })).toEqual({
      errorType: `Some error`,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`Action creator for set user data returns correct action`, () => {
    expect(ActionCreator.setUserData({
      email: `test@test.com`,
      picture: `pic.jpg`,
    })).toEqual({
      type: ActionType.SET_USER_DATA,
      payload: {
        email: `test@test.com`,
        picture: `pic.jpg`,
      },
    });
  });

  it(`Action creator for set error returns action with true payload`, () => {
    expect(ActionCreator.catchError(`Some error`)).toEqual({
      type: ActionType.CATCH_ERROR,
      payload: `Some error`,
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct GET-request to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkLogin = Operation.checkAuth();

    apiMock
        .onGet(`/login`)
        .reply(200, {fake: true});

    return checkLogin(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.REQUIRED_AUTHORIZATION,
            payload: AuthorizationStatus.AUTH,
          });
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: ActionType.SET_USER_DATA,
            payload: {fake: true},
          });
        });
  });

  it(`Should make a correct POST-request to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const mockUserData = {
      email: `test@test.com`,
      password: `qwerty`,
    };

    const login = Operation.login(mockUserData);

    apiMock
        .onPost(`/login`)
        .reply(200, {fake: true});

    return login(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(4);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.REQUIRED_AUTHORIZATION,
            payload: AuthorizationStatus.AUTH,
          });
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: ActionType.SET_USER_DATA,
            payload: {fake: true},
          });
          expect(dispatch).toHaveBeenNthCalledWith(3, {
            type: ActionType.CATCH_ERROR,
            payload: ``,
          });
        });
  });
});
