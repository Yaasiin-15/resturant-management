package com.restaurant.management.repository;

import com.restaurant.management.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategory(String category);
    List<MenuItem> findByIsAvailable(Boolean isAvailable);
    List<MenuItem> findByCategoryAndIsAvailable(String category, Boolean isAvailable);
}