import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/css/style.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';


interface CreateFormData {
    title: string;
    description: string;
}


export const CreateForm = () => {

    const [user, loading, error] = useAuthState(auth);
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("You must add a description.")
    });

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData> ({
        resolver: yupResolver(schema)
    });

    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        }); 
    };

     return (
        <Container fluid className='text-white bg-dark py-4 px-4 my-4 rounded' style={{ maxWidth: '30.75rem' }}>
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input className='form-control w-100 rounded-1' placeholder='Title' {...register("title")} />
                    <p className='text-danger mt-1'> { errors.title?.message } </p>
                <textarea className='form-control w-100 rounded-1' placeholder='Description' {...register("description")} />
                    <p className='text-danger mt-1'> { errors.description?.message } </p>
                <input className='bg-primary text-white' type='submit' value="Submit" /> 
            </form>
        </Container>
        
    )
};