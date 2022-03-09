import React from "react";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import ConverterStore from "../../stores/converterStore";
import { observer } from "mobx-react-lite";
import CurrenciesStore from "../../stores/currenciesStore";

interface ICryptoBlock {
  converterStore: ConverterStore;
  currenciesStore: CurrenciesStore;
}

export const ConverterBlock: React.FC<ICryptoBlock> = observer(
  ({ converterStore, currenciesStore }: ICryptoBlock) => {
    const handleChange = (
      e: SelectChangeEvent,
      value: keyof typeof converterStore.converterValues
    ) => {
      const coin = currenciesStore.coins.find((c) => c.name === e.target.value);
      coin && converterStore.setSelectedCoin(value, coin);
    };

    return (
      <>
        <div className="cryptoInputBox">
          <TextField
            className="currencyInput"
            id="outlined-search"
            value={converterStore.converterValues.value1.value}
            label="Сумма"
            type="search"
            variant="standard"
            onChange={(e: any) => {
              converterStore.setValue1(e.target.value);
            }}
          />
          <FormControl variant="standard" className="currencyType">
            <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={converterStore.converterValues.value1.name}
              label="Валюта"
              onChange={(e) => handleChange(e, "value1")}
            >
              {currenciesStore.coins.map((c) => (
                <MenuItem value={c.name}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="cryptoInputBox">
          <TextField
            value={converterStore.converterValues.value2.value}
            className="currencyInput"
            id="outlined-search"
            label="Сумма"
            type="search"
            variant="standard"
            onChange={(e: any) => converterStore.setValue2(e.target.value)}
          />
          <FormControl variant="standard" className="currencyType">
            <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={converterStore.converterValues.value2.name}
              label="Валюта"
              onChange={(e) => handleChange(e, "value2")}
            >
              {currenciesStore.coins.map((c) => (
                <MenuItem value={c.name}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Typography variant="h5" component="h5" className="сurrencyTypography">
          120,82 Российский рубль
        </Typography>
      </>
    );
  }
);

export default ConverterBlock;
