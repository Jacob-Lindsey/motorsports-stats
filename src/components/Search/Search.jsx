import { useState } from "react";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Card from "../Card/Card";
import { getDriverSuggestion } from "../../utils/getDriverSuggestion";
import styles from "./Search.module.css";

const Search = () => {

    const [search, setSearch] = useState('');
    const [suggestion, setSuggestion] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    const onInputChange = (value) => {
        setSearch(value);
        if (value != "") {
            setSuggestion(getDriverSuggestion(value))
        } else {
            setSuggestion([]);
        }
    };

    const onOptionChange = (value) => {
        const selected = suggestion.find((driver) => (driver.givenName + ' ' + driver.familyName) === value);
        setSelectedOption(selected);
    };

    return (
        <div className={styles.container}>
            <Autocomplete
                freeSolo
                value={search}
                onChange={(event, newValue) => onOptionChange(newValue)}
                inputValue={search}
                onInputChange={(event, newInputValue) => {onInputChange(newInputValue)}}
                id="combo-box"
                options={suggestion ? suggestion.map((driver) => driver.givenName + ' ' + driver.familyName) : ['']}
                isOptionEqualToValue={(option, value) => 
                    option.toLowerCase().includes(value.toLowerCase())
                }
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    height: '100%',
                    width: {
                        mobile: '100%',
                        tablet: '30%',
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}

                        /* {...params}
                        fullWidth
                        hiddenLabel
                        placeholder="Find a driver"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            disableUnderline: true,
                        }}
                        variant="standard" */
                    />
                )}
            />
            { selectedOption ?
                <Card driver={selectedOption} />
                : null
            }
        </div>
    )
};

export default Search;