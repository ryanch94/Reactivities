import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios, { AxiosResponse } from "axios";
import { Header, Icon, List, Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  }

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/activities")
      .then(response => {
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment> /** Fragment gets rid of the need for an extra div surrounding everything */
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities} selectActivity={handleSelectActivity} selectedActivity={selectedActivity!}></ActivityDashboard>
      </Container>
    </Fragment>
  );
};

export default App;
