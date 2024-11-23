/**
 * Determines if the flight has started based on the provided longitude and latitude.
 * Without flight started, the long/lat is 90/0
 *
 * @param {number} longitude - The current longitude of the flight.
 * @param {number} latitude - The current latitude of the flight.
 * @returns {boolean} - Returns `true` if the flight has started, otherwise `false`.
 */
export function flightIsStarted(longitude: number, latitude: number): boolean {
  const threshold = 0.05
  if (Math.abs(longitude - 90) < threshold && Math.abs(latitude) < threshold) {
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
