import { Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/css/style.css';
import { Post as IPost} from './main';
import { addDoc, getDocs, deleteDoc, collection, query, where, doc } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';


interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    const [ user ] = useAuthState(auth);
    const [ likes, setLikes ] = useState<Like[] | null>(null);


    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc); 
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
        
    };

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
            if (user) {
                setLikes((prev) => prev 
                ? [...prev, { userId: user?.uid, likeId: newDoc.id }] 
                : [{ userId: user?.uid, likeId: newDoc.id }] 
                );
            };
        } catch (err) {
            console.log(err); 
        }
    };

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId );

            await deleteDoc(likeToDelete);
            if (user) {
                setLikes(
                    (prev) => prev && prev.filter((like) => like.likeId !== likeId)
                );
            }
            
        } catch (err) {
            console.log(err); 
        }
    };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, []); 
    
    return (
        <Col className='justify-content-between text-dark border border-top-0 border-dark px-0 rounded' style={{ minWidth: '30.75rem', maxWidth: '35.75rem'}}> 
            <h1 className='text-break fw-light text-light border border-5 border-dark text-capitalize rounded-top bg-dark py-3 m-0 p-0'> {post.title} </h1>
            <p className='text-break fs-5 px-5 pt-3 pb-0 m-0 p-0'> {post.description} </p>
            <span className='d-block fs-7 text-break text-muted pb-2 m-0 p-0'> @{post.username} </span>
            <Button className='btn btn-light shadow-sm d-inline me-2 mb-2 pb-1 px-1 p-0 m-0 rounded' onClick={hasUserLiked ? removeLike : addLike}> { hasUserLiked ? <>&#128078;</> : <>&#128077;</> } </Button>
            {likes && <span className='d-inline-block fs-7 text-break text-muted pb-2 m-0 p-0'>  { likes?.length } </span>}
        </Col>
    );
};