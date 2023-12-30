import React, { FC, useEffect, useState } from "react";
import s from "./search.module.css";
import { Button, TextField } from "@mui/material";

type SearchPropsType = {
  value: string;
  onSubmit: (fixedValue: string) => void;
};

export const Search: FC<SearchPropsType> = (props) => {
  const [tempSearch, setTempSearch] = useState(props.value);

  useEffect(() => {
    setTempSearch(props.value);
  }, [props.value]);

  return (
    <div className={s.search}>
      <TextField
        color={"secondary"}
        id="standard-basic"
        label="Type value"
        variant="standard"
        value={tempSearch}
        onChange={(e) => setTempSearch(e.currentTarget.value)}
      />
      <Button
        style={{ margin: "10px" }}
        variant="contained"
        color="secondary"
        onClick={() => {
          props.onSubmit(tempSearch);
        }}
      >
        Find
      </Button>
    </div>
  );
};
