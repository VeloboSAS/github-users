import React, { FC, useEffect, useState } from "react";
import { UserDetails } from "../details/details";
import s from "./github.module.css";
import { UserList } from "../list/list";
import { Search } from "../search/search";
import { Button, Container, Grid, Paper } from "@mui/material";

export type SearchUserType = {
  login: string;
  id: number;
};

export type SearchResult = {
  items: SearchUserType[];
};

export type UserType = {
  login: string;
  id: number;
  avatar_url: string;
  followers: number;
  url: string;
};

export const Github: FC = () => {
  let initialSearchState = "it-kamasutra";
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchState);

  useEffect(() => {
    console.log("SYNC TAB TITLE");

    if (!!selectedUser) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  return (
    <div className={s.container}>
      <Container>
        <Grid container style={{ padding: "10px", justifyContent: "center" }}>
          <Grid>
            <Search
              value={searchTerm}
              onSubmit={(value: string) => {
                setSearchTerm(value);
              }}
            />
          </Grid>
          <Grid>
            <Button
              style={{ margin: "10px" }}
              variant="contained"
              color="secondary"
              onClick={() => setSearchTerm(initialSearchState)}
            >
              Reset
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          style={{ margin: "20px" }}
        >
          <Grid item xs={6}>
            <Paper
              elevation={3}
              style={{
                backgroundColor: "#E6E6FA",
                minHeight: "350px",
                color: "#800080",
                padding: "10px",
              }}
            >
              <UserList
                term={searchTerm}
                selectedUser={selectedUser}
                onUserSelect={setSelectedUser}
              />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper
              elevation={3}
              style={{
                backgroundColor: "#E6E6FA",
                minHeight: "350px",
                color: "#800080",
                padding: "10px",
              }}
            >
              <UserDetails user={selectedUser} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
