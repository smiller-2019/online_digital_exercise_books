DROP DATABASE IF EXISTS digital_exercise_book_db;
CREATE DATABASE digital_exercise_book_db;

USE digital_exercise_book_db;

CREATE TABLE user (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(30) NOT NULL,
  role VARCHAR(10) NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL 
);

CREATE TABLE subject (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL
);

CREATE TABLE exercise (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  topic VARCHAR(30) NOT NULL,
  feedback VARCHAR(100),
  grade VARCHAR(5),
  student_email VARCHAR(30) NOT NULL,
  INDEX student_email_exercise_ind (student_email),
  CONSTRAINT fk_student_exercise FOREIGN KEY (student_email) REFERENCES user(email) ON DELETE CASCADE,
  subject_id INT UNSIGNED NOT NULL,
  INDEX subject_exercise_ind (subject_id),
  CONSTRAINT fk_subject_exercise FOREIGN KEY (subject_id) REFERENCES subject(id) ON DELETE CASCADE
);

CREATE TABLE page (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  content VARCHAR(30) NOT NULL,
  content_type VARCHAR(10) NOT NULL,
  content_url VARCHAR(150) NOT NULL,
  student_email VARCHAR(30) NOT NULL,
  INDEX student_email_page_ind (student_email),
  CONSTRAINT fk_student_page FOREIGN KEY (student_email) REFERENCES user(email) ON DELETE CASCADE,
  exercise_id INT UNSIGNED NOT NULL,
  INDEX exercise_page_ind (id),
  CONSTRAINT fk_exercise_id FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
);

CREATE TABLE class (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_email VARCHAR(30) NOT NULL,
  INDEX student_email_class_ind (student_email),
  CONSTRAINT fk_student FOREIGN KEY (student_email) REFERENCES user(email) ON DELETE CASCADE,
  teacher_email VARCHAR(30) NOT NULL,
  INDEX teacher_email_class_ind (teacher_email),
  CONSTRAINT fk_teacher FOREIGN KEY (teacher_email) REFERENCES user(email) ON DELETE CASCADE,
  subject_id INT UNSIGNED NOT NULL,
  INDEX subject_class_ind (subject_id),
  CONSTRAINT fk_subject_class FOREIGN KEY (subject_id) REFERENCES subject(id) ON DELETE CASCADE
);

