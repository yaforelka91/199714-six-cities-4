import React from 'react';

type Props = {
  activeItem: string;
  items: string[];
  classNameForList?: string;
  onActiveChange: () => void;
  renderItem: (item: string, activeItem: string, onActiveChange: () => void) => React.ReactNode;
};

const Tabs: React.FC<Props> = (props: Props) => {
  const {
    activeItem,
    items,
    classNameForList = ``,
    onActiveChange,
    renderItem
  } = props;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className={`${classNameForList ? `${classNameForList} ` : ``}tabs__list`}>
          {items.map((item) => {
            return (
              <React.Fragment key={item}>
                {renderItem(item, activeItem, onActiveChange)}
              </React.Fragment>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Tabs;
