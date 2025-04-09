import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector, useDispatch } from "react-redux";
import { dressTypeHandler } from "../../featuers/api/categorySlice";
export default function RadioButtonsGroup({
  title,
  label1,
  label2,
  label3,
  label4,
}) {
  const dispatch = useDispatch();
  const dressType = useSelector((state) => {
    return state.categorySlice.dressType;
  });

  return (
    <FormControl>
      <label className="text-black text-opacity-70">{title}</label>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="shirts"
        name="radio-buttons-group"
        onChange={(event) => {
          if (title === "Dress Type :") {
            dispatch(dressTypeHandler({ dressType: event.target.value }));
          }
        }}
      >
        <FormControlLabel value={label1} control={<Radio />} label={label1} />
        <FormControlLabel value={label2} control={<Radio />} label={label2} />
        <FormControlLabel value={label3} control={<Radio />} label={label3} />
        {label4 && (
          <FormControlLabel value={label4} control={<Radio />} label={label4} />
        )}
      </RadioGroup>
    </FormControl>
  );
}
