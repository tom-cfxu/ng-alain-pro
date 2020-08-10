import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { OtherRoutingModule } from './other-routing.module';

import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskComponent } from './task/task.component';
import { ForumComponent } from './forum/forum.component';
import { ForumThreadComponent } from './forum/thread/thread.component';
import { ForumViewComponent } from './forum/view/view.component';
import { EmailComponent } from './email/email.component';
import { EmailSideboxComponent } from './email/sidebox.component';
import { EmailViewComponent } from './email/view/view.component';
import { EmailComposeComponent } from './email/compose/compose.component';
import { ProjectComponent } from './project/project.component';
import { ProjectViewComponent } from './project/view/view.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsViewComponent } from './clients/view/view.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { BillingComponent } from './billing/billing.component';
import { CourseComponent } from './course/course.component';
import { ChatComponent } from './chat/chat.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesEditComponent } from './articles/edit/edit.component';
import { VotingComponent } from './voting/voting.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FAQV1Component } from './faq/v1/v1.component';
import { FAQV2Component } from './faq/v2/v2.component';
import { FAQV3Component } from './faq/v3/v3.component';
import { CalendarBasicComponent } from './calendar/basic/basic.component';
import { CalendarListViewComponent } from './calendar/list-view/list-view.component';
import { CalendarEventsComponent } from './calendar/events/events.component';

const COMPONENTS = [
  KanbanBoardComponent,
  TaskComponent,
  ForumComponent,
  ForumThreadComponent,
  ForumViewComponent,
  EmailComponent,
  EmailViewComponent,
  EmailComposeComponent,
  ProjectComponent,
  ProjectViewComponent,
  ClientsComponent,
  ContactComponent,
  PricingComponent,
  BillingComponent,
  CourseComponent,
  ChatComponent,
  GalleryComponent,
  ArticlesComponent,
  VotingComponent,
  InvoiceComponent,
  FAQV1Component,
  FAQV2Component,
  FAQV3Component,
  CalendarBasicComponent,
  CalendarListViewComponent,
  CalendarEventsComponent,
];

const COMPONENTS_NOROUNT = [
  EmailSideboxComponent,
  ClientsViewComponent,
  ArticlesEditComponent,
];

@NgModule({
  imports: [SharedModule, OtherRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class OtherModule {}
