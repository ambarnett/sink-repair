const applicationState = {
    plumbers: [],
    completions: [],
    requests: []
}
const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")
//#######################################################################################
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
    .then(response => response.json())
    .then(
        (serviceRequests) => applicationState.requests = serviceRequests ) //Store the external state in application state
    }
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
    .then(response => response.json())
    .then(
        (servicePlumbers) => applicationState.plumbers = servicePlumbers )
    }
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(
        (serviceCompletion) => applicationState.completions = serviceCompletion )
}
//#######################################################################################
export const getRequests = () => { 
    return [...applicationState.requests] 
}
export const getPlumbers = () => { 
    return [...applicationState.plumbers] 
}
export const getCompletions = () => {
    return [...applicationState.completions]
}
//#######################################################################################
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
export const saveCompletion = (userCompletion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userCompletion)
    }
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            
        })
}
//#######################################################################################
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE"})
    .then(
        () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}

