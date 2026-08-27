package com.requestflow.ticket;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class TicketService {

    private final TicketRepository repository;

    public TicketService(TicketRepository repository) {
        this.repository = repository;
    }

    public List<Ticket> getTickets(TicketStatus status) {
        return status == null
                ? repository.findAllByOrderByCreatedAtDesc()
                : repository.findByStatusOrderByCreatedAtDesc(status);
    }

    @Transactional
    public Ticket createTicket(TicketRequest request) {
        Ticket ticket = new Ticket(
                request.title(),
                request.category(),
                request.requester(),
                request.priority()
        );
        return repository.save(ticket);
    }

    @Transactional
    public Ticket updateStatus(Long id, TicketStatus status) {
        Ticket ticket = repository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException(id));
        ticket.setStatus(status);
        return ticket;
    }
}
