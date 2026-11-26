export const ROLES = ['owner', 'admin', 'editor', 'reviewer'];

const permissions = {
  owner: new Set(['users:read', 'users:write', 'content:read', 'content:write', 'content:approve', 'audit:read']),
  admin: new Set(['users:read', 'users:write', 'content:read', 'content:write', 'content:approve', 'audit:read']),
  editor: new Set(['content:read', 'content:write']),
  reviewer: new Set(['content:read', 'content:approve', 'audit:read']),
};

export function can(role, permission) {
  return permissions[role]?.has(permission) === true;
}

export function assertRole(role) {
  if (!ROLES.includes(role)) throw new Error('Invalid role');
  return role;
}
