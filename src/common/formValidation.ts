import { object, string, number, date, InferType } from 'yup';
import _ from 'lodash';

let userSchema = object({
  username: string().required().min(3),
  firstname: string().required().min(3),
  lastname: string().required().min(3),
//   name: string().required(),
  teachingLanguage: object().required(),
  learningLanguage: object().required(),
//   age: number().required().positive().integer(),
//   email: string().email(),
});
let exchangeSchema = object({
  name: string().required('Location Name is a required field').min(3),
});

// parse and assert validity

export async function validateForm(form: string, formData: object){
    if (form === 'newUser') {
        try {
            // parse and assert validity
            const user = await userSchema.validate(formData)
            return user
        } catch (error) {
            return error.message
        }           
    }
    if (form === 'newExchange') {
        try {
            // parse and assert validity
            const exchange = await exchangeSchema.validate(formData)
            // custom validation
            if (_.isEqual(exchange.teachingLanguage, exchange.learningLanguage)) {
              return 'Teaching Language and Learning Language cannot be the same';
            }
            return exchange
        } catch (error) {
            return error.message
        }           
    }
}
