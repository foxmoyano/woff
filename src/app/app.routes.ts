import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./layout/home/home.component')
        //canActivate: [privilegeCoordinatorGuard] 
    },
    { 
        path: 'search/:text', 
        loadComponent: () => import('./pages/search/search.component')
        //canActivate: [privilegeCoordinatorGuard] 
    },
    { 
        path: 'movie/:id', 
        loadComponent: () => import('./pages/movie/movie.component')
        //canActivate: [privilegeCoordinatorGuard] 
    }
];
