import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {Event, EventsData} from '../../@core/interfaces/common/events';
import {catchError, takeUntil} from 'rxjs/operators';
import {Bet, BetsData} from '../../@core/interfaces/common/bets';
import {NUMBERS_PATTERN} from '../../@auth/components';
import {UserData} from '../../@core/interfaces/common/users';

@Component({
  selector: 'ngx-bet-page',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss'],
})
export class BetComponent implements OnInit, OnDestroy {
  options = [
    {value: 1, label: '', checked: true},
    {value: 2, label: ''},
  ];
  option = 1;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

  hasExpired = false;

  finishEventDate: string;

  text: any = {
    Days: 'Days',
    Hours: 'Hours',
    Minutes: 'Minutes',
    Seconds: 'Seconds',
  };

  currentBet: Bet = {
    id: null,
    team: null,
    user: null,
    event: null,
    size: 0,
    status: 'active',
    wasPayed: 'false',
  };

  protected readonly unsubscribe$ = new Subject<void>();

  get value() {
    return this.betForm.get('value');
  }

  constructor(private eventsService: EventsData,
              private betsService: BetsData,
              private usersService: UserData,
              private router: Router,
              private route: ActivatedRoute,
              private toasterService: NbToastrService,
              private fb: FormBuilder) {
  }

  betForm: FormGroup;

  ngOnInit(): void {
    this.betForm = this.fb.group({
      value: this.fb.control('', [Validators.required, Validators.min(1),
        Validators.max(12000), Validators.pattern(NUMBERS_PATTERN)]),
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.eventsService.get(Number(id))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event: Event) => {
        const time: Date = new Date(event.endTime.toString());
        this.finishEventDate = time.getDate() + ' ' + this.months[time.getMonth()] + ' ' +
          time.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        this.options[0].label = `${event.competition.firstTeam.name} with coefficient: ${event.firstTeamCoefficient}`;
        this.options[1].label = `${event.competition.secondTeam.name} with coefficient: ${event.secondTeamCoefficient}`;
        this.currentBet.event = event;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  create() {
    this.currentBet.team = this.option === 1 ? this.currentBet.event.competition.firstTeam
      : this.currentBet.event.competition.secondTeam;
    this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      this.currentBet.user = user;
      this.currentBet.size = +this.betForm.value.value;

      this.betsService.create(this.currentBet).pipe(takeUntil(this.unsubscribe$),
        catchError((err) => {
          this.toasterService.danger('', err.error);
          return new Observable(null);
        }),
      ).subscribe(() => {
          this.toasterService.success('', `Bet was created`);
          this.back();
        },
      );
    });
  }

  back() {
    this.router.navigate(['/pages/events/list']);
  }

  callback($event: Date) {
    this.hasExpired = true;
  }
}
