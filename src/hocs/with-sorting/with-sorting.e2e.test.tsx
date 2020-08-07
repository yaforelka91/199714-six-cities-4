import React from 'react';
import {mount} from 'enzyme';
import withSorting from './with-sorting';

type MockComponentTypes = {
  renderSorting: () => React.ReactNode;
};
const MockComponent: React.FC<MockComponentTypes> = (props: MockComponentTypes) => {
  const {renderSorting} = props;
  return (
    <div>{renderSorting()}</div>
  );
};

const MockComponentWrapped = withSorting(MockComponent);

describe(`withSortingE2E`, () => {
  it(`Should sort items by price: from high to low`, () => {
    const offersList = [
      {
        rating: 1,
        price: 2,
      },
      {
        rating: 1,
        price: 6,
      },
      {
        rating: 1,
        price: 4,
      }
    ];
    const wrapper = mount(
        <MockComponentWrapped
          offers={offersList}
        />
    );

    const select = wrapper.find(`select.places__sorting-type`);
    select.simulate(`change`, {
      target: {
        value: `to-low`,
      },
    });

    expect(wrapper.state().sortedOffers).toEqual([
      {
        rating: 1,
        price: 6,
      },
      {
        rating: 1,
        price: 4,
      },
      {
        rating: 1,
        price: 2,
      }
    ]);
  });

  it(`Should sort items by price: from low to high`, () => {
    const offersList = [
      {
        rating: 1,
        price: 2,
      },
      {
        rating: 1,
        price: 6,
      },
      {
        rating: 1,
        price: 4,
      }
    ];
    const wrapper = mount(
        <MockComponentWrapped
          offers={offersList}
        />
    );

    const select = wrapper.find(`select.places__sorting-type`);
    select.simulate(`change`, {
      target: {
        value: `to-high`,
      },
    });

    expect(wrapper.state().sortedOffers).toEqual([
      {
        rating: 1,
        price: 2,
      },
      {
        rating: 1,
        price: 4,
      },
      {
        rating: 1,
        price: 6,
      }
    ]);
  });

  it(`Should sort items by rating: top-rated first`, () => {
    const offersList = [
      {
        rating: 1,
        price: 1,
      },
      {
        rating: 2,
        price: 1,
      },
      {
        rating: 3,
        price: 1,
      }
    ];
    const wrapper = mount(
        <MockComponentWrapped
          offers={offersList}
        />
    );

    const select = wrapper.find(`select.places__sorting-type`);
    select.simulate(`change`, {
      target: {
        value: `top-rated`,
      },
    });

    expect(wrapper.state().sortedOffers).toEqual([
      {
        rating: 3,
        price: 1,
      },
      {
        rating: 2,
        price: 1,
      },
      {
        rating: 1,
        price: 1,
      }
    ]);
  });

  it(`Should sort items by popular`, () => {
    const offersList = [
      {
        price: 2,
        rating: 3,
      },
      {
        price: 1,
        rating: 5,
      },
      {
        price: 5,
        rating: 3,
      }
    ];
    const wrapper = mount(
        <MockComponentWrapped
          offers={offersList}
        />
    );

    const select = wrapper.find(`select.places__sorting-type`);
    select.simulate(`change`, {
      target: {
        value: `popular`,
      },
    });

    expect(wrapper.state().sortedOffers).toEqual([
      {
        price: 2,
        rating: 3,
      },
      {
        price: 1,
        rating: 5,
      },
      {
        price: 5,
        rating: 3,
      }
    ]);
  });
});
