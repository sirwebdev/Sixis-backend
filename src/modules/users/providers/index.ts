import { container } from 'tsyringe';

import IValidationProvider from './ValidationProvider/models/IValidationProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

import YupValidationProvider from './ValidationProvider/implementations/YupValidationProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IValidationProvider>(
    'UserValidationProvider',
    YupValidationProvider,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
