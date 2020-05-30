export const PROJECT_LIST_URL = 'http://localhost:8080/projects/';
export const USER_LIST_URL = 'http://localhost:8080/users/';

// Project form limits
export const MAX_USER_LENGTH = 100;
export const MAX_PROJECT_LENGTH = 100;
export const MAX_BLURB_LENGTH = 125;

// Project form limits
export const MAX_NAME_LENGTH = 30;
export const MAX_USER_FIELD_LENGTH = 200;
export const MAX_BIO_LENGTH = 300;

// Authentication
export const ACCESS_TOKEN_REFRESH_RATE = 1000 * 60 * 4.5;
export const LOCAL_STORAGE_USER_KEY = 'Projector-User';
export const OAUTH_REFRESH_URL = 'http://localhost:8080/api/token/refresh/';
export const SERVER_GOOGLE_OAUTH_URL = 'http://localhost:8080/social/google-oauth2/';
export const GOOGLE_CLIENT_ID = '701132387789-6s24lbf37aidsjmpqn04m1vfivpdp9rl.apps.googleusercontent.com';

// Project join system codes
export const JOIN_REQUEST_CODE = "Join Request";
export const CANCEL_JOIN_CODE = "Cancel Request";
export const ACCEPT_JOIN_CODE = "Accept";

// Project category codes
export const CATEGORIES = {
  "GEN": {
    expanded: "General",
    color: "secondary"
  },
  "TEC": {
    expanded: "Technology",
    color: "info"
  },
  "SVC": {
    expanded: "Service",
    color: "danger"
  },
  "MED": {
    expanded: "Media",
    color: "warning"
  },
  "GAM": {
    expanded: "Games",
    color: "success"
  }
};
