import React from "react";
import "./styles/css/styles.css";
import Container, { ContainerProps } from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { CryptoTable, ConverterBlock } from "./components";
import { observer, useObserver } from "mobx-react-lite";
import { useRootStore } from "./stores/RootStateContext";
function App() {
const {currenciesStore, converterStore} = useRootStore()
  return useObserver(()=>(
    <Container maxWidth="lg">
      <Grid container spacing={2} className="grid">
        <Grid item xs={8}>
            <CryptoTable currenciesStore={currenciesStore} converterStore={converterStore} />
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={2}>
           <ConverterBlock converterStore={converterStore} currenciesStore={currenciesStore}/>    
          </Paper>
        </Grid>
      </Grid>
    </Container>
  ))
}

export default observer(App);
