import { useState } from 'react'
import { isStrongPassword } from "validator";

function usePasswordHooks() {
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isPasswordOnBlur, setIsPasswordOnBlur] = useState(false)

    function handleInputOnChange(e) {
        let passwordValue = e.target.value;
        setPassword(passwordValue)

        // if (!isStrongPassword(passwordValue)) {
        //     setPasswordError(true)
        //     setErrorMessage("Your password is not strong")
        // } else {
        //     setPasswordError(false)
        //     setErrorMessage("")
        // }
    }

    function handlePasswordOnBlur() {
        setIsPasswordOnBlur(true)
        console.log("handlePasswordOnBlur");
    }


    return [password, handleInputOnChange, passwordError, errorMessage, isPasswordOnBlur, handlePasswordOnBlur]
}

export default usePasswordHooks


