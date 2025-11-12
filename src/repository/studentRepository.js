import {Student} from "../model/student.js";

const students = new Map();

export const addStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
    }
    students.set(id, new Student(id, name, password));
    return true;
}

export const findStudent = id => students.get(id);

export const removeStudent = id => {
    const student = students.get(id);
    if (student) {
        students.delete(id);
        return student
    }
}


export const updateStudent = (id, {name, password}) => {
    const student = students.get(id);
    if (student) {
        if (name) student.name = name;
        if (password) student.password = password;
        return student;
    } else return null;
};

export const addScore = (id, {examName, score}) => {
    const student = students.get(id);
    if (student) {
        student.scores[examName] = score;
        return true;
    }
    return false;
};

export const findByName = (name) => {
    return Array.from(students.values()).filter(student => student.name.toLowerCase() === name.toLowerCase())
};

// export const countByName = ([...names]) => {
//     let count = 0;
//     const uniqueNames = [...new Set(names)];
//     for (const name of uniqueNames) {
//         count += findByName(name).length;
//     }
//     return count;
// };

export const countByName = (names) => {
    const uniqueNames = new Set(names.map(name => name.toLowerCase()));
    let count = 0;
    for (const student of students.values()) {
        if (uniqueNames.has(student.name.toLowerCase())) {
            count++;
        }
    }
    return count;
};

export const findByMinScore = (exam, minScore) => {
    return Array.from(students.values()).filter(student => student.scores[exam] >= minScore);
};

