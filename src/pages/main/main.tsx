import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/css/style.css';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Post } from './post';

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
};

export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]
        );
    };

    useEffect(() => {
        getPosts();
    }, []); 

    return (
        
        <Row className='dark-border m-4 gap-4 justify-content-center mx-auto' style={{ maxWidth: '70.75rem'}}>
            {postsList?.map((post) => (
                <Post post={post} />
            ))}
        </Row>
    
    );
};
