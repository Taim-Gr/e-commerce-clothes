import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
export default function CustomizedInputBase() {
  return (
    <div className="bg-[#F0F0F0]  flex  px-[12px] h-fit rounded-[30px] ">
      <IconButton type="button" aria-label="search">
        <SearchIcon />
      </IconButton>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for Products ..."
        inputProps={{ "aria-label": "search google maps" }}
      />
    </div>
  );
}
