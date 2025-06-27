package com.restaurant.management.service;

import com.restaurant.management.model.MenuItem;
import com.restaurant.management.repository.MenuItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service class for Menu Item operations
 * Provides business logic for menu management
 */
@Service
@Transactional
public class MenuService {

    private static final Logger logger = LoggerFactory.getLogger(MenuService.class);

    @Autowired
    private MenuItemRepository menuItemRepository;

    /**
     * Get all menu items with pagination
     */
    @Transactional(readOnly = true)
    public Page<MenuItem> getAllMenuItems(Pageable pageable) {
        logger.debug("Fetching all menu items with pagination");
        return menuItemRepository.findAll(pageable);
    }

    /**
     * Get all menu items
     */
    @Transactional(readOnly = true)
    public List<MenuItem> getAllMenuItems() {
        logger.debug("Fetching all menu items");
        return menuItemRepository.findAll();
    }

    /**
     * Get menu item by ID
     */
    @Transactional(readOnly = true)
    public Optional<MenuItem> getMenuItemById(Long id) {
        logger.debug("Fetching menu item with ID: {}", id);
        return menuItemRepository.findById(id);
    }

    /**
     * Get menu items by category
     */
    @Transactional(readOnly = true)
    public List<MenuItem> getMenuItemsByCategory(String category) {
        logger.debug("Fetching menu items by category: {}", category);
        return menuItemRepository.findByCategory(category);
    }

    /**
     * Get available menu items
     */
    @Transactional(readOnly = true)
    public List<MenuItem> getAvailableMenuItems() {
        logger.debug("Fetching available menu items");
        return menuItemRepository.findByIsAvailable(true);
    }

    /**
     * Create new menu item
     */
    public MenuItem createMenuItem(MenuItem menuItem) {
        logger.info("Creating new menu item: {}", menuItem.getName());
        validateMenuItem(menuItem);
        return menuItemRepository.save(menuItem);
    }

    /**
     * Update existing menu item
     */
    public MenuItem updateMenuItem(Long id, MenuItem menuItemDetails) {
        logger.info("Updating menu item with ID: {}", id);
        
        MenuItem existingItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with ID: " + id));

        existingItem.setName(menuItemDetails.getName());
        existingItem.setDescription(menuItemDetails.getDescription());
        existingItem.setPrice(menuItemDetails.getPrice());
        existingItem.setCategory(menuItemDetails.getCategory());
        existingItem.setImageUrl(menuItemDetails.getImageUrl());
        existingItem.setIsAvailable(menuItemDetails.getIsAvailable());

        validateMenuItem(existingItem);
        return menuItemRepository.save(existingItem);
    }

    /**
     * Delete menu item
     */
    public void deleteMenuItem(Long id) {
        logger.info("Deleting menu item with ID: {}", id);
        
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with ID: " + id));
        
        menuItemRepository.delete(menuItem);
    }

    /**
     * Toggle menu item availability
     */
    public MenuItem toggleAvailability(Long id) {
        logger.info("Toggling availability for menu item with ID: {}", id);
        
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with ID: " + id));
        
        menuItem.setIsAvailable(!menuItem.getIsAvailable());
        return menuItemRepository.save(menuItem);
    }

    /**
     * Validate menu item data
     */
    private void validateMenuItem(MenuItem menuItem) {
        if (menuItem.getName() == null || menuItem.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Menu item name is required");
        }
        if (menuItem.getPrice() == null || menuItem.getPrice().doubleValue() < 0) {
            throw new IllegalArgumentException("Menu item price must be non-negative");
        }
        if (menuItem.getCategory() == null || menuItem.getCategory().trim().isEmpty()) {
            throw new IllegalArgumentException("Menu item category is required");
        }
    }
}