INSERT INTO public.user_roles (user_id, role)
VALUES ('a20ccd8d-c6b5-40d3-954d-e7a85c1ef8ca', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;