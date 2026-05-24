import type { JsonValidatorInput, JsonValidatorOutput } from './json-validator.schema.js'

export const jsonValidateFormat = function (input: JsonValidatorInput): JsonValidatorOutput {
  // Always check JSON validity
  const valid = validateJSON(input.text)

  // Format only if JSON valid
  if (valid.valid) {
    // 'validate' has no case and falls through to default which keeps input.text as received.
    // Format and minify both require valid JSON first, so we only reach this switch when valid.valid is true.
    let result: string = input.text
    switch (input.actionType) {
      case 'format':
        result = formatJSON(valid.jsonObject!, input.space)
        break
      case 'minify':
        result = minifyJSON(valid.jsonObject!)
        break
    }

    return {
      validJson: valid.valid,
      result,
    }
  } else {
    return {
      validJson: valid.valid,
      errorMessage: valid.errorMessage,
      errorPosition: {
        line: valid.line ? valid.line : null,
        column: valid.column ? valid.column : null,
      },
    }
  }
}

// Explicit type replaces `any` from JSON.parse() return value
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

// Return shape for validateJSON — valid=true includes the parsed object,
// valid=false includes the error message and optional position
interface ValidateJson {
  valid: boolean
  jsonObject?: JsonValue
  errorMessage?: string
  line?: number | null
  column?: number | null
}

// Validate
const validateJSON = function (input: string): ValidateJson {
  try {
    return {
      valid: true, // Always return true cause false would go to catch(error)
      jsonObject: JSON.parse(input), // Parser will throw syntax error if wrong JSON
    }
  } catch (error) {
    // Check for SyntaxError otherwise error is of type unknown
    if (error instanceof SyntaxError) {
      // Node's SyntaxError message includes position as "...line X column Y (char Z)"
      // Split on those strings to extract the numbers as not all errors include position
      const line = error.message.includes('line') // Check that error message has line # string
        ? error.message.split('line ')[1].split('column')[0]
        : null
      const column = error.message.includes('column') // Check that error message has column # string
        ? error.message.split('column ')[1].split(')')[0]
        : null
      return {
        valid: false,
        errorMessage: error.message,
        line: line ? Number(line) : null,
        column: column ? Number(column) : null,
      }
    }
    // Edge case for non-Syntax errors
    return {
      valid: false,
      errorMessage: 'An error of unknown instance has occurred.',
      line: 0,
      column: 0,
    }
  }
}

// Format JSON
const formatJSON = function (input: JsonValue, space: number | string): string {
  return JSON.stringify(input, null, space)
}

// Minify JSON
const minifyJSON = function (input: JsonValue): string {
  return JSON.stringify(input)
}
