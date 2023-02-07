import { API } from "../backend";

export const getOrders = () => {
  return fetch(`${API}/api/get-all-orders`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const getGrades = (id) => {
    return fetch(`${API}/api/get-all-grades`, {
        method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .then((grades) => {
        let gradesObj = {};
        
        grades.forEach((grade) => {
            gradesObj[grade._id] = grade;
        });
        
        localStorage.setItem("grades", JSON.stringify(gradesObj));
        return gradesObj;
    })
    .catch((err) => console.log(err));
    
};

export const getGradeGroups = (id) => {
    return fetch(`${API}/api/get-all-grade-groups`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((gradeGroups) => {
        let gradeGroupsObj = {};
        gradeGroups.forEach((gradeGroup) => {
          gradeGroupsObj[gradeGroup._id] = gradeGroup;
        });
        localStorage.setItem("gradeGroups", JSON.stringify(gradeGroupsObj));
        return gradeGroupsObj;
      })
        .catch((err) => console.log(err));
};



