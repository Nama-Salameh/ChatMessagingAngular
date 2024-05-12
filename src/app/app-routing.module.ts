import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSelectorComponent } from './admin-selector/admin-selector.component';
import { ConversationComponent } from './conversation/conversation.component';

const routes: Routes = [
  { path: '', component: AdminSelectorComponent },
  { path: 'conversation', component: ConversationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
