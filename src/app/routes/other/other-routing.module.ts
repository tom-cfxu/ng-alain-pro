import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskComponent } from './task/task.component';
import { ForumComponent } from './forum/forum.component';
import { ForumThreadComponent } from './forum/thread/thread.component';
import { ForumViewComponent } from './forum/view/view.component';
import { EmailComponent } from './email/email.component';
import { EmailViewComponent } from './email/view/view.component';
import { EmailComposeComponent } from './email/compose/compose.component';
import { ProjectComponent } from './project/project.component';
import { ProjectViewComponent } from './project/view/view.component';
import { ClientsComponent } from './clients/clients.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { BillingComponent } from './billing/billing.component';
import { CourseComponent } from './course/course.component';
import { ChatComponent } from './chat/chat.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ArticlesComponent } from './articles/articles.component';
import { VotingComponent } from './voting/voting.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FAQV1Component } from './faq/v1/v1.component';
import { FAQV2Component } from './faq/v2/v2.component';
import { FAQV3Component } from './faq/v3/v3.component';
import { CalendarBasicComponent } from './calendar/basic/basic.component';
import { CalendarListViewComponent } from './calendar/list-view/list-view.component';
import { CalendarEventsComponent } from './calendar/events/events.component';

const routes: Routes = [
  { path: 'kanban-board', component: KanbanBoardComponent },
  { path: 'task', component: TaskComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/thread/:id', component: ForumThreadComponent },
  { path: 'forum/:id', component: ForumViewComponent },
  { path: 'email', component: EmailComponent, data: { reuse: true, keepingScroll: true } },
  { path: 'email/compose', component: EmailComposeComponent },
  { path: 'email/:id', component: EmailViewComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'project/:id', component: ProjectViewComponent },
  { path: 'client', component: ClientsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'course', component: CourseComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'article', component: ArticlesComponent },
  { path: 'voting', component: VotingComponent },
  { path: 'invoice', component: InvoiceComponent },
  {
    path: 'faq',
    children: [
      { path: 'v1', component: FAQV1Component },
      { path: 'v2', component: FAQV2Component },
      { path: 'v3', component: FAQV3Component },
    ],
  },
  {
    path: 'calendar',
    children: [
      { path: 'basic', component: CalendarBasicComponent },
      { path: 'list', component: CalendarListViewComponent },
      { path: 'events', component: CalendarEventsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherRoutingModule {}
