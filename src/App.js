import { lazy, Suspense, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as StartActions from './actions/StartActions';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import moment from 'moment';
import { Html } from './Html';
import { Spinner } from './Spinner';
import { Layout } from './Layout';
import { NavBar } from './NavBar';
import { DataProvider } from './data';
import { IMaskInput } from 'react-imask';

const Comments = lazy(() => import('./Comments'));
const Sidebar = lazy(() => import('./Sidebar'));
const Post = lazy(() => import('./Post'));
const momentFormat = 'HH:mm:ss';

const mapStateToProps = state => ({
  startStates: state.appStart,
});

const mapDispatchToProps = dispatch => ({
  startActions: bindActionCreators(StartActions, dispatch),
});

const  App = ({ assets, startActions }) => {
  return (
	<Html title="React SSR Breakthrough" assets={assets}>
	  <Suspense fallback={<Spinner />}>
		<ErrorBoundary FallbackComponent={Error}>
		  <Content />
		</ErrorBoundary>
	  </Suspense>
	  <Button type="button" onClick={startActions.appStart} content={'Отправить действие'} />
	</Html>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

const Content = (props) => {
  const [currentEmail, setEmail] = useState('');
  const [currentTime, setTime] = useState('10:00:00');
  const patternEmail = /[a-z0-9]@[a-z0-9].[a-z]/ig;
  const validEmail = () => (currentEmail === '') ? false : !patternEmail.test(currentEmail);
  const myData = new Map();
  myData.set(myData.size, '11111111111111');
  myData.set(myData.size, '22222222222222');
  myData.set(myData.size, '33333333333333');
  return (
	<DataProvider data={'Test Context'} children={props.children}>
	  <Layout>
		<NavBar />
		<aside className="sidebar">
		  <Suspense fallback={<Spinner />}>
			<Sidebar />
		  </Suspense>
		</aside>
		<article className="post">
		  <Suspense fallback={<Spinner />}>
			<Post />
		  </Suspense>
		  <section className="comments">
			<h2>Comments</h2>
			<Suspense fallback={<Spinner />}>
			  <Comments />
			</Suspense>
		  </section>
		  <h2>Thanks for reading!</h2>
		</article>
		<ul>
		  {[...myData].map(([key, value]) => (<li key={key}>{value}</li>))}
		</ul>
		<Form>
		  <Form.Field>
			<label>First Name</label>
			<input type="text" placeholder="First Name" />
		  </Form.Field>
		  <Form.Field>
			<label>Last Name</label>
			<input type="text" placeholder="Last Name" />
		  </Form.Field>
		  <Form.Field>
			<Checkbox label="I agree to the Terms and Conditions" />
		  </Form.Field>
		  <Form.Field>
			<label>Date</label>
			<input type="date" />
		  </Form.Field>
		  <Form.Field error={validEmail()}>
			<label>Email Mask:</label>
			<input type="text" value={currentEmail}
			  onChange={
				(e) => {
				  setEmail(e.target.value.toLowerCase());
				}
			  }
			/>
		  </Form.Field>
		  <Form.Field>
			<label>Введите время(react-imask):</label>
			<IMaskInput mask={Date} lazy={false} pattern={momentFormat}
			  format={(date) => moment(date).format(momentFormat)}
			  parse={(str) => moment(str, momentFormat)}
			  value={currentTime}
			  onAccept={(value) => (console.log(value))}
			  blocks={{
				HH: {
				  mask: IMask.MaskedRange,
				  from: 10,
				  to: 23,
				},
				mm: {
				  mask: IMask.MaskedRange,
				  from: 0,
				  to: 59,
				},
				ss: {
				  mask: IMask.MaskedRange,
				  from: 0,
				  to: 59,
				},
			  }}
			/>
		  </Form.Field>
		</Form>
	  </Layout>
	</DataProvider>
  );
};

export const Error = (props) => {
  return (
	<>
	  <h1>Application Error</h1>
	  { props.error && <pre style={{ whiteSpace: 'pre-wrap' }}>{props.error.stack}</pre> }
	</>
  );
};
