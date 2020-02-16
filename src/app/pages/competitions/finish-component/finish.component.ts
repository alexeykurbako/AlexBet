import {Component, OnDestroy, OnInit} from '@angular/core';
import {Competition, CompetitionsData} from '../../../@core/interfaces/common/events';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {FormBuilder, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {NUMBERS_PATTERN} from '../../../@auth/components';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ngx-finish-competition-page',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishCompetitionComponent implements OnInit, OnDestroy {

  constructor(private competitionService: CompetitionsData,
              private router: Router,
              private route: ActivatedRoute,
              private toasterService: NbToastrService,
              private fb: FormBuilder) {
  }

  resultForm = this.fb.group({
    firstTeam: this.fb.control('', [Validators.required, Validators.min(1),
      Validators.max(12000), Validators.pattern(NUMBERS_PATTERN)]),
    secondTeam: this.fb.control('', [Validators.required, Validators.min(1),
      Validators.max(12000), Validators.pattern(NUMBERS_PATTERN)]),
  });

  get firstTeam() { return this.resultForm.get('firstTeam'); }

  get secondTeam() { return this.resultForm.get('secondTeam'); }

  protected readonly unsubscribe$ = new Subject<void>();

  competition: Competition;

  ngOnInit(): void {
    this.competitionService
      .get(+this.route.snapshot.paramMap.get('id'))
      .pipe(takeUntil(this.unsubscribe$)).subscribe(currentCompetition => {
      this.competition = currentCompetition;
    });
  }

  ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}

  finish() {
      const formResultValue = this.resultForm.value;
      this.competition.firstTeamResult = +formResultValue.firstTeam;
    this.competition.secondTeamResult = +formResultValue.secondTeam;
      this.competitionService.finish(this.competition).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.toasterService.success('', `Competition was finished`);
        this.back();
      });
  }

  back() {
    this.router.navigate(['/pages/competition/list']);
  }
}
