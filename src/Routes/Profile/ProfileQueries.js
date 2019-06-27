import {gql} from "apollo-boost";

export const GET_USER = gql`
    query seeUser($name: String!){
        seeUser(name: $name) {
            id
            avatar
            name
            fullName
            isFollowing
            isSelf
            bio
            followingCount
            followersCount            
            postsCount
            posts {
                id
                files {
                url
                }
                likeCount
                commentCount
            }
        }
    }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
