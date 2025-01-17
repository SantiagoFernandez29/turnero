import { lazy } from 'react';
import { Loader } from '../../shared/layout/Loader';

export const SetBoxView = Loader(lazy(() => import('../views/SetBoxView')))
export const BackofficeHomeView = Loader(lazy(() => import('../views/BackofficeHomeView')))