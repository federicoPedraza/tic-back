import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  check(email?: string): string {
    if (email)
      return `Hello ${email.split("@")[0]}!`;
    return 'Hello unknown crab!';
  }

  admin(email: string) {
    return `Hello admin ${email.split("@")[0]}!`;
  }
}
