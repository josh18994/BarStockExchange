import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';



interface Definintion {
  kind: string;
  operation?: string;
}


@NgModule({
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {

        // Create an http link:
        const http = httpLink.create({
          uri: 'http://localhost:4000/graphql',
          withCredentials: true,
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token')
          })
        });

        const ws = new WebSocketLink({
          uri: `ws://localhost:4000/graphql`,
          options: {
            reconnect: true,
          },
        });

        const link = split(
          // split based on operation type
          ({ query }) => {
            const { kind, operation }: Definintion = getMainDefinition(query);
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
