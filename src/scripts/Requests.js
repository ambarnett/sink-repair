import { deleteRequest, getRequests, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})
mainContainer.addEventListener("change",(event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now() //using date.now() so the date will be a numeric value that I can compare to another when sorting completed jobs
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)

export const Requests = () => {
    const requests = getRequests() // grab the local state of the requests data
    const plumbers = getPlumbers()
    const completions = getCompletions()
    console.log(completions, requests)
    let requestHTML = `
        <ul>
            ${
                requests.map(req => {
                    const findComplete = completions.find( (completion) =>
                        { return completion.requestId === req.id }
                    ) 
                    console.log(findComplete)
                    if(!findComplete){
                    return `<li class="serviceReq">
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
                        </li>`}
                        else {
                            return `<li class="completedRequest">${req.description}
                            
                                <button class="request__delete" id="request--${req.id}">
                                Delete
                                </button></li>`
                        }
                }).join("")
            }
        </ul> 
    `
    return requestHTML
}