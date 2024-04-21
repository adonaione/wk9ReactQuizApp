// represents the shape of a user object
export type UserType = {
    email:string, // The email address of the user.
    first_name:string,// The first name of the user.
    last_name: string, // The last name of the user.
    password:string
    user_id:number // The unique identifier of the user.
}

// Represents the shape of the data submitted in the user form
export type UserFormDataType = {
    email:string, // The email address of the user.
    first_name:string, // The first name of the user.
    last_name:string,   // The last name of the user.
    password:string, // The password of the user.
    confirmPassword:string // The password confirmation of the user.
}

// Represents the shape of a category object
export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

// Represents the shape of a question object
export type QuestionType = {
    answer:string, // The answer to the question
    author:UserType, // The author of the question
    created_on:string, // The date the question was created
    id:number, // The unique identifier of the question
    question: string // The question
}

// represents the shape of the data submitted in the question form
export type QuestionFormDataType = {
    question:string, // The question
    answer:string // The answer to the question
}

export type EditQuestionData = {
    answer: string
}

// represents the shape of the token object
export type TokenType = {
    token:string, // The token value
    tokenExpiration:string // The token expiration date
}

