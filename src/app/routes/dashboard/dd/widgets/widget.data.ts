import { DDWidgetConfig } from '../dd.types';
import { DashboardDDWidgetTotalSalesComponent } from './total-sales/total-sales.component';
import { DashboardDDWidgetVisitsComponent } from './visits/visits.component';
import { DashboardDDWidgetEffectComponent } from './effect/effect.component';
import { DashboardDDWidgetGaugeComponent } from './gauge/gauge.component';
import { DashboardDDWidgetRadarComponent } from './radar/radar.component';
import { DashboardDDWidgetActivitiesComponent } from './activities/activities.component';

export const DDWidgetData: { [name: string]: DDWidgetConfig } = {
  'total-sales': {
    span_pc: 6,
    span_mobile: 12,
    type: DashboardDDWidgetTotalSalesComponent,
  },
  'visits': {
    span_pc: 6,
    span_mobile: 12,
    type: DashboardDDWidgetVisitsComponent,
  },
  'effect': {
    span_pc: 6,
    span_mobile: 12,
    type: DashboardDDWidgetEffectComponent,
  },
  'gauge': {
    span_pc: 6,
    span_mobile: 12,
    type: DashboardDDWidgetGaugeComponent,
  },
  'radar': {
    span_pc: 12,
    span_mobile: 24,
    type: DashboardDDWidgetRadarComponent,
  },
  'activities': {
    span_pc: 12,
    span_mobile: 24,
    type: DashboardDDWidgetActivitiesComponent,
  },
};
