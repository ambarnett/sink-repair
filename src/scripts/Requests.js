import { getRequests } from "./dataAccess";

export const Requests = () => {
    const requests = getRequests() // grab the local state of the requests data

    let requestHTML = `
        <ul>
            ${
                requests.map(req => {
                    return `<li>${req.description}</li>`
                }).join("")
            }
        </ul> 
    `
    return requestHTML
}