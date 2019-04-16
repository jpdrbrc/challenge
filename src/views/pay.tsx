import React from "react";

import "./pay.scss";
import { LotItem } from "../models/LotItem";
import { get } from "../services/db";
import { TextBox } from "../components/text-box";
import { SubmitButton, Button } from "../components/button";
import { format } from "date-fns";
import { getTotal, pay } from "../services/ticket";
import { convertCurrency, minutesFormat } from "../services/utils";
import { RouteComponentProps } from "react-router";
import { Loading } from "../components/loading";

interface PayState {
  error: string | null;
  ticket: LotItem | null;
  loading: boolean;
}

export class Pay extends React.Component<RouteComponentProps> {
  state: PayState = {
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

  getTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!this.ticketNumberRef.current) {
        return;
      }
      const ticket = await get(this.ticketNumberRef.current.value);
      this.setState({ ticket });
    } catch (e) {
      this.setState({ error: e.message });
    }
  };
  submitPayment = async () => {
    const { history } = this.props;
    try {
      if (!this.state.ticket) {
        return;
      }
      await pay(this.state.ticket);
      history.push(`/leave/${this.state.ticket.id}`);
    } catch (e) {
      this.setState({ error: e.message });
    }
  };
  render() {
    const { error, ticket, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="pay-container">
        {!ticket && (
          <div className="ticket-form">
            <form onSubmit={this.getTicket}>
              <h1>Pay</h1>
              {error && <div className="error-message">{error}</div>}
              <TextBox ref={this.ticketNumberRef} placeholder="Ticket Number" />
              <SubmitButton value="Check Ticket" />
            </form>
          </div>
        )}
        {ticket && (
          <div className="ticket-form">
            <p className="details">
              <span>Parked at</span>
              {format(ticket.parking_time, "MMM Do, YYYY hh:mm a")}
            </p>
            <p className="details">
              <span>Duration</span>
              {minutesFormat(ticket.parking_time)}
            </p>
            <p className="details">
              <span>Status</span>
              {ticket.has_paid ? "Paid" : "Un-Paid"}
            </p>
            <p className="details">
              <span>Total</span>
              {convertCurrency(getTotal(ticket))}
            </p>
            <Button onClick={this.submitPayment}>{ticket.has_paid ? "Continue & Leave" : "Pay"}</Button>
          </div>
        )}
      </div>
    );
  }
}
