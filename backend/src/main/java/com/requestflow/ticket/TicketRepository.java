package com.requestflow.ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findAllByOrderByCreatedAtDesc();
    List<Ticket> findByStatusOrderByCreatedAtDesc(TicketStatus status);
}
