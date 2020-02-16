/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NbMenuItem } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Injectable, OnInit} from '@angular/core';
import {UserStore} from '../@core/stores/user.store';

@Injectable()
export class PagesMenu implements OnInit {

  constructor(private accessChecker: NbAccessChecker, private userStore: UserStore ) {}

  getMenu(): Observable<NbMenuItem[]> {
    const adminMenu = [
      {
        title: 'Analytics',
        icon: 'bar-chart-outline',
        link: '/pages/analytics',
        home: true,
        children: undefined,
      },
      {
        title: 'Competitions',
        icon: 'compass-outline',
        link: '/pages/competitions/list',
        children: undefined,
      },
      {
        title: 'Archive',
        icon: 'archive-outline',
        link: '/pages/competitions/archive',
        children: undefined,
      },
      {
        title: 'Users',
        icon: 'people-outline',
        link: '/pages/users/list',
        children: undefined,
      },
    ];

    const userMenu = [
      {
        title: 'Bets',
        icon: 'eye-outline',
        link: '/pages/events/bets/list',
        children: undefined,
      },
       {
        title: 'Events',
        icon: 'plus-outline',
        link: '/pages/events/list',
        home: true,
        children: undefined,
      },
    ];



    return this.accessChecker.isGranted('view', 'users')
      .pipe(map(hasAccess => {
        if (hasAccess && this.userStore.getUser().roles[0] === 'ADMIN') {
          return [...adminMenu];
        } else {
           return [...userMenu];
        }

      }));
  }

  ngOnInit(): any {
  }
}
