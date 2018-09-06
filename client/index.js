import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Layout from "./container/Layout/Layout";
import routes from './routes/routes';
import './style/style.css';

const client = new ApolloClient({
    dataIdFromObject: o => o.id
});

const Root = (
    <ApolloProvider client={client}>
        <HashRouter>
            <Layout>
                <Switch>
                    {routes.map((route, index) => (
                        <Route path={route.path} component={route.component} key={index} exact={route.exact} />
                    ))}
                </Switch>
            </Layout>
        </HashRouter>
    </ApolloProvider>
);

ReactDOM.render(
    Root,
    document.querySelector('#root')
);
