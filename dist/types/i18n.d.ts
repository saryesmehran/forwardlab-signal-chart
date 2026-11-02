import type { ChartLocale } from "./types";
/**
 * The library's own strings. It runs on the partner's page, outside the app's
 * i18next setup, so it carries a small dictionary instead.
 */
declare const STRINGS: {
    readonly en: {
        readonly cursor: "Select";
        readonly trendline: "Trend line";
        readonly hline: "Horizontal line";
        readonly rect: "Rectangle";
        readonly delete: "Delete";
        readonly label: "Label";
        readonly labelPlaceholder: "e.g. TP1";
        readonly strategy: "Strategy";
        readonly noStrategy: "No strategy";
        readonly dashed: "Dashed";
        readonly loading: "Loading chart…";
        readonly error: "Couldn't load the chart.";
        readonly retry: "Retry";
        readonly noData: "No data for this symbol.";
        readonly cta: "Practice on this chart at ForwardLab";
        readonly watermarkAria: "ForwardLab — open the website in a new tab";
        readonly hideStrategy: "Hide";
        readonly showStrategy: "Show";
    };
    readonly fa: {
        readonly cursor: "انتخاب";
        readonly trendline: "خط روند";
        readonly hline: "خط افقی";
        readonly rect: "مستطیل";
        readonly delete: "حذف";
        readonly label: "برچسب";
        readonly labelPlaceholder: "مثلاً TP1";
        readonly strategy: "استراتژی";
        readonly noStrategy: "بدون استراتژی";
        readonly dashed: "خط‌چین";
        readonly loading: "در حال بارگذاری چارت…";
        readonly error: "بارگذاری چارت انجام نشد.";
        readonly retry: "تلاش دوباره";
        readonly noData: "برای این نماد داده‌ای نیست.";
        readonly cta: "تمرین روی همین چارت در ForwardLab";
        readonly watermarkAria: "ForwardLab — باز کردن سایت در تب جدید";
        readonly hideStrategy: "پنهان";
        readonly showStrategy: "نمایش";
    };
};
export type StringKey = keyof (typeof STRINGS)["en"];
export declare function translator(locale: ChartLocale): (key: StringKey) => string;
export {};
