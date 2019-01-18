import * as upash from 'upash';
import * as argon2 from '@phc/argon2';

upash.install('argon2', argon2);

class PasswordHasher {
  static hash(val: string) {
    return upash.hash(val);
  }

  static match(left: string, right: string) {
    return upash.match(left, right);
  }
}

export default PasswordHasher;