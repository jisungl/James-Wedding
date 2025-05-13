import React, { Component, ChangeEvent, MouseEvent } from 'react';

type GuestNewProps = {
    onNewClick: (name: string, side: boolean, family: boolean) => void; //new guest is created
    onBackClick: () => void; //back to list
}

type GuestNewState = {
    name: string; //curent guest name
    side: boolean | undefined; // current guest's host
    family: boolean; //family?
    error: string; //current error state
}

// displays ui of the new guest application
export class GuestNew extends Component<GuestNewProps, GuestNewState> {
    constructor(props: GuestNewProps) {
        super(props);
        this.state = {name: "", side: undefined, family: false, error: ""};
    }

    render = () : JSX.Element => {
        // if (this.state.error.length > 0) {
        return <div>Name:&nbsp;
            <input type="text" value={this.state.name} onChange={this.doNameChange}/>
            <p>Guest of:</p>
            <div>
                &nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" id="Molly" name="Side" value="Molly" onClick={this.doMollyClick} />
                &nbsp;<label htmlFor="Molly"> Molly</label>
            </div>
            <div>
                &nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" id="James" name="Side" value="James" onClick={this.doJamesClick}/>
                &nbsp;<label htmlFor="James"> James</label>
            </div>
            <br></br>
            <input type="checkbox" id="family" name="family" onChange={this.doFamilyClick}/>
            &nbsp;<label htmlFor="family"> Family?</label>
            <button onClick={this.doNewClick}>Add</button>
            <button onClick={this.doBackClick}>Back</button>
            <ul>{this.renderError()}</ul>
        </div>        
    }

    renderError = (): JSX.Element => {
        const error = this.state.error;
        if (error === "missing name & host") {
            return <p>Must fill out name and host fields</p>
        } else if (error === "missing host") {
            return <p>Must fill out host field</p>
        } else if (error === "missing name") {
            return <p>Must fill out name field</p>
        } else {
            return <p></p>
        }
    }

    

    doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        console.log("name input");
        this.setState({ name: evt.target.value });
    };

    doMollyClick = (_evt: MouseEvent<HTMLInputElement>): void => {
        console.log("molly clicked");
        this.setState({side:false});
    }

    doJamesClick = (_evt: MouseEvent<HTMLInputElement>): void => {
        console.log("james clicked");
        this.setState({side:true});

    }

    doNewClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        if (this.state.side === undefined && this.state.name === "") {
            this.setState({error: "missing name & host"});
            console.log("missing name & host");
        } else if (this.state.side === undefined) {
            this.setState({error: "missing host"});
            console.log("missing host");
        } else if (this.state.name === "") {
            this.setState({error: "missing name"});
        } else {
            console.log("new guest added")
            this.props.onNewClick(this.state.name, this.state.side, this.state.family);
        } 
    }

    doFamilyClick = (_evt: ChangeEvent<HTMLInputElement>): void => {
        console.log("family box");
        this.setState({family: this.state.family? false: true});        
    }    

    doBackClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        this.props.onBackClick();
    }

}