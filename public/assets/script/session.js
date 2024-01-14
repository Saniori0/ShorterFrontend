class Session {

    static getJWT(){

        return localStorage.getItem(Config.jwtLocalstorageName)

    }

    static async getAccountByJWT(jwt){

        let response = await Api.request("GET", "/accounts/byJwt", {}, {}, true)

        let responseData = await response.json()

        if(!response.ok) return false

        return responseData.data
    }

    static async start(jwt) {

        localStorage.setItem(Config.jwtLocalstorageName, jwt)

        if(!await this.getAccountByJWT(jwt)) {

            alert("Ошибка авториазции. Попробуйте войти позже")
            return localStorage.removeItem(Config.jwtLocalstorageName);

        }

        window.location.href = "/home"

    }

    static async getLoggedAccount() {

        return await this.getAccountByJWT(localStorage.getItem(Config.jwtLocalstorageName));

    }

    static logout() {

        localStorage.removeItem(Config.jwtLocalstorageName)
        window.location.href = Config.noAuthPages[0]

    }
}