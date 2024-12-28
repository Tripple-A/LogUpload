// src/modules/users/services/userService.ts
import eventSystem from '../../../shared/eventSystem';


class UserService {
  private users: { id: number; name: string; email: string }[] = [];

  createUser(name: string, email: string) {
    const user = { id: this.users.length + 1, name, email };
    this.users.push(user);

    // Publish the event
    eventSystem.publish('user.created', user);

    return user;
  }

  getUsers() {
    return this.users;
  }
}

export default new UserService();
