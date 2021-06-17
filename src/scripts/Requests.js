import { deleteRequest, getRequests, getPlumbers } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: request,
                plumberId: plumber,
                date_created: new Date()
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
             
        }
    }
)

export const Requests = () => {
    const requests = getRequests() // grab the local state of the requests data
    const plumbers = getPlumbers()
    let requestHTML = `
        <ul>
            ${
                requests.map(req => {
                    return `<li>
                        ${req.description}
                        <select class="plumbers" id="plumbers">
                        <option value="">Choose</option>
                        ${
                                plumbers.map(
                                    plumber => {
                                        return `<option value="${req.id}--${plumber.id}">${plumber.name}</option>`
                                    }
                                ).join("")
                            }
                            </select>
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