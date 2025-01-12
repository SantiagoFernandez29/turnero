import { lazy } from 'react';
import { Loader } from '../../shared/layout/Loader';


export const BackofficeHomeView = Loader(lazy(() => import('../views/BackofficeHomeView')))