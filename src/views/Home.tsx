
import { useEffect, useState } from 'react';
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import QuestionCard from '../components/QuestionCard';
import QuestionForm from '../components/QuestionForm';
import { QuestionType, CategoryType, QuestionFormDataType, UserType } from '../types';
import { getAllQuestions, createQuestion } from '../lib/apiWrapper';

type HomeProps = {
  isLoggedIn: boolean, // Indicates whether a user is logged in or not
  currentUser: UserType | null, // Represents the currently logged in user
  flashMessage: (newMessage: string, newCategory: CategoryType) => void // A function to display flash messages
}

export default function Home({isLoggedIn, currentUser, flashMessage}: HomeProps) {

  const [showForm, setShowForm] = useState(false); // State variable to control the visibility of a form
  const [questions, setQuestions] = useState<QuestionType[]>([]); // State variable to store an array of questions
  const [fetchQuestionData, setFetchQuestionData] = useState(true); // State variable to trigger fetching of question data

  useEffect(() => {
    async function fetchData() {
      const response = await getAllQuestions(); // Fetch all questions from the API
      if (response.data) {
        const questions = response.data; // Store the fetched questions in a variable
        // questions.sort( (a, b) => (new Date(a.created_on) > new Date(b.created_on)) ? -1 : 1); // Sort the questions based on the date they were created
        setQuestions(questions); // Update the state variable with the sorted questions
        // setFetchQuestionData(!fetchQuestionData); // Set the fetchQuestionData state variable to trigger fetching of question data
      }
    }
    fetchData(); // Call the fetchData function when the component mounts or when fetchQuestionData changes
  }, [fetchQuestionData]);

  const [searchTerm, setSearchTerm] = useState(''); // State variable to store the search term

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
}

const addNewQuestion = async (newQuestionData: QuestionFormDataType) => {
  const token = localStorage.getItem('token') || '';
  const response = await createQuestion(token, newQuestionData);
  if (response.error){
      flashMessage(response.error, 'danger')
  } else if (response.data){
      flashMessage(`${response.data.question} has been created`, 'success')
      setShowForm(false);
      setFetchQuestionData(!fetchQuestionData)
  }
}

  // Render the welcome message and the list of questions
  // Render the welcome message and the list of questions
  return (
    <>
      <h1 className="text-center">{isLoggedIn && currentUser ? `Hello ${currentUser?.first_name} ${currentUser?.last_name}` : 'Welcome to the Questions App' }</h1>
      <Row>
        <Col xs={12} md={6}>
            <Form.Control value={searchTerm} placeholder='Search Questions' onChange={handleInputChange} />
        </Col>
        {isLoggedIn && (
          <Col>
            <Button className='w-100' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Question'}</Button>
          </Col>
        )}
      </Row>
      <div>
        { showForm && <QuestionForm addNewQuestion={addNewQuestion} /> }
        {Array.isArray(questions) ? (
          questions
            .filter(q => q.question?.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(q => <QuestionCard key={q.id} question={q} currentUser={currentUser} />)
        ) : (
          // Handle the case when questions is not an array
          <p>Error: Unable to load questions</p>
          // You can display an error message to the user
        )}
      </div>
    </>
  );
}











// type Props = {}
// export default function Questions({}: Props) {

//     const [questions, setQuestions] = useState<QuestionType[]>([]);
//     const [fetchQuestionData, setFetchQuestionData] = useState(true);

//     useEffect(() => {
//         async function fetchData(){
//             const response = await getAllQuestions();
//             if (response.data){
//                 const questions = response.data;
//                 questions.sort( (a, b) => (new Date(a.dateCreated) > new Date(b.dateCreated)) ? -1 : 1 )
//                 setQuestions(questions)
//             }
//         }

//         fetchData();
//     }, [fetchQuestionData])

//   return (
//     <div>Questions</div>
//   )
// }


