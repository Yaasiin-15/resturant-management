package com.restaurant.management.controller;

import com.restaurant.management.model.RestaurantTable;
import com.restaurant.management.model.TableStatus;
import com.restaurant.management.repository.RestaurantTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tables")
public class TableController {

    @Autowired
    private RestaurantTableRepository tableRepository;

    @GetMapping
    public List<RestaurantTable> getAllTables() {
        return tableRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantTable> getTableById(@PathVariable Long id) {
        Optional<RestaurantTable> table = tableRepository.findById(id);
        return table.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public RestaurantTable createTable(@RequestBody RestaurantTable table) {
        return tableRepository.save(table);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<RestaurantTable> updateTable(@PathVariable Long id, @RequestBody RestaurantTable tableDetails) {
        Optional<RestaurantTable> optionalTable = tableRepository.findById(id);
        
        if (optionalTable.isPresent()) {
            RestaurantTable table = optionalTable.get();
            table.setTableNumber(tableDetails.getTableNumber());
            table.setCapacity(tableDetails.getCapacity());
            table.setStatus(tableDetails.getStatus());
            table.setLocation(tableDetails.getLocation());
            
            return ResponseEntity.ok(tableRepository.save(table));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTable(@PathVariable Long id) {
        return tableRepository.findById(id)
                .map(table -> {
                    tableRepository.delete(table);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public List<RestaurantTable> getTablesByStatus(@PathVariable TableStatus status) {
        return tableRepository.findByStatus(status);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<RestaurantTable> updateTableStatus(@PathVariable Long id, @RequestBody TableStatus status) {
        Optional<RestaurantTable> optionalTable = tableRepository.findById(id);
        
        if (optionalTable.isPresent()) {
            RestaurantTable table = optionalTable.get();
            table.setStatus(status);
            return ResponseEntity.ok(tableRepository.save(table));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}