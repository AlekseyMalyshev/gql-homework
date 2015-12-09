# Sample GraphQL server side application

#### Sample queries:

*Get a list of students:*
```json
query {
  Students {
    _id,
    firstName,
    lastName,
    gender
  }
}
```

*Student with a specific id:*
```json
query {
  Student(_id: 1) {
    firstName,
    lastName,
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
        firstName,
        lastName
      }
    }
    student {
      firstName,
      lastName
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
      firstName,
      lastName
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
      firstName,
      lastName,
      gender
    },
    course {
      name,
      instructor {
        firstName,
        lastName,
        gender
      }
    },
    grade
  }
}
```

#### Heroku link:

https://gentle-anchorage-6623.herokuapp.com