export const getDriverSuggestion = (value) => {
    if (value === "") return null;

    const inputValue = value.trim().toLowerCase();

    // Cache the "All Drivers" API call to localStorage to avoid hitting the endpoint on every input change
    if (localStorage.allDrivers === undefined) {
        fetch("https://ergast.com/api/f1/drivers.json?limit=900")
            .then(response => response.json())
            .then(json => {
                const result = filterDrivers(json, inputValue);
                localStorage.setItem("allDrivers", JSON.stringify(json));
                return result;
            })
    } else {
        const result = filterDrivers(
            JSON.parse(localStorage.getItem("allDrivers")),
            inputValue
        );
        return result;
    }
};

function filterDrivers(data, value) {
    let filtered = data.MRData.DriverTable.Drivers.filter(
        // Check against the first and last name concatenated
        driver => 
            (driver.givenName.toLowerCase() + ' ' + driver.familyName.toLowerCase())
                // Removes diacritics from unicode characters to make searching easier
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(value));
    return filtered;
};