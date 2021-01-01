import { container } from 'tsyringe';

import IValidationProvider from './ValidationProvider/models/IValidationProvider';

import YupValidationPrivoder from './ValidationProvider/implementations/YupValidationProvider';

container.registerSingleton<IValidationProvider>(
    'PostValidationProvider',
    YupValidationPrivoder,
);
