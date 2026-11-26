-- See root migration for the SECURITY DEFINER user-management functions.
CREATE OR REPLACE FUNCTION cms_create_admin(p_email text, p_password_hash text, p_role text, p_actor_id integer)
RETURNS TABLE(id integer, email text, role text, is_active boolean, created_at timestamptz)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_catalog AS $$
BEGIN
  IF p_role NOT IN ('admin','editor','reviewer') THEN RAISE EXCEPTION 'Invalid role' USING ERRCODE = '22023'; END IF;
  INSERT INTO admin_users(email,password_hash,role) VALUES(lower(trim(p_email)),p_password_hash,p_role)
    RETURNING admin_users.id,admin_users.email,admin_users.role,admin_users.is_active,admin_users.created_at
    INTO cms_create_admin.id,cms_create_admin.email,cms_create_admin.role,cms_create_admin.is_active,cms_create_admin.created_at;
  INSERT INTO admin_audit_log(actor_id,action,resource,resource_id) VALUES(p_actor_id,'create','admin_users',cms_create_admin.id);
  RETURN NEXT;
END $$;
CREATE OR REPLACE FUNCTION cms_update_admin(p_target_id integer, p_role text, p_is_active boolean, p_actor_id integer)
RETURNS TABLE(id integer, email text, role text, is_active boolean) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_catalog AS $$
BEGIN
  IF p_role IS NOT NULL AND p_role NOT IN ('owner','admin','editor','reviewer') THEN RAISE EXCEPTION 'Invalid role' USING ERRCODE = '22023'; END IF;
  UPDATE admin_users SET role=COALESCE(p_role,admin_users.role),is_active=COALESCE(p_is_active,admin_users.is_active) WHERE admin_users.id=p_target_id RETURNING admin_users.id,admin_users.email,admin_users.role,admin_users.is_active INTO cms_update_admin.id,cms_update_admin.email,cms_update_admin.role,cms_update_admin.is_active;
  IF NOT FOUND THEN RAISE EXCEPTION 'User not found' USING ERRCODE = 'P0002'; END IF;
  IF p_is_active = false THEN DELETE FROM admin_sessions WHERE user_id=p_target_id; END IF;
  INSERT INTO admin_audit_log(actor_id,action,resource,resource_id) VALUES(p_actor_id,'update','admin_users',p_target_id);
  RETURN NEXT;
END $$;
CREATE OR REPLACE FUNCTION cms_reset_admin_password(p_target_id integer, p_password_hash text, p_actor_id integer)
RETURNS TABLE(id integer, email text) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_catalog AS $$
BEGIN
  UPDATE admin_users SET password_hash=p_password_hash,password_reset_at=now() WHERE admin_users.id=p_target_id RETURNING admin_users.id,admin_users.email INTO cms_reset_admin_password.id,cms_reset_admin_password.email;
  IF NOT FOUND THEN RAISE EXCEPTION 'User not found' USING ERRCODE = 'P0002'; END IF;
  DELETE FROM admin_sessions WHERE user_id=p_target_id;
  INSERT INTO admin_audit_log(actor_id,action,resource,resource_id) VALUES(p_actor_id,'reset-password','admin_users',p_target_id);
  RETURN NEXT;
END $$;
REVOKE ALL ON FUNCTION cms_create_admin(text,text,text,integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION cms_update_admin(integer,text,boolean,integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION cms_reset_admin_password(integer,text,integer) FROM PUBLIC;
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname='website_runtime') THEN
    GRANT EXECUTE ON FUNCTION cms_create_admin(text,text,text,integer) TO website_runtime;
    GRANT EXECUTE ON FUNCTION cms_update_admin(integer,text,boolean,integer) TO website_runtime;
    GRANT EXECUTE ON FUNCTION cms_reset_admin_password(integer,text,integer) TO website_runtime;
  END IF;
END $$;
