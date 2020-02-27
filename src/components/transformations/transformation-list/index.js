import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from './menu';
import List from './list';
import Pagination from './pagination';
import dal from 'dal';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'auto',
    flexGrow: 1
  }
}));

export default function TransformationList(props) {
  const classes = useStyles();
  const [transformations, setTransformations] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState(null);
  const getTransformationList = () => transformations.filter(t => {
    let name = t.name.toLowerCase();
    let lowerQuery = query.toLowerCase();
    return name.startsWith(lowerQuery)
  })
  const getCurrentPage = () => {
    let from = page * rowsPerPage;
    let to = from + rowsPerPage;
    return getTransformationList().slice(from, to);
  }
  React.useEffect(() => {
    dal.transformations.getAll().then(setTransformations).catch(setError)
  }, []);

  return (
    <div className={classes.container}>
      <Menu setQuery={(v) => setQuery(v)} query={query} />
      <List transformations={getCurrentPage()} setTransformation={props.setTransformation}/>
      <Pagination
        count={getTransformationList().length}
        rowsPerPage={rowsPerPage}
        page={page}
        setPage={setPage}
        setRowsPerPage={(v) => {
          setRowsPerPage(v);
          setPage(0);
        }}/>
    </div>
  );
};
