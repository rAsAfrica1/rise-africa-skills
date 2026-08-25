-- Rise Africa Skills: LAYER 5 - RESOURCES (All 46 Courses)
-- CORRECTED: Using table name 'resources' (not seed_resources)
-- 7 resources per course: suppliers and tools
-- =================================================================================

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('agro-forestry', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('agro-forestry', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('agro-forestry', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('agro-forestry', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('agro-forestry', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('agro-forestry', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('agro-forestry', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('bakery', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('bakery', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('bakery', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('bakery', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('bakery', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('bakery', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('bakery', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('honey-production', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('honey-production', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('honey-production', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('honey-production', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('honey-production', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('honey-production', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('honey-production', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('dairy-products', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('dairy-products', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('dairy-products', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('dairy-products', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('dairy-products', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('dairy-products', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('dairy-products', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('vegetable-farming', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('vegetable-farming', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('vegetable-farming', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('vegetable-farming', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('vegetable-farming', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('vegetable-farming', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('vegetable-farming', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('fish-farming', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('fish-farming', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('fish-farming', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('fish-farming', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('fish-farming', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('fish-farming', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('fish-farming', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('mushroom-farming', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('mushroom-farming', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('mushroom-farming', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('mushroom-farming', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('mushroom-farming', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('mushroom-farming', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('mushroom-farming', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('egg-production', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('egg-production', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('egg-production', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('egg-production', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('egg-production', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('egg-production', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('egg-production', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('poultry-farming', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('poultry-farming', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('poultry-farming', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('poultry-farming', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('poultry-farming', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('poultry-farming', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('poultry-farming', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cassava-processing', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cassava-processing', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cassava-processing', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cassava-processing', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cassava-processing', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cassava-processing', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cassava-processing', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('spice-blending', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('spice-blending', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('spice-blending', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('spice-blending', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('spice-blending', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('spice-blending', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('spice-blending', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('juice-production', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('juice-production', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('juice-production', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('juice-production', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('juice-production', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('juice-production', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('juice-production', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('maize-milling', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('maize-milling', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('maize-milling', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('maize-milling', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('maize-milling', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('maize-milling', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('maize-milling', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('palm-oil-processing', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('palm-oil-processing', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('palm-oil-processing', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('palm-oil-processing', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('palm-oil-processing', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('palm-oil-processing', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('palm-oil-processing', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('jewelry', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('jewelry', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('jewelry', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('jewelry', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('jewelry', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('jewelry', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('jewelry', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('basket-weaving', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('basket-weaving', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('basket-weaving', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('basket-weaving', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('basket-weaving', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('basket-weaving', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('basket-weaving', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('pottery', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('pottery', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('pottery', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('pottery', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('pottery', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('pottery', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('pottery', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tie-dye', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tie-dye', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tie-dye', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tie-dye', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tie-dye', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tie-dye', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tie-dye', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('leather-work', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('leather-work', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('leather-work', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('leather-work', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('leather-work', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('leather-work', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('leather-work', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('wood-carving', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('wood-carving', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('wood-carving', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('wood-carving', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('wood-carving', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('wood-carving', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('wood-carving', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('soap-making', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('soap-making', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('soap-making', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('soap-making', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('soap-making', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('soap-making', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('soap-making', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('candle-making', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('candle-making', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('candle-making', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('candle-making', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('candle-making', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('candle-making', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('candle-making', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('essential-oils', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('essential-oils', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('essential-oils', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('essential-oils', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('essential-oils', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('essential-oils', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('essential-oils', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beadwork', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beadwork', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beadwork', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beadwork', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beadwork', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beadwork', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beadwork', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('textile-weaving', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('textile-weaving', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('textile-weaving', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('textile-weaving', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('textile-weaving', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('textile-weaving', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('textile-weaving', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('batik', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('batik', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('batik', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('batik', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('batik', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('batik', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('batik', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('appliance-repair', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('appliance-repair', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('appliance-repair', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('appliance-repair', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('appliance-repair', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('appliance-repair', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('appliance-repair', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-repair', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-repair', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-repair', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-repair', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-repair', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-repair', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-repair', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tailoring', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tailoring', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tailoring', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tailoring', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tailoring', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tailoring', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('tailoring', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('hairdressing', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('hairdressing', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('hairdressing', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('hairdressing', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('hairdressing', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('hairdressing', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('hairdressing', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beauty-services', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beauty-services', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beauty-services', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beauty-services', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beauty-services', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beauty-services', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beauty-services', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cleaning-services', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cleaning-services', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cleaning-services', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cleaning-services', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cleaning-services', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cleaning-services', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('cleaning-services', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('plumbing', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('plumbing', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('plumbing', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('plumbing', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('plumbing', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('plumbing', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('plumbing', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electrical-work', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electrical-work', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electrical-work', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electrical-work', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electrical-work', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electrical-work', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electrical-work', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('shoe-repair', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('shoe-repair', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('shoe-repair', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('shoe-repair', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('shoe-repair', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('shoe-repair', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('shoe-repair', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('watch-repair', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('watch-repair', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('watch-repair', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('watch-repair', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('watch-repair', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('watch-repair', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('watch-repair', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('furniture-repair', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('furniture-repair', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('furniture-repair', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('furniture-repair', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('furniture-repair', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('furniture-repair', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('furniture-repair', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('motorcycle-repair', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('motorcycle-repair', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('motorcycle-repair', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('motorcycle-repair', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('motorcycle-repair', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('motorcycle-repair', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('motorcycle-repair', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('retail-shop', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('retail-shop', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('retail-shop', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('retail-shop', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('retail-shop', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('retail-shop', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('retail-shop', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-reselling', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-reselling', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-reselling', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-reselling', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-reselling', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-reselling', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('phone-reselling', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('market-stall', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('market-stall', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('market-stall', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('market-stall', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('market-stall', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('market-stall', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('market-stall', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('general-store', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('general-store', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('general-store', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('general-store', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('general-store', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('general-store', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('general-store', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electronics-retail', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electronics-retail', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electronics-retail', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electronics-retail', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electronics-retail', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electronics-retail', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('electronics-retail', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('clothing-retail', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('clothing-retail', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('clothing-retail', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('clothing-retail', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('clothing-retail', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('clothing-retail', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('clothing-retail', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beverage-production', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beverage-production', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beverage-production', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beverage-production', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beverage-production', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beverage-production', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('beverage-production', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('confectionery', 'Supplier', 'Primary Raw Materials Supplier', 'Local Agricultural Cooperative', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Bulk discount available', 7, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('confectionery', 'Supplier', 'Packaging Materials', 'Regional Packaging Distributor', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '20ksh per unit', 8, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('confectionery', 'Equipment', 'Production Equipment', 'Industrial Equipment Rental', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh per month', 9, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('confectionery', 'Tool', 'Quality Testing Kit', 'Food Safety Institute', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '2000ksh one-time', 10, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('confectionery', 'Service', 'Business Registration', 'County Government', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, '500ksh registration fee', 11, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('confectionery', 'Training', 'Business Skills Training', 'Local NGO Partners', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Free or minimal cost', 12, 5, 'Available', 'Essential resource for course - verify availability before purchasing');

INSERT INTO resources (course_id, resource_type, resource_name, supplier_name, contact_info, pricing_estimate, estimated_delivery_days, quality_rating, availability_status, notes)
VALUES ('confectionery', 'Market', 'Distribution Channel', 'Local Marketplace', '{"phone": "+254700000000", "email": "supplier@example.com", "location": "Nairobi"}'::jsonb, 'Market stall rent 1000ksh/month', 13, 4, 'Available', 'Essential resource for course - verify availability before purchasing');

COMMIT;
