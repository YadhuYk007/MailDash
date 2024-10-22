import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getEmails(host: string, username: string, oauthToken: string): Promise<string[]>;
}

export default TurboModuleRegistry.get<Spec>('ImapModule');
