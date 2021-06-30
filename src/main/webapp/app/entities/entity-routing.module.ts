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
      {
        path: 'student',
        data: { pageTitle: 'Students' },
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
      },
      {
        path: 'degree',
        data: { pageTitle: 'Degrees' },
        loadChildren: () => import('./degree/degree.module').then(m => m.DegreeModule),
      },
      {
        path: 'assessment',
        data: { pageTitle: 'Assessments' },
        loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule),
      },
      {
        path: 'subject',
        data: { pageTitle: 'Subjects' },
        loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule),
      },
      {
        path: 'get',
        data: { pageTitle: 'Gets' },
        loadChildren: () => import('./get/get.module').then(m => m.GetModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
