import { useState } from 'react'
import { isEmail } from "validator";

function useEmailHooks() {
    const [input, setInput] = useState("");
    const [inputError, setInputError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEmailOnBlur, setIsEmailOnBlur] = useState(false)

    function handleInputOnChange(e) {
        let inputValue = e.target.value;
        setInput(inputValue)

        if(!isEmail(inputValue)) {
            setInputError(true);
            setErrorMessage("Please enter the correct email")
        } else {
            setInputError(false);
            setErrorMessage("")
        }
    }

    function handleEmailOnBlur() {
        setIsEmailOnBlur(true)
        console.log("handleEmailOnBlur");
    }

    return [input, handleInputOnChange, inputError, errorMessage, isEmailOnBlur, handleEmailOnBlur]
}

export default useEmailHooks;