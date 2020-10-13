import Fecth from "./Fetch"


const vgtimeURL = 'https://www.vgtime.com/topic/index/load.jhtml?page=1&pageSize=12'

export default class NewsController {
  public async create() {
    (await new Fecth().get(vgtimeURL)).dom().vgtime()
  }
}