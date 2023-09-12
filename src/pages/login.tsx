import { Button, Form, InputGroup, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/style.css';
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        const result = await signInWithPopup( auth, provider );
        console.log(result);
        navigate('/');
    };
    return (
        <Container fluid className='text-white bg-dark py-2'>
            <p> Sign in with google to continue</p>
            <Button onClick={signInWithGoogle}> Sign in with google </Button>
        </Container>
    )
};