package com.requestflow.ticket;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    TicketRepository repository;

    @InjectMocks
    TicketService service;

    @Test
    void updatesTicketStatus() {
        Ticket ticket = new Ticket("Login issue", "Access", "Sushmita", Priority.HIGH);
        when(repository.findById(1L)).thenReturn(Optional.of(ticket));

        Ticket updated = service.updateStatus(1L, TicketStatus.RESOLVED);

        assertEquals(TicketStatus.RESOLVED, updated.getStatus());
        verify(repository).findById(1L);
    }
}
