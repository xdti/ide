import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StringInput from './string-input';
import FloatInput from './float-input';
import IntInput from './int-input';
import BooleanInput from './boolean-input';
import ListInput from './list-input';

const useStyles = makeStyles(theme => ({
}));

export default function DynamicTypeInput(props) {
  const classes = useStyles();

  return (
    <>
    {
      props.dataType.dataType === 'string' ? (
        <StringInput
          fieldClass={props.fieldClass}
          fieldKey={props.fieldKey}
          value={props.value}
          onChange={props.onChange}
        />
      ) : props.dataType.dataType === 'float' ? (
        <FloatInput
          fieldClass={props.fieldClass}
          fieldKey={props.fieldKey}
          value={props.value}
          onChange={props.onChange}
        />
      ) : props.dataType.dataType === 'int' ? (
        <IntInput
          fieldClass={props.fieldClass}
          fieldKey={props.fieldKey}
          value={props.value}
          onChange={props.onChange}
        />
      ) : props.dataType.dataType === 'bool' ? (
        <BooleanInput
          fieldClass={props.fieldClass}
          fieldKey={props.fieldKey}
          value={props.value}
          onChange={props.onChange}
        />
      ) : props.dataType.dataType === 'list' ? (
        <ListInput
          fieldClass={props.fieldClass}
          fieldKey={props.fieldKey}
          value={props.value}
          onChange={props.onChange}
          itemType={props.dataType.listItemType}
        />
      ) : ""
    }
    </>
  );
};
