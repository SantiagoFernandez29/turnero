import { lazy } from 'react';
import { Loader } from '../../shared/layout/Loader';

export const MonitorHomeView = Loader(lazy(() => import('../views/MonitorHomeView')))