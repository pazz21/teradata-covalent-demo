import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { TdDigitsPipe } from '@covalent/core/common';
import { TdLoadingService } from '@covalent/core/loading';

import { UserService, IUser } from '../users';

import { StepState } from '@covalent/core/steps';
import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';

import { ItemsService, ProductsService, AlertsService } from '../../services';

import { multi } from './data';

@Component({
  selector: 'qs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [ ItemsService, ProductsService, AlertsService ],
})
export class DashboardComponent implements OnInit {

  elements: ITdDynamicElementConfig[] = [{
    name: 'FirstName',
    label: 'First Name',
    type: TdDynamicElement.Input,
    required: true,
    maxLength: 50,
  }, {
    name: 'LastName',
    label: 'Last Name',
    type: TdDynamicElement.Input,
    maxLength: 50,
  }, {
    name: 'Age',
    label: 'Age',
    type: TdDynamicType.Number,
    min: 18,
    max: 80,
  }, {
    name: 'Yes',
    label: 'Married?',
    type: TdDynamicType.Boolean,
    default: false,
  }];

  elements1: ITdDynamicElementConfig[] = [{
    name: 'Age',
    label: 'Age',
    type: TdDynamicElement.Slider,
    required: true,
  }, {
    name: 'BloodGroup',
    type: TdDynamicElement.Select,
    required: true,
    selections: ['A-','A+','B-','B+','O-','O+','AB-', 'AB+'],
    default: 'A-',
  }, {
    name: 'file-input',
    label: 'Label',
    type: TdDynamicElement.FileInput,
  }, {
    name: 'DateOfBirth',
    label: 'DateOfBirth',
    type: TdDynamicElement.Datepicker,
  }];



  activeDeactiveStep1Msg: string = 'No select/deselect detected yet';
  stateStep1: StepState = StepState.Required;
  stateStep2: StepState = StepState.Required;
  stateStep3: StepState = StepState.Complete;
  disabled: boolean = false;

  toggleRequiredStep2(): void {
    this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
  }

  toggleRequiredStep1(): void {
    this.stateStep1 = (this.stateStep1 === StepState.Required ? StepState.None : StepState.Required);
  }

  toggleCompleteStep3(): void {
    this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
  }

  activeStep1Event(): void {
    this.activeDeactiveStep1Msg = 'Active event emitted.';
  }

  deactiveStep1Event(): void {
    this.activeDeactiveStep1Msg = 'Deactive event emitted.';
  }

  // Current date
  year: any = new Date().getFullYear();

  items: Object[];
  users: IUser[];
  products: Object[];
  alerts: Object[];

  textElements: [
  {
    "name": "input",
    "type": "input",
    "required": false,
    "flex": 50
  },
  {
    "name": "required-input",
    "label": "Input Label",
    "type": "input",
    "required": true,
    "flex": 50
  },
  {
    "name": "text-length",
    "label": "Text Length",
    "type": "input",
    "minLength": 4,
    "maxLength": 12,
    "flex": 50
  },
  {
    "name": "text",
    "type": "text",
    "required": false,
    "default": "Default",
    "flex": 50
  },
  {
    "name": "textarea",
    "type": "textarea",
    "required": false
  },
  {
    "name": "required-password",
    "label": "Password Label",
    "type": "password",
    "required": true
  }
]

  // Chart
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Sales';

  colorScheme: any = {
    domain: ['#1565C0', '#2196F3', '#81D4FA', '#FF9800', '#EF6C00'],
  };

  // line, area
  autoScale: boolean = true;

  constructor(private _titleService: Title,
              private _itemsService: ItemsService,
              private _userService: UserService,
              private _alertsService: AlertsService,
              private _productsService: ProductsService,
              private _loadingService: TdLoadingService) {
                // Chart
                this.multi = multi.map((group: any) => {
                  group.series = group.series.map((dataItem: any) => {
                    dataItem.name = new Date(dataItem.name);
                    return dataItem;
                  });
                  return group;
                });
  }

  ngOnInit(): void {
    this._titleService.setTitle( 'Demo Application' );
    this._loadingService.register('items.load');
    this._itemsService.query().subscribe((items: Object[]) => {
      this.items = items;
      setTimeout(() => {
        this._loadingService.resolve('items.load');
      }, 750);
    }, (error: Error) => {
      this._itemsService.staticQuery().subscribe((items: Object[]) => {
        this.items = items;
        setTimeout(() => {
          this._loadingService.resolve('items.load');
        }, 750);
      });
    });
    this._loadingService.register('alerts.load');
    this._alertsService.query().subscribe((alerts: Object[]) => {
      this.alerts = alerts;
      setTimeout(() => {
        this._loadingService.resolve('alerts.load');
      }, 750);
    });
    this._loadingService.register('products.load');
    this._productsService.query().subscribe((products: Object[]) => {
      this.products = products;
      setTimeout(() => {
        this._loadingService.resolve('products.load');
      }, 750);
    });
    this._loadingService.register('favorites.load');
    this._productsService.query().subscribe((products: Object[]) => {
      this.products = products;
      setTimeout(() => {
        this._loadingService.resolve('favorites.load');
      }, 750);
    });
    this._loadingService.register('users.load');
    this._userService.query().subscribe((users: IUser[]) => {
      this.users = users;
      setTimeout(() => {
        this._loadingService.resolve('users.load');
      }, 750);
    }, (error: Error) => {
      this._userService.staticQuery().subscribe((users: IUser[]) => {
        this.users = users;
        setTimeout(() => {
          this._loadingService.resolve('users.load');
        }, 750);
      });
    });
  }

  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }
}
