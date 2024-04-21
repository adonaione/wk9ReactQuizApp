import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, updateUser, getMe } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CategoryType, UserFormDataType, UserType } from '../types';


// This code defines the type for the props of the EditUser component.
// The EditUserProps type is an object that contains two properties:
type EditUserProps = {
    //   This function is used to display flash messages in the application.
    flashMessage: (message:string, category:CategoryType) => void  // - flashMessage: a function that takes a message (string) and a category (CategoryType) as parameters and returns void.
    currentUser: UserType|null // - currentUser: a variable of type UserType|null, which represents the currently logged-in user.
}



// This component is responsible for rendering a form to edit a user.
// It receives the following props: flashMessage (a function to display flash messages), and currentUser (the currently logged-in user).
export default function EditUser({ flashMessage, currentUser }: EditUserProps) {
    // The useParams hook is used to retrieve the userId from the URL parameters.
    const { user_id } = useParams();
    // The useNavigate hook is used to programmatically navigate to different routes.
    const navigate = useNavigate();

    // The userToEditData state variable is used to store the data of the user being edited.
    // It is initialized with an empty title and body.
    const [userToEditData, setUserToEditData] = useState<UserFormDataType>({first_name: '', last_name: '', email: '', password: '', confirmPassword: ''});
    // The showModal state variable is used to control the visibility of the delete confirmation modal.
    const [showModal, setShowModal] = useState(false);

    // The openModal function is called to show the delete confirmation modal.
    const openModal = () => setShowModal(true);
    // The closeModal function is called to hide the delete confirmation modal.
    const closeModal = () => setShowModal(false);
    
    // The useEffect hook is used to fetch the user data when the component mounts.
    useEffect(() => {
        // The getUser function is an async function that fetches the user data from the server.
        async function getUser() {
            // The getUser function is called with the userId to retrieve the user data.
            const response = await getMe(user_id!);
            if (response.data) {
                // If the response contains data, it means the user exists.
                const user = response.data;
                // The currentUser is retrieved from the local storage.
                const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                // If the current user is not the user of the user, display an error message and navigate to the home page.
                if (currentUser?.user_id !== currentUser.user_id) {
                    flashMessage('You do not have permission to edit this user', 'danger');
                    navigate('/');
                } else {
                    // If the current user is the .user of the user, set the userToEditData state with the user data.
                    setUserToEditData({first_name: user.first_name, last_name: user.last_name, email: user.email, password: user.password, confirmPassword: user.password});
                }
            } else if (response.error) {
                // If there is an error in the response, display the error message and navigate to the home page.
                flashMessage(response.error, 'danger');
                navigate('/');
            } else {
                // If the response does not contain data or error, display a generic error message and navigate to the home page.
                flashMessage("Something went wrong", 'warning');
                navigate('/');
            }
        }

        // Call the getUser function when the component mounts or when the userId or currentUser changes.
        getUser();
    }, [user_id, currentUser, flashMessage, navigate]);

    // The handleInputChange function is called when the input fields in the form are changed.
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the userToEditData state with the new input values.
        setUserToEditData({...userToEditData, [event.target.name]: event.target.value});
    }

    // The handleFormSubmit function is called when the form is submitted.
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Retrieve the token from the local storage.
        const token = localStorage.getItem('token') || '';
        // Call the editUserById function to update the user with the new data.
        const response = await updateUser(token, userToEditData);
        if (response.error) {
            // If there is an error in the response, display the error message.
            flashMessage(response.error, 'danger');
        } else {
            // If the user is successfully updated, display a success message and navigate to the home page.
            flashMessage(`${response.data?.first_name} has been updated`, 'success');
            navigate('/');
        }
    }

    // The handleDeleteClick function is called when the delete button is clicked.
    const handleDeleteClick = async () => {
        // Retrieve the token from the local storage.
        const token = localStorage.getItem('token') || '';
        // Call the deleteUserById function to delete the user.
        const response = await deleteUser(token);
        if (response.error) {
            // If there is an error in the response, display the error message.
            flashMessage(response.error, 'danger');
        } else {
            // If the user is successfully deleted, display a confirmation message and navigate to the home page.
            flashMessage(response.data!, 'primary');
            navigate('/');
        }
    }

    // The component renders a form to edit the user.
    return (
        <>
            <Card className='my-3'>
                <Card.Body>
                    <h3 className="text-center">Edit User</h3>
                    <Form onSubmit={handleFormSubmit}>

                        <Form.Label>User Email</Form.Label>
                        <Form.Control name='email' placeholder='Edit User Email' value={userToEditData.email} onChange={handleInputChange} />

                        <Button className='mt-3 w-50' variant='info' type='submit'>Edit User</Button>
                        <Button className='mt-3 w-50' variant='danger' onClick={openModal}>Delete User</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {userToEditData.first_name}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {userToEditData.first_name}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete User</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}