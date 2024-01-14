let page = 1

loadStats()

function loadStats() {

    let id = LinkId.value
    let request = Api.request("get", "/accounts/links/byId/:" + id + "/statistics?page="+page, {}, {}, true)

    request.then(async (response) => {

        if (!response.ok) {

            window.location.href = "404"

        }

        let responseData = (await response.json()).data

        CountryStats.innerHTML = ""

        StatsPagination.classList.remove("active")
        NotHaveStats.classList.remove("active")

        let quantity = responseData.requests.quantity

        if(quantity <= 0){

            NotHaveStats.classList.add("active")
            Stats.remove()
            return

        }

        StatsPagination.classList.add("active")

        let listBlock = StatsPagination.children[0]
        let pagesBlock = StatsPagination.children[1]

        listBlock.innerHTML = ""

        for (const statsRow of responseData.requests.list) {

            let country = statsRow.country
            if(statsRow.country == "--") country = "Неизвестно"

            listBlock.innerHTML += `
            <li class="item link">
                <div>
                    <div class="info">IP: <span>${statsRow.ip}</span></div>
                    <div class="info">Страна: <span>${country}</span></div>
                    <div class="info">Время: ${new Date(statsRow.time * 1000).toLocaleString("ru")}</div>
                </div>
            </li>`

        }

        listBlock.innerHTML += "<li class=\"--clearfix\"></li>"

        pagesBlock.innerHTML = ""

        for (let i = 0; i < responseData.requests.pages; i++) {

            pagesBlock.innerHTML += `<li class="page" onclick="page=${i+1}; loadStats()">${i + 1}</li>`

        }

        let countryStats = responseData.countries
        Quantity.innerHTML = quantity

        for (let countryCode in countryStats) {

            let countryStat = countryStats[countryCode]

            if (countryCode == "--") countryCode = "Неизвестно"

            let percent = countryStat / quantity * 100

            CountryStats.innerHTML += `<div class="info">${countryCode}: ${percent}% - ${countryStat} зап.</div>`

        }

    })

}
