import React from 'react';

export default ({ isShowingAll, callback, firebase }) => {
  return (
    <div className="tabs is-centered">
      <ul>
        <li
          className={isShowingAll ? 'is-active' : ''}
          onClick={() => {
            firebase.analytics().logEvent('switch_display_mode', {
              showAll: true
            })
            callback(true)
          }}
        >
          <a>Show All</a>
        </li>
        <li
          className={isShowingAll ? '' : 'is-active'}
          onClick={() => {
            firebase.analytics().logEvent('switch_display_mode', {
              showAll: false
            })
            callback(false)
          }}
        >
          <a>Show Available</a>
        </li>
      </ul>
    </div>
  );
};
