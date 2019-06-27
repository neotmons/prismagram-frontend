import React from "react";
import {withRouter} from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";
import {useQuery, useMutation} from "react-apollo-hooks";
import {GET_USER, LOG_OUT} from "./ProfileQueries";




export default withRouter(({match:{params: {name}}}) => {
    const {data, loading } = useQuery(GET_USER, { variables: {name} });
    const logOut = useMutation(LOG_OUT);

    return <ProfilePresenter loading={loading} logOut={logOut} data={data}/>;
});

