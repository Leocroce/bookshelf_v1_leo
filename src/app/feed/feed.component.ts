import { DashboardService } from './../servicosInterface/dashboard.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { catchError, Observable, of } from 'rxjs';
import { Dashboard } from '../modelosInterface/dashboard';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {

  usuario = {userName: 'Leonardo Croce', icone: 'remember_me'}
  cards$: Observable<Dashboard[]>
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [];
      }
        return this.cards$;
    })
  );

  constructor
  (private breakpointObserver: BreakpointObserver,
  private dashboardService: DashboardService
    ) {
      this.cards$ = dashboardService.listagemCards().pipe(
        catchError(error => {
          return of([])
        })
      )
    }
}
