export interface DDWidget {
  [key: string]: any;

  /** Name of current widget, e.g: `dd-total-sales` */
  name?: string;
  /** Title of current widget, e.g: `总销售额` */
  title?: string;
  /** Occupied grid count of current widget in pc, can be set [1-24], e.g: `6` */
  span_pc?: number;
  /** Occupied grid count of current widget in mobile, can be set [1-24], e.g: `12` */
  span_mobile?: number;
  /** Additional parameters for current widget */
  params?: any;
  enabled?: boolean;
}

export interface DDWidgetConfig {
  type: any;
  span_pc: number;
  span_mobile: number;
}

export type DDEventType = 'init' | 'refresh';
