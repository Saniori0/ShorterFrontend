HomeForm.addEventListener("submit", async (event) => {

    event.preventDefault()

    let url = HomeForm.elements.url.value

    URLFormatError.classList.remove("active")

    if(!Validator.URL(url)) return URLFormatError.classList.add("active")

    let response = await Api.request("post", "/accounts/links", JSON.stringify({
        url: url
    }), {}, true)

    loadLinks(true)

})

loadLinks()

var linksPage = 1

function loadLinks(firstPage) {

    if(firstPage) linksPage = 1

    let request = Api.request("get", "/accounts/links?page="+linksPage, {}, {}, true)

    request.then(async (response) => {

        let responseData = await response.json()

        NotHaveLinks.classList.remove("active")
        LinksPagination.classList.remove("active")

        let linksList = responseData.data.list
        let linksPages = responseData.data.pages

        if (linksList.length <= 0) {

            NotHaveLinks.classList.add("active")
            return

        }

        LinksPagination.classList.add("active")

        let listBlock = LinksPagination.children[0]
        let pagesBlock = LinksPagination.children[1]

        listBlock.innerHTML = "";

        for (const link of linksList) {

            listBlock.innerHTML += `
            <li class="item link">
                <div>
                    <div class="info">Ссылка: <a href="${link.url}">${link.url}</a></div>
                    <div class="info">Сокращенная ссылка: <a href="${document.baseURI}goto/:${link.alias}">${document.baseURI}goto/:${link.alias}</a></div>
                    <div class="info"><a href="/link/:${link.id}">Смотреть статистику</a></div>
                </div>
            </li>`

        }

        listBlock += "<li class=\"--clearfix\"></li>"

        pagesBlock.innerHTML = "";

        for (let i = 0; i < linksPages; i++) {

            pagesBlock.innerHTML += `<li class="page" onclick="linksPage=${i+1}; loadLinks()">${i + 1}</li>`

        }


    })

}