/**
 * [One-line description of what this function does]
 *
 * @param [paramName] - [Description including type constraints, whether required, validation rules]
 * @returns [What is returned in success case]
 * @throws [What error types are thrown and in which scenarios]
 *
 * Behavior:
 * - [Describe happy path: what happens when all inputs are valid]
 * - [Error scenario 1: what triggers it and what happens]
 * - [Error scenario 2: what triggers it and what happens]
 * - [Edge case 1: how null/undefined/empty values are handled]
 * - [Edge case 2: how boundary conditions are handled]
 * - [Any retry logic, fallback behavior, or special handling]
 *
 * Logs:
 * - DEBUG: [What low-level details to log]
 * - INFO: [What normal operations to log]
 * - WARN: [What warnings to log (retries, fallbacks, etc)]
 * - ERROR: [What errors to log with context]
 *
 * Metrics (if applicable):
 * - [metric_name_total]{labels}: [Description of counter]
 * - [metric_name_duration_ms]: [Description of timing]
 * - [metric_name_errors_total]{error_code}: [Description of error tracking]
 *
 * Performance (if applicable):
 * - Target latency: [e.g., <100ms for p99]
 * - Timeout: [e.g., 5 second request timeout]
 * - Rate limits: [e.g., max 10 requests per second]
 */

// Define return type with all fields documented
interface [ReturnType] {
  [field]: [type];  // [Description of what this field contains]
}

// Define custom error class with specific error codes
class [ErrorType] extends Error {
  constructor(
    message: string,
    public code: '[ERROR_CODE_1]' | '[ERROR_CODE_2]' | '[ERROR_CODE_3]',
    public context?: [ContextType]  // Optional context for debugging
  ) {
    super(message);
    this.name = '[ErrorType]';
  }
}

// Define the function signature
function [functionName]([params with full types]): [ReturnType | Promise<ReturnType>]

// Example: User validation function with complete spec
/**
 * Validates a user object for account creation.
 *
 * @param user - User data to validate (required)
 * @returns ValidationResult with success status and any errors
 * @throws Never throws - returns validation errors in result
 *
 * Behavior:
 * - Returns {valid: true, errors: []} if all fields pass validation
 * - Returns {valid: false, errors: [...]} with specific error codes if validation fails
 * - Validates email format using RFC 5322 rules
 * - Validates password strength (min 8 chars, 1 uppercase, 1 number, 1 special)
 * - Validates username is alphanumeric and 3-20 characters
 * - Trims whitespace from all string fields before validation
 * - Treats null/undefined fields as missing
 *
 * Logs:
 * - DEBUG: Validation attempt with masked email (user@***)
 * - INFO: Successful validation
 * - WARN: Validation failure with error codes (not field values)
 *
 * Metrics:
 * - user_validations_total{result}: Total validations (success/failure)
 * - user_validation_errors_total{error_code}: Errors by type
 *
 * Performance:
 * - Must complete in <5ms (no external calls)
 */
interface UserInput {
  email: string | null | undefined;
  password: string | null | undefined;
  username: string | null | undefined;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

interface ValidationError {
  field: 'email' | 'password' | 'username';
  code: 'MISSING' | 'INVALID_FORMAT' | 'TOO_SHORT' | 'TOO_LONG' | 'WEAK_PASSWORD';
  message: string;
}

function validateUser(user: UserInput): ValidationResult
