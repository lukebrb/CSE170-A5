import React from 'react';

export default ({ isShowingAll, callback }) => {
  return (
    <div className="tabs is-centered">
      <ul>
        <li
          className={isShowingAll ? 'is-active' : ''}
          onClick={() => callback(true)}
        >
          <a>Show All</a>
        </li>
        <li
          className={isShowingAll ? '' : 'is-active'}
          onClick={() => callback(false)}
        >
          <a>Show Available</a>
        </li>
      </ul>
    </div>
  );
};
