package com.restaurant.management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Database configuration for Restaurant Management System
 * Configures JPA repositories, auditing, and transaction management
 */
@Configuration
@EnableJpaRepositories(basePackages = "com.restaurant.management.repository")
@EnableJpaAuditing
@EnableTransactionManagement
public class DatabaseConfig {

    /**
     * Primary DataSource configuration
     * Uses HikariCP connection pool by default in Spring Boot
     */
    @Bean
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
}