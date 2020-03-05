import React from 'react';

export default ({ isShowingAll, callback}) => {
  return (
    <div className="tabs is-centered">
      <ul>
        <li
          className={isShowingAll ? 'is-active' : ''}
          onClick={() => {
            if (typeof window !== undefined ) {
              window.gtag('event', 'show-all-on', {
                'event_category': 'switch-view-mode',
                'event_label': 'user switched to "show all" mode'
              })
            }
            callback(true)
          }}
        >
          <a>Show All</a>
        </li>
        <li
          className={isShowingAll ? '' : 'is-active'}
          onClick={() => {
            if (typeof window !== undefined ) {
              window.gtag('event', 'show-all-off', {
                'event_category': 'switch-view-mode',
                'event_label': 'user switched to "show available only" mode'
              })
            }
            callback(false)
          }}
        >
          <a>Show Available</a>
        </li>
      </ul>
    </div>
  );
};
