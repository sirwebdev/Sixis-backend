import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import FakeStorageProvider from './fakes/FakeStorageProvide';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    FakeStorageProvider,
);
