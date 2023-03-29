import { Color } from './consts';


export function message(str: string, color: Color = Color.Default) {
  console.log(color, str);
}

export function error(str: string) {
  message(`error: ${str}`, Color.Red);
}

export function success(str: string) {
  message(str, Color.Green);
}

export function warning(str: string) {
  message(str, Color.Yellow);
}
