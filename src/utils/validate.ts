interface Conditions {
  required?: boolean;
  spaces?: boolean;
  slashes?: boolean;
  dots?: boolean;
  english?: boolean;
  fileExtension?: boolean;
  path?: boolean;
}

export function validate(value: string, inputName: string, conditions?: Conditions): string | true {
  const {
    required = true,
    spaces = false,
    slashes = false,
    dots = false,
    english = false,
    fileExtension = false,
    path = false,
  } = conditions || {};

  if (required && !value.trim()) {
    return `${inputName} is required`;
  }
  if (spaces && value.includes(' ')) {
    return `${inputName} cannot contain spaces`;
  }
  if (slashes && (value.includes('/') || value.includes('\\'))) {
    return `${inputName} cannot contain slashes`;
  }
  if (dots && value.includes('.')) {
    return `${inputName} cannot contain dots`;
  }
  if (english && !/^[a-zA-Z]*$/.test(value)) {
    return `${inputName} can only contain English letters`;
  }
  if (fileExtension && !value.includes('.')) {
    return `${inputName} must include a file extension`;
  }
  if (path && !/^[\w./\\-]+$/i.test(value)) {
    return `${inputName} can only contain letters, numbers, periods, slashes, backslashes, underscores, and hyphens`;
  }

  return true;
}
