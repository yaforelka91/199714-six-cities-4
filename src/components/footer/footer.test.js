import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './footer.jsx';
import {Router} from 'react-router-dom';
import history from '../../history.js';

describe(`FooterSnapshot`, () => {
  it(`should render Footer`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Footer/>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
