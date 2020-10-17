import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  useHistory,
  useParams
} from "react-router-dom";
import TransformationList from './transformation-list';
import TransformationEditor from './transformation-editor';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden'
  },
}));

export default function Transformations() {
  const classes = useStyles();
  const history = useHistory();
  const { transformationId } = useParams();

  return (
    <div className={classes.container}>
      {
        transformationId ? (
          <TransformationEditor transformationId={transformationId} />
        ) : <TransformationList setTransformation={(id) => history.push(`/${id}`)}/>
      }
    </div>
  );
};
