//Fetch settings
const applicationUrl = "http://localhost:53134";
const saveAuthCookieRoute = "Cookies/saveAuthCookies";
const deleteAuthCookieRoute = "Cookies/deleteAuthCookies";

export class CookieHandlerMethods{
    static saveAuthCookies(value){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
            let raw = JSON.stringify(
                {"success":value.success,"token":value.token,"user":
                        {"id":value.user.id,"email":value.user.email,"password":"null"}
                });

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${applicationUrl}/${saveAuthCookieRoute}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    static deleteAuthCookies(){
        let raw = "";
        let requestOptions = {
            method: 'DELETE',
            body: raw,
            redirect: 'follow'
        };

        fetch(`${applicationUrl}/${deleteAuthCookieRoute}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}