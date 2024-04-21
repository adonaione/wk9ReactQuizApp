
import { useEffect, useState } from 'react';
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import QuestionCard from '../components/QuestionCard';
import { QuestionType, CategoryType } from '../types';
import { getAllQuestions } from '../lib/apiWrapper';

type HomeProps = {
  flashMessage: (newMessage: string, newCategory: CategoryType) => void // A function to display flash messages
}

export default function Home({ flashMessage }: HomeProps) {

  const [questions, setQuestions] = useState<QuestionType[]>([]); // State variable to store an array of questions
  const [fetchQuestionData, setFetchQuestionData] = useState(true); // State variable to trigger fetching of question data

  useEffect(() => {
    async function fetchData() {
      const response = await getAllQuestions(); // Fetch all questions from the API
      if (response.data) {
        const questions = response.data; // Store the fetched questions in a variable
        // questions.sort( (a, b) => (new Date(a.created_on) > new Date(b.created_on)) ? -1 : 1); // Sort the questions based on the date they were created
        setQuestions(questions); // Update the state variable with the sorted questions
        setFetchQuestionData(!fetchQuestionData); // Set the fetchQuestionData state variable to trigger fetching of question data
      }
    }
    fetchData(); // Call the fetchData function when the component mounts or when fetchQuestionData changes
  }, [fetchQuestionData]);

  const [searchTerm, setSearchTerm] = useState(''); // State variable to store the search term
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
}

  // Render the welcome message and the list of questions
  // Render the welcome message and the list of questions
  return (
    <>
      <h1 className="text-center">Welcome to the Questions App</h1>
      <Row>
        <Col xs={12} md={6}>
            <Form.Control value={searchTerm} placeholder='Search Posts' onChange={handleInputChange} />
        </Col>
      </Row>
      <div>
        {Array.isArray(questions) ? (
          questions
            .filter(q => q.question.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(q => <QuestionCard key={q.id} question={q} />)
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


