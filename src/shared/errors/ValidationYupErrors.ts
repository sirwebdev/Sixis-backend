import { ValidationError } from 'yup';

export default function ValidationYupErrors(err: ValidationError): string[] {
    let validationErrors: string[] = [];

    err.inner.forEach(
        error => (validationErrors = [...validationErrors, error.message]),
    );

    return validationErrors;
}
