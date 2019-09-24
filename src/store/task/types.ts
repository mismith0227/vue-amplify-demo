export default class Task {
  public id: string = ''
  public name: string = ''
  public description: string

  constructor(id: string, name: string, description: any) {
    this.id = id
    this.name = name
    this.description = description
  }
}
