export * from "./types";
export { FULLTIME_CONFIG } from "./fulltime.config";
export { PARTTIME_CONFIG } from "./parttime.config";

import { FULLTIME_CONFIG } from "./fulltime.config";
import { PARTTIME_CONFIG } from "./parttime.config";
import type { RoleType, FacultyConfig } from "./types";

// Helper để lấy config theo role
export function getConfigByRole(role: RoleType): FacultyConfig {
  return role === "fulltime" ? FULLTIME_CONFIG : PARTTIME_CONFIG;
}
