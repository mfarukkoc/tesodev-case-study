import employeeData from "./mockData.json";

const initDB = (): void => {
  localStorage.setItem("employeeDB", JSON.stringify(employeeData.data));
};

export default initDB;
