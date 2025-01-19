import { Router } from 'express';
<<<<<<< HEAD

=======
import { StudentRoutes } from '../app/modules/student/student.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../app/modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRouters } from '../app/modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../app/modules/Faculty/faculty.route';
import { AdminRoutes } from '../app/modules/admin/admin.route';
import { CourseRoutes } from '../app/modules/Course/course.route';
import { SemesterRegistrationRoutes } from '../app/modules/SemesterRegsitration/semesterRegistration.route';
import { OfferedCourseRouter } from '../app/modules/OfferedCourse/OfferedCourse.route';
import { AuthRouter } from '../app/modules/Auth/auth.route';
import { EnrolledCourseRoutes } from '../app/modules/EnrolledCourse/enrolledCourse.route';
>>>>>>> 2e5d2b06e69d012a04b7fc55ea3a607012bd2581

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
<<<<<<< HEAD
 
=======
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouters,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/enrolled-courses',
    route: EnrolledCourseRoutes,
  },
>>>>>>> 2e5d2b06e69d012a04b7fc55ea3a607012bd2581
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
