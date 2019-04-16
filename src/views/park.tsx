import React from "react";
import { create, isLotFull } from "../services/db";
import { LotItem } from "../models/LotItem";

import "./park.scss";
import { TextBox } from "../components/text-box";
import { SubmitButton, LinkButton } from "../components/button";
import { Loading } from "../components/loading";
import { format } from "date-fns";

interface ParkState {
  ticket: LotItem | null;
  error: string | null;
  isFull: boolean;
  loading: boolean;
}

export class Park extends React.Component {
  state: ParkState = {
    ticket: null,
    error: null,
    isFull: false,
    loading: true
  };
  plateRef = React.createRef<HTMLInputElement>();
  componentDidMount() {
    this.getInitialData();
  }
  getInitialData = async () => {
    try {
      this.setState({ isFull: await isLotFull(), loading: false });
    } catch (e) {
      this.setState({ error: e.message });
    }
  };

  createNew = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!this.plateRef.current) {
        return;
      }
      const plate = this.plateRef.current.value;
      const ticket = await create({ plate, parking_time: new Date() });
      this.setState({ ticket });
    } catch (e) {
      this.setState({ error: e.message });
    }
  };

  renderTicketForm = () => {
    const { error } = this.state;

    return (
      <div className="ticket-form">
        <p className="title">Park</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={this.createNew} className="inner-form">
          <TextBox id="plate" ref={this.plateRef} placeholder="License Plate" />
          <SubmitButton type="submit" value="Create" />
        </form>
      </div>
    );
  };

  renderTicketView = () => {
    const { ticket } = this.state;
    if (!ticket) {
      return null;
    }
    return (
      <div className="ticket">
        <p className="number">#{ticket.id}</p>
        <div className="plate">{ticket.plate}</div>
        <p className="date">{format(ticket.parking_time, "MMM Do, YYYY hh:mm a")}</p>
        <div className="note">* Please remember your ticket number</div>
        <LinkButton to="/">Back</LinkButton>
      </div>
    );
  };

  render() {
    const { ticket, isFull, loading } = this.state;
    if (loading) {
      return <Loading />;
    }

    if (isFull) {
      return (
        <div className="park-container">
          <div className="ticket-form">
            <p className="title">Lot full.</p>
            <LinkButton to="/">Go back</LinkButton>
          </div>
        </div>
      );
    }
    return (
      <div className="park-container">
        {!ticket && this.renderTicketForm()}
        {ticket && this.renderTicketView()}
      </div>
    );
  }
}
