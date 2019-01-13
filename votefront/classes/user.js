export default class user {
  code: string;
  name: string;
  constructor() {

  }
  set_code(new_code){
    self.code = new_code;
  }
  get_code(){
    return self.code;
  }
}
