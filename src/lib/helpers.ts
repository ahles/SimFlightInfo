export function flightIsStarted(longitude: number, latitude: number): boolean {
  const threshold = 0.05
  if (Math.abs(longitude - 90) <= threshold && Math.abs(latitude) <= threshold) {
    return true;
  }
  return false
}

/**
 * Converts exception codes to human-readable messages.
 * @param {string} code - The exception code to be converted.
 * @return {string} A human-readable message corresponding to the exception code.
 */
export function getExceptionTextForHumans(code: string): string {
  let exceptionText: string = ''
  if (code === 'ECONNREFUSED') {
    exceptionText = 'No connection. Is the simulator running?'
  } else {
    exceptionText = 'Is the simulator running? An unknown error ocurred: ' + code
  }
  return exceptionText
}
