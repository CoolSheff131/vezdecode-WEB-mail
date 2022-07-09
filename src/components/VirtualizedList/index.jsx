import React from 'react';

const VirtualizedList = ({
  data: dataArr,
  itemHeight,
  renderItem,
  renderItemProps,
  windowHeight,
}) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const innerHeight = dataArr.length * itemHeight;

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    dataArr.length - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight),
  );

  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(
      renderItem({
        index: i,
        style: {
          position: 'absolute',
          top: `${i * itemHeight}px`,
          width: '100%',
        },
        data: dataArr[i],
        key: i,
        checkBoxValue: renderItemProps.checkBoxValue(i),
        onCheckBoxClick: () => renderItemProps.onCheckBoxClick(i),
        setMailToShow: renderItemProps.setMailToShow,
      }),
    );
  }

  const onScroll = (e) => setScrollTop(e.currentTarget.scrollTop);

  return (
    <div
      className="scroll"
      style={{ overflowY: 'scroll', height: `${windowHeight}px` }}
      onScroll={onScroll}>
      <div className="inner" style={{ position: 'relative', height: `${innerHeight}px` }}>
        {items}
      </div>
    </div>
  );
};

export default VirtualizedList;
