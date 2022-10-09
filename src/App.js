import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Checkbox, Form } from 'semantic-ui-react';
import { Html } from './Html';
import { Spinner } from './Spinner';
import { Layout } from './Layout';
import { NavBar } from './NavBar';


const Comments = lazy(() => import('./Comments'));
const Sidebar = lazy(() => import('./Sidebar'));
const Post = lazy(() => import('./Post'));

export const App = ({assets}) => {
	return (
		<Html title="React SSR Breakthrough" assets={assets}>
			<Suspense fallback={<Spinner/>}>
				<ErrorBoundary FallbackComponent={Error}>
					<Content/>
				</ErrorBoundary>
			</Suspense>
		</Html>
	);
}
const Content = () => {
	return (
		<Layout>
			<NavBar/>
			<aside className="sidebar">
				<Suspense fallback={<Spinner/>}>
					<Sidebar/>
				</Suspense>
			</aside>
			<article className="post">
				<Suspense fallback={<Spinner/>}>
					<Post/>
				</Suspense>
				<section className="comments">
					<h2>Comments</h2>
					<Suspense fallback={<Spinner/>}>
						<Comments/>
					</Suspense>
				</section>
				<h2>Thanks for reading!</h2>
			</article>
			<Form>
				<Form.Field>
					<label>First Name</label>
					<input type="text" placeholder="First Name"/>
				</Form.Field>
				<Form.Field>
					<label>Last Name</label>
					<input type="text" placeholder="Last Name"/>
				</Form.Field>
				<Form.Field>
					<Checkbox label="I agree to the Terms and Conditions"/>
				</Form.Field>
				<Form.Field>
					<label>Date</label>
					<input type="date"/>
				</Form.Field>
			</Form>
	</Layout>
	);
}
const Error = (props) => {
	return (
		<div>
			<h1>Application Error</h1>
			<pre style={{whiteSpace: 'pre-wrap'}}>{props.stack}</pre>
		</div>
	);
}
