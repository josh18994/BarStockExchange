import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { split, ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

// const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here
// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({ uri }),
//     cache: new InMemoryCache(),
//   };
// }

// @NgModule({
//   providers: [
//     {
//       provide: APOLLO_OPTIONS,
//       useFactory: createApollo,
//       deps: [HttpLink],
//     },
//   ],
// })

interface Definintion {
  kind: string;
  operation?: string;
};


@NgModule({
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {

        // Create an http link:
        const http = httpLink.create({
          uri: 'http://localhost:3000/graphql',
        });

        const ws = new WebSocketLink({
          uri: `ws://localhost:5000/`,
          options: {
            reconnect: true,
          },
        });

        const link = split(
          // split based on operation type
          ({query}) => {
            const {kind, operation}: Definintion = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
          },
          ws,
          http,
        );

        return {
          link,
          cache: new InMemoryCache(),
          // ... options
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
