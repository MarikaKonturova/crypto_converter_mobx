import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TCoin } from "../../types/index";
import { observer } from "mobx-react-lite";
import CurrenciesStore from "../../stores/currenciesStore";
import ConverterStore from "../../stores/converterStore";
interface ICryptoTable {
  currenciesStore: CurrenciesStore;
  converterStore: ConverterStore;
}

const CryptoTable: React.FC<ICryptoTable> = observer(
  ({ currenciesStore, converterStore }: ICryptoTable) => {
    const { coins, diffCoin } = currenciesStore;

    React.useEffect(() => {
      if (currenciesStore) {
        currenciesStore.fetchCoins();
        setInterval(() => {
          currenciesStore.fetchCoins();
        }, 30 * 1000);
      }
    }, []);
    const onClickRow = (coin: TCoin): void => {
      converterStore.setSelectedCoin("value1", coin);
    };
    return (
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Full name</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">volume24hour</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.length === 0
              ? "loading ........"
              : coins.map((coin) => (
                  <TableRow
                    hover
                    key={coin.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => {
                      onClickRow(coin);
                    }}
                  >
                    <TableCell component="th" scope="coin">
                      <img
                        src={coin.imgURL}
                        alt="coinImg"
                        className="coinImg"
                      />
                    </TableCell>
                    <TableCell align="left">{coin.fullName}</TableCell>
                    <TableCell align="left">{coin.name}</TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        backgroundColor: `${diffCoin[coin.name]}`,
                      }}
                    >
                      ${coin.price}
                    </TableCell>
                    <TableCell align="left">${coin.volume24hour}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);
export default CryptoTable;
