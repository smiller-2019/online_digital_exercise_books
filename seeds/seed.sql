use digital_exercise_book_db;

INSERT INTO user
    (email,password,first_name,last_name,role)
VALUES
    ('karen@myteacher.com','password1','karen','lacey','teacher'),
    ('dave@myteacher.com','password12','dave','banner','teacher'),
    ('sally@myteacher.com','password123','sally','payne','teacher'),
    ('stacey@astudent.com','password1234','stacey','lacey','student'),
    ('timothy@anostudent.com','password12345','timothy','banks','student'),
    ('kelly@anostudent.com','password123456','kelly','jones','student'),
    ('brian@thisstudent.com','password1234567','brian','delany','student');

    INSERT INTO subject
    (title)
VALUES
    ('computer science'),
    ('Maths'),
    ('English'),
    ('Science'),
    ('Design and Technology'),
    ('History'),
    ('Food Technology'),
    ('Business Studies');

INSERT INTO exercise
    (student_email, feedback, topic,grade,subject_id)
VALUES
    ('stacey@astudent.com', 'Well done', 'binary','',1),
    ('kelly@anostudent.com', 'Excellent work.', 'arithmetic','A',2),
    ('brian@thisstudent.com', 'Well done on attempting this work.', 'Spelling','D',3);

    
INSERT INTO page
    (exercise_id,student_email, content, content_type,content_url)
VALUES
    (1, 'stacey@astudent.com','00001101 is 13 in denary','t',''),
    (1, 'stacey@astudent.com','00001111 is 15 in denary', 't',''),
    (1, 'stacey@astudent.com','00001001 is 9 in denary', 't',''),
    (2, 'kelly@anostudent.com','12 * 12 = 144', 't',''),
    (2, 'kelly@anostudent.com','8 * 3 = 24', 't',''),
    (2, 'kelly@anostudent.com','8 + 12 = 30', 't',''),
    (3, 'brian@thisstudent.com','convoluted', 't',''),
    (3, 'brian@thisstudent.com','teleccommunicationn', 't','');

    INSERT INTO class
    (student_email, subject_id, teacher_email)
VALUES
    ('stacey@astudent.com',1, 'karen@myteacher.com'),
    ('kelly@anostudent.com',2,'sally@myteacher.com'),
    ('brian@thisstudent.com',3,'dave@myteacher.com');



