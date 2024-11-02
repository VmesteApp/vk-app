import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";

export const DEFAULT_VIEW = "default_view";

export const DEFAULT_VIEW_PANELS = {
  FEED: "feed",
  MY_PULSES: "my-pulses",
  CREATE_PULSE: "create-pulse",
  PROFILE: "profile",
  NOTIFICATIONS: "notifications",
  CHANGE_LANGUAGE: "change-language",
  ABOUT_APP: "about-app",
  PULSE_PREVIEW: "pulse-preview",
  PARTICIPANT_PULSE: "participant-pulse",
  ADMIN_PULSE: "admin-pulse",
  ADMIN_PULSE_APPLICATIONS: "admin-pulse-applications",
  ADMIN_PULSE_TEAM: "admin-pulse-team",
  ADMIN_PULSE_SETTINGS: "admin-pulse-settings",
  CREATE_COMPLAINT: "create-complaint",
} as const;

export const PANELS_WITHOUT_TABBAR = [
  DEFAULT_VIEW_PANELS.PULSE_PREVIEW,
  DEFAULT_VIEW_PANELS.CREATE_PULSE,
  DEFAULT_VIEW_PANELS.CHANGE_LANGUAGE,
] as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.FEED, "/", []),
      createPanel(DEFAULT_VIEW_PANELS.PROFILE, `/profile`, []),
      createPanel(DEFAULT_VIEW_PANELS.NOTIFICATIONS, `/notifications`, []),
      createPanel(DEFAULT_VIEW_PANELS.PARTICIPANT_PULSE, `/pulse/:id`, []),
      createPanel(DEFAULT_VIEW_PANELS.ADMIN_PULSE, `/pulse/admin/:id`, []),
      createPanel(DEFAULT_VIEW_PANELS.PULSE_PREVIEW, `/pulse/preview/:id`, []),
      createPanel(DEFAULT_VIEW_PANELS.CREATE_PULSE, `/pulse/create`, []),
      createPanel(DEFAULT_VIEW_PANELS.MY_PULSES, `/my-pulses`, []),
      createPanel(DEFAULT_VIEW_PANELS.CHANGE_LANGUAGE, `/change-language`, []),
      createPanel(DEFAULT_VIEW_PANELS.ABOUT_APP, `/about-app`, []),
      createPanel(
        DEFAULT_VIEW_PANELS.ADMIN_PULSE_APPLICATIONS,
        `/pulse/admin/:id/applications`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.ADMIN_PULSE_SETTINGS,
        `/pulse/admin/:id/settings`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.ADMIN_PULSE_TEAM,
        `/pulse/admin/:id/team`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.CREATE_COMPLAINT,
        "/pulse/:id/complaint",
        []
      ),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
