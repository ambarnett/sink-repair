import { deleteRequest, getRequests } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

export const Requests = () => {
    const requests = getRequests() // grab the local state of the requests data

    let requestHTML = `
        <ul>
            ${
                requests.map(req => {
                    return `<li>
                        ${req.description}
                        <button class="request__delete" id="request--${req.id}">
                        Delete
                        </button>
                        </li>`
                }).join("")
            }
        </ul> 
    `
    return requestHTML
}