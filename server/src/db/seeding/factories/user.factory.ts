import { faker } from '@faker-js/faker';
import { define } from "typeorm-seeding";
import User from '../../../entities/user.model';

define(User, () => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email({ firstName: user.name });
  user.phoneNumber = faker.phone.number();
  return user;
});
