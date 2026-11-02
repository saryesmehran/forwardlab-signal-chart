import type { ChartLocale } from "./types";

/**
 * The library's own strings. It runs on the partner's page, outside the app's
 * i18next setup, so it carries a small dictionary instead.
 */
const STRINGS = {
  en: {
    cursor: "Select",
    trendline: "Trend line",
    hline: "Horizontal line",
    rect: "Rectangle",
    delete: "Delete",
    label: "Label",
    labelPlaceholder: "e.g. TP1",
    strategy: "Strategy",
    noStrategy: "No strategy",
    dashed: "Dashed",
    loading: "Loading chart…",
    error: "Couldn't load the chart.",
    retry: "Retry",
    noData: "No data for this symbol.",
    cta: "Practice on this chart at ForwardLab",
    watermarkAria: "ForwardLab — open the website in a new tab",
    hideStrategy: "Hide",
    showStrategy: "Show",
  },
  fa: {
    cursor: "انتخاب",
    trendline: "خط روند",
    hline: "خط افقی",
    rect: "مستطیل",
    delete: "حذف",
    label: "برچسب",
    labelPlaceholder: "مثلاً TP1",
    strategy: "استراتژی",
    noStrategy: "بدون استراتژی",
    dashed: "خط‌چین",
    loading: "در حال بارگذاری چارت…",
    error: "بارگذاری چارت انجام نشد.",
    retry: "تلاش دوباره",
    noData: "برای این نماد داده‌ای نیست.",
    cta: "تمرین روی همین چارت در ForwardLab",
    watermarkAria: "ForwardLab — باز کردن سایت در تب جدید",
    hideStrategy: "پنهان",
    showStrategy: "نمایش",
  },
} as const;

export type StringKey = keyof (typeof STRINGS)["en"];

export function translator(locale: ChartLocale) {
  const dict = STRINGS[locale] ?? STRINGS.en;
  return (key: StringKey): string => dict[key];
}
