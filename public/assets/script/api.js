class Api {

    static request(method, url, body, headers = {}, auth = false) {

        Overlay.classList.add("loading")

        let init = {
            method: method,
            headers: headers,
        }

        if (!["get", "head"].includes(method.toLowerCase())) {

            init.body = body

        }

        if(auth){

            headers["x-jwt"] = Session.getJWT()

        }

        let response = fetch(Config.apiHost + url, init)

        response.finally(() => {

            Overlay.classList.remove("loading")

        })

        return response

    }

}