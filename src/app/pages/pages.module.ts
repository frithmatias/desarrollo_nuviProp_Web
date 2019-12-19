import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// MODULOS DE ANGULAR MATERIAL
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';

// MODULOS PERSONALIZADOS
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

// COMPONENTES
import { BuscarComponent } from './buscar/buscar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { CardsComponent } from './inicio/cards/cards.component';
import { ListComponent } from './inicio/list/list.component';
import { InmobiliariasComponent } from './inmobiliarias/inmobiliarias.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { PropiedadComponent } from './propiedades/propiedad.component';
import { PropiedadVerComponent } from './propiedades/propiedad-ver.component';
import { AccountSettingsComponent } from './settings/settings.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    AccountSettingsComponent,
    ProfileComponent,
    UsuariosComponent,
    PropiedadesComponent,
    PropiedadComponent,
    InmobiliariasComponent,
    BuscarComponent,
    InicioComponent,
    PropiedadVerComponent,
    CardsComponent,
    ListComponent
  ],
  exports: [DashboardComponent],
  imports: [
    PipesModule,
    ComponentsModule,
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule
  ]
})
export class PagesModule { }
