import { object, string, number, date, InferType } from 'yup';
import _ from 'lodash';

let userSchema = object({
  username: string().required().min(3).matches(/^\S*$/, "No whitespace"),
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
  capacity: string().required(),
  time: date(),
  duration: string(),
  teachingLanguage: object().required(),
  learningLanguage: object().required(),
});

// parse and assert validity

export async function validateForm(form: string, formData: object){
    if (form === 'newUser') {
        try {
            // parse and assert validity
            const user = await userSchema.validate(formData)
            // custom validation
            if (_.isEqual(user.teachingLanguage, user.learningLanguage)) {
              return 'Teaching Language and Learning Language cannot be the same';
            }
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
            return exchange
        } catch (error) {
            return error.message
        }           
    }
}
