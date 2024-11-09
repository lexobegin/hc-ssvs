import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'tables',
                loadComponent: () => import('./business/table/table.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'rolespermisos',
                loadComponent: () => import('./business/administrativo/rolespermisos/rolpermiso/rolpermiso.component'),
                canActivate: [AuthGuard]
            },
            //USUARIO
            {
                path: 'usuarios',
                loadComponent: () => import('./business/administrativo/usuarios/usuario/usuario.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'usuario/create',
                loadComponent: () => import('./business/administrativo/usuarios/registerusuario/registerusuario.component'),
                canActivate: [AuthGuard]
            },
            
            {
                path: 'medicos',
                loadComponent: () => import('./business/administrativo/medicos/medico/medico.component'),
                canActivate: [AuthGuard]
            }, 
            {
                path: 'especialidades',
                loadComponent: () => import('./business/administrativo/especialidadesmedicas/especialidad/especialidad.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'horarioatencion',
                loadComponent: () => import('./business/administrativo/horarioatencion/horario/horario.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'pacientes',
                loadComponent: () => import('./business/administrativo/pacientes/paciente/paciente.component'),
                canActivate: [AuthGuard]
            },            
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }

        ]
    },
    {
        path: 'login',
        loadComponent: ()=> import('./business/authentication/login/login.component'),
        //path: 'spinner',
        //loadComponent: ()=> import('./shared/components/spinner/spinner.component'),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }

];
