package com.requestflow.ticket;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TicketRequest(
        @NotBlank String title,
        @NotBlank String category,
        @NotBlank String requester,
        @NotNull Priority priority
) {
}
