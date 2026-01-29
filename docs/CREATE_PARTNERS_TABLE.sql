-- SQL Script: Create Partners Table
-- Chạy script này trong Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    logo VARCHAR(500),
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
-- INSERT INTO public.partners (name, title, logo, description, display_order, is_visible) VALUES
-- ('Partner A', 'Tiêu đề A', 'https://example.com/logo-a.png', 'Mô tả đối tác A', 1, true),
-- ('Partner B', 'Tiêu đề B', 'https://example.com/logo-b.png', 'Mô tả đối tác B', 2, true);
