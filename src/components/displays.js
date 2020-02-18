import React from 'react';
import Transformations from 'components/transformations';
import Typography from '@material-ui/core/Typography';

export default [
  {
    label: "Transformations",
    route: "/",
    display: <Transformations />
  },
  {
    label: "Plugins",
    route: "/plugins",
    display: <Typography>Plugins</Typography>
  },
  {
    label: "Deployments",
    route: "/deployments",
    display: <Typography>Deployments</Typography>
  },
  {
    label: "Simulator",
    route: "/simulator",
    display: <Typography>Simulator</Typography>
  }
]
