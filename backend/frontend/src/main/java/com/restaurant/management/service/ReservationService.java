package com.restaurant.management.service;

import com.restaurant.management.model.Reservation;
import com.restaurant.management.model.ReservationStatus;
import com.restaurant.management.repository.ReservationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service class for Reservation operations
 * Provides business logic for reservation management
 */
@Service
@Transactional
public class ReservationService {

    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);

    @Autowired
    private ReservationRepository reservationRepository;

    /**
     * Get all reservations
     */
    @Transactional(readOnly = true)
    public List<Reservation> getAllReservations() {
        logger.debug("Fetching all reservations");
        return reservationRepository.findAll();
    }

    /**
     * Get reservation by ID
     */
    @Transactional(readOnly = true)
    public Optional<Reservation> getReservationById(Long id) {
        logger.debug("Fetching reservation with ID: {}", id);
        return reservationRepository.findById(id);
    }

    /**
     * Get reservations by date
     */
    @Transactional(readOnly = true)
    public List<Reservation> getReservationsByDate(LocalDate date) {
        logger.debug("Fetching reservations by date: {}", date);
        return reservationRepository.findByReservationDate(date);
    }

    /**
     * Get reservations by status
     */
    @Transactional(readOnly = true)
    public List<Reservation> getReservationsByStatus(ReservationStatus status) {
        logger.debug("Fetching reservations by status: {}", status);
        return reservationRepository.findByStatus(status);
    }

    /**
     * Get reservations by table ID
     */
    @Transactional(readOnly = true)
    public List<Reservation> getReservationsByTableId(Long tableId) {
        logger.debug("Fetching reservations by table ID: {}", tableId);
        return reservationRepository.findByTableId(tableId);
    }

    /**
     * Create new reservation
     */
    public Reservation createReservation(Reservation reservation) {
        logger.info("Creating new reservation for customer: {}", reservation.getCustomerName());
        
        validateReservation(reservation);
        reservation.setStatus(ReservationStatus.CONFIRMED);
        
        return reservationRepository.save(reservation);
    }

    /**
     * Update reservation
     */
    public Reservation updateReservation(Long id, Reservation reservationDetails) {
        logger.info("Updating reservation with ID: {}", id);
        
        Reservation existingReservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with ID: " + id));

        existingReservation.setCustomerName(reservationDetails.getCustomerName());
        existingReservation.setCustomerPhone(reservationDetails.getCustomerPhone());
        existingReservation.setCustomerEmail(reservationDetails.getCustomerEmail());
        existingReservation.setPartySize(reservationDetails.getPartySize());
        existingReservation.setReservationDate(reservationDetails.getReservationDate());
        existingReservation.setReservationTime(reservationDetails.getReservationTime());
        existingReservation.setStatus(reservationDetails.getStatus());
        existingReservation.setNotes(reservationDetails.getNotes());

        validateReservation(existingReservation);
        return reservationRepository.save(existingReservation);
    }

    /**
     * Update reservation status
     */
    public Reservation updateReservationStatus(Long id, ReservationStatus status) {
        logger.info("Updating reservation status to {} for reservation ID: {}", status, id);
        
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with ID: " + id));
        
        reservation.setStatus(status);
        return reservationRepository.save(reservation);
    }

    /**
     * Cancel reservation
     */
    public Reservation cancelReservation(Long id) {
        logger.info("Cancelling reservation with ID: {}", id);
        return updateReservationStatus(id, ReservationStatus.CANCELLED);
    }

    /**
     * Complete reservation
     */
    public Reservation completeReservation(Long id) {
        logger.info("Completing reservation with ID: {}", id);
        return updateReservationStatus(id, ReservationStatus.COMPLETED);
    }

    /**
     * Delete reservation
     */
    public void deleteReservation(Long id) {
        logger.info("Deleting reservation with ID: {}", id);
        
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with ID: " + id));
        
        reservationRepository.delete(reservation);
    }

    /**
     * Validate reservation data
     */
    private void validateReservation(Reservation reservation) {
        if (reservation.getCustomerName() == null || reservation.getCustomerName().trim().isEmpty()) {
            throw new IllegalArgumentException("Customer name is required");
        }
        if (reservation.getCustomerPhone() == null || reservation.getCustomerPhone().trim().isEmpty()) {
            throw new IllegalArgumentException("Customer phone is required");
        }
        if (reservation.getPartySize() == null || reservation.getPartySize() <= 0) {
            throw new IllegalArgumentException("Party size must be greater than 0");
        }
        if (reservation.getReservationDate() == null) {
            throw new IllegalArgumentException("Reservation date is required");
        }
        if (reservation.getReservationTime() == null) {
            throw new IllegalArgumentException("Reservation time is required");
        }
        if (reservation.getReservationDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Reservation date cannot be in the past");
        }
    }
}