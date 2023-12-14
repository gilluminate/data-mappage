/// <reference types="react-scripts" />
export interface System {
  description: string;
  fides_key: string;
  name: string;
  privacy_declarations?: (PrivacyDeclarationsEntity | null)[] | null;
  system_dependencies?: (string | null)[] | null;
  system_type: string;
}
export interface PrivacyDeclarationsEntity {
  data_categories?: (string)[] | null;
  data_subjects?: (string)[] | null;
  data_use: string;
  name: string;
}
