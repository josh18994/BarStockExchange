import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';



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

        console.log('api url: ' + environment.apiURL);
        console.log('ws url: ' + environment.apiWsUrl);

        // Create an http link:
        const http = httpLink.create({
          uri: environment.apiURL,
          withCredentials: true,
        });

        const ws = new WebSocketLink({
          uri: environment.apiWsUrl,
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
