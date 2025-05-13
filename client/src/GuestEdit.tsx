import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { Guest } from "./guest";

type GuestEditProps = {
    guest: Guest; //guest being edited
    onSave: (guest: Guest, diet: string, plusOne: boolean | undefined, extraName:string | undefined, 
        extraDiet: string | undefined) => void; //when guest edits are saved
    onBack: () => void; //back to list screen
}

type GuestEditState = {
    diet: string; //current guest dietary restrictions
    plusOne: boolean | undefined; //has plus one?
    error: string; //current error state
    addGuest ?: string; //additionaly guest name
    addGuestDiet ?: string // additional guest dietary restrictions
}

export class GuestEdit extends Component<GuestEditProps, GuestEditState> {
    constructor(props: GuestEditProps) {
        super(props);
        this.state = {diet: this.props.guest.diet, plusOne: this.props.guest.plusOne, 
            error: "", addGuest: this.props.guest.extraName, addGuestDiet: this.props.guest.extraDiet};
    }

    render = () : JSX.Element => {
        const value = this.state.plusOne === undefined? "Unknown": (this.state.plusOne? "1": "0");
        return <div>
            <h1>Guest Details</h1>
            <p>{this.props.guest.name}, Guest of {this.props.guest.side? "James": "Molly"}{this.props.guest.family? ", family": ""}</p>
            <p> Dietary Restrictions: (Specify "none" if none)</p>
            <input type="text" value={this.state.diet} onChange={this.doDietChange}/>
            <div>
                <p>Additional Guest? </p>
                <select id="add-option" onChange={this.doAdditionalChange} value={value}>
                    <option value = "Unknown">Unknown</option>
                    <option value = "0">0</option>
                    <option value = "1">1</option>
                </select>
            </div>
            <ul>{(this.state.plusOne === undefined || !this.state.plusOne)? <div></div>:this.renderGuest()}</ul>
            <button onClick={this.doSaveClick}>Save</button>
            <button onClick={this.doBackClick}>Back</button>
            <ul>{this.renderError()}</ul>
        </div>
        
    }

    //renders error message if error exists
    renderError = (): JSX.Element => {
        console.log("error state" + this.state.error);
        const error = this.state.error;
        if (error === "missing diet") {
            return <p>Must fill in all dietary information fields</p>
        } else if (error === "missing name & diet") {
            return <p>Must fill in extra guest name and dietary information fields</p>
        } else if (error === "missing name") {
            return <p>Must fill in extra guest name field</p>
        } else {
            return <p></p>
        }
    }

    renderGuest = (): JSX.Element => {
        return <div>
            <p>Guest Name: </p>
            <input type="text" value={this.state.addGuest} onChange={this.doAddGuestChange}/>
            <p>Guest Dietary Restrictions: (Specify "none" if none)</p>
            <input type="text" value={this.state.addGuestDiet} onChange={this.doAddGuestDietChange}/>
        </div>
        
    }

    doDietChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ diet: evt.target.value });
    };

    //bringing additional guest?
    doAdditionalChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
        if (evt.target.value === "1") {
            this.setState({plusOne: true, error:""});
        } else if (evt.target.value === "0") {
            this.setState({plusOne: false, error:""});
        } else {
            this.setState({plusOne: undefined});
        }
    }

    doAddGuestChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        console.log("changed guest");
        this.setState({addGuest: evt.target.value});
    }

    doAddGuestDietChange= (evt: ChangeEvent<HTMLInputElement>): void => {
        console.log("changed guest diet");
        this.setState({addGuestDiet: evt.target.value});
    }

    //saves new guest into guest list
    doSaveClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        if (this.state.diet.trim().length === 0) {
            this.setState({error: "missing diet"});
            return;
        } 
        if (this.state.plusOne) {
            if (this.state.addGuest === undefined || this.state.addGuest.trim().length === 0) {
                this.setState({error: "missing name"});
                return;
            }
            if (this.state.addGuestDiet === undefined || this.state.addGuestDiet.trim().length === 0) {
                this.setState({error: "missing name & diet"});
                return;
            }
        }
    
        this.setState({error: ""});
        this.props.onSave(this.props.guest, this.state.diet, this.state.plusOne, this.state.addGuest, this.state.addGuestDiet);
    }

    doBackClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        this.props.onBack();
    }
}