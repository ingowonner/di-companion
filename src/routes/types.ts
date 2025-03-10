import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

export enum Pages {
  Welcome,
  Register,
  CreateStartup,
  Login,
  Logout,
  Exercise,
  Explore,
  ExplorePattern,
  Progress,
  ProgressPattern,
  Dashboard,
  Coach,
  CoachChat,
  Profile,
  UserProfile,
  UserProfileField,
  StartupProfile,
  StartupProfileStep,
  Survey,
  SelfAssessment,
  NotFound,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
};

export type AppRoute = PathRouteProps & PathRouteCustomProps;

export type AppRoutes = Record<Pages, AppRoute>;
export type Routes = Record<Pages, AppRoute | PathRouteProps>;
