let alias = LinkAlias.value
let request = Api.request("get", "/accounts/links/byAlias/:"+alias, {}, {}, false)


request.then(async (response) => {

    let responseData = await response.json()

    if(!response.ok){

        window.location.href = "404"

    }

    if(!responseData.data.suspect){

        Suspect.remove()
        window.location.href = responseData.data.url
        return

    }

    SuspectLink.setAttribute("href", responseData.data.url)


})