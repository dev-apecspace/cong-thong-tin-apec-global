-- SQL Script: Update existing user table with permissions
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{
    "config": {"view": true, "edit": false},
    "modules": {"view": true, "create": false, "edit": false, "delete": false},
    "projects": {"view": true, "create": false, "edit": false, "delete": false},
    "blocks": {"view": true, "create": false, "edit": false, "delete": false},
    "partners": {"view": true, "create": false, "edit": false, "delete": false},
    "users": {"view": false, "manage": false}
}';

ALTER TABLE "user" ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Cập nhật quyền cho admin hiện tại
UPDATE "user" SET permissions = '{
    "config": {"view": true, "edit": true},
    "modules": {"view": true, "create": true, "edit": true, "delete": true},
    "projects": {"view": true, "create": true, "edit": true, "delete": true},
    "blocks": {"view": true, "create": true, "edit": true, "delete": true},
    "partners": {"view": true, "create": true, "edit": true, "delete": true},
    "users": {"view": true, "manage": true}
}' WHERE role = 'admin';
