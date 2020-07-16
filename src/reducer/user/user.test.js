import {reducer, ActionCreator, ActionType, AuthorizationStatus, Operation} from './user.js';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';

const api = createAPI(() => {});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      userData: {
        email: ``,
        picture: ``,
      }
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
      userData: {
        email: ``,
        picture: ``,
      }
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
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct GET-request to /login`, function () {
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

  // it(`Should catch error with API connection`, function () {
  //   const apiMock = new MockAdapter(api);
  //   const dispatch = jest.fn();
  //   const checkLogin = Operation.checkAuth();

  //   apiMock
  //       .onGet(`/login`)
  //       .reply(401);

  //   return checkLogin(dispatch, () => {}, api)
  //       .then(() => {
  //         expect(dispatch).toHaveBeenCalledTimes(0);
  //       })
  //       .catch((err) => {
  //         throw err;
  //       });
  // });

  it(`Should make a correct POST-request to /login`, function () {
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
});
