import { object, string, email, number, date, InferType } from 'yup';
import _ from 'lodash';

let newUserSchema = object({
  firstname: string().required().min(3),
  lastname: string().required().min(3),
  username: string().required().min(3).matches(/^\S*$/, "No whitespace"),
  email: string().email().required(),
  password: string().required().min(6),
  // name: string().required(),
  dob: date().required(),
  gender: string().required(),
  teachingLanguage: object().required(),
  learningLanguage: object().required(),
});
let editUserSchema = object({
  firstname: string().required().min(3),
  lastname: string().required().min(3),
  username: string().required().min(3).matches(/^\S*$/, "No whitespace"),
  // email: string().email().required(),
  // password: string().required().min(6),
  // name: string().required(),
  dob: date().required(),
  gender: string().required(),
  teachingLanguage: object().required(),
  learningLanguage: object().required(),
});
let exchangeSchema = object({
  name: string().required().min(3).max(23),
  location: object({
    lat: number().required(),
    lng: number().required(),
    address: string()
  }).required('You must pick a location'),
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
            const user = await newUserSchema.validate(formData)
            // custom validation
            if (_.isEqual(user.teachingLanguage, user.learningLanguage)) {
              return 'Teaching Language and Learning Language cannot be the same';
            }
            return user
        } catch (error) {
            return error.message
        }           
    }
    if (form === 'editUser') {
        try {
            // parse and assert validity
            const user = await editUserSchema.validate(formData)
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
