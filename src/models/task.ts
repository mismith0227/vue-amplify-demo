export default class Task {
  public id: string = ''
  public name: string = ''
  public description: string

  constructor(fullName: string, email: string, profile: any) {
    this.id = fullName
    this.name = email
    this.description = profile
  }
}
