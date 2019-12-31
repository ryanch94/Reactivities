import React, {useState} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
}

export const ActivityForm : React.FC<IProps> = ({setEditMode, activity: initialFormState}) => {
    const initialiseForm = () => {
        if (initialFormState) return initialFormState;
        else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    };

    const [activity, setActivity] = useState<IActivity>(initialiseForm)

    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' value={activity.title}></Form.Input>
                <Form.TextArea rows={2} placeholder='Description' value={activity.description}></Form.TextArea>
                <Form.Input placeholder='Category' value={activity.category}></Form.Input>
                <Form.Input type='date' placeholder='Date' value={activity.date}></Form.Input>
                <Form.Input placeholder='City' value={activity.city}></Form.Input>
                <Form.Input placeholder='Venue' value={activity.venue}></Form.Input>
                <Button floated='right' type='submit' positive content='Submit'></Button>
                <Button floated='right' type='button' content='Cancel' onClick={() => {setEditMode(false)}}></Button>
            </Form>
        </Segment>
    )
}
