Session.getLoggedAccount().then((isLoggedInAccount) => {

    const mainHeader = document.querySelector(".mainHeader")

    let onNoAuthPageArray = []

    for (const pageIndex in Config.noAuthPages) {

        let pagePath = Config.noAuthPages[pageIndex]

        if(pagePath == "/goto"){

            return

        }

        onNoAuthPageArray.push(window.location.href.search(pagePath) > -1)

    }

    let onNoAuthPage = onNoAuthPageArray.includes(true)

    if (!isLoggedInAccount) {

        mainHeader.remove()
        if (!onNoAuthPage) window.location.href = Config.noAuthPages[0]

    }

    if (isLoggedInAccount) {

        mainHeader.classList.add("logged")

        let LoggedAccount = isLoggedInAccount

        LogoutButton.addEventListener("click", ()=>{

            Session.logout()

        })

        LoggedNickname.innerText = LoggedAccount.username

        if (onNoAuthPage) window.location.href = "/home"

    }

})