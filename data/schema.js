import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql/type';

let instructors = [{
  _id: 1,
  firstName: 'Samer',
  lastName: 'Buna',
  age: 35,
  gender: 1
},
{
  _id: 2,
  firstName: 'Cade',
  lastName: 'Nichols',
  age: 28,
  gender: 1
}];

let students = [{
  _id: 1,
  firstName: 'Andrew',
  lastName: 'Green',
  age: 16,
  gender: 1
},
{
  _id: 2,
  firstName: 'Michael',
  lastName: 'Brown',
  age: 17,
  gender: 1
},
{
  _id: 3,
  firstName: 'Theresa',
  lastName: 'Samers',
  age: 17,
  gender: 0
}];

let courses = [{
  _id: 1,
  name: 'Computer Science',
  instructor: 1
},
{
  _id: 2,
  name: 'JavaScript',
  instructor: 2
}];

let grades = [{
  student: 1,
  course: 1,
  grade: 5
},
{
  student: 2,
  course: 1,
  grade: 3
},
{
  student: 3,
  course: 1,
  grade: 5
},
{
  student: 1,
  course: 2,
  grade: 5
},
{
  student: 2,
  course: 2,
  grade: 4
},
{
  student: 3,
  course: 2,
  grade: 3
}];

function findById(data, id) {
  let _id = Number(id);
  for (var i = 0; i < data.length; i++) {
    if (data[i]._id === _id) {
      return data[i];
    }
  };
  return undefined;
}

let genderType = new GraphQLEnumType({
  name: 'Gender',
  values: {
    FEMALE: { value: 0 },
    MALE: { value: 1 }
  }
});

let levelType = new GraphQLEnumType({
  name: 'Level',
  values: {
    FRESHMAN: { value: 1 },
    SOPHOMORE: { value: 2 },
    JUNIOR: { value: 3 },
    SENIOR: { value: 4 }
  }
});

let gradeValueType = new GraphQLEnumType({
  name: 'GradeValue',
  values: {
    A: { value: 5 },
    B: { value: 4 },
    C: { value: 3 },
    D: { value: 2 },
    E: { value: 1 },
    F: { value: 0 }
  }
});

let personType = new GraphQLObjectType({
  name: 'Instructor',
  fields: () => ({
    _id: {
      description: 'Unique id of the instructor',
      type: new GraphQLNonNull(GraphQLID),
      resolve: (obj) => obj._id
    },
    firstName: {
      type: GraphQLString,
      resolve: (obj) => obj.firstName
     },
    lastName: {
      type: GraphQLString,
      resolve: (obj) => obj.lastName
     },
    age: {
      type: GraphQLInt,
      resolve: (obj) => obj.age
     },
    gender: {
      type: genderType,
      resolve: (obj) => obj.gender
     }
  })
});

let studentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    _id: {
      description: 'Unique id of the student',
      type: new GraphQLNonNull(GraphQLID),
      resolve: (obj) => obj._id
    },
    firstName: {
      type: GraphQLString,
      resolve: (obj) => obj.firstName
     },
    lastName: {
      type: GraphQLString,
      resolve: (obj) => obj.lastName
     },
    age: {
      type: GraphQLInt,
      resolve: (obj) => obj.age
     },
    gender: {
      type: genderType,
      resolve: (obj) => obj.gender
     },
    level: {
      type: levelType,
      resolve: (obj) => obj.level
     }
  })
});

let courseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
    _id: {
      description: 'Unique id of the course',
      type: new GraphQLNonNull(GraphQLID),
      resolve: (obj) => obj._id
    },
    name: {
      type: GraphQLString,
      resolve: (obj) => obj.name
     },
    instructor: {
      type: personType,
      resolve: (obj) => findById(instructors, obj.instructor)
     }
  })
});

let gradeType = new GraphQLObjectType({
  name: 'Grade',
  fields: () => ({
    student: {
      type: studentType,
      resolve: (obj) => findById(students, obj.student)
     },
    course: {
      type: courseType,
      resolve: (obj) => findById(courses, obj.course)
     },
    grade: {
      type: gradeValueType,
      resolve: (obj) => obj.grade
     }
  })
});

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      Instructors: {
        type: new GraphQLList(personType),
        resolve: () => instructors
      },
      Students: {
        type: new GraphQLList(studentType),
        resolve: () => students
      },
      Student: {
        type: studentType,
        args: {
          _id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: (_, {_id}) => findById(students, _id)
      },
      Courses: {
        type: new GraphQLList(courseType),
        resolve: () => courses
      },
      Course: {
        args: {
          _id: { type: new GraphQLNonNull(GraphQLID) }
        },
        type: courseType,
        resolve: (_, {_id}) => findById(courses, _id)
      },
      Grades: {
        type: new GraphQLList(gradeType),
        resolve: () => grades
      },
      GradesByCourse: {
        args: {
          courseId: { type: new GraphQLNonNull(GraphQLID) }
        },
        type: new GraphQLList(gradeType),
        resolve: (_, {courseId}) => grades.filter((v) => v.course == courseId)
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      gradeStudent: {
        type: gradeType,
        args: {
          studentId: { type: new GraphQLNonNull(GraphQLID) },
          courseId: { type: new GraphQLNonNull(GraphQLID) },
          grade: {type: gradeValueType}
        },
        resolve: (_, {studentId, courseId, grade}) => {
          let grd = {
              student: studentId,
              course: courseId,
              grade: grade
            };
          grades.push(grd);
          return grd;
        }
      }
    })
  })
});

export default schema;
