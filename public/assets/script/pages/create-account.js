CreateAccountForm.addEventListener("submit", async (event) => {

    event.preventDefault()

    let email = CreateAccountForm.elements.email.value,
        username = CreateAccountForm.elements.username.value,
        password = CreateAccountForm.elements.password.value,
        errors = {
            "UsernameFormatError": false,
            "PasswordFormatError": false,
            "EmailFormatError": false,
            "EmailBusyError": false
        };

    function handleErrors(callback){

        console.log(errors)

        for (const errorBlockID in errors) {

            let errorStatus = errors[errorBlockID]

            let errorElement = document.getElementById(errorBlockID)

            if(errorElement === undefined) continue

            callback(errorElement, errorStatus, errorBlockID)

        }

    }

    function activeAllErrorsWithStatus(status)
    {

        handleErrors((errorElement, errorStatus) => errorStatus === status ? errorElement.classList.add("active") : 1)

    }

    handleErrors((errorElement) => errorElement.classList.remove("active"))

    if (username.length < 6 || username.length > 24) errors["UsernameFormatError"] = true

    if (password.length < 6 || password.length > 24) errors["PasswordFormatError"] = true

    if (!Validator.email(email)) errors["EmailFormatError"] = true

    if (Object.values(errors).includes(true)) return activeAllErrorsWithStatus(true)

    let response = await Api.request("post", "/accounts", JSON.stringify({
        username: username,
        password: password,
        email: email
    }), {}, false)

    let responseData = await response.json()

    if (!response.ok) {

        if(responseData.message == "Email busy"){

            errors["EmailBusyError"] = true
            activeAllErrorsWithStatus(true)

        }

        return;

    }

    Session.start(responseData.data.jwt)

})