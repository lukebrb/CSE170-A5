import React, { useState } from 'react';
import * as R from 'ramda';
import { useFirebase } from 'gatsby-plugin-firebase';

// import NavigationBar from '../components/navigation-bar';
import Layout from '../components/layout';
import MiniCalendar from '../components/mini-calendar';
import Appointments from '../components/appointment-list';
import withLocation from '../components/withLocation';
import AvailabilityTabs from '../components/time-selection/availability-tabs';
import Appointments_B from '../components/appointment-list-B';

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
  const { course, alternate } = search;
  const [slotData, setSlotData] = useState(undefined);
  const [showAll, setShowAll] = useState(true);
  // By default, the day selected is today.
  var [selectedDay, updateDay] = useState('monday');

  // Get data on first load only.
  const getDay = () => {
    const res = R.prop(selectedDay, slotData);
    if (res === undefined) return [];
    return res;
  };

  useFirebase(firebase => {
    firebase
      .functions()
      .httpsCallable('getOH')(course)
      .then(res => {
        setSlotData(res.data);
      });
      console.log("ALTERNATE IS: ", alternate);
  }, []);

  return (
    <Layout>
      <h1 className="is-size-5 has-text-weight-bold">{course}</h1>
      <MiniCalendar updateDay={updateDay} />
      {
        alternate ? <Appointments_B 
                      dayItems={slotData !== undefined ? getDay() : undefined}
                      metadata={{ course, selectedDay }}
                    /> :
                    <div>
                      <AvailabilityTabs isShowingAll={showAll} callback={setShowAll} />
                      <Appointments
                        isShowingAll={showAll}
                        dayItems={slotData !== undefined ? getDay() : undefined}
                        metadata={{ course, selectedDay }}
                      />
                    </div>
      }
      
    </Layout>
  );
}

export default withLocation(TimeSelectionPage);
