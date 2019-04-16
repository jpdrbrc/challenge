import React, { useState, useEffect } from "react";

import "./leave.scss";
import { LotItem } from "../models/LotItem";
import { get } from "../services/db";
import { TextBox } from "../components/text-box";
import { SubmitButton, Button, LinkButton } from "../components/button";
import { leave } from "../services/ticket";
import { RouteComponentProps } from "react-router";
import { Loading } from "../components/loading";

interface LeaveState {
  error: string | null;
  ticket: LotItem | null;
  loading: boolean;
}
export class Leave extends React.Component<RouteComponentProps> {
  state: LeaveState = {
    error: null,
    ticket: null,
    loading: true
  };
  ticketNumberRef = React.createRef<HTMLInputElement>();

  componentDidMount() {
    this.getInitialData();
  }

  getInitialData = async () => {
    const {
      match: { params }
    } = this.props;
    const { ticketId } = params as any;
    try {
      if (ticketId) {
        this.setState({ ticket: await get(ticketId) });
      }
    } catch (e) {
      this.setState({ error: e.message });
    }
    this.setState({ loading: false });
  };

  submitLeave = async () => {
    const { ticket } = this.state;
    try {
      if (!ticket) {
        return;
      }
      await leave(ticket);
      this.props.history.push("/");
    } catch (e) {
      this.setState({ error: e.message });
    }
  };
  render() {
    const { ticket, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="pay-container">
        {!ticket && (
          <div className="ticket-form">
            <p className="title">Invalid ticket</p>
          </div>
        )}
        {ticket && (
          <div className="ticket-form">
            <p className="title">{ticket.has_paid ? "Paid" : "Ticket Un-Paid"}</p>
            {ticket.has_paid && <p>Press exit to leave the lot.</p>}
            {ticket.has_paid ? (
              <Button onClick={this.submitLeave}>Exit</Button>
            ) : (
              <LinkButton to={`/pay/${ticket.id}`}>Pay</LinkButton>
            )}
          </div>
        )}
      </div>
    );
  }
}
