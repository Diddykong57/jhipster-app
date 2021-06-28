import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'etudiant',
        data: { pageTitle: 'Etudiants' },
        loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule),
      },
      {
        path: 'diplome',
        data: { pageTitle: 'Diplomes' },
        loadChildren: () => import('./diplome/diplome.module').then(m => m.DiplomeModule),
      },
      {
        path: 'controle',
        data: { pageTitle: 'Controles' },
        loadChildren: () => import('./controle/controle.module').then(m => m.ControleModule),
      },
      {
        path: 'matiere',
        data: { pageTitle: 'Matieres' },
        loadChildren: () => import('./matiere/matiere.module').then(m => m.MatiereModule),
      },
      {
        path: 'obtient',
        data: { pageTitle: 'Obtients' },
        loadChildren: () => import('./obtient/obtient.module').then(m => m.ObtientModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
