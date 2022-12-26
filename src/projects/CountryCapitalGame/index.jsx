import React, { useState, useEffect, useCallback } from "react";

export default function CountryCapitalGame({ data }) {
    const dataEntries = Object.entries(data);
    const countryAndCapitalMap = new Map(dataEntries);

    const createRandomArray = () => {
        let flatCountriesAndCitiesArray = dataEntries.flatMap((item) => item);
        // Fisher-Yates algorithm
        // loop through all items in the array
        for (let i = 0; i < flatCountriesAndCitiesArray.length; i++) {
            // returns a random number between 0 and i
            const j = Math.floor(Math.random() * (i + 1));
            // switches element "i" to "j" position and vice versa
            [flatCountriesAndCitiesArray[i], flatCountriesAndCitiesArray[j]] = [
                flatCountriesAndCitiesArray[j],
                flatCountriesAndCitiesArray[i],
            ];
        }
        return flatCountriesAndCitiesArray;
    };

    const initialRandomCountriesAndCitiesArray = createRandomArray();

    const [selectedButtons, setSelectedButtons] = useState([]);
    const [countryAndCapitalArray, setCountryAndCapitalArray] = useState(
        initialRandomCountriesAndCitiesArray
    );

    const hasSelectedBothOptions = selectedButtons.length === 2;

    const resetSelectedButtons = () => setSelectedButtons([]);

    const hasAlreadyClickedThisButton = (button) =>
        selectedButtons.includes(button);

    const verifyCorrectAnswer = useCallback(() => {
        selectedButtons.forEach((item) => {
            const capital = countryAndCapitalMap.get(item);
            const hasSelectedTheCorrectCapital =
                capital && selectedButtons.includes(capital);

            if (hasSelectedTheCorrectCapital) {
                const removeRightAnswersFromCurrentArray = () =>
                    countryAndCapitalArray.filter((item) => {
                        const [firstSelection, secondSelection] = selectedButtons;
                        return item !== firstSelection && item !== secondSelection;
                    });
                const newCountryAndCapitalArray = removeRightAnswersFromCurrentArray();
                setCountryAndCapitalArray(newCountryAndCapitalArray);
                resetSelectedButtons();
            }
        });
    }, [selectedButtons, countryAndCapitalMap]);

    useEffect(() => {
        if (hasSelectedBothOptions) {
            verifyCorrectAnswer();
        }
    }, [hasSelectedBothOptions, verifyCorrectAnswer]);

    const handleButtonClick = (button) => {
        let newSelectedButtonsArray;
        if (hasSelectedBothOptions) {
            newSelectedButtonsArray = [button];
            setSelectedButtons(newSelectedButtonsArray);
            return;
        }

        if (hasAlreadyClickedThisButton(button)) {
            return;
        }
        newSelectedButtonsArray = [...selectedButtons, button];
        setSelectedButtons(newSelectedButtonsArray);
    };

    const handleButtonClass = (button) => {
        const selectedButtonClass = "button selected-button";
        const wrongSelectionClass = "button wrong-selection";

        if (!hasSelectedBothOptions && hasAlreadyClickedThisButton(button)) {
            return selectedButtonClass;
        }
        if (hasSelectedBothOptions && hasAlreadyClickedThisButton(button)) {
            return wrongSelectionClass;
        }
    };

    const handleRender = () => {
        if (!countryAndCapitalArray.length) {
            return "Congratulations";
        }
        return (
            <>
                <div className="button-container">
                    {countryAndCapitalArray.map((item) => (
                        <button
                            key={item}
                            className={handleButtonClass(item)}
                            onClick={() => handleButtonClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <style>
                    {`
                        .button-container {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 8px;
                            margin: 12px auto;
                            max-width: 400px;
                        }

                        .selected-button {
                            background-color: #0000ff
                        }

                        .wrong-selection {
                            background-color: #ff0000
                        }
                    `}
                </style>
            </>
        );
    };

    return handleRender();
}
