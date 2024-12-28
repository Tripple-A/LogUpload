

class NotificationService {
    notify(user: { id: number; name: string; email: string }, template: string): void {
      console.log(`📧 Sending email to ${user.email} using template: ${template}`);
    }
  }
  
export default new NotificationService();
  