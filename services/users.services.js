const faker = require("faker");

class UsersService {
  constructor(){
    this.users=[]
    this.generate()
  }
  generate(){
    const TOTAL_USERS = 20;
    for (let i = 0; i < TOTAL_USERS; i++) {
      const name = faker.name.findName();
      const arrayName = name.split(' ');
      const firstName = arrayName[0];
      const lastName = arrayName[1];
      this.users.push({
        id: faker.datatype.uuid(),
        email: faker.internet.email(firstName, lastName),
        name: name,
        password: faker.internet.password(),
        role: i % 7 === 0 ? 'admin' : 'customer',
        avatar: faker.image.people(),
      });
    }
  }
  create(){

  }
  find = () => this.users
  findOne=(id)=>{
    const user = this.users.find((user) => user.id == id);
    return user
  }
    // return {}
    // if(user){
    //   res.json(user);
    // } else{
    //   res.status(404).json({
    //     message:"Error 404: not found"
    //   })
    // }

  update(){

  }
  delete(){

  }
}

module.exports = UsersService