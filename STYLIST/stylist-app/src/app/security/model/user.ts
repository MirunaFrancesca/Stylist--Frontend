export class User{
    public id: number;
    public username: string;
    public password: string;
  
    constructor() {
      this.id = -1;
      this.username = '';
      this.password = '';
    }
}