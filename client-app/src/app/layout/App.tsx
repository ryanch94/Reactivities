import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (activityId: string) => {
    setActivities([...activities.filter(a => a.id !== activityId)])
  }

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/activities")
      .then(response => {
        response.data.forEach(a => a.date = a.date.split('.')[0]);
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment> /** Fragment gets rid of the need for an extra div surrounding everything */
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          setSelectedActivity={setSelectedActivity} 
          activities={activities} 
          selectActivity={handleSelectActivity} 
          selectedActivity={selectedActivity!} 
          editMode={editMode} 
          setEditMode={setEditMode} 
          createActivity={handleCreateActivity} 
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}></ActivityDashboard>
      </Container>
    </Fragment>
  );
};

export default App;
