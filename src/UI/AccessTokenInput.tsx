import React, {ChangeEvent, FormEvent} from "react";



type AccessTokenInputProps = {
    callback: (access_token: string) => void,
    access_token?: string
}

type AccessTokenInputState = {
    content: string,

}

class AccessTokenInput extends React.Component<AccessTokenInputProps, AccessTokenInputState> {
    constructor(props: AccessTokenInputProps) {
        super(props);

        this.state = {
            content: props.access_token?props.access_token:""
        }

        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    submit(event : FormEvent<HTMLFormElement>) {
        console.log("submit called");
        this.props.callback(this.state.content);
        event.preventDefault();
        event.stopPropagation();
    }
    onChange(event: ChangeEvent<HTMLInputElement>) {
        console.log("value changed: ", event.target.value);
        this.setState({
            content: event.target.value
        })
    }

    render() {
        return <form onSubmit={this.submit.bind(this)}>
            <label>API-Key(optional):</label>
            <input type={"text"} onChange={this.onChange.bind(this)} value={this.state.content}/>
            <input type={"submit"} value={"Submit"} />
        </form>;
    }
}

export default AccessTokenInput;