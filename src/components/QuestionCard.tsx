
import { QuestionType } from '../types';
import Card from 'react-bootstrap/Card';
import React from 'react';

// Define the type for the props that the QuestionCard component accepts
type QuestionCardProps = {
    question: QuestionType, // The post object containing information about the post
}

export default function QuestionCard({ question }: QuestionCardProps) {
    // This is a functional component named PostCard that accepts a prop: question
    
    return (
        <Card className='my-3 bg-custom' text='white'>
            <Card.Body>
                <Card.Text>
                    { question.question}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}