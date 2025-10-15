export type UserRole = 'admin' | 'closer' | 'setter' | 'user';

export interface Permission {
  dashboard: boolean;
  leads: boolean;
  sales: boolean;
  documents: boolean;
  finances: boolean;
  reports: boolean;
  settings: boolean;
  operations: boolean;
}

const ROLE_PERMISSIONS: Record<UserRole, Permission> = {
  admin: {
    dashboard: true,
    leads: true,
    sales: true,
    documents: true,
    finances: true,
    reports: true,
    settings: true,
    operations: true,
  },
  closer: {
    dashboard: true,
    leads: true,
    sales: true,
    documents: true,
    finances: false,
    reports: true,
    settings: false,
    operations: false,
  },
  setter: {
    dashboard: true,
    leads: true,
    sales: false,
    documents: false,
    finances: false,
    reports: true,
    settings: false,
    operations: false,
  },
  user: {
    dashboard: true,
    leads: false,
    sales: false,
    documents: false,
    finances: false,
    reports: false,
    settings: false,
    operations: false,
  },
};

export const getUserPermissions = (role: UserRole | undefined): Permission => {
  if (!role) {
    return {
      dashboard: false,
      leads: false,
      sales: false,
      documents: false,
      finances: false,
      reports: false,
      settings: false,
      operations: false,
    };
  }

  // Normalize role to lowercase for case-insensitive matching
  const normalizedRole = role.toLowerCase() as UserRole;

  // Ensure the role exists in ROLE_PERMISSIONS
  const permissions = ROLE_PERMISSIONS[normalizedRole];
  if (!permissions) {
    console.warn(`Unknown role: ${role}. Defaulting to no permissions.`);
    return {
      dashboard: false,
      leads: false,
      sales: false,
      documents: false,
      finances: false,
      reports: false,
      settings: false,
      operations: false,
    };
  }

  return permissions;
};

export const hasPermission = (
  role: UserRole | undefined,
  section: keyof Permission
): boolean => {
  if (!role) return false;
  const permissions = getUserPermissions(role);
  if (!permissions) return false;
  return permissions[section] || false;
};

export const canAccessSection = (
  role: UserRole | undefined,
  section: keyof Permission
): boolean => {
  return hasPermission(role, section);
};
