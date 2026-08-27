package com.requestflow;

import com.requestflow.ticket.Priority;
import com.requestflow.ticket.Ticket;
import com.requestflow.ticket.TicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RequestFlowApplication {

    public static void main(String[] args) {
        SpringApplication.run(RequestFlowApplication.class, args);
    }

    @Bean
    CommandLineRunner loadSampleData(TicketRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Ticket("Unable to access billing portal", "Access", "Ananya Rao", Priority.HIGH));
                repository.save(new Ticket("Monthly report shows duplicate rows", "Data", "Rohit Mehta", Priority.MEDIUM));
                repository.save(new Ticket("Update account contact details", "Account", "Meera Shah", Priority.LOW));
            }
        };
    }
}
