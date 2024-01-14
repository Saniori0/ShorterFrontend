SigninForm.addEventListener("submit", async (event) => {

    event.preventDefault()

    let email = SigninForm.elements.email.value,
        password = SigninForm.elements.password.value

    SigninError.classList.remove("active")

    if (!Validator.email(email)) return SigninError.classList.add("active")

    if (password.length < 6 || password.length > 24) return SigninError.classList.add("active")

    let response = await Api.request("get", "/accounts/jwt", {}, {
        "x-email": email,
        "x-password": password
    }, false)

    let responseData = await response.json()

    if (!response.ok) {

        SigninError.classList.add("active")

        return;

    }

    Session.start(responseData.data.jwt)

})
