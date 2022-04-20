import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
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
                sx={{ width: 400 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Find a driver"
                        variant="outlined"
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