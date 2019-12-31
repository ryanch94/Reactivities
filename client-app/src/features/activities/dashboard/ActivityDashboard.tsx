import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({activities, selectActivity, selectedActivity, editMode, setEditMode, setSelectedActivity}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
          <ActivityList activities={activities} selectActivity={selectActivity}></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && <ActivityDetails setSelectedActivity={setSelectedActivity} activity={selectedActivity} setEditMode={setEditMode}></ActivityDetails>}
        {editMode && <ActivityForm activity={selectedActivity!} setEditMode={setEditMode} />}
      </Grid.Column>
    </Grid>
  );
};
