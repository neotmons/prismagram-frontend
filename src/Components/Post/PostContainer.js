import React, {useState} from "react";
import PropTypes from "prop-types";
//import { useMutation, useQuery } from "react-apollo-hooks";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { TOGGLE_LIKE, ADD_COMMENT} from "./PostQueries";
import { toast } from "react-toastify";
//import { ME } from "../../SharedQueries";

const PostContainer = ({
    id, 
    user, 
    files, 
    likeCount, 
    isLiked,
    comments,    
    caption,
    location,
    createdAt
}) => {
        const [isLikedS, setIsLiked] = useState(isLiked);
        const [likeCountS, setLikeCount] = useState(likeCount);
        const [currentItem, setCurrentItem ] = useState(0);
        const [selfComments, setSelfComments] = useState([]);

        const comment = useInput("");
        //const { data: meQuery } = useQuery(ME);

        const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
            variables: {postId: id}});
        const addCommentMutation = useMutation(ADD_COMMENT, {
            variables: {postId: id, text: comment.value }
        });
        
        const slideNext = () => {
            const totalFiles = files.length;
            if (currentItem === totalFiles - 1) {
              setCurrentItem(0);
            } else {
              setCurrentItem(currentItem + 1);
            }
          };

          const slidePrev = () => {
            const totalFiles = files.length;
            if (currentItem === 0) {
              setCurrentItem(totalFiles - 1);
            } else {
              setCurrentItem(currentItem - 1);
            }
          };
/**
        const slide = () => {
            const totalFiles = files.length;
            if(currentItem === totalFiles-1){
                setTimeout(() => setCurrentItem(0), 3000);
            } else {
                setTimeout(() =>setCurrentItem(currentItem + 1), 3000);
            }
        };
 
        useEffect(() => {
            slide();
        }, [currentItem]);
*/
        const toggleLike = async() => {
            if(isLikedS === true){
                setIsLiked(false);                
                setLikeCount(likeCountS - 1);
            } else  {
                setIsLiked(true);
                setLikeCount(likeCountS + 1);
            }

            try{
                await toggleLikeMutation();                   
            }catch{
                setIsLiked(!isLikedS)
                toast.error("Can't register Like");
            }
            console.log(`toggleLike : isLiked - ${isLiked}`)
        }


    const onKeyPress = async(event) => {
        const {which} = event;
        if(which === 13){            
            event.preventDefault();
            
            try{
                const {
                    data: {addComment}
                } = await addCommentMutation();

                setSelfComments([...selfComments, addComment]);
                    /**
                    {
                        id:Math.floor(Math.random()* 100), 
                        text:comment.value, 
                        user: {name: meQuery.me.name
                        }
                    }
                     */
                comment.setValue("");
            } catch {
                toast.error("Can't add comment.");
            }
        }
        return;
    }

    return <PostPresenter 
        user={user}
        files={files}
        location={location}
        caption={caption}
        likeCount={likeCountS}
        isLiked={isLikedS}
        comments={comments}
        createdAt={createdAt}
        newComment={comment}
        setIsLiked={setIsLiked}
        setLikeCount={setLikeCount}
        currentItem={currentItem}
        slidePrev={slidePrev}
        slideNext={slideNext}
        toggleLike={toggleLike}
        onKeyPress={onKeyPress}
        selfComments={selfComments}
    />
};

PostContainer.propTypes = {
    id:PropTypes.string.isRequired,
    user:PropTypes.shape({
        id:PropTypes.string.isRequired,
        avatar:PropTypes.string,
        name:PropTypes.string.isRequired,
    }).isRequired,
    files:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount:PropTypes.number.isRequired,
    isLiked:PropTypes.bool.isRequired,
    comments:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.string.isRequired,
            text:PropTypes.string.isRequired,
            user:PropTypes.shape({
                id:PropTypes.string.isRequired,
                name:PropTypes.string.isRequired,
                }).isRequred
        })
    ).isRequired,
    caption:PropTypes.string.isRequired,
    location:PropTypes.string,
    createdAt:PropTypes.string.isRequired
};

export default PostContainer;