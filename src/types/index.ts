export type UserType = {
    email:string,
    first_name:string,
    last_name:string,
    password:string
}

export type UserFormDataType = {
    email:string,
    first_name:string,
    last_name:string,
    password:string,
    confirmPassword:string
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

export type QuestionType = {
    answer:string,
    author:string,
    created_on:string,
    id:number,
    question: string
}