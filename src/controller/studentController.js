import * as repo from "../repository/studentRepository.js";

export const addStudent = (req, res) => {
    const success = repo.addStudent(req.body);
    if (success) {
        res.status(204).send();
    } else {
        res.status(409).send();
    }
}

export const findStudent = (req, res) => {
    const student = repo.findStudent(+req.params.id);
    if (student) {
        const {password, ...studentWithoutPassword} = student;
        res.json(studentWithoutPassword);
    } else {
        res.status(404).send();
    }
}

export const deleteStudent = (req, res) => {
    const deletedStudent = repo.removeStudent(+req.params.id);
    if (deletedStudent) {
        res.json(deletedStudent)
    } else {
        res.status(404).send();
    }
}


export const updateStudent = (req, res) => {
    const student = repo.updateStudent(+req.params.id, req.body);
    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student with this ID does not exist, so you can not update it');
    }
}


export const addScore = (req, res) => {
    const success = repo.addScore(+req.params.id, req.body);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send('Student with this ID does not exist, so you can not add score');
    }
}

export const findByName = (req, res) => {
    const students = repo.findByName(req.params.name);
    const studentsWithoutPassword = [];
    if (students) {
        for (const student of students) {
            const {password, ...studentWithoutPassword} = student;
            studentsWithoutPassword.push(studentWithoutPassword);
        }
        res.json(studentsWithoutPassword);
    } else {
        res.status(404).send();
    }

}

export const countByName = (req, res) => {
    let names = req.query.names
    if (!Array.isArray(names)) names = [names]
    const count = repo.countByName(names);
    res.json(count);
}

export const findByMinScore = (req, res) => {
    const students = repo.findByMinScore(req.params.exam, req.params.minScore);
    const studentsWithoutPassword = [];
    for (const student of students) {
        const {password, ...studentWithoutPassword} = student;
        studentsWithoutPassword.push(studentWithoutPassword);
    }
    res.json(studentsWithoutPassword);

}