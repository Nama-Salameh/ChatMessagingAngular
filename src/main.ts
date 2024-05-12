import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import firebase from 'firebase/compat/app';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

firebase.initializeApp(environment.firebaseConfig);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
