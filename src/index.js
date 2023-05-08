import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RoutesConfig } from './RoutesConfig';

hydrateRoot(document, (
  <BrowserRouter>
	<RoutesConfig />
  </BrowserRouter>
));
