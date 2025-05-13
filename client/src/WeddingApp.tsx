import React, { Component } from "react";
import { isRecord } from './record';
import { Guest, findGuest } from "./guest";
import { GuestList } from "./GuestList";
import { GuestNew } from "./GuestNew";
import { GuestEdit } from "./GuestEdit"
import { parseGuest } from "./guest";

type Page = "list" | "add" | {kind: "edit", name: string};

type WeddingAppState = {
  page: Page //page being shown
  guests: Array<Guest> //list of guests currently
  loading: boolean //loading state?
}

/** Displays the UI of the Wedding rsvp application. */
export class WeddingApp extends Component<{}, WeddingAppState> {

  constructor(props: {}) {
    super(props);

    this.state = {page: "list", guests: [], loading: false};
  }
  componentDidMount = (): void => {
    this.doRefreshClick(); 
  };
  
  render = (): JSX.Element => {
    if (this.state.loading) {
      return <h1>loading</h1>
    } else {
      if (this.state.page === "list") {
        return <GuestList guests= {this.state.guests} onAddClick={this.doAddClick} onGuestClick={this.doGuestClick}/>
      } else if (this.state.page === "add") {
        return <GuestNew onNewClick={this.doNewClick} onBackClick={this.doBackClick}/>
      } else {
        const name = this.state.page.name;
        const guest = findGuest(name, this.state.guests);
        if (guest !== undefined) {
          return <GuestEdit guest ={guest} onSave={this.doSaveClick} onBack={this.doBackClick}/>
        } else {
          return <h1>impossible</h1>
        }
      }
    }
  }


  doAddClick = (): void => {
    this.setState({page: "add"});
  }

  doGuestClick = (name: string): void => {
    this.setState({page: {kind: "edit", name}});
    
  }

  //saves newly added guest into server
  doNewClick = (name: string, side: boolean, family: boolean): void => {
    this.setState({loading: true});
    const args = { name: name, family: family, side: side, diet: ""};
    fetch("/api/addGuest", {
        method: "POST", body: JSON.stringify(args),
        headers: {"Content-Type": "application/json"} })
      .then(this.doNewResp)
      .catch(() => this.doNewError("failed to connect to server"));
  }

  //checks for invalid response
  doNewResp = (resp: Response): void => {
    if (resp.status === 200) {
      resp.json().then(this.doNewJson)
          .catch(() => this.doNewError("200 response is not JSON"));
    } else if (resp.status === 400) {
      resp.text().then(this.doNewError)
          .catch(() => this.doNewError("400 response is not text"));
    } else {
      this.doNewError(`bad status code from /api/addGuest: ${resp.status}`);
    }
  };

  //saves guest data to server
  doNewJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("bad data from /api/addGuest: not a record", data);
      return;
    }
    this.setState({page: "list"});
    this.doRefreshClick();
  };

  doRefreshClick = (): void => {
    this.setState({loading: true});
    fetch("/api/listGuests").then(this.doListResp)
        .catch(() => this.doListError("failed to connect to server"));
  };

  //checks for invalid response
  doListResp = (resp: Response): void => {
    if (resp.status === 200) {
      resp.json().then(this.doListJson)
          .catch(() => this.doListError("200 response is not JSON"));
    } else if (resp.status === 400) {
      resp.text().then(this.doListError)
          .catch(() => this.doListError("400 response is not text"));
    } else {
      this.doListError(`bad status code from /api/listGuests: ${resp.status}`);
    }
  };

  //saves list data to server
  doListJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("bad data from /api/listGuests: not a record", data);
      return;
    }

    if (!Array.isArray(data.guests)) {
      console.error("bad data from /api/listGuests: guests is not an array", data);
      return;
    }

    const guests: Guest[] = [];
    for (const val of data.guests) {
      const guest = parseGuest(val);
      if (guest !== undefined) {
        console.log("pushed")
        guests.push(guest);
      } 
    }
    this.setState({page: "list", guests: guests, loading: false});
  };

  doListError = (msg: string): void => {
    console.error(`Error fetching /api/listGuests: ${msg}`);
  };

  doNewError = (msg: string): void => {
    console.log("error: " + msg); 
  };

  doBackClick = (): void => {
    this.setState({page: "list"});
  }

  //updates and saves guest to the server
  doSaveClick = (guest: Guest, diet: string, plusOne: boolean | undefined, extraName:string | undefined, extraDiet: string | undefined): void => {
    this.setState({loading: true});
    const args = {name: guest.name, family: guest.family, diet: diet, side: guest.side, plusOne: plusOne, extraName: extraName, extraDiet: extraDiet}
    fetch("/api/addGuest", {
      method: "POST", body: JSON.stringify(args),
      headers: {"Content-Type": "application/json"} })
    .then(this.doNewResp)
    .catch(() => this.doNewError("failed to connect to server"));
  }
}