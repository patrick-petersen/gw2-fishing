import React from "react";
import AccessTokenInput from "./AccessTokenInput";
import Category from "./Category";
import {GW2Api} from "../api/GW2Api";
import Cookies from 'universal-cookie';
import Clock from "./Clock";

import './Landing.scss';

type LandingProps = {
}

type LandingState = {
    access_token?: string,
    submitted: boolean
}

class Landing extends React.Component<LandingProps, LandingState> {
    private cookies: any;
    constructor(props: LandingProps) {
        super(props);

        this.cookies = new Cookies();

        this.state = {
            access_token: this.cookies.get('access_token'),
            submitted: false
        }

        this.callback = this.callback.bind(this);
    }
    
    callback(access_token: string) {
        console.log("callback called:", access_token);
        GW2Api.setAccessToken(access_token);
        this.cookies.set('access_token', access_token, { path: '/' });
        this.setState({
            access_token: access_token,
            submitted: true
        });
    }

    render() {
        if(!this.state.submitted) {
            return <AccessTokenInput access_token={this.state.access_token} callback={this.callback}/>
        }
        else {
            return <div className={"body"}>
                <div className={"header"}><Clock id={1} /></div>
                <div className={"content"}><Category id={317} /></div>
            </div>
        }
    }
}

export default Landing;