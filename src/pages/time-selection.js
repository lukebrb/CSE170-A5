import React, { useState } from 'react';
import * as R from 'ramda';
import { useFirebase } from 'gatsby-plugin-firebase';

import NavigationBar from '../components/navigation-bar';
import Layout from '../components/layout';
import MiniCalendar from '../components/mini-calendar';
import Appointments from '../components/appointment-list';
import withLocation from '../components/withLocation';

const DAY_KEYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

function TimeSelectionPage({ search }) {
  const { course } = search;
  const [slotData, setSlotData] = useState(undefined);
  // By default, the day selected is today.
  var [selectedDay, updateDay] = useState('monday');
  // Get data on first load only.
  useFirebase(firebase => {
    firebase
      .functions()
      .httpsCallable('getOH')(course)
      .then(res => {
        setSlotData(res.data);
      });
  }, []);

  return (
    <Layout>
      <MiniCalendar updateDay={updateDay} />
      <Appointments dayItems={R.prop(DAY_KEYS[selectedDay], slotData)} />
    </Layout>
  );
}

export default withLocation(TimeSelectionPage);
