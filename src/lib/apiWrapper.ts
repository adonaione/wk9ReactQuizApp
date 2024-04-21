// set up API wrapper to pull data from 'https://cae-bookstore.herokuapp.com/'

import axios from 'axios';
import { QuestionType, UserType, UserFormDataType } from '../types';

// export const getAllQuestions = async () => {
//     try {
//         return await axios.get('https://cae-bookstore.herokuapp.com/');
//     } catch (error) {
//         console.error('Error fetching data: ', error);
//     }
// }

const baseURL:string  = 'https://cae-bookstore.herokuapp.com/';

const userEndpoint = '/user';
const questionEndpoint = '/question/all';

const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
}); // axios instance with the base URL with no auth needed

type APIResponse<T> = { // generic type for the API response
    data?: T,
    error?: string
} 

// function to register a new user
async function register(newUserData:UserFormDataType):Promise<APIResponse<UserType>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().post(userEndpoint, newUserData); // send a post request to the register endpoint with the new user data
        data = response.data; // store the response data in the 'data' variable
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data; // if axios error, store the response data in the 'error' variable
        } else {
            error = 'Something went wrong'; // If the error is not axios, set generic error message
        }
    }
    return { data, error }; // return the data and error
}



async function getAllQuestions(): Promise<APIResponse<QuestionType[]>> {
    let data;
    let error;
    try { 
        const response = await apiClientNoAuth().get(questionEndpoint); // send a get request to the question endpoint with no auth needed
        data = response.data; // store the response data in th 'data' variable
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data; // if axios error, store the response data in the 'error' variable
        } else {
            error = 'Something went wrong'; // If the error is not axios, set generic error message
        }
    }
    return { data, error }; // return the data and error
}

export { 
    getAllQuestions,
    register
}; // export the function to be used in other files