import parseISO from "date-fns/parseISO";
import formatFn from "date-fns/format";

export class DateTime {
  public static parse(dateTime: string) {
    const value = parseISO(dateTime);
    return value;
  }

  public static format(
    date: Date,
    format?:
      | "dd MMM yyyy HH:mm"
      | "date"
      | "datetime"
      | "iso"
      | "isodate"
      | "time"
      | "MMMddyyyy"
      | "ddMMM"
      | "ampm"
      | "MMMddyyyy HHmm"
      | "dateWeekday"
      | "MM/dd/yyyy hh:mm ampm"
      | "HH:mm"
  ) {
    let useFormat: string;
    switch (format) {
      case "HH:mm":
        useFormat = "HH:mm";
        break;
      case "dd MMM yyyy HH:mm":
        useFormat = "dd MMM yyyy HH:mm";
        break;
      case "date":
        useFormat = "MM/dd/yyyy";
        break;
      case "datetime":
        useFormat = "MM/dd/yyyy HH:mm:ss";
        break;
      case "time":
        useFormat = "pp";
        break;
      case "iso":
        useFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";
        break;
      case "isodate":
        useFormat = "yyyy-MM-dd";
        break;
      case "MMMddyyyy":
        useFormat = "MMM dd yyyy";
        break;
      case "MMMddyyyy HHmm":
        useFormat = "MMM dd yyyy HH:mm";
        break;
      case "ddMMM":
        useFormat = "dd MMM";
        break;
      case "ampm":
        useFormat = "MM/dd/yyyy hh:mm:ss a";
        break;
      case "dateWeekday":
        useFormat = "MM/dd/yyyy EEE";
        break;
      case "MM/dd/yyyy hh:mm ampm":
        useFormat = "MM/dd/yyyy hh:mm a";
        break;
      default:
        useFormat = "MM/dd/yyyy HH:mm";
        break;
    }
    const a = DateTime.addHours(date, -3);
    const value = formatFn(a, useFormat);
    return value;
  }

  public static addDays(date: Date, amountDays: number) {
    const newDate = new Date(date);
    return new Date(newDate.setDate(newDate.getDate() + amountDays));
  }

  public static addYears(date: Date, amountYears: number) {
    const newDate = new Date(date);
    return new Date(newDate.setFullYear(newDate.getFullYear() + amountYears));
  }

  public static addMonths(date: Date, amountMonths: number) {
    const newDate = new Date(date);
    return new Date(newDate.setMonth(newDate.getMonth() + amountMonths));
  }

  public static addHours(date: Date, amountHours: number) {
    const newDate = new Date(date);
    return new Date(newDate.setHours(newDate.getHours() + amountHours));
  }

  public static getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  public static addMinutes(date: Date, amountMinutes: number) {
    const newDate = new Date(date);
    return new Date(newDate.setMinutes(newDate.getMinutes() + amountMinutes));
  }

  public static addSeconds(date: Date, amountSeconds: number) {
    const newDate = new Date(date);
    return new Date(newDate.setSeconds(newDate.getSeconds() + amountSeconds));
  }

  public static getDifferenceInDays(from: Date, to: Date) {
    return (to.getTime() - from.getTime()) / (60 * 60 * 24 * 1000);
  }

  public static withoutTime(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}
