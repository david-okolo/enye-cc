import { backendUrl } from "./constants"
import ApolloClient from 'apollo-boost';

export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST'
}

export interface IRequestOptions {
    path: string
    method?: HTTPMethod
    body?: any
    token?: string
}

export const makeRequest = async ({ path, method, body, token}: IRequestOptions) => {

    const result: any = {
        success: false
    }

    const options = {
        ...(method && { method }),
        ...(body && { body: JSON.stringify(body)}),
        headers: {
            'Content-Type': 'application/json',
            ...(token && {'Authorization': `Bearer ${token}`})
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

export const client = new ApolloClient({
    uri: `${backendUrl}/graphql`
  })