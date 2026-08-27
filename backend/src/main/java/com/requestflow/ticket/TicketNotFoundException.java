package com.requestflow.ticket;

public class TicketNotFoundException extends RuntimeException {
    public TicketNotFoundException(Long id) {
        super("Ticket " + id + " was not found");
    }
}
