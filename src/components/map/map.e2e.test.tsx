import React from 'react';
import {mount} from 'enzyme';
import Map from './map';


const offersList: {id: number; coords: [number, number]}[] = [
  {
    id: 1,
    coords: [1, 1],
  },
  {
    id: 2,
    coords: [1, 0],
  },
  {
    id: 3,
    coords: [0, 1],
  }
];

describe(`MapE2E`, () => {

  it(`Should set active mark`, () => {
    const wrapper = mount(
        <Map
          offers={offersList}
          city={[0, 0]}
          zoom={1}
        />,
        {
          createNodeMock: () => document.createElement(`div`)
        }
    );
    const spy = jest.spyOn(wrapper.instance(), `_updateMarkers`);
    wrapper.instance().componentDidMount();

    wrapper.setProps({activeCard: offersList[0].id});
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`Should change one active mark to another`, () => {
    const wrapper = mount(
        <Map
          offers={offersList}
          activeCard={offersList[0].id}
          city={[0, 0]}
          zoom={1}
        />,
        {
          createNodeMock: () => document.createElement(`div`)
        }
    );
    const spy = jest.spyOn(wrapper.instance(), `_updateMarkers`);
    wrapper.instance().componentDidMount();

    wrapper.setProps({activeCard: offersList[1].id});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe(2);
    expect(spy.mock.calls[0][1]).toBe(1);
  });

  it(`Should render map again if places array has been changed`, () => {
    const wrapper = mount(
        <Map
          offers={offersList}
          city={[0, 0]}
          zoom={1}
        />,
        {
          createNodeMock: () => document.createElement(`div`)
        }
    );
    const spyToClearMarkersMethod = jest.spyOn(wrapper.instance(), `_clearMarkers`);
    const spyToRenderMarkersMethod = jest.spyOn(wrapper.instance(), `_renderMarkers`);

    wrapper.instance().componentDidMount();
    expect(spyToRenderMarkersMethod).toHaveBeenCalledTimes(1);

    wrapper.setProps({offers: [
      {
        id: 1,
        coords: [0, 0],
      },
      {
        id: 5,
        coords: [2, 2],
      }
    ]});
    expect(spyToClearMarkersMethod).toHaveBeenCalledTimes(1);
    expect(spyToRenderMarkersMethod).toHaveBeenCalledTimes(2);
  });

  it(`Should clear markers & remove mapObject after map has been unmounted`, () => {
    const wrapper = mount(
        <Map
          offers={offersList}
          city={[0, 0]}
          zoom={1}
        />,
        {
          createNodeMock: () => document.createElement(`div`)
        }
    );
    const spyToClearMarkersMethod = jest.spyOn(wrapper.instance(), `_clearMarkers`);

    wrapper.instance().componentWillUnmount();
    expect(spyToClearMarkersMethod).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().mapObject).toBe(null);


  });

});
