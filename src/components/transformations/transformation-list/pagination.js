import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles(theme => ({
  pagination: {
    flexShrink: 0
  }
}));

export default function (props) {
  const classes = useStyles();

  return (
    <TablePagination
      className={classes.pagination}
      rowsPerPageOptions={[10, 15, 20]}
      component="div"
      count={props.count}
      rowsPerPage={props.rowsPerPage}
      page={props.page}
      onChangePage={(e, newPage) => props.setPage(newPage)}
      onChangeRowsPerPage={(e) => {
        let page = parseInt(e.target.value)
        props.setRowsPerPage(page);
      }}/>
  );
};
