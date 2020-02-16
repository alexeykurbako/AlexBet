/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

export const authSettings = {
  guest: {
  },
  user: {
    parent: 'guest',
      view: ['current-user', 'devices', 'orders'],
      edit: ['current-user', 'devices', 'orders'],
  },
  admin: {
    parent: 'user',
      view: ['current-user', 'devices', 'orders', 'users'],
      edit: ['current-user', 'devices', 'orders', 'users'],
  },
};
