const casual = require('casual')

module.exports = () => {
  const users =[
      {
        type:'bireysel',
        id:1,
        selectedProducts:[1,2,3],
        company:null,
        delivery:'Buca'
      },
      {
        type:'kurumsal',
        id:2,
        selectedProducts:[2,3],
        company:'Turkcell',
        delivery:null
      }
    ]
  return users;
}
/*
    casual.define("user", function() {
      return {
        name: casual.first_name,
        surname: casual.last_name,
        address: casual.street,
        phone: casual.phone,
        email: casual.email,
        postalCode: casual.zip,
        city: casual.city,
        number: casual.building_number,
        id: casual.uuid
      };
    });
    const data = {
      users: []
    };
    // Create 100 users
    for (let i = 0; i < 100; i++) {
      data.users.push(casual.user);
    }
    return data;
  };*/
  