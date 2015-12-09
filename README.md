# Sample GraphQL server side application

#### Sample queries:

*Get a list of students:*
```json
query {
  Students {
    _id,
    fullName,
    gender
  }
}
```
*Specific student information*
```json
query {
  students(filter: "Andrew") {
    fullName,
    GPA,
    level,
    courses {
      name,
      instructor {
        lastName
      }
    }
  }
}
```
*Student with a specific id:*
```json
query {
  Student(_id: 1) {
    fullName,
    gender
  }
}
```
*Get a list of cources*
```json
query {
  Courses {
    name,
    instructor {
      firstName
      gender
    }
  }
}
```
*All grades for all courses*
```json
query {
  Grades {
    course {
      name,
      instructor {
        fullName
      }
    }
    student {
      fullName
    }
    grade
  }
}
```
*Grades by course*
```json
query {
  GradesByCourse(courseId: 1) {
    student {
      fullName
    },
    grade
  }
}
```
*Grade a student (mutator!)*
```json
mutation {
  gradeStudent(studentId: 1, courseId: 1, grade: A) {
    student {
      fullName,
      gender
    },
    course {
      name,
      instructor {
        fullName,
        gender
      }
    },
    grade
  }
}
```

#### Heroku link:

https://gentle-anchorage-6623.herokuapp.com