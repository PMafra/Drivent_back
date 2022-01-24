import Chance from "chance";

export function generateUser() {
  const chance = new Chance();
  return {
    email: chance.email({ domain: "gmail.com" }),
    password: chance.word({ length: 8 })
  };
}
  
