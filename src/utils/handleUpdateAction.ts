export function handleUpdateAction(
  action: string,
  value: string,
  defaultValue: string,
  fieldName: string
): Record<string, string> {
  return {
    action,
    [fieldName]: value === '' ? defaultValue : value,
  };
}
