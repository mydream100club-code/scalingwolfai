export type UserRole = 'admin' | 'closer' | 'setter' | 'user';

export interface Permission {
  dashboard: boolean;
  leads: boolean;
  sales: boolean;
  documents: boolean;
  finances: boolean;
  reports: boolean;
  settings: boolean;
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
  },
  closer: {
    dashboard: true,
    leads: true,
    sales: true,
    documents: true,
    finances: false,
    reports: true,
    settings: false,
  },
  setter: {
    dashboard: true,
    leads: true,
    sales: false,
    documents: false,
    finances: false,
    reports: true,
    settings: false,
  },
  user: {
    dashboard: true,
    leads: false,
    sales: false,
    documents: false,
    finances: false,
    reports: false,
    settings: false,
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
    };
  }
  return ROLE_PERMISSIONS[role];
};

export const hasPermission = (
  role: UserRole | undefined,
  section: keyof Permission
): boolean => {
  if (!role) return false;
  const permissions = getUserPermissions(role);
  return permissions[section];
};

export const canAccessSection = (
  role: UserRole | undefined,
  section: keyof Permission
): boolean => {
  return hasPermission(role, section);
};
