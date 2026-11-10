import json
from employee import Employee

FILE_NAME = "employees.json"


# Load employee records from JSON file
def load_employees():

    try:
        with open(FILE_NAME, "r") as file:
            return json.load(file)

    except FileNotFoundError:
        return []

    except json.JSONDecodeError:
        print("Error: Invalid JSON file.")
        return []


# Save employee records into JSON file
def save_employees(employees):

    try:
        with open(FILE_NAME, "w") as file:
            json.dump(employees, file, indent=4)

    except OSError as e:
        print("Error saving records:", e)

def add_employee():

    employees = load_employees()

    try:
        emp_id = int(input("Enter Employee ID: "))

        # Check whether employee ID already exists
        for emp in employees:
            if emp["emp_id"] == emp_id:
                print("Employee ID already exists!")
                return

        name = input("Enter Employee Name: ").strip()

        if not name:
            print("Name cannot be empty!")
            return

        age = int(input("Enter Employee Age: "))

        if age <= 0:
            print("Age must be greater than zero!")
            return

        department = input("Enter Department: ").strip()

        if not department:
            print("Department cannot be empty!")
            return

        salary = float(input("Enter Salary: "))

        if salary < 0:
            print("Salary cannot be negative!")
            return

        employee = Employee(
            emp_id, name, age, department, salary
        )

        employees.append(employee.to_dict())

        save_employees(employees)

        print("\nEmployee added successfully!")

    except ValueError:
        print("Invalid input! Enter the correct data type.")

    except Exception as e:
        print("Something went wrong:", e)

def view_employees():

    print("Inside view_employees function!")

    employees = load_employees()

    print("Loaded records:", employees)

    if not employees:
        print("No employee records found!")
        return

    print("\n========== EMPLOYEE DETAILS ==========")

    for emp in employees:

        employee = Employee(
            emp["emp_id"],
            emp["name"],
            emp["age"],
            emp["department"],
            emp["salary"]
        )

        employee.display()
        print("--------------------------------------")

def update_employee():

    employees = load_employees()

    try:
        emp_id = int(input("Enter Employee ID to update: "))

        for emp in employees:

            if emp["emp_id"] == emp_id:

                print("\nCurrent Employee Details:")
                print(emp)

                print("\nEnter New Details:")

                name = input("Enter New Name: ").strip()

                if not name:
                    print("Name cannot be empty!")
                    return

                age = int(input("Enter New Age: "))

                if age <= 0:
                    print("Age must be greater than zero!")
                    return

                department = input("Enter New Department: ").strip()

                if not department:
                    print("Department cannot be empty!")
                    return

                salary = float(input("Enter New Salary: "))

                if salary < 0:
                    print("Salary cannot be negative!")
                    return

                emp["name"] = name
                emp["age"] = age
                emp["department"] = department
                emp["salary"] = salary

                save_employees(employees)

                print("\nEmployee updated successfully!")
                return

        print("Employee not found!")

    except ValueError:
        print("Invalid input! Please enter correct values.")

def delete_employee():

    employees = load_employees()

    try:
        emp_id = int(input("Enter Employee ID to delete: "))

        for emp in employees:

            if emp["emp_id"] == emp_id:

                employees.remove(emp)

                save_employees(employees)

                print("\nEmployee deleted successfully!")
                return

        print("Employee not found!")

    except ValueError:
        print("Invalid Employee ID!")

def main():

    while True:

        print("\n================================")
        print("     EMPLOYEE MANAGEMENT SYSTEM")
        print("================================")

        print("1. Add Employee")
        print("2. View Employees")
        print("3. Update Employee")
        print("4. Delete Employee")
        print("5. Exit")

        try:
            choice = int(input("\nEnter your choice: "))

            if choice == 1:
                add_employee()

            elif choice == 2:
                print("Option 2 selected!")
                view_employees()
                print("View function completed!")

            elif choice == 3:
                update_employee()

            elif choice == 4:
                delete_employee()

            elif choice == 5:
                print("Thank you for using Employee Management System!")
                break

            else:
                print("Invalid choice! Please select 1 to 5.")

        except ValueError:
            print("Please enter a valid number!")


if __name__ == "__main__":
    main()