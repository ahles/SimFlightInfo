/**
 * Checks if the flight is approximately at the geographic coordinates (0,0).
 *
 * This function determines whether the given flight's latitude and longitude
 * are within a specified threshold of zero. It's useful for identifying if the
 * flight is near the "null island" point, which is a common default for undefined
 * geographic data.
 *
 * @param {number} longitude - The current longitude
 * @param {number} latitude - The current latitude
 * @returns {boolean} - Returns `true` if the flight is within the threshold of (0,0),
 * otherwise returns `false`.
 */
export function flightIsOnNullIsland(longitude: number, latitude: number): boolean {
  const threshold = 0.05
  return Math.abs(longitude) < threshold && Math.abs(latitude) < threshold
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
