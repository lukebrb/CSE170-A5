import React from 'react';

import NavigationBar from '../components/navigation-bar';

import Layout from '../components/layout';
import MiniCalendar from '../components/mini-calendar';
import AvailabilityList from '../components/availability-list';

import withLocation from '../components/withLocation';

function TimeSelectionPage({ search }) {
  var [selectedDay, updateDay] = React.useState();

  const { course } = search;

  return (
    <Layout>
      <NavigationBar extend={false} parents={['Home', 'Time Selection']} />
      <MiniCalendar updateDay={updateDay} />
      {selectedDay !== undefined ? (
        <AvailabilityList selectedDay={selectedDay} course={course} />
      ) : (
        <div className="box is-loading">
          <progress className="progress is-medium is-grey-lighter" max="100" />
        </div>
      )}
    </Layout>
  );
}

export default withLocation(TimeSelectionPage);
