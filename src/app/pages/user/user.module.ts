import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { SettingsComponent } from './settings/settings.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProductsComponent } from './products/products.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent,
        children: [
          { path: '', redirectTo: 'products', pathMatch: 'full' },
          {
            path: 'settings',
            component: SettingsComponent,
            title: 'User Settings | Nutripedia',
          },
          {
            path: 'suggestions',
            component: SuggestionsComponent,
            title: 'User Suggestions | Nutripedia',
          },
          {
            path: 'notifications',
            component: NotificationsComponent,
            title: 'User Notifications | Nutripedia',
          },
          {
            path: 'products',
            component: ProductsComponent,
            title: 'User Products | Nutripedia',
          },
          {
            path: 'assistent',
            component: ChatComponent,
            title: 'AI Chat | Nutripedia',
          },
        ],
      },
    ]),
  ],
})
export class UserModule {}
