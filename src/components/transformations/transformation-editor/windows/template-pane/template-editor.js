import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AceEditor from 'react-ace';

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
  },
  containerFocused: {
    borderColor: '#3f51b5',
    borderWidth: '2px'
  },
  titleFocused: {
    color: '#3f51b5'
  },
  title: {
    position: 'relative',
    top: '-8px',
    left: '8px',
    zIndex: 1,
    backgroundColor: '#f2f2f2',
    width: 'fit-content',
    padding: '0 5px',
    fontSize: '0.75rem'
  },
  editor: {
    flexGrow: 1,
    marginTop: -8,
    '& .ace_gutter': {
      backgroundColor: '#f2f2f2'
    },
    '& .ace_scroller': {
      backgroundColor: '#f2f2f2'
    }
  }
}));

export default function TemplateEditor(props) {
  const classes = useStyles();
  const [isFocused, setIsFocused] = React.useState(false)

  return (
    <div
      className={clsx(classes.container, isFocused && classes.containerFocused)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        className={clsx(classes.title, isFocused && classes.titleFocused)}
      >Template</Typography>
      <AceEditor
        mode="django"
        theme="textmate"
        value={props.data.value}
        onChange={(value) => props.update({ value })}
        width="100%"
        height="unset"
        placeholder="Write expression code here..."
        className={classes.editor}
        name={props.data.name}
        fontSize={'1rem'}
        wrapEnabled={true}
        editorProps={{
          className: classes.editor
        }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          tabSize: 2
        }}
      />
    </div>
  );
};
