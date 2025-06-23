-- Seed data for Restaurant Management System

-- Insert roles
INSERT INTO roles (name) VALUES 
    ('ROLE_ADMIN'),
    ('ROLE_MANAGER'),
    ('ROLE_STAFF')
ON CONFLICT (name) DO NOTHING;

-- Insert sample restaurant tables
INSERT INTO restaurant_tables (table_number, capacity, status, location) VALUES
    (1, 2, 'AVAILABLE', 'Window Section'),
    (2, 2, 'AVAILABLE', 'Window Section'),
    (3, 4, 'AVAILABLE', 'Main Dining'),
    (4, 4, 'OCCUPIED', 'Main Dining'),
    (5, 6, 'AVAILABLE', 'Main Dining'),
    (6, 6, 'RESERVED', 'Main Dining'),
    (7, 2, 'AVAILABLE', 'Bar Area'),
    (8, 2, 'AVAILABLE', 'Bar Area'),
    (9, 8, 'AVAILABLE', 'Private Section'),
    (10, 8, 'AVAILABLE', 'Private Section'),
    (11, 4, 'AVAILABLE', 'Patio'),
    (12, 4, 'AVAILABLE', 'Patio'),
    (13, 2, 'MAINTENANCE', 'Window Section'),
    (14, 4, 'AVAILABLE', 'Main Dining'),
    (15, 6, 'AVAILABLE', 'Main Dining')
ON CONFLICT (table_number) DO NOTHING;

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, is_available) VALUES
    -- Appetizers
    ('Caesar Salad', 'Fresh romaine lettuce with parmesan cheese and croutons', 12.99, 'Appetizers', true),
    ('Buffalo Wings', 'Spicy chicken wings served with blue cheese dip', 14.99, 'Appetizers', true),
    ('Mozzarella Sticks', 'Crispy breaded mozzarella with marinara sauce', 9.99, 'Appetizers', true),
    ('Calamari Rings', 'Golden fried squid rings with spicy aioli', 13.99, 'Appetizers', true),
    
    -- Main Courses
    ('Grilled Salmon', 'Atlantic salmon with lemon herb butter and vegetables', 24.99, 'Main Courses', true),
    ('Beef Burger', 'Angus beef patty with lettuce, tomato, and fries', 16.99, 'Main Courses', true),
    ('Chicken Parmesan', 'Breaded chicken breast with marinara and mozzarella', 19.99, 'Main Courses', true),
    ('Pasta Carbonara', 'Creamy pasta with bacon, eggs, and parmesan', 17.99, 'Main Courses', true),
    ('Ribeye Steak', '12oz ribeye steak with garlic mashed potatoes', 32.99, 'Main Courses', true),
    ('Fish Tacos', 'Grilled fish with cabbage slaw and chipotle mayo', 15.99, 'Main Courses', true),
    
    -- Desserts
    ('Chocolate Cake', 'Rich chocolate layer cake with vanilla ice cream', 8.99, 'Desserts', true),
    ('Tiramisu', 'Classic Italian dessert with coffee and mascarpone', 9.99, 'Desserts', true),
    ('Cheesecake', 'New York style cheesecake with berry compote', 8.99, 'Desserts', true),
    
    -- Beverages
    ('Coffee', 'Freshly brewed coffee', 3.99, 'Beverages', true),
    ('Soft Drinks', 'Coca-Cola, Pepsi, Sprite, Orange', 2.99, 'Beverages', true),
    ('Fresh Juice', 'Orange, Apple, Cranberry', 4.99, 'Beverages', true),
    ('Wine Glass', 'House red or white wine', 8.99, 'Beverages', true),
    ('Beer', 'Domestic and imported beers', 5.99, 'Beverages', true)
ON CONFLICT DO NOTHING;

-- Insert sample reservations
INSERT INTO reservations (table_id, customer_name, customer_phone, customer_email, party_size, reservation_date, reservation_time, status, notes) VALUES
    (6, 'John Smith', '555-0123', 'john.smith@email.com', 4, CURRENT_DATE + INTERVAL '1 day', '19:00:00', 'CONFIRMED', 'Anniversary dinner'),
    (9, 'Sarah Johnson', '555-0456', 'sarah.j@email.com', 6, CURRENT_DATE + INTERVAL '2 days', '18:30:00', 'CONFIRMED', 'Birthday celebration'),
    (3, 'Mike Wilson', '555-0789', 'mike.w@email.com', 4, CURRENT_DATE, '20:00:00', 'CONFIRMED', 'Business dinner'),
    (11, 'Emily Davis', '555-0321', 'emily.d@email.com', 2, CURRENT_DATE + INTERVAL '3 days', '19:30:00', 'CONFIRMED', 'Date night'),
    (5, 'Robert Brown', '555-0654', 'robert.b@email.com', 6, CURRENT_DATE + INTERVAL '1 day', '18:00:00', 'CONFIRMED', 'Family dinner')
ON CONFLICT DO NOTHING;