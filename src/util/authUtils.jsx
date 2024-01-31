export class Role {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
  hasPermission(minRole) {
    if (typeof(minRole) === "string") {
      minRole = getRole(minRole);
    } else if (!(minRole instanceof Role)) {
      throw new Error("Unknown role: " + minRole);
    }
    return this.level >= minRole.level;
  }
}

export const ROLE_GUEST = new Role("GUEST", 1);
export const ROLE_MEMBER = new Role("MEMBER", 2);
export const ROLE_EDITOR = new Role("EDITOR", 3);
export const ROLE_MODERATOR = new Role("NODERATOR", 4);
export const ROLE_ADMIN = new Role("ADMIN", 5);
export const ROLE_SUPERUSER = new Role("SUPERUSER", 6);

const ROLES = [
  ROLE_GUEST,
  ROLE_MEMBER,
  ROLE_EDITOR,
  ROLE_MODERATOR,
  ROLE_ADMIN,
  ROLE_SUPERUSER
];
const ROLES_MAP = {};
for (let i = 0; i < ROLES.length; i++) {
  const role = ROLES[i];
  ROLES_MAP[role.name] = role;
}

export function getRole(role) {
  if (role instanceof Role) {
    return role;
  }
  return ROLES_MAP[role];
}

export function hasPermission(currentRole, minRole) {
  currentRole = getRole(currentRole);
  minRole = getRole(minRole);
  if (!currentRole || !minRole) {
    return false;
  }
  return currentRole.hasPermission(minRole);
}