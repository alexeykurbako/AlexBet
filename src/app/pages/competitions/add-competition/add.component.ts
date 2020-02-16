import {Component, OnInit} from '@angular/core';
import {Competition, CompetitionsData} from '../../../@core/interfaces/common/events';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NUMBERS_PATTERN} from '../../../@auth/components';
import {NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-add-competition-page',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddCompetitionComponent implements OnInit {
  categories = [];
  teams = [];
  selectedCategoryId;
  selectedFirstTeamId;
  selectedSecondTeamId;

  constructor(private competitionService: CompetitionsData,
              private router: Router,
              private toasterService: NbToastrService,
              private fb: FormBuilder) {
  }

  competitionForm: FormGroup;

  get duration() { return this.competitionForm.get('duration'); }

  protected readonly unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.competitionForm = this.fb.group({
      duration: this.fb.control('', [Validators.required, Validators.min(1),
        Validators.max(12000), Validators.pattern(NUMBERS_PATTERN)]),
    });

    this.competitionService.getCategories().pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.categories = data;
      });
  }

  create() {
    const competition: Competition = {
      id: null,
      firstTeam: this.teams.find(el => {
        return el.id == this.selectedFirstTeamId;
      }),
      secondTeam: this.teams.find(el => {
        return el.id == this.selectedSecondTeamId;
      }),
      status: 'active',
      firstTeamResult: 0,
      secondTeamResult: 0,
    };
    const duration: number = +this.competitionForm.value.duration;
    this.competitionService.add(competition, duration).pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.toasterService.success('', `Competition and event were created`);
        this.back();
      });
  }

  back() {
    this.router.navigate(['/pages/competitions/list']);
  }

  onChange() {
    this.competitionService.getTeamsByCategoryName(this.categories[this.selectedCategoryId - 1].name)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.teams = data;
      });
  }
}
