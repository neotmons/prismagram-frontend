import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TextareaAutosize from 'react-autosize-textarea';
import moment from 'moment';
import FatText from "../FatText";
import Avatar from "../Avatar"
import { HeartFull, HeartEmpty, Prev, Next, Comment as CommenIcon } from "../Icons";

const Post = styled.div`
    ${props => props.theme.whiteBox};
    width: 100%;
    max-width: 600px;
    margin-bottom: 25px;
    user-select: none;  
    a {
        color: inherit;
    }  
`;

const Header = styled.header`
    padding: 15px;
    display: flex;
    align-items: center;
`;

const UserColumn= styled.div`
    margin-left: 10px;
`;

const Location = styled.span`
    display: block;
    margin-top: 5px;
    font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.img`
    max-width: 100%;
    
    width: 100%;
    height: 600px;
    position: absolute;
    top: 0;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;

    opacity: ${props => (props.showing ? 1 : 0)};
    transition:opacity .5s linear;
`;


const Button = styled.span`
    cursor: pointer;
`;


const Meta = styled.div`
    padding: 15px;
`;

const SlideButton = styled.div`
    cursor: pointer;
    position: absolute;
    top: 50%
    ${props => (props.type === "prev" ? "left: 10px" : "right: 10px")};
    opacity: 0.7;
`;

const Buttons = styled.div`
    ${Button} {
        &:first-child {
            margin-right: 10px;
        }
    }
    margin-bottom: 10px;
`;

const Timestamp = styled.span`
    font-weight: 300;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`;

const Comments = styled.ul`
    margin-top: 10px;
`;

const Comment = styled.li`
    margin-bottom: 7px;
    span {
       margin-right: 5px;
    }
`;


export default ({
    user: {name, avatar}, 
    location, 
    files, 
    isLiked, 
    likeCount, 
    createdAt,
    newComment,
    currentItem,
    slidePrev,
    slideNext,
    toggleLike,
    onKeyPress,
    comments,
    selfComments,
     }) => (
    <Post>
        <Header>
            <Avatar size="sm" url={avatar} />
            <UserColumn>
                <Link to={`/${name}`}>
                    <FatText text={name} />
                </Link>
                <Location> { location } </Location>
            </UserColumn>
        </Header>
        <Files>
            {files && files.map((file, index) => <File key={file.id} src={file.url} showing={index === currentItem}/>)}
            {files && files.length > 1 && (
                <>
                <SlideButton type="prev" onClick={slidePrev}>
                    <Prev />
                </SlideButton>
                <SlideButton type="next" onClick={slideNext}>
                    <Next />
                </SlideButton>
                </>
            )}
        </Files>
        <Meta>
        <Buttons>
            <Button onClick={toggleLike}>{isLiked ? <HeartFull />: <HeartEmpty />}</Button>
            <Button><CommenIcon /></Button>
        </Buttons>
        <FatText text={likeCount === 1 ? "1 like": `${likeCount} likes`} />
        {comments && (
            <Comments>
                {comments.map(comment => (
                    <Comment>
                        <FatText text={comment.user.name} />
                        {comment.text}
                    </Comment>
                ))}
                {selfComments.map(comment => (
                    <Comment>
                        { console.log(comment.user)}
                        <FatText text={comment.user.name} />
                        {comment.text}
                    </Comment>
                ))}
            </Comments>                
        )}           
        <Timestamp>{ moment(createdAt).format("YYYY.MM.DD HH:MM") }</Timestamp>
        <form>
            <Textarea
                onKeyPress={onKeyPress}
                placeholder="Add a comment..."
                value={newComment.value}
                onChange={newComment.onChange}
                />
        </form>
        </Meta>
    </Post>
);