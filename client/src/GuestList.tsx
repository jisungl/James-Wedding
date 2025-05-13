import React, { Component, MouseEvent } from 'react';
import { Guest, countFam, countGuest } from './guest';

type ListProps = {
    guests: Array<Guest>; //current list of guests
    onAddClick : () => void; //to add new guest
    onGuestClick : (name: string) => void; //to edit guest
}

//displays ui of current guest list and guest adding option
export class GuestList extends Component<ListProps> {
    constructor(props: ListProps) {
        super(props);
    }

    render = (): JSX.Element => {
        const [mMin, mMax] = countGuest(false, this.props.guests, {min: 0, max: 0});
        const [jMin, jMax] = countGuest(true, this.props.guests, {min: 0, max: 0});
        const mFam = countFam(false, this.props.guests, 0);
        const jFam = countFam(true, this.props.guests, 0);
        return <div>
                <h1> Guest List</h1>
                <ul>{this.renderList()}</ul>
                <h3>Summary:</h3>
                <p> {mMax === mMin ? `${mMin}` : `${mMin}-${mMax}`} guest(s) of Molly ({mFam} family)</p> {/*displays number if min and max are equal, range otherwise*/}
                <p> {jMax === jMin ? `${jMin}` : `${jMin}-${jMax}`} guest(s) of James ({jFam} family)</p>
                <button type="button" onClick={this.doAddClick}>Add Guest</button>
              </div>
    }

    //renders guest list with names as clickable links
    renderList = (): JSX.Element[] => {
        const list: JSX.Element[] = [];
          for (const guest of this.props.guests) {
          list.push(
            <li key={guest.name}>
              <a href="#" onClick={(evt) => this.doGuestClick(evt, guest.name)}>{guest.name}</a>
              &nbsp;Guest of {guest.side? "James" : "Molly"}  {guest.plusOne === undefined ? "+1?" : guest.plusOne? "+1" : "+0"}
            </li>);
        }
        return list;
    }

    doAddClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        this.props.onAddClick();
    }

    doGuestClick = (evt: MouseEvent<HTMLAnchorElement>, name: string): void => {
    evt.preventDefault();
    this.props.onGuestClick(name);
  }
}



