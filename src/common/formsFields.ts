export const userFormFields = [
    { 
        type: "text",
        name: "firstname",
        label: "First Name",
        placeholder: "Enter your firstname",
        property: "firstname",
        value: ""
    },
    { 
        type: "text",
        name: "lastname",
        label: "Last Name",
        placeholder: "Enter your lastname",
        property: "lastname",
        value: ""
    },
    { 
        type: "text",
        name: "username",
        label: "Username",
        placeholder: "Enter a username",
        property: "username",
        value: ""
    },
    { 
     type: "email",
     name: "email",
     label: "Email",
     placeholder: "example@gmail.com",
     property: "email",
     value: ""
    },
    { 
     type: "password",
     name: "password",
     label: "Password",
     placeholder: "Enter a password",
     property: "password",
     value: ""
    },
    { 
     type: "date",
     name: "dob",
     label: "Date of birth",
     placeholder: "Enter your date of birth",
     property: "dob",
     value: null
    },
    { 
     type: "radio",
     name: "gender",
     label: "Gender",
     placeholder: "Enter your Gender",
     property: "gender",
     value: "Female"
    },
    { 
     type: "language_picker",
     name: "teachingLanguage",
     label: "Enter your native language",
    //  placeholder: "Enter your teachingLanguage",
     property: "teachingLanguage",
     value: null
    },
    { 
     type: "language_picker",
     name: "learningLanguage",
     label: "Enter your learning language",
    //  placeholder: "Enter your learningLanguage",
     property: "learningLanguage",
     value: null
    },
 ];

export const exchangeFormFields = [
    { 
     type: "text",
     name: "name",
     label: "Exchange Name",
     placeholder: "Enter a name",
     property: "name",
     value: "",
     withAsterisk: true
    },
    { 
     type: "location_picker",
     name: "location",
     label: "Location Name",
     placeholder: "Type a location",
     property: "location",
     value: null
    },
    { 
     type: "select",
     name: "capacity",
     label: "Capacity",
     placeholder: "How many people in this exchange",
     property: "capacity",
     value: "",
     availableValues: ['2', '4', '6', '8', '10', '12']
    },
    { 
     type: "datetime",
     name: "time",
     label: "Time and Date",
     placeholder: "Pick a time and date",
     property: "time",
     value: "",
     format: "DD MMM YYYY hh:mm A"
    },
    { 
     type: "select",
     name: "duration",
     label: "Duration",
     placeholder: "How long will the exchange be (minutes)",
     property: "duration",
     value: "",
     availableValues: ['30', '45', '60', '120', '180']
    },
    { 
    type: "language_shower",
    name: "teachingLanguage",
    label: "Your teaching language is",
    property: "teachingLanguage",
    value: null
    },
    { 
    type: "language_shower",
    name: "learningLanguage",
    label: "Your teaching language is",
    property: "learningLanguage",
    value: null
    },     
];