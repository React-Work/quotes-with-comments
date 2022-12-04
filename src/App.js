import { Route, Switch, Redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AllQuotes from './pages/AllQuotes';

const Layout = lazy(()=> import("./components/layout/Layout"));
const QuoteDetail = lazy(()=> import("./pages/QuoteDetail"));
const NotFound = lazy(()=> import("./pages/NotFound"));
const LoadingSpinner = lazy(()=> import("./components/UI/LoadingSpinner"));
const NewQuote = lazy(()=> import("./pages/NewQuote"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className='centered'> <LoadingSpinner /> </div>}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
