import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Loader from "../../Components/Loader";
import FatText from "../../Components/FatText";
import UserCard from "../../Components/UserCard"


const Wrapper = styled.div`
    higth: 50vh;
`;

const Section = styled.div`
    margin-bottom: 50px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: 160px;
    grid-auto-rows:160px;
`;
const SearchPresenter = ({ searchTerm, loading, data }) => {
    if(searchTerm === "undefined"){
        return <Wrapper><FatText text={"Search for something"} /></Wrapper>
    } else if (loading === true) {
        return <Wrapper><Loader /></Wrapper>    
    } else if (data && data.searchUser || data.searchPost){
        return (
            <Wrapper>
                <Section>
                    {data.searchUser.length === 0 ? (
                        <FatText text = {"No users found"}/>
                    ) : (
                        data.searchUser.map(user => (
                            <UserCard
                                key = {user.id}
                                name = {user.name}
                                isFollowing = {user.isFollowing}
                                url = {user.avatar}
                                isSelf = {user.isSelf}
                            />
                        ))
                    )}
                </Section>
                <Section>
                    {data.searchPost.length === 0 ? (
                            <FatText text = {"No photos found"}/>
                        ) : (
                            data.searchPost.map(post => null)
                        )}                    
                </Section>
            </Wrapper>
        );
    }    
};


SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool
};

export default SearchPresenter;
