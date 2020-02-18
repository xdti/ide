import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TablePagination from '@material-ui/core/TablePagination';
import Search from '@material-ui/icons/Search';
import dal from 'dal';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'auto',
    flexGrow: 1
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  list: {
    overflow: 'auto',
    flexGrow: 1,
  },
  listItem: {
    border: '1px #ccc solid',
    backgroundColor: 'white',
    "&:not(:last-child)": {
      marginBottom: 15
    }
  },
  pagination: {
    flexShrink: 0
  }
}));

export default function Transformations() {
  const classes = useStyles();
  const [transformations, setTransformations] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState(null);
  const getTransformationList = () => transformations.filter(t => t.name.startsWith(query))
  const getCurrentPage = () => getTransformationList().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  React.useEffect(() => {
    dal.transformations.getAll().then(setTransformations).catch(setError)
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        <Typography variant="h5">Transformations</Typography>
        <TextField variant="outlined" placeholder="Type here to search" InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }} value={query} onChange={(e) => setQuery(e.target.value)}/>
      </div>
      <List className={classes.list}>
        {
          getCurrentPage().map((t, i) => (
            <ListItem key={t.id} button className={classes.listItem}>
              <ListItemText primary={t.name} secondary={t.description} />
            </ListItem>
          ))
        }
      </List>
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={getTransformationList().length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(e, newPage) => setPage(newPage)}
        onChangeRowsPerPage={(e) => {
          setRowsPerPage(parseInt(e.target.value));
          setPage(0);
        }}/>
    </div>
  );
};
