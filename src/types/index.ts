export type UserType = {
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    dateCreated:string
}

export type UserFormDataType = {
    firstName:string,
    lastName:string,
    email:string,
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