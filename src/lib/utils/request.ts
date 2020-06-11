import { backendUrl } from "./constants"

export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST'
}

export interface IRequestOptions {
    path: string
    method?: HTTPMethod
    body?: any
    auth?: boolean
}

export const makeRequest = async ({ path, method, body, auth}: IRequestOptions) => {

    const result: any = {
        success: false
    }

    const options = {
        ...(method && { method }),
        ...(body && { body: JSON.stringify(body)}),
        headers: {
            'Content-Type': 'application/json',
            ...(auth && {'Authorization': `Bearer ${localStorage.getItem('token')}`})
        }
    }

    console.log(options);
    const response = await fetch(`${backendUrl}${path}`, options);


    result.success = response.ok;

    if(response.ok)
    {
        result.data = await response.json();
    }

    return result;
}