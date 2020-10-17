import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import startCase from 'lodash/startCase';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';

export default function ListInput(props) {
  const chipParsers = {
    string: v => v,
    int: v => parseInt(v),
    float: v => parseFloat(v),
    bool: v => v === 'true' ? true : v === 'false' ? false : undefined
  }
  const handleAddChip = (chip) => {
    chip = chipParsers[props.itemType](chip);
    if (!Number.isNaN(chip) && !(chip === undefined)){
      let chips = props.value || [];
      props.onChange(chips.concat(chip));
    }
  }
  const handleDeleteChip = (chip, index) => {
    let chips = props.value || [];
    chips.splice(index, 1);
    props.onChange(chips);
  }
  return (
    <ChipInput
      allowDuplicates={true}
      value={(props.value || []).map(v => v.toString())}
      className={props.fieldClass}
      onAdd={(chip) => handleAddChip(chip)}
      onDelete={(chip, index) => handleDeleteChip(chip, index)}
      fullWidthInput={true}
      variant="outlined"
      label={startCase(props.fieldKey)}
    />
  );
};
